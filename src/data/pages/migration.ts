import type { PageContent } from "@/types/page";
import { ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/migration/",
  title: "Shopify Online Store 2.0 Migration: Rebuild, Not Copy",
  description:
    "Migrating a legacy Shopify theme to Online Store 2.0: what transfers, what has to be rebuilt as sections and schema, how long it takes, what it costs, and when patching is still the cheaper answer.",
  seo: {
    intent: "commercial",
    primary: "Shopify Online Store 2.0 migration",
    supporting: [
      "migrate legacy Shopify theme",
      "Shopify 2.0 upgrade",
      "Brooklyn to Dawn migration",
      "Shopify theme migration cost",
    ],
  },
  hero: {
    eyebrow: "Migration",
    h1: "Online Store 2.0 migration, with your customizations rebuilt rather than lost",
    lede: "A theme migration is not a file copy. Sections, settings and custom code do not transfer between themes, so the real work is rebuilding what your store does today inside an architecture that will still accept changes next year. That is the job we scope and price.",
    meta: ["From $4,200", "2–3 weeks typical", "Live store untouched until launch"],
    cta: { label: "Get a migration quote", href: "/hire/" },
    secondary: { label: "Compare themes first", href: "/themes/" },
    visual: "migration",
    backdrop: "beams",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The tipping point",
      heading: "When migrating costs less than patching again",
      body: [
        "Legacy themes are not hopeless. One or two contained requests are usually cheaper to patch than to migrate. The problem is cumulative: each workaround sits on top of the last, so the third or fourth significant request costs more than the first did.",
        "The tipping point arrives when the total you have spent on workarounds passes what a migration would have cost — and from that point every further request is more expensive than it needed to be. During scoping we will tell you which side of that line your request is on, including when the answer means we bill you less.",
      ],
      bullets: [
        "One or two contained changes: patch the legacy theme",
        "A queue of requests, or a redesign: migrate first",
        "Sections needed on more than the homepage: migrate",
        "Metafields or app blocks required: migrate",
      ],
      visual: "ceiling",
      caption: "The editor ceiling you are migrating toward",
      media: "right",
    },
    {
      type: "table",
      eyebrow: "Reality check",
      heading: "What transfers, and what gets rebuilt",
      lede: "The honest inventory. Anything in the right column is work, and pretending otherwise is how migrations overrun.",
      columns: ["Item", "Transfers automatically?", "What actually happens"],
      rows: [
        ["Products, collections, customers, orders", "Yes", "Store data is platform-level and untouched by a theme change."],
        ["Page and blog content", "Yes", "Content stays; the templates rendering it are new."],
        ["Theme settings (colours, type, layout)", "No", "Re-declared in the new theme's settings schema."],
        ["Homepage sections and their content", "No", "Rebuilt as 2.0 sections, then repopulated."],
        ["Custom sections from the old theme", "No", "Rewritten with schema so they are editable everywhere, not only the homepage."],
        ["Custom Liquid, CSS and JS", "No", "Ported deliberately, into asset files rather than core templates."],
        ["App embeds and script tags", "Partly", "App blocks re-placed; leftover script tags from removed apps cleaned out."],
        ["Metafield definitions", "Yes", "Definitions persist; the templates that surface them are new."],
        ["SEO: URLs, titles, redirects", "Yes", "Unaffected by a theme change, and we verify rather than assume."],
      ],
      note: "This is also why a migration is quoted separately from customization: the deliverable is a rebuild of behaviour, not an upgrade button.",
      tone: "tint",
    },
    {
      type: "steps",
      eyebrow: "How we run it",
      heading: "Migration, stage by stage",
      lede: "Two to three weeks for a typical catalogue, entirely on a staging theme.",
      items: [
        {
          title: "Inventory the current theme",
          body: "Every template, every custom section, every hand-edit and every app touchpoint gets listed. This document is what makes the fixed price possible, and you get a copy whether or not you hire us.",
          meta: "Week 1",
        },
        {
          title: "Choose the destination theme",
          body: "Usually Dawn, sometimes a premium 2.0 theme when its feature set genuinely matches your merchandising. We argue for the cheaper option when it is the better one.",
          meta: "Week 1",
        },
        {
          title: "Rebuild templates and sections",
          body: "Each surface rebuilt as JSON templates with schema-driven sections, so your team can reorder and edit what used to be hard-coded.",
          meta: "Weeks 1–2",
        },
        {
          title: "Port custom code deliberately",
          body: "Old Liquid and CSS is not pasted across. It is rewritten into asset files and snippets, dropping the workarounds the legacy architecture forced.",
          meta: "Week 2",
        },
        {
          title: "Parity QA, then publish",
          body: "Side-by-side check of every template against the live theme, at five widths, plus Core Web Vitals before and after. Then publish, with the old theme kept one click away.",
          meta: "Week 3",
        },
      ],
      visual: "timeline",
    },
    {
      type: "showcase",
      eyebrow: "Before and after",
      heading: "What changes for whoever edits the store",
      body: [
        "The visible result of a good migration is not that the storefront looks different. It is that the next change to it does not need us: content that was buried in Liquid becomes a field in the theme editor, and a section that only worked on the homepage now works on any page.",
      ],
      visual: "sections",
      caption: "One section definition, reorderable instances your team controls",
      tone: "dark",
      backdrop: "mesh",
    },
    {
      type: "faq",
      items: [
        {
          q: "Will migrating hurt my SEO?",
          a: "A theme change does not alter your URLs, titles, meta descriptions or redirects — those live at the store level. The risks worth managing are template-level: structured data, heading hierarchy, image alt text and page speed. We check all four against the old theme before publishing.",
        },
        {
          q: "How long does a 2.0 migration take?",
          a: "Two to three weeks for a typical store, longer if the legacy theme carries a large amount of custom code or you want design changes at the same time. Combining a migration with a redesign is often efficient — you are rebuilding the templates either way.",
        },
        {
          q: "Can I keep my current design exactly?",
          a: "Yes. Visual parity is a valid goal and the cheapest kind of migration to scope, because every decision is already made. We will still flag places where the old design was working around a limitation the new theme does not have.",
        },
        {
          q: "What happens to my apps?",
          a: "App blocks are re-placed in the new templates, and app embeds re-enabled. Script tags left behind by apps you no longer pay for get removed, which on most legacy stores is the single easiest speed win available.",
        },
        {
          q: "Do I have to migrate at all?",
          a: "No. If your theme is doing its job and you have no queue of pending changes, migrating buys you nothing today. The reason to do it is that it lowers the cost of every change after it.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Legacy theme customization", href: "/customization/legacy-themes/", note: "Patching, and its limits" },
        { label: "Themes we support", href: "/themes/", note: "Where you are migrating to" },
        { label: "Dawn customization", href: "/customization/dawn/", note: "The usual destination" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "What gets rebuilt" },
        { label: "Change your theme", href: "/guides/change-theme/", note: "Doing it yourself, carefully" },
        { label: "Pricing", href: "/pricing/", note: "Where migration sits" },
      ],
    },
    ctaBlock(
      "Find out whether to migrate or patch",
      "Send your store URL and the changes you are considering. We will tell you which is cheaper for you over the next year, with both numbers, within two business days."
    ),
  ],
};
