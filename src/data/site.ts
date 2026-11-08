import type { NavLink } from "@/types";

export const siteConfig = {
  name: "Shopify Theme Customization Services",
  shortName: "Shopify Theme Customization",
  tagline: "Services",
  url: "https://www.shopifythemecustomizationservices.com",
  description:
    "Shopify theme customization services for merchants on Dawn, Prestige and Online Store 2.0 themes. Scope, pricing, turnaround, code-level edits, and completed client work.",
  email: "hihopifythemecustomization@gmail.com",
  phoneDisplay: "01580424024",
  phoneE164: "+8801580424024",
  whatsapp: "https://wa.me/8801580424024",
};

/**
 * Primary navigation. Every entry points at a real page — "Services" used to be
 * a homepage anchor, which is a poor destination for the site's most important
 * commercial term.
 */
export const mainNav: NavLink[] = [
  { label: "Services", href: "/services/" },
  { label: "Pricing", href: "/pricing/" },
];

/**
 * Footer, Nov 2026: one short menu instead of the full link map. Every page
 * still exists and is still linked from the pages that need it; the footer
 * just no longer lists them all.
 */
export const footerBlurb =
  "We customize the Shopify theme you already have: new sections, better product pages and a cleaner look, at a fixed price agreed before work starts.";

export const footerMenu: NavLink[] = [
  { label: "Home", href: "/" },
  ...mainNav,
  { label: "Blog", href: "/blog/" },
  { label: "Get a quote", href: "/hire/" },
];
