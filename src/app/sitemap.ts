import type { MetadataRoute } from "next";
import { PAGE_LIST, STATIC_ROUTES } from "@/data/pages";
import { siteConfig } from "@/data/site";

/**
 * Generated from the page registry rather than hand-maintained, so a new page
 * cannot be published without appearing here. Priority reflects commercial
 * importance: the homepage, then the commercial hubs, then everything else.
 */
const HIGH_PRIORITY = new Set([
  "/",
  "/services/",
  "/pricing/",
  "/hire/",
  "/themes/",
  "/work/",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...STATIC_ROUTES, ...PAGE_LIST.map((page) => page.slug)];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : HIGH_PRIORITY.has(route) ? 0.9 : 0.7,
  }));
}
