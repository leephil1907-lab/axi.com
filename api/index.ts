import { Hono } from "hono";
import { handle } from "hono/vercel";
import { bodyLimit } from "hono/body-limit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { createOAuthCallbackHandler } from "./kimi/auth";

const app = new Hono().basePath("/api");

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// OAuth callback
app.get("/oauth/callback", createOAuthCallbackHandler());

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

// Export for Vercel serverless
export default handle(app);
