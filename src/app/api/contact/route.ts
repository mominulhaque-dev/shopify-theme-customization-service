import { NextResponse } from "next/server";
import { canEmailCustomers, idempotencyKey, isEmail, resendClient, sender } from "@/lib/email";

interface ContactPayload {
  name: string;
  email: string;
  storeUrl: string;
  message: string;
}

function isValid(payload: Partial<ContactPayload>): payload is ContactPayload {
  return Boolean(
    payload.name?.trim() && isEmail(payload.email) && payload.storeUrl?.trim() && payload.message?.trim()
  );
}

/**
 * Contact form → Resend.
 *
 * 1. Notification to CONTACT_EMAIL, reply-to set to the visitor, so "Reply"
 *    in Gmail answers them directly. Always sent.
 * 2. Auto-reply to the visitor confirming we received it. Only once a domain
 *    is verified (RESEND_FROM set); the test sender cannot reach customers.
 *    A failed auto-reply never fails the request — the notification is what
 *    matters.
 *
 * Both sends carry an idempotency key derived from the submission, so a
 * double-click or network retry does not produce duplicate emails.
 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Name, email, store URL and message are all required." },
      { status: 400 }
    );
  }

  const resend = resendClient();
  const contactEmail = process.env.CONTACT_EMAIL || "hihopifythemecustomization@gmail.com";

  if (!resend) {
    // Fails loudly rather than pretending to send.
    console.error("RESEND_API_KEY is not set; contact form submission was not sent.");
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please email us directly instead." },
      { status: 503 }
    );
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const storeUrl = body.storeUrl.trim();
  const message = body.message.trim();
  const key = idempotencyKey("contact", email, storeUrl, message);

  try {
    const { error } = await resend.emails.send(
      {
        from: sender(),
        to: contactEmail,
        replyTo: email,
        subject: `New scope request from ${name}`,
        text: [`Name: ${name}`, `Email: ${email}`, `Store URL: ${storeUrl}`, "", message].join("\n"),
      },
      { idempotencyKey: `${key}/notify` }
    );

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }

  if (canEmailCustomers()) {
    try {
      const { error } = await resend.emails.send(
        {
          from: sender(),
          to: email,
          replyTo: contactEmail,
          subject: "We got your request",
          text: [
            `Hi ${name},`,
            "",
            "Thanks for your message about " + storeUrl + ". We have it.",
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

  return NextResponse.json({ ok: true });
}
