import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { marketNews } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";

// ── Market News & Calendar Router ─────────────────────────
export const newsRouter = createRouter({
  // Get latest market news
  latest: publicQuery
    .input(z.object({ 
      category: z.string().optional(),
      limit: z.number().min(1).max(50).default(10),
      offset: z.number().min(0).default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit || 10;
      const offset = input?.offset || 0;

      let where = undefined;
      if (input?.category) {
        where = eq(marketNews.category, input.category);
      }

      return db.select()
        .from(marketNews)
        .where(where)
        .orderBy(desc(marketNews.publishedAt))
        .limit(limit)
        .offset(offset);
    }),

  // Get news by category
  byCategory: publicQuery
    .input(z.object({ 
      category: z.string(),
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select()
        .from(marketNews)
        .where(eq(marketNews.category, input.category))
        .orderBy(desc(marketNews.publishedAt))
        .limit(input.limit);
    }),

  // Search news
  search: publicQuery
    .input(z.object({ 
      query: z.string(),
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select()
        .from(marketNews)
        .where(sql`${marketNews.title} LIKE ${'%' + input.query + '%'} OR ${marketNews.summary} LIKE ${'%' + input.query + '%'}`)
        .orderBy(desc(marketNews.publishedAt))
        .limit(input.limit);
    }),

  // ── Economic Calendar ───────────────────────────────────
  calendar: publicQuery
    .input(z.object({ 
      date: z.string().optional(), // YYYY-MM-DD
      currency: z.string().optional(),
      impact: z.enum(["high", "medium", "low"]).optional(),
    }).optional())
    .query(async ({ input }) => {
      // Mock economic calendar data - in production, integrate with real API
      const today = input?.date || new Date().toISOString().split('T')[0];

      const events = [
        { time: "08:30", currency: "USD", impact: "high" as const, title: "Non-Farm Payrolls", forecast: "185K", previous: "175K", actual: "192K", date: today },
        { time: "10:00", currency: "EUR", impact: "medium" as const, title: "ECB Interest Rate Decision", forecast: "4.50%", previous: "4.50%", actual: null, date: today },
        { time: "14:30", currency: "USD", impact: "high" as const, title: "Fed Chair Powell Speech", forecast: "-", previous: "-", actual: null, date: today },
        { time: "16:00", currency: "GBP", impact: "low" as const, title: "Manufacturing PMI", forecast: "46.2", previous: "45.8", actual: null, date: today },
        { time: "07:00", currency: "EUR", impact: "medium" as const, title: "German GDP QoQ", forecast: "0.1%", previous: "0.0%", actual: "0.2%", date: today },
        { time: "09:00", currency: "JPY", impact: "high" as const, title: "BOJ Policy Rate", forecast: "0.10%", previous: "0.10%", actual: null, date: today },
        { time: "13:30", currency: "CAD", impact: "medium" as const, title: "Employment Change", forecast: "15.0K", previous: "12.5K", actual: null, date: today },
        { time: "15:00", currency: "USD", impact: "low" as const, title: "Factory Orders", forecast: "0.5%", previous: "0.3%", actual: null, date: today },
      ];

      let filtered = events;
      if (input?.currency) filtered = filtered.filter(e => e.currency === input.currency);
      if (input?.impact) filtered = filtered.filter(e => e.impact === input.impact);

      return filtered;
    }),

  // ── Market Analysis ─────────────────────────────────────
  analysis: publicQuery
    .input(z.object({ 
      symbol: z.string(),
      type: z.enum(["technical", "fundamental", "sentiment"]).default("technical"),
    }))
    .query(async ({ input }) => {
      // Mock analysis - in production, integrate with real analysis API
      const analyses: Record<string, any> = {
        EURUSD: {
          technical: {
            trend: "bullish",
            support: [1.0850, 1.0800, 1.0750],
            resistance: [1.0950, 1.1000, 1.1050],
            indicators: [
              { name: "RSI (14)", value: 62.5, signal: "neutral" },
              { name: "MACD", value: 0.0025, signal: "buy" },
              { name: "MA 20", value: 1.0880, signal: "buy" },
              { name: "MA 50", value: 1.0850, signal: "buy" },
            ],
            summary: "EUR/USD is showing bullish momentum with price above both 20 and 50 period moving averages. MACD is positive and RSI is in neutral territory, suggesting room for further upside.",
          },
          fundamental: {
            drivers: [
              "Dovish Fed expectations supporting EUR",
              "ECB maintaining hawkish stance",
              "US economic data showing mixed signals",
            ],
            outlook: "bullish",
            keyEvents: ["Fed Meeting (next week)", "ECB Rate Decision (in 2 weeks)", "US CPI Data"],
          },
          sentiment: {
            retail: 65,
            institutional: 72,
            overall: "bullish",
          },
        },
        GBPUSD: {
          technical: {
            trend: "bearish",
            support: [1.2650, 1.2600, 1.2550],
            resistance: [1.2750, 1.2800, 1.2850],
            indicators: [
              { name: "RSI (14)", value: 38.2, signal: "neutral" },
              { name: "MACD", value: -0.0015, signal: "sell" },
              { name: "MA 20", value: 1.2720, signal: "sell" },
              { name: "MA 50", value: 1.2780, signal: "sell" },
            ],
            summary: "GBP/USD is under pressure with price below key moving averages. MACD is negative and RSI is approaching oversold territory. Watch for potential bounce at 1.2650 support.",
          },
          fundamental: {
            drivers: [
              "BoE dovish pivot weighing on GBP",
              "UK economic growth concerns",
              "USD strength on safe-haven flows",
            ],
            outlook: "bearish",
            keyEvents: ["BoE Meeting", "UK GDP Data", "US NFP Release"],
          },
          sentiment: {
            retail: 42,
            institutional: 35,
            overall: "bearish",
          },
        },
        XAUUSD: {
          technical: {
            trend: "bullish",
            support: [2620, 2600, 2580],
            resistance: [2680, 2700, 2720],
            indicators: [
              { name: "RSI (14)", value: 68.3, signal: "neutral" },
              { name: "MACD", value: 5.2, signal: "buy" },
              { name: "MA 20", value: 2635, signal: "buy" },
              { name: "MA 50", value: 2610, signal: "buy" },
            ],
            summary: "Gold is trading near all-time highs with strong bullish momentum. Price is well above both moving averages and MACD is strongly positive. Watch for potential profit-taking near 2700 resistance.",
          },
          fundamental: {
            drivers: [
              "Inflation concerns driving safe-haven demand",
              "Central bank gold purchases increasing",
              "Geopolitical tensions supporting gold",
            ],
            outlook: "bullish",
            keyEvents: ["US CPI Data", "Fed Minutes", "Geopolitical Developments"],
          },
          sentiment: {
            retail: 78,
            institutional: 82,
            overall: "strongly_bullish",
          },
        },
      };

      return analyses[input.symbol] || {
        technical: {
          trend: "neutral",
          support: [],
          resistance: [],
          indicators: [],
          summary: "No analysis available for this instrument.",
        },
        fundamental: {
          drivers: [],
          outlook: "neutral",
          keyEvents: [],
        },
        sentiment: {
          retail: 50,
          institutional: 50,
          overall: "neutral",
        },
      };
    }),

  // ── Price Alerts ────────────────────────────────────────
  // In a real implementation, this would use WebSockets or push notifications
  priceAlerts: publicQuery
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      return {
        symbol: input.symbol,
        alerts: [],
        message: "Price alerts feature requires WebSocket implementation",
      };
    }),
});
