import "server-only";
import { siteConfig } from "@/data/site";

/**
 * Telegram alerts. Needs TELEGRAM_BOT_TOKEN (from @BotFather) and
 * TELEGRAM_CHAT_ID (your chat with the bot). Silently does nothing when either
 * is missing, and never throws: an alert must not break a form submission.
 */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function telegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export async function sendTelegram(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("Telegram error:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("Telegram send failed:", err);
    return false;
  }
}

export function adminUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

export interface LeadAlert {
  id?: string;
  name: string;
  email: string;
  storeUrl: string;
  service?: string;
  budget?: string;
  message: string;
}

export function leadAlertHtml(lead: LeadAlert): string {
  const lines = [
    "🛎 <b>New lead</b>",
    `<b>${esc(lead.name)}</b> — ${esc(lead.email)}`,
    `Store: ${esc(lead.storeUrl)}`,
    lead.service ? `Service: ${esc(lead.service)}` : "",
    lead.budget ? `Budget: ${esc(lead.budget)}` : "",
    "",
    esc(lead.message.length > 600 ? `${lead.message.slice(0, 600)}…` : lead.message),
    "",
    lead.id ? `<a href="${adminUrl(`/admin/leads/${lead.id}/`)}">Open in admin</a>` : "",
  ];
  return lines.filter((l, i, a) => l !== "" || (a[i - 1] ?? "") !== "").join("\n");
}
