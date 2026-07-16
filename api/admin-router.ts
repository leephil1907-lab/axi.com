import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, tradingAccounts, positions, orders, tradeHistory, transactions, instruments } from "@db/schema";
import { eq, desc, count, sql, getTableColumns } from "drizzle-orm";

export const adminRouter = createRouter({
  analytics: adminQuery.query(async () => {
    const db = getDb();
    const [userCount] = await db.select({ count: count() }).from(users);
    const [accountCount] = await db.select({ count: count() }).from(tradingAccounts);
    const [positionCount] = await db.select({ count: count() }).from(positions).where(eq(positions.status, "open"));
    const [orderCount] = await db.select({ count: count() }).from(orders).where(eq(orders.status, "pending"));
    const volumeResult = await db.select({ total: sql<string>`COALESCE(SUM(${tradeHistory.volume}), 0)` }).from(tradeHistory);
    const pnlResult = await db.select({
      totalNetPnl: sql<string>`COALESCE(SUM(${tradeHistory.netPnl}), 0)`,
      totalGrossPnl: sql<string>`COALESCE(SUM(${tradeHistory.grossPnl}), 0)`,
      totalCommission: sql<string>`COALESCE(SUM(${tradeHistory.commission}), 0)`,
    }).from(tradeHistory);
    const recentUsers = await db.select().from(users).orderBy(desc(users.createdAt)).limit(10);
    return { counts: { users: userCount.count, accounts: accountCount.count, openPositions: positionCount.count, pendingOrders: orderCount.count }, volume: volumeResult[0]?.total || "0", pnl: { net: pnlResult[0]?.totalNetPnl || "0", gross: pnlResult[0]?.totalGrossPnl || "0", commission: pnlResult[0]?.totalCommission || "0" }, recentUsers };
  }),

  users: adminQuery
    .input(z.object({ page: z.number().default(1), limit: z.number().default(20), search: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const page = input?.page || 1;
      const limit = input?.limit || 20;
      const offset = (page - 1) * limit;
      const userList = await db.select().from(users).orderBy(desc(users.createdAt)).limit(limit).offset(offset);
      const [totalResult] = await db.select({ count: count() }).from(users);
      return { users: userList, total: totalResult.count, page, limit };
    }),

  updateUserRole: adminQuery
    .input(z.object({ userId: z.number(), role: z.enum(["user", "admin"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
      return { success: true };
    }),

  allPositions: adminQuery
    .input(z.object({ status: z.enum(["open", "closed", "liquidated"]).optional(), page: z.number().default(1), limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const where = input?.status ? eq(positions.status, input.status) : undefined;
      const posList = await db.select({ ...getTableColumns(positions), symbol: instruments.symbol })
        .from(positions)
        .leftJoin(instruments, eq(positions.instrumentId, instruments.id))
        .where(where)
        .orderBy(desc(positions.openedAt))
        .limit(input?.limit || 50)
        .offset(((input?.page || 1) - 1) * (input?.limit || 50));
      const [totalResult] = await db.select({ count: count() }).from(positions).where(where);
      return { positions: posList, total: totalResult.count, page: input?.page || 1, limit: input?.limit || 50 };
    }),

  allTrades: adminQuery
    .input(z.object({ page: z.number().default(1), limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const trades = await db.select({ ...getTableColumns(tradeHistory), symbol: instruments.symbol })
        .from(tradeHistory)
        .leftJoin(instruments, eq(tradeHistory.instrumentId, instruments.id))
        .orderBy(desc(tradeHistory.closedAt))
        .limit(input?.limit || 50)
        .offset(((input?.page || 1) - 1) * (input?.limit || 50));
      const [totalResult] = await db.select({ count: count() }).from(tradeHistory);
      return { trades, total: totalResult.count, page: input?.page || 1, limit: input?.limit || 50 };
    }),

  stats: adminQuery.query(async () => {
    const db = getDb();
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [activeAccounts] = await db.select({ count: count() }).from(tradingAccounts).where(eq(tradingAccounts.isActive, true));
    const [openPositions] = await db.select({ count: count() }).from(positions).where(eq(positions.status, "open"));
    const totalDepositsResult = await db.select({ total: sql<string>`COALESCE(SUM(${transactions.amount}), 0)` }).from(transactions).where(sql`${transactions.type} = 'deposit' AND ${transactions.status} = 'completed'`);
    const [pendingWithdrawals] = await db.select({ count: count() }).from(transactions).where(sql`${transactions.type} = 'withdrawal' AND ${transactions.status} = 'pending'`);
    return {
      totalUsers: totalUsers.count,
      activeAccounts: activeAccounts.count,
      openPositions: openPositions.count,
      totalDeposits: totalDepositsResult[0]?.total || "0",
      pendingWithdrawals: pendingWithdrawals.count,
    };
  }),

  deposits: adminQuery
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(transactions).where(eq(transactions.type, "deposit")).orderBy(desc(transactions.createdAt)).limit(input?.limit || 50);
    }),

  withdrawals: adminQuery
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(transactions).where(eq(transactions.type, "withdrawal")).orderBy(desc(transactions.createdAt)).limit(input?.limit || 50);
    }),
});