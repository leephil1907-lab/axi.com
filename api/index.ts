import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./_lib/router";
import { createContext } from "./_lib/context";

export const app = new Hono().basePath("/api");

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "x-local-auth-token", "X-Requested-With"],
  credentials: true,
}));

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// tRPC handler
app.use("/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});

// Health check
app.get("/health", (c) => c.json({ status: "ok", time: Date.now() }));

// 404 for unmatched API routes
app.all("/*", (c) => c.json({ error: "Not Found" }, 404));

// Export for both Vercel serverless AND Node.js
export default app;
