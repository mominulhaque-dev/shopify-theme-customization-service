import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

/**
 * Site settings editable from /admin/settings: contact details and the
 * price/time of the four published tiers.
 *
 * Read once and cached under the "settings" tag; saving in the admin calls
 * revalidateTag("settings"), so every page picks up the change without a
 * redeploy. If Supabase is not configured or unreachable, the defaults below
 * (the values the site launched with) are used, so the site never breaks.
 *
 * Only the tier price and time are editable. Tier names are homepage copy
 * (CLAUDE.md §4) and are changed in code.
 */
export interface Tier {
  name: string;
  price: string;
  time: string;
}

export interface SiteSettings {
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappUrl: string;
  tiers: Tier[];
}

export const DEFAULT_SETTINGS: SiteSettings = {
  email: "hihopifythemecustomization@gmail.com",
  phoneDisplay: "01580424024",
  phoneE164: "+8801580424024",
  whatsappUrl: "https://wa.me/8801580424024",
  tiers: [
    { name: "Single-section edit", price: "$50", time: "2–4 days" },
    { name: "Page-level build", price: "$250", time: "1–2 weeks" },
    { name: "Full theme customization", price: "$800", time: "2–3 weeks" },
    { name: "Multi-template rebuild", price: "$1,500", time: "3–4 weeks" },
  ],
};

type Row = {
  email: string;
  phone_display: string;
  phone_e164: string;
  whatsapp_url: string;
  tiers: unknown;
};

export function rowToSettings(row: Row | null): SiteSettings {
  if (!row) return DEFAULT_SETTINGS;
  const tiers = Array.isArray(row.tiers) ? row.tiers : [];
  return {
    email: row.email || DEFAULT_SETTINGS.email,
    phoneDisplay: row.phone_display || DEFAULT_SETTINGS.phoneDisplay,
    phoneE164: row.phone_e164 || DEFAULT_SETTINGS.phoneE164,
    whatsappUrl: row.whatsapp_url || DEFAULT_SETTINGS.whatsappUrl,
    tiers: DEFAULT_SETTINGS.tiers.map((fallback, i) => {
      const t = (tiers[i] ?? {}) as Partial<Tier>;
      return {
        name: fallback.name,
        price: typeof t.price === "string" && t.price.trim() ? t.price.trim() : fallback.price,
        time: typeof t.time === "string" && t.time.trim() ? t.time.trim() : fallback.time,
      };
    }),
  };
}

async function fetchSettings(): Promise<SiteSettings> {
  if (!supabaseConfigured()) return DEFAULT_SETTINGS;
  try {
    const { data, error } = await createPublicClient()
      .from("site_settings")
      .select("email, phone_display, phone_e164, whatsapp_url, tiers")
      .eq("id", 1)
      .abortSignal(AbortSignal.timeout(4000))
      .maybeSingle();
    if (error) throw error;
    return rowToSettings(data as Row | null);
  } catch (err) {
    console.error("Settings fetch failed; using defaults.", err);
    return DEFAULT_SETTINGS;
  }
}

/** Cached for an hour as a safety net; the admin save revalidates it at once. */
export const getSettings = unstable_cache(fetchSettings, ["site-settings"], {
  tags: ["settings"],
  revalidate: 3600,
});

/** "$50–$1,500" for structured data. */
export function priceRange(settings: SiteSettings): string {
  const first = settings.tiers[0]?.price ?? "";
  const last = settings.tiers[settings.tiers.length - 1]?.price ?? "";
  return first && last ? `${first}–${last}` : "";
}
