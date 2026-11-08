import { NextResponse } from "next/server";
import { isEmail, resendClient } from "@/lib/email";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Newsletter sign-up. Saved to the `subscribers` table (managed in
 * /admin/subscribers) and, when RESEND_AUDIENCE_ID is set, to that Resend
 * audience as well so broadcasts can go out from Resend.
 *
 * Opt-in only: the form has an explicit consent line and nothing is added
 * without the visitor submitting it.
 */
export async function POST(request: Request) {
  let body: { email?: unknown; consent?: unknown; sourcePage?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isEmail(body.email) || body.email.length > 320) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Please tick the box to agree to receive emails." }, { status: 400 });
  }
  const email = body.email.trim().toLowerCase();
  const sourcePage = typeof body.sourcePage === "string" ? body.sourcePage.slice(0, 200) : null;

  const db = createServiceClient();
  const resend = resendClient();
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!db && !(resend && audienceId)) {
    console.error("Neither SUPABASE_SECRET_KEY nor RESEND_AUDIENCE_ID is set; sign-up was not saved.");
    return NextResponse.json({ error: "Sign-up is not available yet. Please try again later." }, { status: 503 });
  }

  let saved = false;
  if (db) {
    const { error } = await db
      .from("subscribers")
      .upsert({ email, source_page: sourcePage, unsubscribed: false }, { onConflict: "email" });
    if (error) console.error("Subscriber save failed:", error);
    else saved = true;
  }

  if (resend && audienceId) {
    try {
      const { error } = await resend.contacts.create({ audienceId, email, unsubscribed: false });
      // An existing contact is not an error from the visitor's point of view.
      if (error && !/exist/i.test(error.message)) console.error("Resend contact error:", error);
      else saved = true;
    } catch (err) {
      console.error("Resend contact failed:", err);
    }
  }

  if (!saved) return NextResponse.json({ error: "Could not sign you up. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
