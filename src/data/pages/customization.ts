import type { PageContent } from "@/types/page";
import { CRUMB_SERVICES, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/",
  title: "Shopify Theme Customization: Every Layer, Priced",
  description:
    "Shopify theme customization by layer and by page: Liquid, CSS, fonts, sections, schema, product pages, mobile layout and no-code changes. What each involves and what it costs.",
  breadcrumbs: CRUMB_SERVICES,
  seo: {
    intent: "commercial",
    primary: "Shopify theme customization",
    supporting: [
      "customize Shopify theme",
      "Shopify theme customization service",
      "Shopify Liquid customization",
      "custom Shopify sections",
    ],
  },
  hero: {
    eyebrow: "Customization",
    h1: "Shopify theme customization, layer by layer",
    lede: "Customization means changing the theme you already own rather than replacing it. This page splits the work into the layers a theme is actually made of, so you can see which one your request lives in and what that implies for cost, timeline and how much stays editable afterwards.",
    meta: ["Dawn, Prestige, Spotlight, legacy", "Staging theme always", "Handover notes included"],
    cta: { label: "Get a scoped quote", href: "/hire/" },
    secondary: { label: "See the price ladder", href: "/pricing/" },
    visual: "overlap-editor",
    backdrop: "mesh",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "Where the line sits",
      heading: "Every store hits the same wall",
      body: [
        "Theme settings carry you a long way. Then one request needs code, and the cost of that request changes by an order of magnitude. Customization is the work on both sides of that line, and projects go wrong when nobody names where the line is before the budget is agreed.",
        "So we name it during scoping. Each request in your list gets sorted into editor-reachable or code-level, and the scope document tells you which is which. A colour change and a new product page look similar on a wishlist and differ by a factor of ten in practice.",
      ],
      bullets: [
        "Editor-reachable: colours, type, section order, spacing, content",
        "Code-level: new sections, Liquid logic, custom JS, schema",
        "Outside theme work: apps, checkout, inventory, platform limits",
      ],
      visual: "ceiling",
      caption: "Editor reach by theme generation",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "By layer",
      heading: "The layers a theme is made of",
      lede: "Six pages, one per layer. Each explains what changes, what stays editable afterwards, and where that layer's ceiling is.",
      columns: 3,
      items: [
        {
          meta: "Templates and logic",
          title: "Liquid customization",
          body: "Template and object logic: conditional content, variant behaviour, metafield output, loops that respect your catalogue's edge cases.",
          href: "/customization/liquid/",
        },
        {
          meta: "Styling",
          title: "Custom CSS",
          body: "Styling written into asset stylesheets rather than the theme editor's custom-CSS box, so it survives updates and stays readable.",
          href: "/customization/css/",
        },
        {
          meta: "Typography",
          title: "Custom fonts",
          body: "Licensed webfonts installed, self-hosted, declared with a measured fallback so nothing shifts while they load.",
          href: "/customization/fonts/",
        },
        {
          meta: "Components",
          title: "Sections and blocks",
          body: "New building blocks with real settings, so your team can place, reorder and edit them without paying for a text change.",
          href: "/customization/sections/",
        },
        {
          meta: "Settings",
          title: "Theme schema",
          body: "The JSON that decides what a merchant can control. Get it wrong and every future edit is a support request.",
          href: "/customization/schema/",
        },
        {
          meta: "No code",
          title: "Customizing without code",
          body: "What you can genuinely do yourself in the theme editor, and the point at which doing it yourself starts costing more than it saves.",
          href: "/customization/no-code/",
        },
      ],
    },
    {
      type: "cards",
      eyebrow: "By page and theme",
      heading: "Customization by surface",
      lede: "Some requests are best described by where they happen rather than which layer they touch.",
      columns: 3,
      tone: "tint",
      items: [
        {
          meta: "Highest leverage",
          title: "Product page",
          body: "Variant logic, bundles, size guides, sticky add-to-cart, review placement — the template that decides most orders.",
          href: "/customization/product-page/",
        },
        {
          meta: "Most traffic",
          title: "Mobile layout",
          body: "Thumb reach, tap targets, image weight, sticky bars. Built mobile-first rather than shrunk from desktop.",
          href: "/customization/mobile/",
        },
        {
          meta: "Free, 2.0",
          title: "Dawn customization",
          body: "Shopify's reference theme: the highest ceiling, the cleanest update path, and the one we recommend most often.",
          href: "/customization/dawn/",
        },
        {
          meta: "Premium",
          title: "Prestige customization",
          body: "Working with the vendor's conventions so your changes survive the next Prestige release rather than being overwritten.",
          href: "/customization/prestige/",
        },
        {
          meta: "Premium",
          title: "Spotlight customization",
          body: "Editorial layouts, heavy imagery, and the performance work that stops a visual theme feeling slow.",
          href: "/customization/spotlight/",
        },
        {
          meta: "Pre-2.0",
          title: "Legacy themes",
          body: "Debut, Brooklyn, Minimal, Supply, Turbo, Narrative. What is still worth patching and when to migrate instead.",
          href: "/customization/legacy-themes/",
        },
      ],
    },
    priceBlock({ heading: "Customization pricing" }),
    {
      type: "faq",
      items: [
        {
          q: "Can any Shopify theme be customized?",
          a: "Yes, but the ceiling differs. Online Store 2.0 themes expose far more through the editor, so more of the work stays editable after handover. Legacy themes need code for changes a 2.0 theme handles in settings, which makes the same request cost more.",
        },
        {
          q: "Will customization survive a theme update?",
          a: "It depends where the code lives. Editor settings and separate asset files carry over cleanly. Direct edits to core theme files get overwritten when the vendor ships an update. We write update-safe wherever the theme's structure allows and document every exception in your handover notes.",
        },
        {
          q: "Do I lose my customizations if I switch themes later?",
          a: "Section content and settings do not transfer between themes, and neither does custom code. That is the real cost of a theme change and the reason we quote migration separately: the work is rebuilding your customizations in the new theme's architecture, not copying files.",
        },
        {
          q: "How much of the work can my team edit afterwards?",
          a: "As much as the theme allows, because we build settings for it deliberately. Every custom section ships with schema, so headings, images, product sources and layout options are merchant-editable. Where something genuinely has to be hard-coded, the handover notes say so and why.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Online Store 2.0 migration", href: "/migration/", note: "When patching costs more than moving" },
        { label: "Themes we support", href: "/themes/", note: "Ceilings by theme generation" },
        { label: "Process", href: "/process/", note: "Scope, stage, build, hand over" },
        { label: "Custom development vs customization", href: "/custom-theme-development/", note: "Which one you actually need" },
        { label: "Case studies", href: "/work/", note: "What these layers look like shipped" },
        { label: "Guides", href: "/guides/", note: "Editor walkthroughs and DIY limits" },
      ],
    },
    ctaBlock(
      "Send the list of changes you want",
      "Store URL plus a short description is enough. You get the changes sorted into editor-level and code-level, with a fixed price and a delivery date, within two business days."
    ),
  ],
};
