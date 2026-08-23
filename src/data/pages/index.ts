import type { PageContent } from "@/types/page";

import { page as services } from "@/data/pages/services";
import { page as customization } from "@/data/pages/customization";
import { page as themes } from "@/data/pages/themes";
import { page as pricing } from "@/data/pages/pricing";
import { page as process } from "@/data/pages/process";
import { page as migration } from "@/data/pages/migration";
import { page as storeSetup } from "@/data/pages/store-setup";
import { page as work } from "@/data/pages/work";
import { page as guides } from "@/data/pages/guides";

import { page as svcDevelopment } from "@/data/pages/svc-development";
import { page as svcRedesign } from "@/data/pages/svc-redesign";
import { page as svcSpeed } from "@/data/pages/svc-speed";
import { page as svcCro } from "@/data/pages/svc-cro";

import { page as cLiquid } from "@/data/pages/c-liquid";
import { page as cCss } from "@/data/pages/c-css";
import { page as cFonts } from "@/data/pages/c-fonts";
import { page as cSections } from "@/data/pages/c-sections";
import { page as cSchema } from "@/data/pages/c-schema";
import { page as cNoCode } from "@/data/pages/c-no-code";
import { page as cProductPage } from "@/data/pages/c-product-page";
import { page as cMobile } from "@/data/pages/c-mobile";
import { page as cDawn } from "@/data/pages/c-dawn";
import { page as cPrestige } from "@/data/pages/c-prestige";
import { page as cSpotlight } from "@/data/pages/c-spotlight";
import { page as cLegacy } from "@/data/pages/c-legacy";

import { page as gThemeEditor } from "@/data/pages/g-theme-editor";
import { page as gCustomize } from "@/data/pages/g-customize";
import { page as gEdit } from "@/data/pages/g-edit";
import { page as gChange } from "@/data/pages/g-change";
import { page as gIdentify } from "@/data/pages/g-identify";
import { page as gThemeUpdates } from "@/data/pages/g-theme-updates";
import { page as gHireDev } from "@/data/pages/g-hire-dev";

import { page as cmpCustomDevelopment } from "@/data/pages/cmp-custom-development";
import { page as cmpCustomVsTemplate } from "@/data/pages/cmp-custom-vs-template";

import { apparelDawnProductPage, homeGoodsPrestige } from "@/data/pages/cases-1";
import { accessoriesMigration, supplementsSubscription } from "@/data/pages/cases-2";
import { cosmeticsMobile, furnitureFiltering } from "@/data/pages/cases-3";
import { jewelleryEditorial, outdoorSpeed } from "@/data/pages/cases-4";
import { b2bWholesale, footwearRescope } from "@/data/pages/cases-5";

/**
 * Every interior page, in navigation order.
 *
 * This array is the single source of truth for what pages exist: the catch-all
 * route generates its static params from it, the sitemap is built from it, and
 * the link audit script (scripts/audit-links.mjs) checks every internal href on
 * the site against it. Adding a page means adding it here — there is no second
 * place to forget.
 */
export const PAGE_LIST: PageContent[] = [
  // hubs
  services,
  customization,
  themes,
  work,
  pricing,
  guides,
  process,
  migration,
  storeSetup,

  // services
  svcDevelopment,
  svcRedesign,
  svcSpeed,
  svcCro,

  // customization by layer
  cLiquid,
  cCss,
  cFonts,
  cSections,
  cSchema,
  cNoCode,

  // customization by page and theme
  cProductPage,
  cMobile,
  cDawn,
  cPrestige,
  cSpotlight,
  cLegacy,

  // guides
  gThemeEditor,
  gCustomize,
  gEdit,
  gChange,
  gIdentify,
  gThemeUpdates,
  gHireDev,

  // comparisons
  cmpCustomDevelopment,
  cmpCustomVsTemplate,

  // case studies
  apparelDawnProductPage,
  homeGoodsPrestige,
  accessoriesMigration,
  supplementsSubscription,
  furnitureFiltering,
  cosmeticsMobile,
  outdoorSpeed,
  jewelleryEditorial,
  b2bWholesale,
  footwearRescope,
];

/** Slug → content, keyed by the route path with leading and trailing slashes. */
export const PAGES: Record<string, PageContent> = Object.fromEntries(
  PAGE_LIST.map((page) => [page.slug, page])
);

/** Route segments for generateStaticParams, e.g. ["customization","liquid"]. */
export function allPageSlugs(): string[][] {
  return PAGE_LIST.map((page) => page.slug.split("/").filter(Boolean));
}

/** Routes that exist outside the registry (hand-built pages and the homepage). */
export const STATIC_ROUTES = ["/", "/hire/"];

/** Every route on the site, for the sitemap and the link audit. */
export function allRoutes(): string[] {
  return [...STATIC_ROUTES, ...PAGE_LIST.map((page) => page.slug)];
}
