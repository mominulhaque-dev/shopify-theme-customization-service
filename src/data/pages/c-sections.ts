import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/sections/",
  title: "Custom Shopify Sections and Blocks, Built to Be Edited",
  description:
    "Custom Shopify sections and blocks with real schema: settings your team controls, reusable presets, app block placement, and why a section without schema costs you every time you need a text change.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "custom Shopify sections",
    supporting: [
      "Shopify section development",
      "Shopify blocks and presets",
      "add custom section to Shopify theme",
      "Shopify app blocks",
    ],
  },
  hero: {
    eyebrow: "Sections and blocks",
    h1: "Custom sections your team can place, reorder and edit",
    lede: "A section is the unit of a modern Shopify theme. Built with schema, it appears in the theme editor with real settings and your team owns it forever. Built without, it looks identical on launch day and costs you a quote every time a heading needs to change.",
    meta: ["From $1,000", "Schema on everything", "Presets included"],
    cta: { label: "Get a section quote", href: "/hire/" },
    secondary: { label: "How schema works", href: "/customization/schema/" },
    visual: "sections",
    backdrop: "dots",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The distinction that matters",
      heading: "Sections, blocks and presets",
      body: [
        "A section is a self-contained region of a page with its own settings. Blocks are the repeatable items inside it — a testimonial, a feature row, an icon and label pair — which a merchant can add, remove and drag. A preset is a starting configuration so the section is useful the moment it is added rather than empty.",
        "Getting this structure right is what decides whether your team can build a landing page next quarter without us. A section with five fixed fields is a dead end; the same section with a block type is a component library.",
      ],
      bullets: [
        "Sections for regions, blocks for repeatable content",
        "Presets so a new instance is immediately usable",
        "Max block counts set deliberately, not left at the default",
        "Section groups for header and footer areas on 2.0 themes",
      ],
      visual: "sections",
      caption: "One definition, three merchant-editable instances",
      media: "right",
    },
    {
      type: "split",
      eyebrow: "What good looks like",
      heading: "A section that fails gracefully",
      body: [
        "The most common defect in custom sections is not a visual bug — it is a section that renders an empty box because a merchant deleted the collection it pointed at, or added it to a page before configuring it.",
        "Every section we build guards for that: no products, no image, no heading, and it either renders nothing or renders a sensible default. That single habit prevents most of the \"the site looks broken\" messages that arrive months after a project closes.",
      ],
      bullets: [
        "Renders nothing rather than an empty frame when unconfigured",
        "Image and product fields with fallbacks",
        "Lazy loading below the fold, eager above it",
        "Works in the theme editor as well as on the storefront",
      ],
      visual: "code-liquid",
      caption: "Guarded output: no products, no section",
      tone: "tint",
    },
    {
      type: "cards",
      eyebrow: "What we build most",
      heading: "Sections merchants ask for repeatedly",
      lede: "If one of these is what you need, we have built it several times and can quote it quickly.",
      columns: 3,
      items: [
        {
          meta: "Product template",
          title: "Bundle / complete-the-look",
          body: "Related products with variant-aware pricing and stock, sourced from a collection or metafield rather than hard-coded.",
        },
        {
          meta: "Product template",
          title: "Size guide and spec tables",
          body: "Metafield-driven tables so the merchandising team updates measurements without touching code.",
        },
        {
          meta: "Home",
          title: "Editorial feature rows",
          body: "Image-and-text rows with alignment, ratio and emphasis settings, so one section covers a dozen layouts.",
        },
        {
          meta: "Home",
          title: "Trust and logo bars",
          body: "Blocks with an icon, a label and an optional link, capped at a count that still looks right on a phone.",
        },
        {
          meta: "Collection",
          title: "Merchandising banners in-grid",
          body: "A promotional tile placed at a chosen position within the product grid rather than above it.",
        },
        {
          meta: "Any page",
          title: "FAQ and accordion",
          body: "Native details/summary markup, keyboard operable, with FAQ structured data generated from the same content.",
        },
      ],
    },
    priceBlock({
      heading: "What a section costs",
      lede: "One section with schema is the first tier. A template's worth of sections, or a reusable library for your team, is the second or third.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Can I add a custom section to any theme?",
          a: "On an Online Store 2.0 theme, yes — and it can be used on any template. On a legacy theme, sections generally only work on the homepage, so the same request often means either a hard-coded template edit or a migration.",
        },
        {
          q: "Will a custom section survive a theme update?",
          a: "Yes, because it is a new file the vendor's release does not touch. The exception is if the section had to be referenced from a core template — that reference is what goes in your handover notes.",
        },
        {
          q: "What happens to my sections if I switch themes?",
          a: "They do not transfer. Section files are theme-specific and their content lives in that theme's template JSON. Rebuilding them in the new theme is the actual work in any theme change, which is why migration is quoted separately.",
        },
        {
          q: "Can you make an existing hard-coded area editable?",
          a: "Usually yes, and it is one of the highest-value small projects available: taking content that is currently buried in Liquid and exposing it as settings. It pays for itself the second time you would have asked us to change a word.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Theme schema", href: "/customization/schema/", note: "The settings layer in detail" },
        { label: "Liquid customization", href: "/customization/liquid/", note: "The logic inside a section" },
        { label: "Shopify development", href: "/services/shopify-development/", note: "Behaviour beyond settings" },
        { label: "Product page", href: "/customization/product-page/", note: "Where sections earn most" },
        { label: "Migration", href: "/migration/", note: "Sections on every page, not just home" },
        { label: "Theme editor guide", href: "/guides/theme-editor/", note: "How your team will use them" },
      ],
    },
    ctaBlock(
      "Describe the section you need",
      "A sketch, a screenshot of someone else's, or a sentence is enough. You get a fixed price and a delivery date within two business days."
    ),
  ],
};
