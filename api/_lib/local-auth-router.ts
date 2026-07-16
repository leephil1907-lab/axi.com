import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.LOCAL_AUTH_SECRET || process.env.JWT_SECRET || "axi-local-auth-secret-key-2024-change-me"
);

export async function verifyLocalToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    return payload as { userId: number; email: string; role: string };
  } catch {
    return null;
  }
}

export const localAuthRouter = createRouter({
  // ── Email/Password Auth ───────────────────────────────
  login: publicQuery
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const user = await db.select().from(localUsers).where(eq(localUsers.email, input.email));
      if (!user[0]) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }
      const valid = await bcrypt.compare(input.password, user[0].passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }
      await db.update(localUsers).set({ lastSignInAt: new Date() }).where(eq(localUsers.id, user[0].id));
      const token = await new SignJWT({ userId: user[0].id, email: user[0].email, role: user[0].role })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(JWT_SECRET);
      return { token, user: { id: user[0].id, email: user[0].email, name: user[0].name, role: user[0].role } };
    }),

  register: publicQuery
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().optional(),
      country: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db.select().from(localUsers).where(eq(localUsers.email, input.email));
      if (existing[0]) {
        throw new TRPCError({ code: "CONFLICT", message: "Email already registered" });
      }
      const hash = await bcrypt.hash(input.password, 10);
      await db.insert(localUsers).values({
        email: input.email,
        passwordHash: hash,
        name: input.name || input.email.split("@")[0],
        country: input.country || "US",
        role: "user",
      });
      return { success: true };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const token = ctx.req.headers.get("x-local-auth-token");
    if (!token) return null;
    const payload = await verifyLocalToken(token);
    if (!payload) return null;
    const db = getDb();
    const user = await db.select().from(localUsers).where(eq(localUsers.id, payload.userId));
    if (!user[0] || !user[0].isActive) return null;
    return { id: user[0].id, email: user[0].email, name: user[0].name, role: user[0].role, country: user[0].country };
  }),

  logout: publicQuery
    .mutation(async () => {
      return { success: true };
    }),

  // ── OAuth Callbacks (Google, Apple, Facebook) ───────────
  oauthCallback: publicQuery
    .input(z.object({
      provider: z.enum(["google", "apple", "facebook"]),
      token: z.string(),
      email: z.string().email(),
      name: z.string().optional(),
      avatar: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      let user = await db.select().from(localUsers).where(eq(localUsers.email, input.email));

      if (!user[0]) {
        const hash = await bcrypt.hash(Math.random().toString(36), 10);
        await db.insert(localUsers).values({
          email: input.email,
          passwordHash: hash,
          name: input.name || input.email.split("@")[0],
          role: "user",
        });
        user = await db.select().from(localUsers).where(eq(localUsers.email, input.email));
      }

      await db.update(localUsers).set({ lastSignInAt: new Date() }).where(eq(localUsers.id, user[0].id));

      const jwtToken = await new SignJWT({ userId: user[0].id, email: user[0].email, role: user[0].role })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(JWT_SECRET);

      return { token: jwtToken, user: { id: user[0].id, email: user[0].email, name: user[0].name, role: user[0].role } };
    }),
});
