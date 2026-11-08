import type { NavLink } from "@/types";

/** Share card used by every page's Open Graph / Twitter tags. */
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Shopify Theme Customization Services",
};

export const siteConfig = {
  name: "Shopify Theme Customization Services",
  shortName: "Shopify Theme Customization",
  tagline: "Services",
  url: "https://www.shopifythemecustomizationservices.com",
  description:
    "Shopify theme customization for store owners: new sections, better product pages and a cleaner look on the theme you have. Fixed price from $50.",
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
