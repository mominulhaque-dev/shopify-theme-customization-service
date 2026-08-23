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

export const mainNav: NavLink[] = [
  { label: "Services", href: "/#scope" },
  { label: "Themes", href: "/themes/" },
  { label: "Work", href: "/work/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Guides", href: "/guides/" },
];

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
    heading: "Guides",
    links: [
      { label: "Theme editor", href: "/guides/theme-editor/" },
      { label: "Customize a theme", href: "/guides/customize-theme/" },
      { label: "Edit a theme", href: "/guides/edit-theme/" },
      { label: "Change a theme", href: "/guides/change-theme/" },
      { label: "Identify a theme", href: "/guides/identify-theme/" },
      { label: "Compare themes", href: "/themes/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Process", href: "/process/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Case studies", href: "/work/" },
      { label: "Theme migration", href: "/migration/" },
      { label: "Store setup", href: "/store-setup/" },
      { label: "Hire us", href: "/hire/" },
    ],
  },
];
