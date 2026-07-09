import { authRouter } from "./auth-router";
import { localAuthRouter } from "./local-auth-router";
import { marketRouter } from "./market-router";
import { tradingRouter } from "./trading-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  market: marketRouter,
  trading: tradingRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;