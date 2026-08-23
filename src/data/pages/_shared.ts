import type { LinkRef, PageBlock } from "@/types/page";

/**
 * Shared building blocks for the interior pages.
 *
 * Anything factual that appears on more than one page lives here (the price
 * ladder, the standard CTA, the common breadcrumb trails) so a number can never
 * drift between the pricing page and a service page that quotes it.
 */

export const CRUMB_SERVICES: LinkRef[] = [{ label: "Services", href: "/services/" }];
export const CRUMB_CUSTOMIZATION: LinkRef[] = [
  { label: "Services", href: "/services/" },
  { label: "Customization", href: "/customization/" },
];
export const CRUMB_GUIDES: LinkRef[] = [{ label: "Guides", href: "/guides/" }];
export const CRUMB_WORK: LinkRef[] = [{ label: "Work", href: "/work/" }];

/** The published ladder. Same four tiers as the homepage, same figures. */
export const TIER_ITEMS = [
  {
    label: "Single-section edit",
    price: "$1,000",
    time: "2–4 days",
    note: "One section added or reworked, with schema so it stays editable afterwards.",
  },
  {
    label: "Page-level build",
    price: "$2,800",
    time: "1–2 weeks",
    note: "One template rebuilt end to end, including every new block it needs and its mobile behaviour.",
  },
  {
    label: "Full theme customization",
    price: "$6,500",
    time: "3–5 weeks",
    note: "Every template touched, a reusable section library, a performance pass and device QA.",
  },
  {
    label: "Multi-template rebuild",
    price: "$12,000",
    time: "6–8 weeks",
    note: "Theme architecture reworked on your existing base, new schema throughout, training and handover docs.",
  },
];

export function priceBlock(overrides?: { heading?: string; lede?: string }): PageBlock {
  return {
    type: "priceList",
    eyebrow: "Published pricing",
    heading: overrides?.heading ?? "What this costs",
    lede:
      overrides?.lede ??
      "Priced by what actually gets touched in your theme rather than by hours guessed in advance. Every tier includes scoping, a staging theme, device QA and handover notes.",
    items: TIER_ITEMS,
    note: "Quotes are fixed before work starts. If your request sits between two tiers we quote the smaller one and tell you what the larger would add.",
    tone: "tint",
  };
}

export function ctaBlock(heading: string, body: string, dark = true): PageBlock {
  return {
    type: "cta",
    heading,
    body,
    cta: { label: "Get a scoped quote", href: "/hire/" },
    secondary: { label: "See pricing", href: "/pricing/" },
    tone: dark ? "dark" : "tint",
  };
}

/** The four process stages, phrased for interior pages. */
export const PROCESS_STEPS = [
  {
    title: "Scope the work",
    body: "We audit the theme you run now, agree exactly what changes, and write a fixed scope with a price and a delivery date. Anything we judge to sit outside theme work gets flagged here, with what it would take to do it anyway.",
    meta: "1–2 business days",
  },
  {
    title: "Duplicate the theme",
    body: "All work happens on a staging duplicate. Your live store keeps selling and your published theme stays exactly as it was until you decide otherwise. As a Shopify Partner we use collaborator access, so no password changes hands.",
    meta: "Same day",
  },
  {
    title: "Build and review",
    body: "You get a preview link at each milestone rather than one reveal at the end. Feedback goes into the same staging theme, so what you approve is what publishes.",
    meta: "Milestone previews",
  },
  {
    title: "Launch and hand over",
    body: "QA on real devices, then publish. You receive the theme files, a change log of every edit, and written notes on which changes need care during a future theme update.",
    meta: "Handover packet included",
  },
];
