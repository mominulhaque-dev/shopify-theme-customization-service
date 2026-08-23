import type { FooterColumn, NavLink } from "@/types";

export const siteConfig = {
  name: "Shopify Theme Customization Services",
  shortName: "Shopify Theme Customization",
  tagline: "Services",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.shopifythemecustomization.com",
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
  { label: "Customization", href: "/customization/" },
  { label: "Themes", href: "/themes/" },
  { label: "Work", href: "/work/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Guides", href: "/guides/" },
];

/**
 * Footer columns double as the site's internal-link map: every page in the
 * registry (src/data/pages/index.ts) is reachable from here, which is both an
 * accessibility win and how the topic clusters get their crawl paths. The link
 * audit script fails the build's checks if any href here has no page.
 */
export const footerColumns: FooterColumn[] = [
  {
    heading: "By layer",
    links: [
      { label: "Liquid", href: "/customization/liquid/" },
      { label: "Custom CSS", href: "/customization/css/" },
      { label: "Custom fonts", href: "/customization/fonts/" },
      { label: "Sections and blocks", href: "/customization/sections/" },
      { label: "Theme schema", href: "/customization/schema/" },
      { label: "Without coding", href: "/customization/no-code/" },
    ],
  },
  {
    heading: "By page and theme",
    links: [
      { label: "Product page", href: "/customization/product-page/" },
      { label: "Mobile layout", href: "/customization/mobile/" },
      { label: "Dawn", href: "/customization/dawn/" },
      { label: "Prestige", href: "/customization/prestige/" },
      { label: "Spotlight", href: "/customization/spotlight/" },
      { label: "Legacy themes", href: "/customization/legacy-themes/" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Theme customization", href: "/customization/" },
      { label: "Shopify development", href: "/services/shopify-development/" },
      { label: "Store redesign", href: "/services/store-redesign/" },
      { label: "Speed optimization", href: "/services/speed-optimization/" },
      { label: "Conversion optimization", href: "/services/conversion-optimization/" },
      { label: "Theme migration", href: "/migration/" },
      { label: "Store setup", href: "/store-setup/" },
    ],
  },
  {
    heading: "Guides",
    links: [
      { label: "Theme editor", href: "/guides/theme-editor/" },
      { label: "Customize a theme", href: "/guides/customize-theme/" },
      { label: "Edit theme code", href: "/guides/edit-theme/" },
      { label: "Change a theme", href: "/guides/change-theme/" },
      { label: "Identify a theme", href: "/guides/identify-theme/" },
      { label: "Theme updates", href: "/guides/theme-updates/" },
      { label: "Hire a developer", href: "/guides/hire-theme-developer/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "All services", href: "/services/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Process", href: "/process/" },
      { label: "Case studies", href: "/work/" },
      { label: "Compare themes", href: "/themes/" },
      { label: "Custom development", href: "/custom-theme-development/" },
      { label: "Custom vs template", href: "/custom-theme-vs-template/" },
      { label: "Hire us", href: "/hire/" },
    ],
  },
];
