import type { MetadataRoute } from "next";
import { allRoutes } from "@/data/pages";
import { getPosts } from "@/lib/posts";
import { getCaseStudies } from "@/lib/cases";
import { siteConfig } from "@/data/site";

/**
 * Generated from the page registry rather than hand-maintained, so a new page
 * cannot be published without appearing here. `changefreq` and `priority` are
 * deliberately omitted (Google ignores both) — each entry is a URL and its
 * last-modified date only.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, cases] = await Promise.all([getPosts(), getCaseStudies()]);
  const lastModified = new Date();

  const pages = allRoutes().map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
  }));
  const blog = [
    { url: `${siteConfig.url}/blog/`, lastModified },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}/`,
      lastModified: new Date(`${post.updated}T00:00:00Z`),
    })),
  ];
  const work = cases.map((c) => ({
    url: `${siteConfig.url}/work/${c.slug}/`,
    lastModified: new Date(`${c.updated}T00:00:00Z`),
  }));
  return [...pages, ...work, ...blog];
}
