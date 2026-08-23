import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/product-page/",
  title: "Shopify Product Page Customization That Earns Its Cost",
  description:
    "Shopify product page customization: variant and stock logic, bundles, size guides, sticky add-to-cart, review placement and mobile gallery behaviour. Scope, examples and pricing.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "Shopify product page customization",
    supporting: [
      "customize Shopify product page",
      "Shopify product page template",
      "Shopify variant picker customization",
      "Shopify sticky add to cart",
    ],
  },
  hero: {
    eyebrow: "Product page",
    h1: "The product page is where customization pays for itself",
    lede: "Every other template exists to deliver a visitor here. It is also the template with the most logic — variants, inventory, pricing, subscriptions, bundles — which makes it the one where a generic theme layout costs you the most and a considered one repays fastest.",
    meta: ["From $2,800", "1–2 weeks", "Mobile behaviour included, not bolted on"],
    cta: { label: "Get a product page quote", href: "/hire/" },
    secondary: { label: "See conversion work", href: "/services/conversion-optimization/" },
    visual: "overlap-product",
    backdrop: "aurora",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The hard part",
      heading: "Variant logic is where themes quietly get it wrong",
      body: [
        "Stock themes handle the simple case: three sizes, all in stock. Real catalogues are messier — combinations that do not exist, options available in one colour only, pre-orders alongside in-stock items, price differences between variants that the picker never surfaces.",
        "The result is a picker that lets a visitor choose something they cannot buy and only reveals it at the button. That is a conversion problem disguised as a styling problem, and it is the first thing we look at on any product page project.",
      ],
      bullets: [
        "Unavailable combinations shown as unavailable before they are clicked",
        "Per-variant price, image and stock state kept in sync",
        "Pre-order, backorder and low-stock states written honestly",
        "Selling plans surfaced without the app's default widget",
      ],
      visual: "product-page",
      caption: "Variant picker, bundle block and add-to-cart in one template",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "What we build here",
      heading: "The changes that come up most",
      lede: "Ordered roughly by how often they turn out to be the right thing to do.",
      columns: 3,
      items: [
        {
          meta: "Most common",
          title: "Bundles and complete-the-look",
          body: "Related products with real variant awareness, sourced from a collection or metafield so merchandising controls it without code.",
        },
        {
          meta: "Mobile",
          title: "Sticky add-to-cart",
          body: "The primary action stays reachable once the gallery is scrolled past — with the variant state visible, not hidden behind a tap.",
        },
        {
          meta: "Content",
          title: "Size guides and spec tables",
          body: "Metafield-driven, so measurements are updated by whoever owns the product data rather than by a developer.",
        },
        {
          meta: "Trust",
          title: "Delivery and returns near the button",
          body: "Shipping thresholds and return terms placed where the decision happens instead of in a footer link.",
        },
        {
          meta: "Media",
          title: "Gallery behaviour on mobile",
          body: "Swipe, zoom and video handled deliberately, with images sized to the viewport rather than the desktop container.",
        },
        {
          meta: "Social proof",
          title: "Review placement",
          body: "App blocks positioned where they support the decision, with their script cost measured rather than assumed.",
        },
      ],
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Templates",
      heading: "One product page is rarely enough",
      body: [
        "Most catalogues contain two or three genuinely different kinds of product, and forcing them through one template means every one of them is a compromise. Shopify supports multiple product templates assigned per product, and using them is usually cheaper than building one template that tries to serve everything.",
        "A typical split: a standard template, one for products needing a size chart and fit guidance, and one for bundles or subscriptions. Each is simpler than the compromise version would have been.",
      ],
      bullets: [
        "Multiple product templates, assigned per product",
        "Sections shared between them, not duplicated",
        "Template choice exposed to merchandising in the admin",
        "Structured data valid on every variation",
      ],
      visual: "code-template",
      caption: "A JSON template: section order without touching Liquid",
    },
    priceBlock({
      heading: "Product page pricing",
      lede: "A full product template rebuild, including mobile behaviour and every new block it needs, is second-tier work. A single addition — a bundle block, a size guide — is the first.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Can you customize the product page without an app?",
          a: "Almost always, and it is usually the better answer. Apps that inject product-page content cost a monthly fee and a script on your highest-intent page, and their output does not follow you to a new theme. The exceptions are genuine app functionality — subscriptions, reviews — where we place the app's own blocks rather than reimplement them.",
        },
        {
          q: "Will a rebuilt product page change my conversion rate?",
          a: "It might, and we will not tell you by how much. What we will do is name which step of your funnel the change targets and make sure a baseline is recorded before publish, so you can judge it against your own data rather than our claim.",
        },
        {
          q: "Do you keep my review and subscription apps working?",
          a: "Yes. Their app blocks are re-placed in the new template and tested, including in the theme editor. Script tags from apps you no longer use get removed, which is often the largest speed win on a product page.",
        },
        {
          q: "How long does a product page project take?",
          a: "One to two weeks for a rebuild, including QA at five widths. The variable is usually how many product types have to be supported, not the design.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Mobile layout", href: "/customization/mobile/", note: "Where most product views happen" },
        { label: "Conversion optimization", href: "/services/conversion-optimization/", note: "Choosing what to change" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "The blocks this template needs" },
        { label: "Liquid customization", href: "/customization/liquid/", note: "Variant and stock logic" },
        { label: "Case studies", href: "/work/", note: "Product page rebuilds we shipped" },
        { label: "Pricing", href: "/pricing/", note: "Where this sits on the ladder" },
      ],
    },
    ctaBlock(
      "Send a product URL",
      "One representative product page and a note on what is missing. You get a scoped quote with a fixed price and a delivery date within two business days."
    ),
  ],
};
