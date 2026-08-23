import type { PageContent } from "@/types/page";
import { ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/custom-theme-development/",
  title: "Custom Shopify Theme Development vs Customization",
  description:
    "When custom Shopify theme development from scratch is genuinely justified, what it costs and what you give up — versus deep customization of a maintained theme, which is what most merchants actually need.",
  seo: {
    intent: "commercial",
    primary: "custom Shopify theme development",
    supporting: [
      "build custom Shopify theme",
      "Shopify theme from scratch cost",
      "custom theme vs customization",
      "bespoke Shopify theme",
    ],
  },
  hero: {
    eyebrow: "Custom development",
    h1: "Custom theme development, and why we usually argue you against it",
    lede: "Building a Shopify theme from zero is legitimate work and we can do it. We also talk most enquiries out of it, because deep customization of a maintained theme reaches the same visual result for a fraction of the cost and keeps you on an update path. Here is the honest comparison.",
    meta: ["Custom build: $25,000+", "Deep customization: $6,500–$12,000", "Same visual outcome, usually"],
    cta: { label: "Get both options quoted", href: "/hire/" },
    secondary: { label: "See customization", href: "/customization/" },
    visual: "before-after",
    backdrop: "mesh",
  },
  blocks: [
    {
      type: "table",
      eyebrow: "The comparison",
      heading: "Custom build versus deep customization",
      lede: "The rows that matter over three years, not just on launch day.",
      columns: ["", "Custom theme from scratch", "Deep customization"],
      rows: [
        ["Cost", "$25,000 and up, realistically", "$6,500–$12,000"],
        ["Timeline", "3–6 months", "3–8 weeks"],
        ["Visual outcome", "Anything you can design", "Anything you can design — the constraint is rarely the theme"],
        ["Vendor updates", "None. You own maintenance forever", "Yes, and platform features arrive with them"],
        ["New Shopify features", "You pay to implement each one", "Arrive in vendor releases"],
        ["Editability for your team", "Whatever was built, and no more", "Vendor schema plus whatever we add"],
        ["Who can maintain it", "Whoever wrote it, or someone willing to learn it", "Any Shopify developer"],
        ["Right when", "A genuinely unusual buying flow or a design system with no theme analogue", "Almost every other case"],
      ],
      note: "The row that decides it for most merchants is the last but one. A bespoke theme is a codebase only its author understands; a customized Dawn is legible to anyone you hire next.",
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "The misconception",
      heading: "\"We need custom\" usually means \"we need it to not look like the demo\"",
      body: [
        "Nearly every enquiry that arrives asking for a custom theme is describing a visual outcome, not an architectural one. And a modern theme's ceiling is far higher than merchants assume: colour, typography, spacing, layout, section structure and behaviour are all changeable without leaving the theme.",
        "The test we apply is whether the requirement is visual or structural. Visual is customization, whatever the ambition. Structural — a fundamentally different buying flow, a catalogue model the theme's templates cannot express — is the only honest reason to build from zero.",
      ],
      bullets: [
        "Visual ambition → customization, however distinctive",
        "Unusual buying flow → possibly a custom build",
        "Catalogue the templates cannot express → possibly a custom build",
        "\"It should feel premium\" → customization, every time",
      ],
      visual: "ceiling",
      caption: "The ceiling is usually higher than the brief requires",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "When we agree",
      heading: "Four cases where a custom build is the right call",
      lede: "They are rarer than the market implies, and we will tell you when you are in one.",
      columns: 2,
      items: [
        {
          meta: "Case 1",
          title: "A buying flow no template models",
          body: "Configurators, made-to-measure, quote-based ordering with approval steps. When the flow itself is the product, a theme's product template is the wrong starting point.",
        },
        {
          meta: "Case 2",
          title: "A design system with a dedicated team",
          body: "If you have an in-house design system and developers to maintain it, a bespoke theme built to it can be cheaper over five years than fighting a vendor's conventions.",
        },
        {
          meta: "Case 3",
          title: "Extreme performance requirements",
          body: "Occasionally worth it. Usually the same result comes from stripping apps and fixing images on a stock theme, for a twentieth of the cost.",
        },
        {
          meta: "Case 4",
          title: "Headless, genuinely chosen",
          body: "A separate decision with its own hosting, build pipeline and staffing implications. Valid for content-heavy brands with a front-end team. A cost centre for everyone else.",
        },
      ],
    },
    priceBlock({
      heading: "What deep customization costs instead",
      lede: "The two upper tiers are what a merchant asking for a custom theme almost always needs.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Is a custom theme better for SEO?",
          a: "No. Technical SEO on Shopify is a function of template markup, structured data, speed and internal linking — all of which are fixable in a customized theme. A bespoke build gives you the same ceiling and a larger bill.",
        },
        {
          q: "Will a custom theme be faster?",
          a: "It can be, marginally, because nothing unused ships. But most slow Shopify stores are slow because of apps, images and third-party scripts, which a custom theme does not fix. Strip those on your current theme first and the gap usually disappears.",
        },
        {
          q: "Do I own a custom theme?",
          a: "You should, and you should insist the contract says so explicitly. You also own the maintenance: no vendor will ship you fixes or new features, and every future Shopify capability is a project.",
        },
        {
          q: "What is the difference between a custom theme and headless?",
          a: "A custom theme is still a Liquid theme, so it keeps the theme editor and Shopify's hosting. Headless replaces the storefront entirely with your own application, which means your own hosting, build pipeline and front-end team. They are not the same decision and are often confused.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Custom theme vs template", href: "/custom-theme-vs-template/", note: "The buying decision" },
        { label: "Customization", href: "/customization/", note: "What we recommend instead" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "A new look, kept maintainable" },
        { label: "Shopify development", href: "/services/shopify-development/", note: "Behaviour without a rebuild" },
        { label: "Themes we support", href: "/themes/", note: "Starting points" },
        { label: "Pricing", href: "/pricing/", note: "The published ladder" },
      ],
    },
    ctaBlock(
      "Get both numbers before committing",
      "Describe what you want the store to do. We will quote the customization route and, if it is genuinely justified, the custom build — with the reasoning for each."
    ),
  ],
};
