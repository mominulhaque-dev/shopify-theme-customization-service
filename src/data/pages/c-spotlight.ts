import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/spotlight/",
  title: "Spotlight Theme Customization That Stays Fast",
  description:
    "Spotlight theme customization: editorial layouts, heavy imagery and animation kept inside a performance budget, plus the product and collection work the theme leaves to you.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "Spotlight theme customization",
    supporting: [
      "customize Spotlight Shopify theme",
      "Spotlight theme speed",
      "Shopify editorial theme customization",
      "Spotlight vs Dawn",
    ],
  },
  hero: {
    eyebrow: "Spotlight",
    h1: "Spotlight customization: keep the drama, lose the weight",
    lede: "Spotlight is built for stores that lead with imagery, and it looks superb doing it. The trade-off is that the things making it striking — large media, layered animation, full-bleed compositions — are exactly the things that cost Core Web Vitals. Customizing it well is mostly about spending that budget deliberately.",
    meta: ["From $1,000", "Performance budget enforced", "Vendor update path preserved"],
    cta: { label: "Get a Spotlight quote", href: "/hire/" },
    secondary: { label: "See speed work", href: "/services/speed-optimization/" },
    visual: "storefront",
    backdrop: "beams",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The trade-off",
      heading: "A visual theme needs a visual budget",
      body: [
        "The default Spotlight homepage will happily carry a full-screen hero image, an autoplaying video, a marquee, and several animated reveals. Each is defensible alone. Together, on a mid-range phone, they are the difference between a two-second and a six-second render.",
        "So we set a budget at scoping: what may load above the fold, how much media the hero may weigh, and what animates before first interaction. Everything else is fair game below the fold. The result keeps the theme's character without paying for it in abandoned sessions.",
      ],
      bullets: [
        "One hero asset above the fold, preloaded and sized",
        "Video below the fold, never autoplaying on cellular",
        "Animation via transforms only, honouring reduced-motion",
        "Core Web Vitals measured before and after, on real sessions",
      ],
      visual: "speed",
      caption: "The thresholds an editorial theme has to hold",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "Where Spotlight needs help",
      heading: "What we most often build on top of it",
      lede: "Its editorial sections are strong. The commerce surfaces are where the work usually is.",
      columns: 3,
      items: [
        {
          meta: "Product",
          title: "Product page depth",
          body: "Spec tables, size guidance and bundles, all metafield-driven so merchandising owns the content.",
        },
        {
          meta: "Collection",
          title: "Filtering for real catalogues",
          body: "Facets built from actual metafields rather than the defaults, which rarely express a curated catalogue.",
        },
        {
          meta: "Media",
          title: "Image pipeline discipline",
          body: "Correct srcset and sizes on every editorial section, so a phone is not handed a desktop hero.",
        },
        {
          meta: "Mobile",
          title: "Mobile compositions",
          body: "Full-bleed layouts reconsidered for a 390px screen instead of cropped down to it.",
        },
        {
          meta: "Type",
          title: "Typographic system",
          body: "A licensed display face, subset and self-hosted, with a measured fallback so nothing reflows.",
        },
        {
          meta: "Hygiene",
          title: "Unused features removed",
          body: "The section variants you will never use, taken out rather than left loading on every page.",
        },
      ],
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Updates",
      heading: "Same vendor discipline as any premium theme",
      body: [
        "Spotlight receives vendor releases, and an update replaces the theme's own files. Customizations therefore live in new sections, new snippets and a separate stylesheet loaded after the vendor's.",
        "Where a core edit cannot be avoided, it is logged in your handover notes with the exact change to re-apply after an upgrade. Short, specific, and written for whoever is doing the upgrade rather than for us.",
      ],
      bullets: [
        "New files first; vendor files only when unavoidable",
        "Vendor naming conventions followed so upgrades recognise settings",
        "Override stylesheet, no !important escalation",
        "Upgrade checklist handed over with the theme files",
      ],
      visual: "handover",
      caption: "What you receive at close",
    },
    priceBlock({
      heading: "Spotlight customization pricing",
      lede: "The standard ladder. Editorial template work usually lands in the second or third tier, because the media and mobile passes are part of doing it properly.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Is Spotlight slow?",
          a: "Not inherently, but it makes it easy to be. The theme gives you the tools for a heavy page and does not stop you using all of them at once. Held to a budget, a Spotlight store passes Core Web Vitals; unconstrained, it usually fails LCP on mobile.",
        },
        {
          q: "Can I keep the animations?",
          a: "Most of them, yes — below the fold and expressed as transforms rather than layout changes, animation costs little. What we ration is what runs before first paint, and everything respects prefers-reduced-motion.",
        },
        {
          q: "Should I be on Spotlight or Dawn?",
          a: "If your merchandising is genuinely image-led and Spotlight's compositions match how you want to sell, it earns its licence. If you want a specific bespoke design, Dawn plus custom sections gets there for less.",
        },
        {
          q: "Will you strip features I might want later?",
          a: "Only ones you confirm at scoping, and the removals are listed in the change log so any of them can be restored. Nothing is deleted quietly.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Prestige customization", href: "/customization/prestige/", note: "The other premium theme we see most" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "Holding the budget" },
        { label: "Custom fonts", href: "/customization/fonts/", note: "Display type without layout shift" },
        { label: "Mobile layout", href: "/customization/mobile/", note: "Editorial layouts on a phone" },
        { label: "Themes we support", href: "/themes/", note: "How Spotlight compares" },
        { label: "Case studies", href: "/work/", note: "An editorial rebuild, documented" },
      ],
    },
    ctaBlock(
      "Running Spotlight?",
      "Send the store URL. We will tell you what your current pages cost in Core Web Vitals terms and what a customization pass would change, within two business days."
    ),
  ],
};
