import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { idempotencyKey, resendClient, sender } from "@/lib/email";
import { adminUrl, sendTelegram } from "@/lib/notify";
import { OVERDUE_HOURS } from "@/lib/admin/format";

/**
 * Daily follow-up reminder (Vercel Cron, see vercel.json).
 * Finds leads still "new" after OVERDUE_HOURS that have not been reminded yet,
 * sends one email + Telegram digest, then stamps reminded_at so each lead is
 * nagged about once. Protected by CRON_SECRET (Vercel sends it as a Bearer token).
 */
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const db = createServiceClient();
  if (!db) return NextResponse.json({ ok: false, error: "database not configured" }, { status: 503 });

  const cutoff = new Date(Date.now() - OVERDUE_HOURS * 3600_000).toISOString();
  const { data: leads, error } = await db
    .from("leads")
    .select("id, name, email, service, created_at")
    .eq("status", "new")
    .is("reminded_at", null)
    .lt("created_at", cutoff)
    .order("created_at", { ascending: true })
    .limit(50);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!leads || leads.length === 0) return NextResponse.json({ ok: true, reminded: 0 });

  const lines = leads.map(
    (l) => `• ${l.name} (${l.email})${l.service ? ` — ${l.service}` : ""}`,
  );

  await sendTelegram(
    [
      `⏰ <b>${leads.length} lead${leads.length > 1 ? "s" : ""} waiting over ${OVERDUE_HOURS}h</b>`,
      ...leads.map(
        (l) =>
          `• <a href="${adminUrl(`/admin/leads/${l.id}/`)}">${esc(l.name)}</a> — ${esc(l.email)}`,
      ),
    ].join("\n"),
  );

  const resend = resendClient();
  const to = process.env.CONTACT_EMAIL;
  if (resend && to) {
    const html = `<p>These leads are still marked <b>New</b> after ${OVERDUE_HOURS} hours:</p><ul>${leads
      .map(
        (l) =>
          `<li><a href="${adminUrl(`/admin/leads/${l.id}/`)}">${esc(l.name)}</a> — ${esc(l.email)}${
            l.service ? ` (${esc(l.service)})` : ""
          }</li>`,
      )
      .join("")}</ul><p><a href="${adminUrl("/admin/leads/?status=new")}">Open the leads inbox</a></p>`;
    const { error: mailError } = await resend.emails.send(
      {
        from: sender(),
        to,
        subject: `Follow up: ${leads.length} lead${leads.length > 1 ? "s" : ""} waiting`,
        html,
        text: `Leads still new after ${OVERDUE_HOURS}h:\n${lines.join("\n")}\n\n${adminUrl("/admin/leads/?status=new")}`,
      },
      { idempotencyKey: idempotencyKey("follow-up", ...leads.map((l) => l.id)) },
    );
    if (mailError) console.error("Follow-up email failed:", mailError);
  }

  await db
    .from("leads")
    .update({ reminded_at: new Date().toISOString() })
    .in(
      "id",
      leads.map((l) => l.id),
    );

  return NextResponse.json({ ok: true, reminded: leads.length });
}
