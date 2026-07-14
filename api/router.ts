import { localAuthRouter } from "./local-auth-router";
import { marketRouter } from "./market-router";
import { tradingRouter } from "./trading-router";
import { adminRouter } from "./admin-router";
import { socialRouter } from "./social-router";
import { newsRouter } from "./news-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: localAuthRouter,
  localAuth: localAuthRouter,
  market: marketRouter,
  trading: tradingRouter,
  admin: adminRouter,
  social: socialRouter,
  news: newsRouter,
});

export type AppRouter = typeof appRouter;
