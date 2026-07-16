import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function optional(name: string): string {
  return process.env[name] ?? "";
}

export const env = {
  // Required
  databaseUrl: required("DATABASE_URL"),

  // Optional - for local auth only (no Kimi OAuth)
  appId: optional("APP_ID"),
  appSecret: optional("APP_SECRET"),

  // Admin settings
  adminEmail: optional("ADMIN_EMAIL") || "Kaspertrading9@gmail.com",
  ownerUnionId: optional("OWNER_UNION_ID"),

  // Notifications
  telegramBotToken: optional("TELEGRAM_BOT_TOKEN"),
  telegramChatId: optional("TELEGRAM_CHAT_ID"),
  whatsappNumber: optional("WHATSAPP_NUMBER"),

  // Runtime
  isProduction: process.env.NODE_ENV === "production",
};
