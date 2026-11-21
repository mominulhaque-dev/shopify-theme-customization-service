"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { SLUG_RE, VISUAL_OPTIONS, dateToIso, httpsOrNull, parseJsonArray, str, toSlug } from "@/lib/admin/content";
import { readMinutes, sanitizePostHtml } from "@/lib/blog-html";
import { BLOG_POSTS } from "@/data/blog";
import { staticToPost } from "@/lib/posts";

export type PostSaveState = { ok?: boolean; error?: string };

function refreshBlog(slug?: string) {
  revalidateTag("posts");
  revalidatePath("/blog/");
  if (slug) revalidatePath(`/blog/${slug}/`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog/");
}

export async function savePost(id: string | null, _prev: PostSaveState, fd: FormData): Promise<PostSaveState> {
  const { supabase } = await requireAdmin();

  const title = str(fd, "title", 200);
  if (!title) return { error: "Title is required." };
  const slug = toSlug(str(fd, "slug", 100) || title);
  if (!SLUG_RE.test(slug)) return { error: "The URL slug can only use a–z, 0–9 and dashes." };

  const body_html = sanitizePostHtml(String(fd.get("body_html") ?? ""));
  const status = str(fd, "status") === "published" ? "published" : "draft";
  const visual = str(fd, "visual");
  const faq = parseJsonArray<{ q: unknown; a: unknown }>(String(fd.get("faq") ?? ""))
    .map((f) => ({ q: String(f.q ?? "").trim().slice(0, 300), a: String(f.a ?? "").trim().slice(0, 2000) }))
    .filter((f) => f.q && f.a)
    .slice(0, 20);
  const minutesIn = Number(str(fd, "read_minutes"));

  const publishedOn = str(fd, "published_on");
  let published_at = dateToIso(publishedOn);
  const now = new Date();
  const todayDhaka = new Date(now.getTime() + 6 * 3600_000).toISOString().slice(0, 10);
  // Today or earlier must never land in the future (the site hides future posts).
  if (published_at && publishedOn <= todayDhaka && new Date(published_at) > now) published_at = now.toISOString();
  if (status === "published" && !published_at) published_at = now.toISOString();

  const row = {
    title,
    slug,
    meta_title: str(fd, "meta_title", 200),
    description: str(fd, "description", 400),
    keyword: str(fd, "keyword", 200),
    category: str(fd, "category", 60) || "Guides",
    excerpt: str(fd, "excerpt", 600),
    cover_url: httpsOrNull(str(fd, "cover_url", 1000)),
    visual: VISUAL_OPTIONS.includes(visual) ? visual : null,
    takeaways: str(fd, "takeaways", 4000)
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10),
    body_html,
    faq,
    read_minutes: Number.isFinite(minutesIn) && minutesIn > 0 ? Math.round(minutesIn) : readMinutes(body_html),
    status,
    published_at,
  };

  let prevSlug: string | undefined;
  if (id) {
    const { data: prev } = await supabase.from("posts").select("slug").eq("id", id).maybeSingle();
    prevSlug = (prev as { slug: string } | null)?.slug;
    const { error } = await supabase.from("posts").update(row).eq("id", id);
    if (error) return { error: error.code === "23505" ? "Another post already uses this URL slug." : error.message };
  } else {
    const { data, error } = await supabase.from("posts").insert(row).select("id").single();
    if (error) return { error: error.code === "23505" ? "Another post already uses this URL slug." : error.message };
    refreshBlog(slug);
    redirect(`/admin/blog/${(data as { id: string }).id}/?saved=1`);
  }

  refreshBlog(slug);
  if (prevSlug && prevSlug !== slug) revalidatePath(`/blog/${prevSlug}/`);
  return { ok: true };
}

export async function deletePost(id: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("posts").select("slug").eq("id", id).maybeSingle();
  await supabase.from("posts").delete().eq("id", id);
  refreshBlog((data as { slug: string } | null)?.slug);
  redirect("/admin/blog/");
}

/** Copies the five built-in posts into the database (skips slugs that exist). */
export async function importStaticPosts() {
  const { supabase } = await requireAdmin();
  const { data: existing } = await supabase.from("posts").select("slug");
  const have = new Set(((existing as { slug: string }[] | null) ?? []).map((r) => r.slug));
  const rows = BLOG_POSTS.filter((p) => !have.has(p.slug)).map((p) => {
    const post = staticToPost(p);
    return {
      slug: post.slug,
      title: post.title,
      meta_title: post.metaTitle,
      description: post.description,
      keyword: post.keyword,
      category: post.category,
      excerpt: post.excerpt,
      visual: post.visual,
      takeaways: post.takeaways,
      body_html: post.bodyHtml,
      faq: post.faq,
      read_minutes: post.readMinutes,
      status: "published",
      published_at: dateToIso(post.date),
    };
  });
  if (rows.length) await supabase.from("posts").insert(rows);
  refreshBlog();
  BLOG_POSTS.forEach((p) => revalidatePath(`/blog/${p.slug}/`));
  redirect("/admin/blog/");
}
