import "server-only";
import { unstable_cache } from "next/cache";
import { BLOG_POSTS, type BlogPost } from "@/data/blog";
import { blocksToHtml } from "@/lib/blog-html";
import { createPublicClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { VISUALS, type VisualKey } from "@/components/ui/visuals";

/**
 * One shape for every blog post, whether it comes from the database (admin)
 * or from src/data/blog.ts. The static posts are the fallback: they show when
 * Supabase is not configured, when the query fails, or before any post has
 * been published from the admin. Once one post is published in the database,
 * the database is the only source.
 */
export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keyword: string;
  category: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  updated: string;
  readMinutes: number;
  visual: VisualKey | null;
  coverUrl: string | null;
  excerpt: string;
  takeaways: string[];
  bodyHtml: string;
  faq: Array<{ q: string; a: string }>;
}

export interface PostRow {
  slug: string;
  title: string;
  meta_title: string;
  description: string;
  keyword: string;
  category: string;
  excerpt: string;
  cover_url: string | null;
  visual: string | null;
  takeaways: string[] | null;
  body_html: string;
  faq: Array<{ q: string; a: string }> | null;
  read_minutes: number;
  published_at: string | null;
  updated_at: string;
}

export const isVisualKey = (k: unknown): k is VisualKey => typeof k === "string" && k in VISUALS;

export function staticToPost(p: BlogPost): Post {
  return {
    slug: p.slug,
    title: p.title,
    metaTitle: p.metaTitle,
    description: p.description,
    keyword: p.keyword,
    category: p.category,
    date: p.date,
    updated: p.date,
    readMinutes: p.readMinutes,
    visual: p.visual,
    coverUrl: null,
    excerpt: p.excerpt,
    takeaways: p.takeaways,
    bodyHtml: blocksToHtml(p.body),
    faq: p.faq,
  };
}

function rowToPost(r: PostRow): Post {
  const date = (r.published_at ?? r.updated_at).slice(0, 10);
  return {
    slug: r.slug,
    title: r.title,
    metaTitle: r.meta_title || r.title,
    description: r.description || r.excerpt,
    keyword: r.keyword,
    category: r.category || "Guides",
    date,
    updated: r.updated_at.slice(0, 10),
    readMinutes: r.read_minutes || 5,
    visual: isVisualKey(r.visual) ? r.visual : null,
    coverUrl: r.cover_url || null,
    excerpt: r.excerpt,
    takeaways: r.takeaways ?? [],
    bodyHtml: r.body_html,
    faq: Array.isArray(r.faq) ? r.faq.filter((f) => f && f.q && f.a) : [],
  };
}

const STATIC = () => BLOG_POSTS.map(staticToPost);

async function fetchPosts(): Promise<Post[]> {
  if (!supabaseConfigured()) return STATIC();
  try {
    const { data, error } = await createPublicClient()
      .from("posts")
      .select(
        "slug, title, meta_title, description, keyword, category, excerpt, cover_url, visual, takeaways, body_html, faq, read_minutes, published_at, updated_at",
      )
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .abortSignal(AbortSignal.timeout(5000));
    if (error || !data || data.length === 0) return STATIC();
    return (data as PostRow[]).map(rowToPost);
  } catch {
    return STATIC();
  }
}

export const getPosts = unstable_cache(fetchPosts, ["blog-posts"], { tags: ["posts"], revalidate: 3600 });

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}
