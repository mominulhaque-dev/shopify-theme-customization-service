import type { PageContent } from "@/types/page";
import { ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/themes/",
  title: "Shopify Themes We Customize: Ceilings and Trade-offs",
  description:
    "Dawn, Refresh, Craft, Prestige, Spotlight, Impulse, Debut, Brooklyn and more. How far customization goes in each, what stays editable, and which theme to choose if you plan to customize.",
  seo: {
    intent: "commercial",
    primary: "Shopify themes we customize",
    supporting: [
      "best Shopify theme for customization",
      "Dawn vs Prestige",
      "Online Store 2.0 themes",
      "legacy Shopify themes",
    ],
  },
  hero: {
    eyebrow: "Themes",
    h1: "Which Shopify themes we customize, and how far each one goes",
    lede: "Every theme has a ceiling. How much customization it absorbs, how much stays editable afterwards, and what a change costs all depend on which theme you started with. These are the ones we work in regularly and know the constraints of by heart.",
    meta: ["Online Store 2.0", "Premium vendor themes", "Legacy and vintage"],
    cta: { label: "Ask about your theme", href: "/hire/" },
    secondary: { label: "Customization services", href: "/services/" },
    visual: "ceiling",
    backdrop: "rings",
  },
  blocks: [
    {
      type: "table",
      eyebrow: "At a glance",
      heading: "Theme generations compared",
      lede: "The single biggest driver of what your customization costs is which of these three rows your theme sits in.",
      columns: ["Generation", "Architecture", "Editor ceiling", "Update path", "Typical cost effect"],
      rows: [
        [
          "Online Store 2.0 (Dawn, Refresh, Craft, Sense, Studio, Ride)",
          "JSON templates, sections on every page, app blocks, metafields",
          "High — most content and layout is merchant-editable",
          "Shopify-maintained, frequent, clean",
          "Baseline",
        ],
        [
          "Premium 2.0 (Prestige, Spotlight, Impulse, Motion, Warehouse, Symmetry)",
          "Section-based with vendor-specific conventions and heavier feature sets",
          "High, but shaped by the vendor's own settings model",
          "Vendor releases; changes must respect their patterns",
          "Similar, plus time spent removing unused features",
        ],
        [
          "Legacy / vintage (Debut, Brooklyn, Minimal, Supply, Turbo, Narrative)",
          "Liquid templates, sections only on the homepage",
          "Low — most changes need code",
          "Largely unmaintained",
          "Higher per request, and rising with each one",
        ],
      ],
      note: "If you are choosing a theme now and expect to customize it, start in the first row. Dawn in particular is free, actively maintained by Shopify, and gives up very little to paid themes once customized.",
    },
    {
      type: "split",
      eyebrow: "Online Store 2.0",
      heading: "Section-based themes: the highest ceiling",
      body: [
        "Sections work on any page, settings live in schema, and the theme editor exposes far more than older themes did. The practical result is that more of what we build stays editable by your team after handover, and future changes cost less.",
        "It also changes how we build. A request that would be hard-coded in a legacy theme becomes a section with settings, which means the next variation of it is your team's job rather than a new quote.",
      ],
      bullets: [
        "JSON templates you can reorder per page",
        "App blocks placed without editing Liquid",
        "Metafield-driven content areas",
        "Cleanest path for future Shopify features",
      ],
      visual: "sections",
      caption: "One section definition, three merchant-editable instances",
      cta: { label: "Dawn customization", href: "/services/" },
      media: "right",
    },
    {
      type: "split",
      eyebrow: "Premium themes",
      heading: "Vendor themes: work with their conventions, not around them",
      body: [
        "Premium themes ship heavier feature sets, and each vendor has its own conventions for how sections and settings are structured. Customization has to respect how that vendor ships updates, otherwise your changes are overwritten the first time you upgrade.",
        "Part of scoping a premium theme is deciding what to remove. Unused sections still load, still need testing, and still confuse whoever edits the store next year.",
      ],
      bullets: [
        "Vendor update path preserved",
        "Unused features stripped deliberately, not left dormant",
        "Overrides in separate files wherever the theme allows",
        "Every core-file edit logged for future upgrades",
      ],
      visual: "code-css",
      caption: "Overrides loaded after the vendor stylesheet, not fighting it",
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Legacy and vintage",
      heading: "Pre-2.0 themes: still customizable, with a tipping point",
      body: [
        "Liquid templates without section support on most pages, so changes a 2.0 theme handles in settings need code here. We customize these every week and they are far from hopeless.",
        "But we will tell you when migrating costs less than another round of patching, which is more often than merchants expect. The tipping point usually arrives on the third or fourth significant request, when workarounds start stacking on each other and each new request costs more than the last.",
      ],
      bullets: [
        "Patch it: one or two contained requests",
        "Migrate it: a queue of requests, or a redesign",
        "Either way: no work happens on your live theme",
      ],
      visual: "migration",
      caption: "What a migration actually rebuilds",
      cta: { label: "Legacy theme customization", href: "/services/" },
      media: "right",
    },
    {
      type: "gallery",
      eyebrow: "Named themes",
      heading: "Theme-specific pages",
      lede: "Where we have enough repeat work in a theme to be specific about its quirks, it gets its own page.",
      horizontal: true,
      items: [
        { visual: "theme-editor", caption: "Dawn", body: "Free, Shopify-maintained, the reference implementation for 2.0. Our default recommendation." },
        { visual: "storefront", caption: "Prestige", body: "Maison Made's flagship. Strong editorial layouts, opinionated settings model." },
        { visual: "product-page", caption: "Spotlight", body: "Image-led and animation-heavy, which makes the performance pass non-optional." },
        { visual: "migration", caption: "Legacy set", body: "Debut, Brooklyn, Minimal, Supply, Turbo, Narrative — patch or migrate." },
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Which Shopify theme is best for customization?",
          a: "Dawn, for most stores. It is free, Shopify maintains it, and because it is the reference implementation of Online Store 2.0 it exposes the cleanest schema surface — so more of what we build stays editable by your team. Premium themes are worth paying for when their out-of-the-box feature set genuinely matches your merchandising.",
        },
        {
          q: "Can you customize a free Shopify theme?",
          a: "Yes. Free themes including Dawn accept custom CSS, custom sections and Liquid changes exactly like paid ones. The difference is what you get out of the box, not the ceiling.",
        },
        {
          q: "How do I find out which theme my store is running?",
          a: "In your admin under Online Store → Themes, the current theme's name and version are listed. If you inherited the store and the name has been changed, the theme's own files usually still identify it, or we can identify it from your store URL.",
        },
        {
          q: "Should I upgrade my theme to the latest version before customizing?",
          a: "Usually yes, and before we start rather than after. Customizing an out-of-date theme then upgrading it means doing parts of the work twice. If the upgrade itself is significant, we quote it as part of scoping so the sequence is deliberate.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Migration to 2.0", href: "/migration/", note: "Rebuild, do not copy" },
        { label: "Customization services", href: "/services/", note: "Work tailored to your theme" },
        { label: "Pricing", href: "/pricing/", note: "What each tier includes" },
      ],
    },
    ctaBlock(
      "Not sure what your theme can take?",
      "Send the store URL. We will tell you which generation your theme belongs to, what your request costs in it, and whether a migration would be cheaper than the work you are asking for."
    ),
  ],
};
