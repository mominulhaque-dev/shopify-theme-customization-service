"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { SLUG_RE, VISUAL_OPTIONS, httpsOrNull, parseJsonArray, str, toSlug } from "@/lib/admin/content";
import { sanitizePostHtml } from "@/lib/blog-html";

export type CaseSaveState = { ok?: boolean; error?: string };

function refresh(slug?: string) {
  revalidateTag("cases");
  revalidatePath("/work/");
  if (slug) revalidatePath(`/work/${slug}/`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/cases/");
}

export async function saveCase(id: string | null, _prev: CaseSaveState, fd: FormData): Promise<CaseSaveState> {
  const { supabase } = await requireAdmin();
  const title = str(fd, "title", 200);
  if (!title) return { error: "Title is required." };
  const slug = toSlug(str(fd, "slug", 100) || title);
  if (!SLUG_RE.test(slug)) return { error: "The URL slug can only use a–z, 0–9 and dashes." };
  const status = str(fd, "status") === "published" ? "published" : "draft";
  const visual = str(fd, "visual");
  const results = parseJsonArray<{ label: unknown; before: unknown; after: unknown }>(String(fd.get("results") ?? ""))
    .map((r) => ({
      label: String(r.label ?? "").trim().slice(0, 120),
      before: String(r.before ?? "").trim().slice(0, 60),
      after: String(r.after ?? "").trim().slice(0, 60),
    }))
    .filter((r) => r.label)
    .slice(0, 12);
  const sort = Number(str(fd, "sort_order"));

  const row: Record<string, unknown> = {
    title,
    slug,
    client: str(fd, "client", 120),
    industry: str(fd, "industry", 120),
    theme: str(fd, "theme", 120),
    summary: str(fd, "summary", 600),
    problem_html: sanitizePostHtml(String(fd.get("problem_html") ?? "")),
    solution_html: sanitizePostHtml(String(fd.get("solution_html") ?? "")),
    results,
    before_url: httpsOrNull(str(fd, "before_url", 1000)),
    after_url: httpsOrNull(str(fd, "after_url", 1000)),
    cover_url: httpsOrNull(str(fd, "cover_url", 1000)),
    visual: VISUAL_OPTIONS.includes(visual) ? visual : null,
    testimonial_quote: str(fd, "testimonial_quote", 1000),
    testimonial_name: str(fd, "testimonial_name", 160),
    meta_title: str(fd, "meta_title", 200),
    description: str(fd, "description", 400),
    sort_order: Number.isFinite(sort) ? Math.round(sort) : 0,
    status,
  };

  const dupe = (code?: string) => (code === "23505" ? "Another case study already uses this URL slug." : undefined);

  if (id) {
    const { data: prev } = await supabase.from("case_studies").select("slug, published_at").eq("id", id).maybeSingle();
    const p = prev as { slug: string; published_at: string | null } | null;
    if (status === "published" && !p?.published_at) row.published_at = new Date().toISOString();
    const { error } = await supabase.from("case_studies").update(row).eq("id", id);
    if (error) return { error: dupe(error.code) ?? error.message };
    refresh(slug);
    if (p && p.slug !== slug) revalidatePath(`/work/${p.slug}/`);
    return { ok: true };
  }

  if (status === "published") row.published_at = new Date().toISOString();
  const { data, error } = await supabase.from("case_studies").insert(row).select("id").single();
  if (error) return { error: dupe(error.code) ?? error.message };
  refresh(slug);
  redirect(`/admin/cases/${(data as { id: string }).id}/?saved=1`);
}

export async function deleteCase(id: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("case_studies").select("slug").eq("id", id).maybeSingle();
  await supabase.from("case_studies").delete().eq("id", id);
  refresh((data as { slug: string } | null)?.slug);
  redirect("/admin/cases/");
}
