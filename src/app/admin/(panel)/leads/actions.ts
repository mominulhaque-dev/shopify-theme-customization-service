"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { LEAD_STATUSES } from "@/lib/admin/format";

export type LeadSaveState = { ok?: boolean; error?: string };

export async function updateLead(id: string, _prev: LeadSaveState, formData: FormData): Promise<LeadSaveState> {
  const { supabase } = await requireAdmin();
  const status = String(formData.get("status") || "");
  const notes = String(formData.get("notes") || "").slice(0, 20000);
  if (!LEAD_STATUSES.includes(status as never)) return { error: "Unknown status." };

  const { data: current } = await supabase.from("leads").select("status, contacted_at").eq("id", id).maybeSingle();
  const patch: Record<string, unknown> = { status, notes };
  if (status !== "new" && !(current as { contacted_at: string | null } | null)?.contacted_at) {
    patch.contacted_at = new Date().toISOString();
  }
  const { error } = await supabase.from("leads").update(patch).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/leads/");
  revalidatePath(`/admin/leads/${id}/`);
  revalidatePath("/admin/");
  return { ok: true };
}

export async function markUnread(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("leads").update({ read_at: null }).eq("id", id);
  revalidatePath("/admin/leads/");
  redirect("/admin/leads/");
}

export async function deleteLead(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads/");
  revalidatePath("/admin/");
  redirect("/admin/leads/");
}
