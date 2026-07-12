import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { positions, orders, tradingAccounts, tradeHistory, instruments } from "@db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// Price cache shared with market router
const priceCache: Record<number, { bid: number; ask: number; ts: number }> = {};

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

async function getCurrentPrice(instrumentId: number, direction: string) {
  const db = getDb();
  const inst = await db.select().from(instruments).where(eq(instruments.id, instrumentId));
  if (!inst[0]) return null;

  const cached = priceCache[instrumentId];
  if (cached && Date.now() - cached.ts < 3000) {
    return direction === 'buy' ? cached.ask : cached.bid;
  }

  // Fetch fresh price
  let basePrice = 1.0;
  try {
    if (inst[0].category === "forex") {
      const resp = await fetch(`https://api.exchangerate-api.com/v4/latest/${inst[0].baseAsset}`, { cache: "no-store" });
      if (resp.ok) {
        const data = await resp.json();
        basePrice = data.rates?.[inst[0].quoteAsset] || basePrice;
      }
    } else if (inst[0].category === "crypto") {
      const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${inst[0].baseAsset.toLowerCase()}&vs_currencies=${inst[0].quoteAsset.toLowerCase()}`, { cache: "no-store" });
      if (resp.ok) {
        const data = await resp.json();
        basePrice = data[inst[0].baseAsset.toLowerCase()]?.[inst[0].quoteAsset.toLowerCase()] || basePrice;
      }
    } else {
      const fallbackPrices: Record<string, number> = {
        XAUUSD: 2650.0, XAGUSD: 31.5,
        US30: 42500, US500: 5850, USTEC: 20500, GER40: 18500, UK100: 8250,
        OILUSD: 72.5, BRENTUSD: 76.2, NGASUSD: 3.25,
      };
      basePrice = fallbackPrices[inst[0].symbol] || basePrice;
    }
  } catch {
    basePrice = cached?.bid || 1.0;
  }

  const spread = inst[0].category === "forex" ? 0.0002 : inst[0].category === "crypto" ? basePrice * 0.001 : basePrice * 0.0005;
  const noise = (Math.random() - 0.5) * spread * 0.5;
  const bid = basePrice + noise;
  const ask = bid + spread;

  priceCache[instrumentId] = { bid, ask, ts: Date.now() };
  return direction === 'buy' ? ask : bid;
}

function calculatePipValue(symbol: string, price: number, volume: number): number {
  // Simplified pip value calculation
  const lotSize = 100000;
  const pipSize = symbol.includes('JPY') ? 0.01 : 0.0001;
  return (volume * lotSize * pipSize) / price;
}

function calculateMarginRequired(volume: number, price: number, leverage: number): number {
  const lotSize = 100000;
  return (volume * lotSize * price) / leverage;
}

async function updateAccountEquity(userId: number) {
  const db = getDb();
  const account = await getOrCreateAccount(userId);
  const openPositions = await db.select()
    .from(positions)
    .where(and(eq(positions.userId, userId), eq(positions.status, "open")));

  let totalUnrealizedPnl = 0;
  let totalMarginUsed = 0;

  for (const pos of openPositions) {
    const currentPrice = await getCurrentPrice(pos.instrumentId, pos.direction === 'buy' ? 'sell' : 'buy');
    if (!currentPrice) continue;

    const openPrice = parseFloat(pos.openPrice.toString());
    const volume = parseFloat(pos.volume.toString());
    const leverage = account.leverage;

    // Calculate unrealized P&L
    let pnl = 0;
    if (pos.direction === 'buy') {
      pnl = (currentPrice - openPrice) * volume * 100000;
    } else {
      pnl = (openPrice - currentPrice) * volume * 100000;
    }

    // Adjust for JPY pairs
    const inst = await db.select().from(instruments).where(eq(instruments.id, pos.instrumentId));
    if (inst[0] && inst[0].symbol.includes('JPY')) {
      pnl = pnl / 100;
    }

    totalUnrealizedPnl += pnl;
    totalMarginUsed += calculateMarginRequired(volume, currentPrice, leverage);

    // Update position current price
    await db.update(positions)
      .set({ currentPrice: currentPrice.toString(), realizedPnl: pnl.toFixed(8) })
      .where(eq(positions.id, pos.id));
  }

  const balance = parseFloat(account.balance.toString());
  const equity = balance + totalUnrealizedPnl;
  const marginAvailable = equity - totalMarginUsed;

  await db.update(tradingAccounts)
    .set({ 
      equity: equity.toFixed(8), 
      marginUsed: totalMarginUsed.toFixed(8),
      marginAvailable: marginAvailable.toFixed(8)
    })
    .where(eq(tradingAccounts.id, account.id));

  return { equity, marginUsed: totalMarginUsed, marginAvailable, unrealizedPnl: totalUnrealizedPnl };
}

export const tradingRouter = createRouter({
  account: authedQuery.query(async ({ ctx }) => {
    // Update equity before returning
    await updateAccountEquity(ctx.user!.id);
    return getOrCreateAccount(ctx.user!.id);
  }),

  openPosition: authedQuery
    .input(z.object({ 
      symbol: z.string(), 
      direction: z.enum(["buy", "sell"]), 
      volume: z.string().or(z.number()), 
      stopLoss: z.string().or(z.number()).optional(), 
      takeProfit: z.string().or(z.number()).optional() 
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const account = await getOrCreateAccount(ctx.user!.id);
      const inst = await db.select().from(instruments).where(eq(instruments.symbol, input.symbol));
      if (!inst[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Instrument not found" });

      const volume = Number(input.volume);
      if (volume < parseFloat(inst[0].minLot.toString())) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `Minimum lot size is ${inst[0].minLot}` });
      }
      if (volume > parseFloat(inst[0].maxLot.toString())) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `Maximum lot size is ${inst[0].maxLot}` });
      }

      const currentPrice = await getCurrentPrice(inst[0].id, input.direction);
      if (!currentPrice) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Could not fetch price" });

      const leverage = account.leverage;
      const marginRequired = calculateMarginRequired(volume, currentPrice, leverage);
      const marginAvailable = parseFloat(account.marginAvailable.toString());

      if (marginRequired > marginAvailable) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Insufficient margin available" });
      }

      const commission = volume * 3.5;
      const balance = parseFloat(account.balance.toString());

      if (commission > balance) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Insufficient balance for commission" });
      }

      await db.insert(positions).values({
        userId: ctx.user!.id, accountId: account.id, instrumentId: inst[0].id,
        direction: input.direction, volume: volume.toString(), 
        openPrice: currentPrice.toFixed(8), currentPrice: currentPrice.toFixed(8),
        stopLoss: input.stopLoss?.toString() || null, 
        takeProfit: input.takeProfit?.toString() || null,
        commission: commission.toFixed(8), swap: "0", realizedPnl: "0", status: "open",
      });

      // Update account balance (deduct commission)
      await db.update(tradingAccounts)
        .set({ balance: (balance - commission).toFixed(8) })
        .where(eq(tradingAccounts.id, account.id));

      return { success: true, price: currentPrice, marginUsed: marginRequired };
    }),

  positions: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    // Update equity first
    await updateAccountEquity(ctx.user!.id);

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
      const pos = await db.select()
        .from(positions)
        .where(and(eq(positions.id, input.positionId), eq(positions.userId, ctx.user!.id)));

      if (!pos[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Position not found" });

      const currentPrice = await getCurrentPrice(pos[0].instrumentId, pos[0].direction === 'buy' ? 'sell' : 'buy');
      if (!currentPrice) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Could not fetch price" });

      const openPrice = parseFloat(pos[0].openPrice.toString());
      const volume = parseFloat(pos[0].volume.toString());
      const commission = parseFloat(pos[0].commission.toString());
      const swap = parseFloat(pos[0].swap.toString());

      // Calculate gross P&L
      let grossPnl = 0;
      if (pos[0].direction === 'buy') {
        grossPnl = (currentPrice - openPrice) * volume * 100000;
      } else {
        grossPnl = (openPrice - currentPrice) * volume * 100000;
      }

      const inst = await db.select().from(instruments).where(eq(instruments.id, pos[0].instrumentId));
      if (inst[0] && inst[0].symbol.includes('JPY')) {
        grossPnl = grossPnl / 100;
      }

      const netPnl = grossPnl - commission - swap;
      const duration = Math.floor((Date.now() - new Date(pos[0].openedAt).getTime()) / 1000);

      await db.insert(tradeHistory).values({
        userId: pos[0].userId, accountId: pos[0].accountId, instrumentId: pos[0].instrumentId,
        positionId: pos[0].id, direction: pos[0].direction, volume: pos[0].volume,
        openPrice: pos[0].openPrice, closePrice: currentPrice.toFixed(8), 
        grossPnl: grossPnl.toFixed(8),
        commission: pos[0].commission, swap: pos[0].swap, netPnl: netPnl.toFixed(8),
        duration,
      });

      await db.update(positions).set({ status: "closed", closedAt: new Date() }).where(eq(positions.id, pos[0].id));

      // Update account balance with net P&L
      const account = await getOrCreateAccount(ctx.user!.id);
      const newBalance = parseFloat(account.balance.toString()) + netPnl;
      await db.update(tradingAccounts)
        .set({ balance: newBalance.toFixed(8) })
        .where(eq(tradingAccounts.id, account.id));

      return { success: true, netPnl, grossPnl, commission, swap };
    }),

  createOrder: authedQuery
    .input(z.object({ 
      symbol: z.string(), 
      orderType: z.enum(["market", "limit", "stop", "stop_limit"]), 
      direction: z.enum(["buy", "sell"]), 
      volume: z.string().or(z.number()), 
      entryPrice: z.string().or(z.number()).optional(), 
      stopLoss: z.string().or(z.number()).optional(), 
      takeProfit: z.string().or(z.number()).optional() 
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const account = await getOrCreateAccount(ctx.user!.id);
      const inst = await db.select().from(instruments).where(eq(instruments.symbol, input.symbol));
      if (!inst[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Instrument not found" });

      const volume = Number(input.volume);

      await db.insert(orders).values({
        userId: ctx.user!.id, accountId: account.id, instrumentId: inst[0].id,
        orderType: input.orderType, direction: input.direction, volume: volume.toString(),
        entryPrice: input.entryPrice?.toString() || null, 
        stopLoss: input.stopLoss?.toString() || null,
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
      grossPnl: tradeHistory.grossPnl, commission: tradeHistory.commission, 
      netPnl: tradeHistory.netPnl, duration: tradeHistory.duration,
      closedAt: tradeHistory.closedAt, symbol: instruments.symbol, name: instruments.name,
    }).from(tradeHistory).innerJoin(instruments, eq(tradeHistory.instrumentId, instruments.id))
      .where(eq(tradeHistory.userId, ctx.user!.id)).orderBy(desc(tradeHistory.closedAt)).limit(100);
  }),

  // ── New: Account Stats ───────────────────────────────
  stats: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const account = await getOrCreateAccount(ctx.user!.id);

    const totalTrades = await db.select({ count: sql<number>`count(*)` })
      .from(tradeHistory)
      .where(eq(tradeHistory.userId, ctx.user!.id));

    const winningTrades = await db.select({ count: sql<number>`count(*)` })
      .from(tradeHistory)
      .where(and(eq(tradeHistory.userId, ctx.user!.id), sql`${tradeHistory.netPnl} > 0`));

    const totalPnl = await db.select({ sum: sql<number>`sum(${tradeHistory.netPnl})` })
      .from(tradeHistory)
      .where(eq(tradeHistory.userId, ctx.user!.id));

    const openPositions = await db.select({ count: sql<number>`count(*)` })
      .from(positions)
      .where(and(eq(positions.userId, ctx.user!.id), eq(positions.status, "open")));

    return {
      totalTrades: totalTrades[0]?.count || 0,
      winningTrades: winningTrades[0]?.count || 0,
      winRate: totalTrades[0]?.count > 0 ? ((winningTrades[0]?.count || 0) / totalTrades[0].count * 100).toFixed(1) : '0',
      totalPnl: totalPnl[0]?.sum || 0,
      openPositions: openPositions[0]?.count || 0,
      balance: account.balance,
      equity: account.equity,
      marginUsed: account.marginUsed,
      marginAvailable: account.marginAvailable,
      leverage: account.leverage,
    };
  }),

  // ── New: Update Position (SL/TP) ───────────────────
  updatePosition: authedQuery
    .input(z.object({ 
      positionId: z.number(),
      stopLoss: z.string().or(z.number()).optional(),
      takeProfit: z.string().or(z.number()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const pos = await db.select()
        .from(positions)
        .where(and(eq(positions.id, input.positionId), eq(positions.userId, ctx.user!.id)));

      if (!pos[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Position not found" });

      const updates: any = {};
      if (input.stopLoss !== undefined) updates.stopLoss = input.stopLoss.toString();
      if (input.takeProfit !== undefined) updates.takeProfit = input.takeProfit.toString();

      await db.update(positions).set(updates).where(eq(positions.id, input.positionId));
      return { success: true };
    }),
});
