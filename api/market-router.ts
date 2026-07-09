import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { instruments } from "@db/schema";
import { eq } from "drizzle-orm";

const priceCache: Record<number, { bid: number; ask: number; high24h: number; low24h: number; change24h: number; volume24h: number; ts: number }> = {};

async function fetchLivePrice(inst: typeof instruments.$inferSelect) {
  const now = Date.now();
  const cached = priceCache[inst.id];
  if (cached && now - cached.ts < 3000) return cached;

  let basePrice = 1.0;
  try {
    if (inst.category === "forex") {
      const resp = await fetch(`https://api.exchangerate-api.com/v4/latest/${inst.baseAsset}`, { cache: "no-store" });
      if (resp.ok) {
        const data = await resp.json();
        basePrice = data.rates?.[inst.quoteAsset] || basePrice;
      }
    } else if (inst.category === "crypto") {
      const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${inst.baseAsset.toLowerCase()}&vs_currencies=${inst.quoteAsset.toLowerCase()}`, { cache: "no-store" });
      if (resp.ok) {
        const data = await resp.json();
        basePrice = data[inst.baseAsset.toLowerCase()]?.[inst.quoteAsset.toLowerCase()] || basePrice;
      }
    } else {
      const fallbackPrices: Record<string, number> = {
        XAUUSD: 2650.0, XAGUSD: 31.5,
        US30: 42500, US500: 5850, USTEC: 20500, GER40: 18500, UK100: 8250,
        OILUSD: 72.5, BRENTUSD: 76.2, NGASUSD: 3.25,
      };
      basePrice = fallbackPrices[inst.symbol] || basePrice;
    }
  } catch {
    basePrice = cached?.bid || 1.0;
  }

  const spread = inst.category === "forex" ? 0.0002 : inst.category === "crypto" ? basePrice * 0.001 : basePrice * 0.0005;
  const noise = (Math.random() - 0.5) * spread * 0.5;
  const bid = basePrice + noise;
  const ask = bid + spread;
  const change24h = cached ? cached.change24h + (Math.random() - 0.48) * spread * 0.3 : (Math.random() - 0.5) * basePrice * 0.02;
  const high24h = Math.max(bid, cached?.high24h || bid * 1.01);
  const low24h = Math.min(bid, cached?.low24h || bid * 0.99);
  const volume24h = (cached?.volume24h || 1000000) + Math.random() * 50000;

  priceCache[inst.id] = { bid, ask, high24h, low24h, change24h, volume24h, ts: now };
  return priceCache[inst.id];
}

export const marketRouter = createRouter({
  instruments: publicQuery
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const where = input?.category ? eq(instruments.category, input.category as any) : undefined;
      return db.select().from(instruments).where(where);
    }),

  livePrices: publicQuery
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const where = input?.category ? eq(instruments.category, input.category as any) : undefined;
      const insts = await db.select().from(instruments).where(where);
      const prices = await Promise.all(insts.map(async (inst) => {
        const live = await fetchLivePrice(inst);
        return {
          instrument: inst,
          bid: live.bid.toFixed(inst.pipSize === "0.01" ? 2 : inst.pipSize === "0.001" ? 3 : 4),
          ask: live.ask.toFixed(inst.pipSize === "0.01" ? 2 : inst.pipSize === "0.001" ? 3 : 4),
          spread: (live.ask - live.bid).toFixed(5),
          change24h: live.change24h.toFixed(2),
          change24hPercent: ((live.change24h / (live.bid - live.change24h)) * 100).toFixed(2),
          high24h: live.high24h.toFixed(inst.pipSize === "0.01" ? 2 : inst.pipSize === "0.001" ? 3 : 4),
          low24h: live.low24h.toFixed(inst.pipSize === "0.01" ? 2 : inst.pipSize === "0.001" ? 3 : 4),
          volume24h: Math.floor(live.volume24h).toString(),
          timestamp: live.ts,
        };
      }));
      return prices;
    }),
});