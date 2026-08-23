import type { PageContent } from "@/types/page";
import { CRUMB_SERVICES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/services/conversion-optimization/",
  title: "Shopify Conversion Optimization: Theme-Level CRO",
  description:
    "Shopify conversion rate optimization done in the theme: product page clarity, variant and stock states, cart and collection friction, mobile reach. Aimed at the step your analytics says is leaking.",
  breadcrumbs: CRUMB_SERVICES,
  seo: {
    intent: "commercial",
    primary: "Shopify conversion rate optimization",
    supporting: [
      "Shopify CRO agency",
      "improve Shopify conversion rate",
      "Shopify product page optimization",
      "Shopify cart abandonment theme",
    ],
  },
  hero: {
    eyebrow: "Conversion",
    h1: "Conversion work aimed at the step that is actually leaking",
    lede: "There is no generic list of changes that raises a conversion rate. There is your funnel, one step in it where visitors are dropping, and a theme surface responsible for that step. We find which one, change it properly, and tell you what to measure — without promising a percentage nobody can honestly promise.",
    meta: ["From $2,800", "Analytics-led, not checklist-led", "No invented uplift claims"],
    cta: { label: "Get a CRO quote", href: "/hire/" },
    secondary: { label: "Product page work", href: "/customization/product-page/" },
    visual: "funnel",
    backdrop: "dots",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "Where we start",
      heading: "The funnel first, the opinions second",
      body: [
        "Before touching a template we look at where sessions end: landing, collection, product view, variant selection, add to cart, cart view, checkout start. One of those transitions is materially worse than the others, and it is rarely the one people assume.",
        "That step maps to a theme surface. Product views not converting to add-to-cart is a product template problem. Collection views not converting to product views is a filtering and merchandising problem. Cart views not reaching checkout is usually cost surprise, which is a content problem, not a design one.",
      ],
      bullets: [
        "Segment by device before drawing any conclusion",
        "Compare against your own history, not an industry average",
        "One change at a time where traffic allows attribution",
        "Say plainly when traffic is too low to attribute anything",
      ],
      visual: "funnel",
      caption: "Each step, and the theme surface responsible for it",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "The work itself",
      heading: "What actually gets changed",
      lede: "In our experience these are the theme-level changes that move numbers most often — but which of them applies is a question your data answers, not this page.",
      columns: 3,
      items: [
        {
          meta: "Product template",
          title: "Variant and stock clarity",
          body: "A picker that shows what is unavailable before it is clicked, and a stock state that reads the same on mobile as on desktop.",
        },
        {
          meta: "Product template",
          title: "Cost and delivery honesty",
          body: "Shipping thresholds, delivery estimates and return terms placed near the button rather than in a footer link nobody opens.",
        },
        {
          meta: "Product template",
          title: "Sticky add-to-cart on mobile",
          body: "Once the gallery is scrolled past, the primary action should still be reachable by a thumb. Sizeable, and easy to get wrong.",
        },
        {
          meta: "Collection",
          title: "Filtering that matches the catalogue",
          body: "Filters built from real metafields rather than the theme's defaults, so a visitor can express what they came for.",
        },
        {
          meta: "Cart",
          title: "Cart friction and cross-sell",
          body: "Drawer versus page, quantity behaviour, and cross-sell placed where it does not compete with checkout.",
        },
        {
          meta: "Everywhere",
          title: "Speed on mobile",
          body: "The cheapest conversion work there is, and often the only one that matters until it is fixed.",
        },
      ],
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Honesty",
      heading: "What we will not tell you",
      body: [
        "We will not quote you an expected uplift percentage. Any number a theme agency gives you before seeing a test is either an average from someone else's store or an invention, and both are worthless for planning.",
        "We will also tell you when your traffic is too low for a defensible test. Below roughly a few hundred conversions a month, an A/B test on a product page will not reach significance in a useful timeframe — which does not mean the change is wrong, only that you should treat it as a judgement call rather than a measured result.",
      ],
      bullets: [
        "No uplift promises, before or after",
        "Traffic honesty: sometimes you cannot test, only decide",
        "One variable at a time when attribution matters",
        "Baseline recorded before publish so you can judge afterwards",
      ],
      visual: "before-after",
      caption: "What changed, so you can judge it against your own data",
    },
    {
      type: "faq",
      items: [
        {
          q: "Can you run A/B tests for us?",
          a: "We can build the variants in the theme and integrate with a testing tool you already run. We do not sell testing as a retainer, and on stores below a few hundred monthly conversions we will tell you a test cannot reach significance rather than bill you for one that cannot.",
        },
        {
          q: "How is this different from installing a CRO app?",
          a: "An app injects changes over your theme at runtime, which costs speed and creates a layer nobody can maintain later. We change the theme, so the improvement is in your codebase, loads with the page and does not carry a monthly fee.",
        },
        {
          q: "What if my conversion problem is not the theme?",
          a: "Then we say so and do not take the project. Pricing, product-market fit, traffic quality and delivery cost sit outside the storefront, and no amount of product-page work fixes them.",
        },
        {
          q: "Do you use heatmaps and session recordings?",
          a: "We read them when you already have them, because they are good at showing where attention stops. They are poor at explaining why, so they inform the hypothesis rather than settle it.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Product page customization", href: "/customization/product-page/", note: "The highest-leverage template" },
        { label: "Mobile layout", href: "/customization/mobile/", note: "Where most sessions are" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "Often the first fix" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "How changes stay editable" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "When it is the whole store" },
        { label: "Case studies", href: "/work/", note: "Conversion work we have shipped" },
      ],
    },
    ctaBlock(
      "Send the funnel step that worries you",
      "Store URL plus which step you think is leaking — or a screenshot of your funnel report. We will tell you which theme surface is responsible and what changing it costs, within two business days."
    ),
  ],
};
