import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { verifyLocalToken } from "./local-auth-router";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
  localUser?: { id: number; email: string; name: string | null; role: string };
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try local auth token (x-local-auth-token header)
  try {
    const token = opts.req.headers.get("x-local-auth-token");
    if (token) {
      const payload = await verifyLocalToken(token);
      if (payload) {
        const db = getDb();
        const user = await db.select().from(localUsers).where(eq(localUsers.id, payload.userId));
        if (user[0] && user[0].isActive) {
          ctx.localUser = {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
            role: user[0].role,
          };
          // Also set ctx.user for middleware compatibility
          ctx.user = {
            id: user[0].id,
            unionId: `local_${user[0].id}`,
            name: user[0].name,
            email: user[0].email,
            avatar: null,
            role: user[0].role as "user" | "admin",
            country: user[0].country,
            language: user[0].language,
            currency: user[0].currency,
            createdAt: user[0].createdAt,
            updatedAt: user[0].updatedAt,
            lastSignInAt: user[0].lastSignInAt ?? user[0].createdAt,
          };
        }
      }
    }
  } catch {
    // Local auth not available
  }

  return ctx;
}
