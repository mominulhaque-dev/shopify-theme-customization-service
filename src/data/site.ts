import type { FooterColumn, NavLink } from "@/types";

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
  { label: "Themes", href: "/themes/" },
  { label: "Work", href: "/work/" },
  { label: "Pricing", href: "/pricing/" },
];

/** Footer links only to routes that are published in the page registry. */
export const footerColumns: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Shopify development", href: "/services/shopify-development/" },
      { label: "Theme migration", href: "/migration/" },
      { label: "Store setup", href: "/store-setup/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "All services", href: "/services/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Case studies", href: "/work/" },
      { label: "Compare themes", href: "/themes/" },
      { label: "Custom theme development", href: "/custom-theme-development/" },
      { label: "Custom theme vs template", href: "/custom-theme-vs-template/" },
      { label: "Hire us", href: "/hire/" },
    ],
  },
];
