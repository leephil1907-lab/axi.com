# AXI Trading Platform - Vercel Deployment Checklist

## ✅ Pre-Deployment Requirements

### Environment Variables (Required)
```
DATABASE_URL=mysql://username:password@host:port/database
LOCAL_AUTH_SECRET=your-super-secret-jwt-key-here
VITE_KIMI_AUTH_URL=https://your-auth-url
VITE_APP_ID=your-app-id
APP_SECRET=your-app-secret
```

### Environment Variables (Optional)
```
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

## 🗄️ Database Setup

1. Create MySQL database (PlanetScale recommended for Vercel)
2. Run migrations:
   ```bash
   npx drizzle-kit migrate
   ```
3. Seed instruments:
   ```bash
   npx tsx db/seed.ts
   ```

## 🚀 Deployment Steps

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import `leephil1907-lab/axi-trading-platform`
4. Set framework preset to "Other"
5. Add all environment variables
6. Deploy

## 📁 Project Structure

```
axi-trading-platform/
├── api/                    # Backend (tRPC + Hono)
│   ├── index.ts           # API entry point
│   ├── router.ts          # Main router
│   ├── middleware.ts      # Auth middleware
│   ├── context.ts         # tRPC context
│   ├── auth-router.ts     # OAuth auth
│   ├── local-auth-router.ts # Email/password auth
│   ├── market-router.ts   # Market data
│   ├── trading-router.ts  # Trading operations
│   ├── admin-router.ts    # Admin endpoints
│   ├── social-router.ts   # Social trading (NEW)
│   └── news-router.ts     # News & calendar (NEW)
├── db/
│   ├── schema.ts          # Database schema
│   ├── relations.ts       # Table relations
│   └── seed.ts            # Seed data
├── src/
│   ├── App.tsx            # Routes
│   ├── pages/             # All pages
│   ├── sections/          # Landing sections
│   └── hooks/             # Custom hooks
├── vercel.json            # Vercel config
├── package.json
└── vite.config.ts
```

## 🔧 Build Commands

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Vercel Build**: `npm run build:vercel`

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Login page |
| `/signup` | Registration |
| `/trading` | Trading dashboard |
| `/admin` | Admin dashboard |
| `/funds` | Deposit/Withdraw |
| `/api/trpc/*` | tRPC API |

## ⚠️ Known Limitations

- Real-time prices use free APIs (may have rate limits)
- WebSocket not implemented (uses polling)
- Copy trading is UI-only (no auto-execution)
