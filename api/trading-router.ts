import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { positions, orders, tradingAccounts, tradeHistory, instruments } from "@db/schema";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

async function getOrCreateAccount(userId: number) {
  const db = getDb();
  const existing = await db.select().from(tradingAccounts).where(eq(tradingAccounts.userId, userId));
  if (existing[0]) return existing[0];
  const accountNumber = `AXI${Date.now().toString(36).toUpperCase()}`;
  await db.insert(tradingAccounts).values({
    userId, accountNumber, accountType: "demo", balance: "100000", equity: "100000",
    marginUsed: "0", marginAvailable: "100000", leverage: 100, currency: "USD", isActive: true,
  });
  return (await db.select().from(tradingAccounts).where(eq(tradingAccounts.accountNumber, accountNumber)))[0];
}

export const tradingRouter = createRouter({
  account: authedQuery.query(async ({ ctx }) => {
    return getOrCreateAccount(ctx.user!.id);
  }),

  openPosition: authedQuery
    .input(z.object({ symbol: z.string(), direction: z.enum(["buy", "sell"]), volume: z.string().or(z.number()), stopLoss: z.string().or(z.number()).optional(), takeProfit: z.string().or(z.number()).optional() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const account = await getOrCreateAccount(ctx.user!.id);
      const inst = await db.select().from(instruments).where(eq(instruments.symbol, input.symbol));
      if (!inst[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Instrument not found" });
      const volume = Number(input.volume);
      await db.insert(positions).values({
        userId: ctx.user!.id, accountId: account.id, instrumentId: inst[0].id,
        direction: input.direction, volume: volume.toString(), openPrice: "1.0", currentPrice: "1.0",
        stopLoss: input.stopLoss?.toString() || null, takeProfit: input.takeProfit?.toString() || null,
        commission: (volume * 3.5).toString(), swap: "0", realizedPnl: "0", status: "open",
      });
      return { success: true };
    }),

  positions: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select({
      id: positions.id, direction: positions.direction, volume: positions.volume,
      openPrice: positions.openPrice, currentPrice: positions.currentPrice,
      stopLoss: positions.stopLoss, takeProfit: positions.takeProfit,
      commission: positions.commission, swap: positions.swap, realizedPnl: positions.realizedPnl,
      status: positions.status, openedAt: positions.openedAt,
      symbol: instruments.symbol, name: instruments.name, category: instruments.category,
    }).from(positions).innerJoin(instruments, eq(positions.instrumentId, instruments.id))
      .where(and(eq(positions.userId, ctx.user!.id), eq(positions.status, "open")))
      .orderBy(desc(positions.openedAt));
  }),

  closePosition: authedQuery
    .input(z.object({ positionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const pos = await db.select().from(positions).where(and(eq(positions.id, input.positionId), eq(positions.userId, ctx.user!.id)));
      if (!pos[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Position not found" });
      await db.insert(tradeHistory).values({
        userId: pos[0].userId, accountId: pos[0].accountId, instrumentId: pos[0].instrumentId,
        positionId: pos[0].id, direction: pos[0].direction, volume: pos[0].volume,
        openPrice: pos[0].openPrice, closePrice: pos[0].currentPrice, grossPnl: "0",
        commission: pos[0].commission, swap: pos[0].swap, netPnl: "0",
      });
      await db.update(positions).set({ status: "closed", closedAt: new Date() }).where(eq(positions.id, pos[0].id));
      return { success: true };
    }),

  createOrder: authedQuery
    .input(z.object({ symbol: z.string(), orderType: z.enum(["market", "limit", "stop", "stop_limit"]), direction: z.enum(["buy", "sell"]), volume: z.string().or(z.number()), entryPrice: z.string().or(z.number()).optional(), stopLoss: z.string().or(z.number()).optional(), takeProfit: z.string().or(z.number()).optional() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const account = await getOrCreateAccount(ctx.user!.id);
      const inst = await db.select().from(instruments).where(eq(instruments.symbol, input.symbol));
      if (!inst[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Instrument not found" });
      await db.insert(orders).values({
        userId: ctx.user!.id, accountId: account.id, instrumentId: inst[0].id,
        orderType: input.orderType, direction: input.direction, volume: input.volume.toString(),
        entryPrice: input.entryPrice?.toString() || null, stopLoss: input.stopLoss?.toString() || null,
        takeProfit: input.takeProfit?.toString() || null, status: "pending",
      });
      return { success: true };
    }),

  orders: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select({
      id: orders.id, orderType: orders.orderType, direction: orders.direction,
      volume: orders.volume, entryPrice: orders.entryPrice, stopLoss: orders.stopLoss,
      takeProfit: orders.takeProfit, status: orders.status, createdAt: orders.createdAt,
      symbol: instruments.symbol, name: instruments.name,
    }).from(orders).innerJoin(instruments, eq(orders.instrumentId, instruments.id))
      .where(and(eq(orders.userId, ctx.user!.id), eq(orders.status, "pending")))
      .orderBy(desc(orders.createdAt));
  }),

  cancelOrder: authedQuery
    .input(z.object({ orderId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.update(orders).set({ status: "cancelled" }).where(and(eq(orders.id, input.orderId), eq(orders.userId, ctx.user!.id)));
      return { success: true };
    }),

  tradeHistory: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select({
      id: tradeHistory.id, direction: tradeHistory.direction, volume: tradeHistory.volume,
      openPrice: tradeHistory.openPrice, closePrice: tradeHistory.closePrice,
      grossPnl: tradeHistory.grossPnl, commission: tradeHistory.commission, netPnl: tradeHistory.netPnl,
      closedAt: tradeHistory.closedAt, symbol: instruments.symbol, name: instruments.name,
    }).from(tradeHistory).innerJoin(instruments, eq(tradeHistory.instrumentId, instruments.id))
      .where(eq(tradeHistory.userId, ctx.user!.id)).orderBy(desc(tradeHistory.closedAt)).limit(100);
  }),
});