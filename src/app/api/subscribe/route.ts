import { NextResponse } from "next/server";
import { isEmail, resendClient } from "@/lib/email";

/**
 * Newsletter sign-up → a Resend audience (RESEND_AUDIENCE_ID).
 *
 * Opt-in only: the form has an explicit consent line and nothing is added
 * without the visitor submitting it. Broadcasts are sent from the Resend
 * dashboard, which adds the unsubscribe link; they need a verified domain.
 */
export async function POST(request: Request) {
  let body: { email?: unknown; consent?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Please tick the box to agree to receive emails." }, { status: 400 });
  }

  const resend = resendClient();
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!resend || !audienceId) {
    console.error("RESEND_API_KEY or RESEND_AUDIENCE_ID is not set; sign-up was not saved.");
    return NextResponse.json({ error: "Sign-up is not available yet. Please try again later." }, { status: 503 });
  }

  try {
    const { error } = await resend.contacts.create({
      audienceId,
      email: body.email.trim().toLowerCase(),
      unsubscribed: false,
    });
    // An existing contact is not an error from the visitor's point of view.
    if (error && !/exist/i.test(error.message)) {
      console.error("Resend contact error:", error);
      return NextResponse.json({ error: "Could not sign you up. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe failed:", err);
    return NextResponse.json({ error: "Could not sign you up. Please try again." }, { status: 500 });
  }
}
