const BOT_TOKEN = "8809744235:AAFeNBENA6PY69fa8t7yCULymCFYd1EDUPU";
const CHAT_ID = "1776632273";
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function sendTelegramNotification(message: string) {
  try {
    const resp = await fetch(`${API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "HTML" }),
    });
    const data = await resp.json();
    if (!data.ok) console.error("Telegram API error:", data.description);
    return data.ok;
  } catch (err) {
    console.error("Telegram notification failed:", err);
    return false;
  }
}

export async function notifyNewRegistration(name: string, email: string) {
  return sendTelegramNotification(
    `<b>New Registration</b>\n\nName: ${name}\nEmail: ${email}\nTime: ${new Date().toISOString()}`
  );
}

export async function notifyNewDeposit(user: string, amount: string, method: string) {
  return sendTelegramNotification(
    `<b>New Deposit</b>\n\nUser: ${user}\nAmount: ${amount}\nMethod: ${method}\nTime: ${new Date().toISOString()}`
  );
}

export async function notifyNewWithdrawal(user: string, amount: string, method: string) {
  return sendTelegramNotification(
    `<b>New Withdrawal Request</b>\n\nUser: ${user}\nAmount: ${amount}\nMethod: ${method}\nTime: ${new Date().toISOString()}`
  );
}

export async function notifyNewTrade(user: string, symbol: string, direction: string, volume: string) {
  return sendTelegramNotification(
    `<b>New Trade</b>\n\nUser: ${user}\nSymbol: ${symbol}\nDirection: ${direction.toUpperCase()}\nVolume: ${volume}\nTime: ${new Date().toISOString()}`
  );
}