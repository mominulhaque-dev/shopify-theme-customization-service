import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { isVisualKey } from "@/lib/posts";
import type { VisualKey } from "@/components/ui/visuals";

/** Published case studies from the admin. Empty when the DB is not configured. */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  theme: string;
  summary: string;
  problemHtml: string;
  solutionHtml: string;
  results: Array<{ label: string; before: string; after: string }>;
  beforeUrl: string | null;
  afterUrl: string | null;
  coverUrl: string | null;
  visual: VisualKey | null;
  quote: string;
  quoteName: string;
  metaTitle: string;
  description: string;
  date: string;
  updated: string;
}

interface Row {
  slug: string;
  title: string;
  client: string;
  industry: string;
  theme: string;
  summary: string;
  problem_html: string;
  solution_html: string;
  results: Array<{ label: string; before: string; after: string }> | null;
  before_url: string | null;
  after_url: string | null;
  cover_url: string | null;
  visual: string | null;
  testimonial_quote: string;
  testimonial_name: string;
  meta_title: string;
  description: string;
  published_at: string | null;
  updated_at: string;
}

async function fetchCases(): Promise<CaseStudy[]> {
  if (!supabaseConfigured()) return [];
  try {
    const { data, error } = await createPublicClient()
      .from("case_studies")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false })
      .abortSignal(AbortSignal.timeout(5000));
    if (error || !data) return [];
    return (data as Row[]).map((r) => ({
      slug: r.slug,
      title: r.title,
      client: r.client,
      industry: r.industry,
      theme: r.theme,
      summary: r.summary,
      problemHtml: r.problem_html,
      solutionHtml: r.solution_html,
      results: Array.isArray(r.results) ? r.results.filter((x) => x && x.label) : [],
      beforeUrl: r.before_url,
      afterUrl: r.after_url,
      coverUrl: r.cover_url,
      visual: isVisualKey(r.visual) ? r.visual : null,
      quote: r.testimonial_quote,
      quoteName: r.testimonial_name,
      metaTitle: r.meta_title || r.title,
      description: r.description || r.summary,
      date: (r.published_at ?? r.updated_at).slice(0, 10),
      updated: r.updated_at.slice(0, 10),
    }));
  } catch {
    return [];
  }
}

export const getCaseStudies = unstable_cache(fetchCases, ["case-studies"], { tags: ["cases"], revalidate: 3600 });

export async function getCaseStudy(slug: string) {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}
