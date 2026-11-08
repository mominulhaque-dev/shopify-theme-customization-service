"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { resendClient } from "@/lib/email";

async function syncResend(email: string, unsubscribed: boolean) {
  const resend = resendClient();
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!resend || !audienceId) return;
  try {
    await resend.contacts.update({ audienceId, email, unsubscribed });
  } catch (err) {
    console.error("Resend sync failed:", err);
  }
}

export async function setUnsubscribed(id: string, unsubscribed: boolean) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("subscribers").update({ unsubscribed }).eq("id", id).select("email").maybeSingle();
  const email = (data as { email: string } | null)?.email;
  if (email) await syncResend(email, unsubscribed);
  revalidatePath("/admin/subscribers/");
}

export async function deleteSubscriber(id: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("subscribers").select("email").eq("id", id).maybeSingle();
  await supabase.from("subscribers").delete().eq("id", id);
  const email = (data as { email: string } | null)?.email;
  const resend = resendClient();
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (email && resend && audienceId) {
    try {
      await resend.contacts.remove({ audienceId, email });
    } catch (err) {
      console.error("Resend remove failed:", err);
    }
  }
  revalidatePath("/admin/subscribers/");
  revalidatePath("/admin/");
}
