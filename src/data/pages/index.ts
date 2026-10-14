import type { PageContent } from "@/types/page";

import { page as services } from "@/data/pages/services";
import { page as themes } from "@/data/pages/themes";
import { page as pricing } from "@/data/pages/pricing";
import { page as migration } from "@/data/pages/migration";
import { page as storeSetup } from "@/data/pages/store-setup";
import { page as work } from "@/data/pages/work";

import { page as svcDevelopment } from "@/data/pages/svc-development";
import { page as cmpCustomDevelopment } from "@/data/pages/cmp-custom-development";
import { page as cmpCustomVsTemplate } from "@/data/pages/cmp-custom-vs-template";

/**
 * The interior pages intentionally published by this site.
 *
 * This array is the single source of truth for what pages exist: the catch-all
 * route generates its static params from it, the sitemap is built from it, and
 * the link audit script (scripts/audit-links.mjs) checks every internal href on
 * the site against it. Adding a page means adding it here — there is no second
 * place to forget.
 */
export const PAGE_LIST: PageContent[] = [
  services,
  themes,
  work,
  pricing,
  migration,
  storeSetup,
  svcDevelopment,
  cmpCustomDevelopment,
  cmpCustomVsTemplate,
];

/** Slug → content, keyed by the route path with leading and trailing slashes. */
export const PAGES: Record<string, PageContent> = Object.fromEntries(
  PAGE_LIST.map((page) => [page.slug, page])
);

/** Route segments for generateStaticParams, e.g. ["services","shopify-development"]. */
export function allPageSlugs(): string[][] {
  return PAGE_LIST.map((page) => page.slug.split("/").filter(Boolean));
}

/** Routes that exist outside the registry (hand-built pages and the homepage). */
export const STATIC_ROUTES = ["/", "/hire/"];

/** Every route on the site, for the sitemap and the link audit. */
export function allRoutes(): string[] {
  return [...STATIC_ROUTES, ...PAGE_LIST.map((page) => page.slug)];
}
