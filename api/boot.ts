import { app } from "./index";
import { serve } from "@hono/node-server";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Axi Trading Platform running on port ${port}`);
