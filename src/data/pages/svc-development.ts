import type { PageContent } from "@/types/page";
import { CRUMB_SERVICES, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/services/shopify-development/",
  title: "Shopify Development Services: Sections, Liquid and JS",
  description:
    "Shopify development inside your theme: custom sections with schema, Liquid logic, metafield-driven content, custom elements and app block placement. What we build, what we do not, and what it costs.",
  breadcrumbs: CRUMB_SERVICES,
  seo: {
    intent: "commercial",
    primary: "Shopify development services",
    supporting: [
      "Shopify developer for hire",
      "custom Shopify sections",
      "Shopify Liquid developer",
      "Shopify metafields development",
    ],
  },
  hero: {
    eyebrow: "Development",
    h1: "Shopify development, inside the theme rather than around it",
    lede: "Development is the work a theme setting cannot reach: new sections with their own schema, Liquid that expresses your catalogue's real rules, JavaScript behaviour that survives the theme editor re-rendering a section. All of it written so your team keeps control afterwards.",
    meta: ["From $2,800", "Theme layer only", "Schema on everything we build"],
    cta: { label: "Get a development quote", href: "/hire/" },
    secondary: { label: "Or read the Liquid page", href: "/customization/liquid/" },
    visual: "code-liquid",
    backdrop: "grid",
    tone: "dark",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "What we build",
      heading: "Behaviour the theme does not ship with",
      body: [
        "Most development requests are one of five things: a section that does not exist, logic your catalogue needs, content pulled from metafields, an interaction the theme has no pattern for, or an app's output placed somewhere its own block cannot reach.",
        "All five are theme-layer work, which is why they are quoted like customization rather than like software. What they share is a rule: whatever we build gets settings, so the second version of it is your team's job rather than a new quote.",
      ],
      bullets: [
        "Custom sections and blocks with full schema",
        "Liquid logic: variants, inventory states, per-collection rules",
        "Metafield-driven content areas and templates",
        "Custom elements for interaction that re-initialises cleanly",
        "App block placement and dead script-tag cleanup",
      ],
      visual: "code-schema",
      caption: "Schema is what makes a build editable rather than fixed",
      media: "right",
    },
    {
      type: "split",
      eyebrow: "How we write it",
      heading: "Custom elements, not scripts bolted to the page",
      body: [
        "The theme editor tears sections out of the DOM and re-inserts them whenever a merchant edits a setting. Any behaviour attached with a one-time selector query breaks the moment that happens — which is why so much custom Shopify JavaScript works on the storefront and dies in the editor.",
        "We write interaction as custom elements instead. They initialise themselves when the theme editor injects a section and tear down when it is removed, so what you see while editing is what a customer gets.",
      ],
      bullets: [
        "Self-initialising, self-cleaning components",
        "No jQuery added, no global namespace pollution",
        "Reduced-motion respected at the component level",
        "Progressive: the markup works before the script runs",
      ],
      visual: "code-js",
      caption: "A component that survives the theme editor re-rendering it",
      tone: "tint",
    },
    {
      type: "checklist",
      eyebrow: "Boundaries",
      heading: "What we build, and what we decline",
      lede: "Naming this now is cheaper for both of us than discovering it in week two.",
      groups: [
        {
          title: "In scope",
          items: [
            "Sections, blocks, snippets and templates",
            "Liquid, theme CSS and theme JavaScript",
            "Storefront API calls made from the theme",
            "Metafield and metaobject-driven content",
            "Checkout branding and Plus checkout extensions",
          ],
        },
        {
          title: "Not our work",
          limit: true,
          body: "We will name who does it well rather than take it on badly.",
          items: [
            "Public or custom Shopify apps",
            "Checkout logic on non-Plus plans, which Shopify does not expose",
            "ERP, PIM and inventory system integration",
            "Payment gateway or fulfilment provider development",
            "Anything requiring server-side infrastructure we would then have to host",
          ],
        },
      ],
      note: "If your request genuinely needs an app, we say so early. Paying theme rates for something that has to be an app is the most expensive mistake in this category.",
    },
    priceBlock({
      heading: "Development pricing",
      lede: "Development is quoted on the same ladder as customization, because it is the same file tree. Most single-component builds land in the first two tiers.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Do you build Shopify apps?",
          a: "No. We work in the theme layer. When a request genuinely needs an app — background jobs, data outside the theme's reach, logic that must run without a page view — we say so and point you at people who build them, rather than approximating it in Liquid.",
        },
        {
          q: "Will your code survive a theme update?",
          a: "New files always do. Where a change has to touch a core theme file, it is logged in your handover notes with what to re-apply after an upgrade. That log is the difference between a theme you can update and one you are locked out of.",
        },
        {
          q: "Can you work with our existing developer?",
          a: "Yes, and it is common. We follow their branch and staging conventions, keep our changes in separate files where the theme allows, and write the change log to be readable by someone who was not on the project.",
        },
        {
          q: "Do you use a page builder app instead of code?",
          a: "Only if you already run one and want to keep it. Page builder apps trade a monthly fee and a permanent script for speed you could have had for free, and they make the resulting page hard for anyone else to maintain.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Liquid customization", href: "/customization/liquid/", note: "Template and object logic" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "What we build most" },
        { label: "Theme schema", href: "/customization/schema/", note: "Why settings matter" },
        { label: "Custom development vs customization", href: "/custom-theme-development/", note: "Which you need" },
        { label: "Product page work", href: "/customization/product-page/", note: "The usual target" },
        { label: "Pricing", href: "/pricing/", note: "The ladder in full" },
      ],
    },
    ctaBlock(
      "Describe the behaviour you need",
      "Send the store URL and what the theme cannot currently do. We will tell you whether it is a theme build, an app, or something Shopify simply does not allow — within two business days."
    ),
  ],
};
