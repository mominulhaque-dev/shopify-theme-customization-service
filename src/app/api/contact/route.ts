import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  storeUrl: string;
  message: string;
}

function isValid(payload: Partial<ContactPayload>): payload is ContactPayload {
  return Boolean(
    payload.name?.trim() &&
      payload.email?.trim() &&
      /.+@.+\..+/.test(payload.email) &&
      payload.storeUrl?.trim() &&
      payload.message?.trim()
  );
}

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

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || "hihopifythemecustomization@gmail.com";

  if (!apiKey) {
    // Fails loudly rather than pretending to send — see CLAUDE.md "Email setup".
    console.error("RESEND_API_KEY is not set; contact form submission was not sent.");
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please email us directly instead." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Shopify Theme Customization Services <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: body.email,
      subject: `New scope request from ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Store URL: ${body.storeUrl}`,
        "",
        body.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
