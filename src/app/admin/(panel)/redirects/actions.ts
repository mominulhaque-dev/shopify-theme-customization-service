"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { normaliseDestination, normalisePath } from "@/lib/redirects";
import { LEGACY_REDIRECTS } from "@/data/legacy-redirects";

export type RedirectState = { ok?: string; error?: string };

export async function addRedirect(_prev: RedirectState, fd: FormData): Promise<RedirectState> {
  const { supabase } = await requireAdmin();
  const source = normalisePath(String(fd.get("source") ?? ""));
  const destination = normaliseDestination(String(fd.get("destination") ?? ""));
  if (!source || source === "/") return { error: "Enter the old path, e.g. /old-page/." };
  if (source.startsWith("/admin/") || source.startsWith("/api/") || source.startsWith("/_next/")) return { error: "That path cannot be redirected." };
  if (!destination) return { error: "Enter where it should go: a path like /pricing/ or a full https:// link." };
  if (destination === source) return { error: "The old and new address are the same." };

  const { data: loop } = await supabase.from("redirects").select("destination").eq("source", destination).eq("active", true).maybeSingle();
  if ((loop as { destination: string } | null)?.destination === source) return { error: "That would create a redirect loop." };

  const { error } = await supabase
    .from("redirects")
    .upsert({ source, destination, permanent: fd.get("permanent") === "on", active: true }, { onConflict: "source" });
  if (error) return { error: error.message };
  revalidatePath("/admin/redirects/");
  return { ok: `${source} → ${destination} saved. Live within about a minute.` };
}

export async function toggleRedirect(id: string, active: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("redirects").update({ active }).eq("id", id);
  revalidatePath("/admin/redirects/");
}

export async function deleteRedirect(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("redirects").delete().eq("id", id);
  revalidatePath("/admin/redirects/");
}

export async function seedLegacyRedirects() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("redirects").select("source");
  const have = new Set(((data as { source: string }[] | null) ?? []).map((r) => r.source));
  const rows = LEGACY_REDIRECTS.filter(([s]) => !have.has(s)).map(([source, destination]) => ({ source, destination, permanent: true, active: true }));
  if (rows.length) await supabase.from("redirects").insert(rows);
  revalidatePath("/admin/redirects/");
}
