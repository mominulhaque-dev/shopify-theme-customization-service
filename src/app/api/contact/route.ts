import { NextResponse } from "next/server";
import { canEmailCustomers, idempotencyKey, isEmail, resendClient, sender } from "@/lib/email";
import { createServiceClient } from "@/lib/supabase/server";
import { adminUrl, leadAlertHtml, sendTelegram } from "@/lib/notify";

interface ContactPayload {
  name: string;
  email: string;
  storeUrl: string;
  message: string;
  service?: string;
  budget?: string;
  website?: string;
  elapsedMs?: number;
  sourcePage?: string;
  referrer?: string;
}

const MIN_FILL_MS = 3000;
const MAX_PER_EMAIL_PER_10_MIN = 3;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Contact form → database + email + Telegram.
 *
 * Order matters: the lead is saved first, so a failing email or Telegram call
 * can never lose it. Spam is dropped quietly (bots get a normal "ok"): a
 * filled honeypot, or a form submitted faster than a person could type.
 * Real people get a 429 if they resend more than three times in ten minutes.
 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Spam: pretend success so bots learn nothing.
  if (str(body.website, 200) || (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: str(body.name, 200),
    email: str(body.email, 320),
    storeUrl: str(body.storeUrl, 500),
    message: str(body.message, 10000),
    service: str(body.service, 100),
    budget: str(body.budget, 50),
    sourcePage: str(body.sourcePage, 300),
    referrer: str(body.referrer, 500),
  };
  if (!lead.name || !isEmail(lead.email) || !lead.storeUrl || !lead.message) {
    return NextResponse.json({ error: "Name, email, store URL and message are all required." }, { status: 400 });
  }

  const db = createServiceClient();
  const resend = resendClient();
  if (!db && !resend) {
    console.error("Neither Supabase nor Resend is configured; contact form submission was not saved.");
    return NextResponse.json(
      { error: "The form is not available right now. Please email us directly instead." },
      { status: 503 }
    );
  }

  // 1. Save.
  let leadId: string | undefined;
  if (db) {
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await db
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("email", lead.email)
      .gte("created_at", since);
    if ((count ?? 0) >= MAX_PER_EMAIL_PER_10_MIN) {
      return NextResponse.json(
        { error: "We already have your message. We will reply within two business days." },
        { status: 429 }
      );
    }

    const { data, error } = await db
      .from("leads")
      .insert({
        name: lead.name,
        email: lead.email,
        store_url: lead.storeUrl,
        message: lead.message,
        service: lead.service || null,
        budget: lead.budget || null,
        source_page: lead.sourcePage || null,
        referrer: lead.referrer || null,
      })
      .select("id")
      .single();
    if (error) console.error("Lead insert failed:", error);
    else leadId = (data as { id: string }).id;
  }

  // 2. Alerts (never fail the request).
  await sendTelegram(leadAlertHtml({ ...lead, id: leadId }));

  let emailed = false;
  if (resend) {
    const contactEmail = process.env.CONTACT_EMAIL || "hihopifythemecustomization@gmail.com";
    const key = idempotencyKey("contact", lead.email, lead.storeUrl, lead.message);
    try {
      const { error } = await resend.emails.send(
        {
          from: sender(),
          to: contactEmail,
          replyTo: lead.email,
          subject: `New scope request from ${lead.name}`,
          text: [
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Store URL: ${lead.storeUrl}`,
            ...(lead.service ? [`Service: ${lead.service}`] : []),
            ...(lead.budget ? [`Budget: ${lead.budget}`] : []),
            ...(lead.sourcePage ? [`Sent from: ${lead.sourcePage}`] : []),
            "",
            lead.message,
            ...(leadId ? ["", `Open in admin: ${adminUrl(`/admin/leads/${leadId}/`)}`] : []),
          ].join("\n"),
        },
        { idempotencyKey: `${key}/notify` }
      );
      if (error) console.error("Resend error:", error);
      else emailed = true;
    } catch (err) {
      console.error("Contact form email failed:", err);
    }

    if (emailed && canEmailCustomers()) {
      try {
        const { error } = await resend.emails.send(
          {
            from: sender(),
            to: lead.email,
            replyTo: contactEmail,
            subject: "We got your request",
            text: [
              `Hi ${lead.name},`,
              "",
              `Thanks for your message about ${lead.storeUrl}. We have it.`,
              "",
              "Within two business days you will get a written quote with a fixed price, a delivery date and exactly what is included. If anything is unclear, we will ask before quoting.",
              "",
              "If you want to add screenshots or more detail, just reply to this email.",
              "",
              "Shopify Theme Customization Services",
              "https://www.shopifythemecustomizationservices.com",
            ].join("\n"),
          },
          { idempotencyKey: `${key}/autoreply` }
        );
        if (error) console.error("Auto-reply not sent:", error);
      } catch (err) {
        console.error("Auto-reply failed:", err);
      }
    }
  }

  if (!leadId && !emailed) {
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
