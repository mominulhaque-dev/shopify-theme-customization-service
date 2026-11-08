"use server";

import { revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { DEFAULT_SETTINGS } from "@/lib/settings";

export type SaveState = { ok?: boolean; error?: string };

const clean = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").trim().slice(0, max);

export async function saveSettings(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const { supabase } = await requireAdmin();

  const email = clean(formData.get("email"), 320);
  const phoneDisplay = clean(formData.get("phoneDisplay"), 40);
  const phoneE164 = clean(formData.get("phoneE164"), 20);
  const whatsappUrl = clean(formData.get("whatsappUrl"), 200);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (!/^\+[1-9]\d{6,14}$/.test(phoneE164)) return { error: "International phone must look like +8801580424024." };
  if (!/^https:\/\//.test(whatsappUrl)) return { error: "WhatsApp link must start with https://" };

  const tiers = DEFAULT_SETTINGS.tiers.map((tier, i) => ({
    name: tier.name,
    price: clean(formData.get(`price_${i}`), 20) || tier.price,
    time: clean(formData.get(`time_${i}`), 40) || tier.time,
  }));

  const { error } = await supabase
    .from("site_settings")
    .update({ email, phone_display: phoneDisplay, phone_e164: phoneE164, whatsapp_url: whatsappUrl, tiers })
    .eq("id", 1);
  if (error) return { error: `Could not save: ${error.message}` };

  // Every page that shows a price or contact detail picks this up immediately.
  revalidateTag("settings");
  return { ok: true };
}
