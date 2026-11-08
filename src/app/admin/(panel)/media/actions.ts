"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";

export async function updateAlt(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const alt = String(formData.get("alt") || "").slice(0, 300);
  await supabase.from("media").update({ alt }).eq("id", id);
  revalidatePath("/admin/media/");
}

export async function deleteMedia(id: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("media").select("path").eq("id", id).maybeSingle();
  const path = (data as { path: string } | null)?.path;
  if (path) await supabase.storage.from("media").remove([path]);
  await supabase.from("media").delete().eq("id", id);
  revalidatePath("/admin/media/");
}
