import type { PageContent } from "@/types/page";
import { ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/work/",
  title: "Shopify Theme Customization Case Studies",
  description:
    "Ten documented Shopify theme customization projects: the starting theme, the scope requested, the technical constraint we hit, and what changed. Including the projects that needed a rescope.",
  seo: {
    intent: "commercial",
    primary: "Shopify theme customization case studies",
    supporting: [
      "Shopify agency portfolio",
      "Shopify theme customization examples",
      "Shopify product page rebuild example",
      "Shopify migration case study",
    ],
  },
  hero: {
    eyebrow: "Work",
    h1: "Customization work we have shipped, written up in full",
    lede: "Twenty-five theme projects delivered, ten written up here. Each one lists the starting theme, the scope requested, the technical constraint we hit and what changed in the file tree. Where a decision would go differently today, we say so rather than editing it out.",
    meta: ["25+ projects delivered", "10 documented", "Rescopes included, not hidden"],
    cta: { label: "Start a project", href: "/hire/" },
    secondary: { label: "See pricing", href: "/pricing/" },
    visual: "overlap-product",
    backdrop: "dots",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "Read this first",
      heading: "Why there are no client logos or percentages here",
      body: [
        "Merchant names and revenue figures are published only with that merchant's written sign-off, and most of ours decline — a competitor learning which agency rebuilt their product page is a real cost to them and no benefit at all. So the write-ups identify the category and the theme, not the company.",
        "We also do not publish uplift percentages we cannot show you the methodology for. A conversion figure without the test window, the traffic volume and the other changes shipped that month is decoration. Where a client tracked a specific number, we say which number they tracked and leave the value to them to disclose.",
        "What is left is the part that should decide your hire anyway: what was asked for, what the theme allowed, where it fought back, and what we shipped.",
      ],
      bullets: [
        "Category and theme named; merchant not named",
        "No uplift claims without published methodology",
        "Technical constraints written up, not smoothed over",
        "Two of the ten needed a mid-project rescope, and say so",
      ],
      visual: "before-after",
      caption: "Every write-up covers the surface that changed",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "Ten projects",
      heading: "Case studies by scope",
      lede: "Grouped by the kind of problem rather than by industry — the theme constraint is what repeats, not the vertical.",
      columns: 2,
      items: [
        {
          meta: "Dawn · Page-level build",
          title: "Apparel: variant-aware bundle product page",
          body: "A product page rebuilt around bundles that had to respect per-variant stock, with a size guide block the merchandising team edits themselves.",
        },
        {
          meta: "Prestige · Full customization",
          title: "Home goods: brand system across every template",
          body: "A vendor premium theme restyled store-wide plus a filtered collection rebuild, without breaking the vendor's update path.",
        },
        {
          meta: "Brooklyn → Dawn · Migration",
          title: "Accessories: legacy theme migrated to 2.0",
          body: "Six years of hard-coded homepage sections rebuilt as schema-driven sections that work on any page.",
        },
        {
          meta: "Dawn · Page-level build",
          title: "Supplements: subscription-aware product page",
          body: "Selling plans surfaced without the app's default widget, so one-off and subscription pricing read clearly on mobile.",
        },
        {
          meta: "Craft · Page-level build",
          title: "Furniture: collection filtering that matched the catalogue",
          body: "Faceted filtering rebuilt around real metafields after the stock filter proved unable to express the catalogue's attributes.",
        },
        {
          meta: "Refresh · Full customization",
          title: "Cosmetics: mobile-first conversion pass",
          body: "The product and cart templates rebuilt for thumb reach after analytics showed nine in ten sessions on a phone.",
        },
        {
          meta: "Impulse · Speed work",
          title: "Outdoor gear: theme-level speed rebuild",
          body: "Render-blocking assets, an unbounded image pipeline and four abandoned apps' script tags, in that order of impact.",
        },
        {
          meta: "Spotlight · Multi-template rebuild",
          title: "Jewellery: editorial templates that stayed fast",
          body: "Image-led layouts kept within a Core Web Vitals budget by rationing what could animate above the fold.",
        },
        {
          meta: "Dawn · Multi-template rebuild",
          title: "B2B: wholesale price-list templates",
          body: "Customer-tag-driven templates and a quick-order form, built inside theme limits rather than waiting for Plus.",
        },
        {
          meta: "Turbo · Rescoped",
          title: "Footwear: the project we rescoped in week two",
          body: "A legacy theme where the third request made patching more expensive than migrating. We stopped and requoted.",
        },
      ],
      tone: "tint",
    },
    {
      type: "gallery",
      eyebrow: "What we work on",
      heading: "The surfaces these projects touched",
      lede: "Nine of the ten involved at least one of these four.",
      items: [
        { visual: "product-page", caption: "Product templates", body: "Variant logic, bundles, subscriptions, sticky add-to-cart." },
        { visual: "storefront", caption: "Collection and home", body: "Filtering, merchandising blocks, editorial layouts." },
        { visual: "mobile", caption: "Mobile layout", body: "Thumb reach, tap targets, image weight, sticky bars." },
        { visual: "speed", caption: "Performance", body: "Core Web Vitals held to a budget, measured before and after." },
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Can I speak to a past client?",
          a: "Yes, on request once we are in scoping. Two merchants have agreed to take reference calls, including one whose project we rescoped mid-flight. We will not name them on a public page to do it.",
        },
        {
          q: "Why publish a project that went wrong?",
          a: "Because it is the most useful one to read before hiring anyone. Two of these ten needed a rescope, and both times the cause was the same: a legacy theme where the cost of the next workaround exceeded the cost of migrating. Knowing that pattern is worth more to you than another clean success story.",
        },
        {
          q: "Do you have work in my industry?",
          a: "Probably, but it matters less than merchants expect. What repeats across projects is the theme constraint — variant logic, filtering, mobile layout, legacy architecture — not the vertical. A furniture catalogue and a supplements catalogue hit the same filtering ceiling.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Pricing", href: "/pricing/", note: "Which tier each project sat in" },
        { label: "Migration", href: "/migration/", note: "Where two of these ended up" },
        { label: "Services", href: "/services/", note: "The work we take on" },
        { label: "Hire us", href: "/hire/", note: "Scoped quote in two business days" },
      ],
    },
    ctaBlock(
      "Your project would be the twenty-sixth",
      "Send your store URL and what you want changed. You get a fixed price, a delivery date and a written scope within two business days."
    ),
  ],
};
