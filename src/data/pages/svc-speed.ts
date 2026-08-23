import type { PageContent } from "@/types/page";
import { CRUMB_SERVICES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/services/speed-optimization/",
  title: "Shopify Speed Optimization at the Theme Level",
  description:
    "Shopify speed optimization that fixes causes rather than scores: render-blocking assets, image pipeline, third-party scripts, unused sections and Core Web Vitals measured before and after.",
  breadcrumbs: CRUMB_SERVICES,
  seo: {
    intent: "commercial",
    primary: "Shopify speed optimization",
    supporting: [
      "Shopify page speed service",
      "improve Shopify Core Web Vitals",
      "Shopify LCP optimization",
      "Shopify site slow fix",
    ],
  },
  hero: {
    eyebrow: "Speed",
    h1: "Speed work on the causes, not on the score",
    lede: "A Lighthouse number is a symptom. The causes on a Shopify store are almost always the same five, in the same order, and four of them live in the theme. We fix those, measure Core Web Vitals on real page views before and after, and tell you which remaining costs are apps you chose.",
    meta: ["From $2,400", "1–2 weeks", "Before/after field data"],
    cta: { label: "Get a speed audit quote", href: "/hire/" },
    secondary: { label: "See pricing", href: "/pricing/" },
    visual: "speed",
    backdrop: "beams",
    tone: "dark",
  },
  blocks: [
    {
      type: "cards",
      eyebrow: "The five causes",
      heading: "In the order they usually matter",
      lede: "We work down this list rather than down a Lighthouse report, because a report ranks findings by how easy they are to detect, not by what they cost your visitors.",
      columns: 3,
      items: [
        {
          meta: "1 — biggest",
          title: "Third-party scripts",
          body: "Apps you removed but whose script tags stayed, chat widgets, review bundles, three analytics tools measuring the same session. Usually the single largest win available.",
        },
        {
          meta: "2",
          title: "Images",
          body: "Full-resolution uploads served to a 390px viewport, no width descriptors, no lazy loading below the fold, hero images that are not preloaded.",
        },
        {
          meta: "3",
          title: "Render-blocking assets",
          body: "Vendor CSS loaded in full for every template, webfonts without swap behaviour, JavaScript in the head that could have waited.",
        },
        {
          meta: "4",
          title: "Unused theme code",
          body: "Premium themes ship far more than most stores use. Dormant sections still load, still parse, and still get shipped to every visitor.",
        },
        {
          meta: "5",
          title: "Layout instability",
          body: "Images without dimensions, late-loading banners, webfont swaps that reflow text. Cheap to fix, and CLS is the vital most stores fail on.",
        },
        {
          meta: "Not on the list",
          title: "The score itself",
          body: "We do not chase a number by deferring things that make the page usable. If a change trades interactivity for a green bar, we will not ship it.",
        },
      ],
    },
    {
      type: "split",
      eyebrow: "Method",
      heading: "Field data first, lab data second",
      body: [
        "Lighthouse runs on a simulated device on your network. Your customers do not. So the baseline we work against is field data — Core Web Vitals from real sessions, segmented by device — with lab runs used only to isolate a specific cause.",
        "That distinction changes priorities. Stores routinely pass a lab audit and fail on real phones, because the lab does not model a mid-range Android on a cold cache with four apps loading.",
      ],
      bullets: [
        "Baseline from real page views, split desktop and mobile",
        "Per-template measurement: home, collection, product, cart",
        "Cause isolated before anything is changed",
        "Re-measured after publish, not only at handover",
      ],
      visual: "funnel",
      caption: "Which template a slow session actually costs you",
      media: "right",
      tone: "tint",
    },
    {
      type: "table",
      eyebrow: "Targets",
      heading: "What good looks like",
      lede: "Google's published thresholds, per metric, at the 75th percentile of real sessions.",
      columns: ["Metric", "Good", "Needs work", "What usually causes a failure on Shopify"],
      rows: [
        ["LCP — Largest Contentful Paint", "Under 2.5s", "2.5–4.0s", "Unpreloaded hero image, render-blocking vendor CSS, webfont blocking text"],
        ["INP — Interaction to Next Paint", "Under 200ms", "200–500ms", "Third-party script work on the main thread, oversized cart-drawer JavaScript"],
        ["CLS — Cumulative Layout Shift", "Under 0.1", "0.1–0.25", "Images without dimensions, injected banners, late webfont swap"],
        ["TTFB — Time to First Byte", "Under 800ms", "800ms–1.8s", "Rarely the theme: usually a Liquid loop over a large collection without pagination"],
      ],
      note: "We report against these, not against a composite score, because they are the numbers that correlate with what a visitor experiences.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Can you guarantee a Lighthouse score of 90?",
          a: "No, and anyone who does is either deferring scripts that your store needs or has not seen your app stack. What we commit to is fixing the theme-level causes, reporting the before and after in field data, and telling you exactly which remaining cost belongs to which app so the next decision is yours.",
        },
        {
          q: "Will you remove my apps?",
          a: "We will tell you what each one costs in milliseconds and let you decide. What we remove without asking is dead weight: script tags and asset files left behind by apps you already uninstalled, which on most stores is several hundred kilobytes of nothing.",
        },
        {
          q: "Is speed work worth it if my store converts fine?",
          a: "Sometimes not, and we will say so. If your field data already passes all three vitals, the money is better spent on the product page. Speed work pays when you are failing LCP or INP on mobile, because that is where sessions are being abandoned before anyone sees the merchandising.",
        },
        {
          q: "Does a faster theme help SEO?",
          a: "Core Web Vitals are a ranking signal, but a modest one — content and links matter more. The stronger argument is commercial rather than editorial: a mobile session that takes five seconds to render loses visitors regardless of where it ranked.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Custom fonts", href: "/customization/fonts/", note: "Load behaviour and layout shift" },
        { label: "Mobile layout", href: "/customization/mobile/", note: "Where speed is felt" },
        { label: "Legacy themes", href: "/customization/legacy-themes/", note: "Often the underlying cause" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "Designed against a budget" },
        { label: "Conversion optimization", href: "/services/conversion-optimization/", note: "The other half of the story" },
        { label: "Pricing", href: "/pricing/", note: "Where speed work sits" },
      ],
    },
    ctaBlock(
      "Send the store and we will name the cause",
      "You get the five causes ranked for your store, with what each one is costing you and what fixing it involves, within two business days."
    ),
  ],
};
