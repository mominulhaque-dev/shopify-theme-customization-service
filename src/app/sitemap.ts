import type { MetadataRoute } from "next";
import { allRoutes } from "@/data/pages";
import { BLOG_POSTS } from "@/data/blog";
import { siteConfig } from "@/data/site";

/**
 * Generated from the page registry rather than hand-maintained, so a new page
 * cannot be published without appearing here. `changefreq` and `priority` are
 * deliberately omitted (Google ignores both) — each entry is a URL and its
 * last-modified date only.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = allRoutes().map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
  }));
  const blog = [
    { url: `${siteConfig.url}/blog/`, lastModified },
    ...BLOG_POSTS.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}/`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
    })),
  ];
  return [...pages, ...blog];
}
