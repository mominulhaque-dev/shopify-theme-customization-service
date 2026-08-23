import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// NOTE: extend this list as each page in the site map is built.
// See CLAUDE.md "Remaining work" for the full route list still to create.
const routes = ["/", "/hire/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
