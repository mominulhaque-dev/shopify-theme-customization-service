import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/css/",
  title: "Custom CSS for Shopify Themes, Written to Last",
  description:
    "Custom CSS for Shopify: where it should live, why the theme editor's CSS box is a trap, design tokens, container queries, and styling that survives a theme update. Scope and pricing.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "custom CSS Shopify",
    supporting: [
      "add custom CSS to Shopify theme",
      "Shopify CSS not working",
      "Shopify theme stylesheet",
      "Shopify design tokens",
    ],
  },
  hero: {
    eyebrow: "Custom CSS",
    h1: "Custom CSS that outlives the person who wrote it",
    lede: "Almost any visual change is possible in CSS. The question is where it lives, and that decides whether your store is maintainable in a year. Most Shopify CSS problems are not styling problems — they are location problems, and !important is the symptom.",
    meta: ["From $1,000", "Tokens, not scattered values", "Loaded after vendor CSS, never fighting it"],
    cta: { label: "Get a styling quote", href: "/hire/" },
    secondary: { label: "All customization layers", href: "/customization/" },
    visual: "code-css",
    backdrop: "mesh",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The trap",
      heading: "Why the theme editor's custom CSS box is the wrong home",
      body: [
        "Every 2.0 theme offers a custom CSS field in theme settings. It is convenient, it is invisible to version control, it loads inline on every page, and it has no way to express a media query cleanly. Anything more than three declarations belongs in a stylesheet.",
        "The deeper problem is specificity. Because that box loads before the vendor's own rules in some themes, people reach for !important to win, and once one rule uses it the next fifty do too. Six months later nobody can change a button colour without breaking something.",
      ],
      bullets: [
        "Custom stylesheet in assets/, loaded after the vendor's",
        "No !important unless a third-party app forces it",
        "Selectors scoped to the section id the schema generates",
        "Tokens for colour, type and spacing — set once, used everywhere",
      ],
      visual: "code-css",
      caption: "Scoped to a section, with a container query rather than a viewport one",
      media: "right",
    },
    {
      type: "split",
      eyebrow: "How we build it",
      heading: "Design tokens make the second change cheap",
      body: [
        "The first styling change is always easy. The tenth is where the cost shows up, because by then the same brand green exists in nine places with three slightly different values. Custom properties fix that: a token per decision, referenced everywhere it applies.",
        "This is also what makes handover useful. A merchant who wants a slightly warmer green changes one value in the theme settings rather than filing a ticket.",
      ],
      bullets: [
        "Colour, type scale, spacing and radii as custom properties",
        "Exposed as theme settings where the merchant should control them",
        "Contrast pairs verified at WCAG AA before shipping",
        "Focus states visible on every interactive element",
      ],
      visual: "palette",
      caption: "Tokens written into the theme, with their roles",
      tone: "tint",
    },
    {
      type: "cards",
      eyebrow: "Modern CSS",
      heading: "Techniques we use, and why they matter here",
      lede: "Not novelty for its own sake — each of these removes a class of Shopify-specific bug.",
      columns: 3,
      items: [
        {
          meta: "Layout",
          title: "Container queries",
          body: "A card styled by the space its section was given, not by the viewport — so the same component works in a full-width row and a sidebar.",
        },
        {
          meta: "Layout",
          title: "Intrinsic grids",
          body: "auto-fit with a minmax floor, so a collection grid reflows correctly at any product count without a breakpoint per case.",
        },
        {
          meta: "Type",
          title: "Fluid clamp() scales",
          body: "Type and spacing that interpolate between breakpoints instead of jumping, which removes most of the awkward tablet widths.",
        },
        {
          meta: "Robustness",
          title: "Logical properties",
          body: "inline-start rather than left, so a store that later sells into a right-to-left market does not need its CSS rewritten.",
        },
        {
          meta: "Motion",
          title: "Reduced-motion by default",
          body: "Transitions declared inside a prefers-reduced-motion query, so accessibility is the default state rather than an override.",
        },
        {
          meta: "Weight",
          title: "One stylesheet, not five",
          body: "Fewer requests, no duplicated resets, and a single place to look when something is off.",
        },
      ],
    },
    priceBlock({
      heading: "What CSS work costs",
      lede: "Contained styling changes sit in the first tier. A store-wide brand system across every template is the third.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Why is my custom CSS not working?",
          a: "Almost always specificity or load order: the vendor's rule is more specific, or it loads after yours. The fix is to match the theme's own selector structure rather than escalate with !important — which wins the argument today and loses it permanently on the next theme update.",
        },
        {
          q: "Can I add CSS without a developer?",
          a: "For a handful of declarations, yes — the theme settings CSS field exists for exactly that. Once you need media queries, hover states or anything applied across templates, a stylesheet is both easier and cheaper than fighting the box.",
        },
        {
          q: "Will my CSS survive a theme update?",
          a: "If it lives in its own asset file, yes. If it lives in the vendor's stylesheet, no — that file is replaced wholesale on upgrade. This is the single most common way merchants lose customization work.",
        },
        {
          q: "Do you use Tailwind or a CSS framework in themes?",
          a: "No. A utility framework in a Liquid theme means either shipping the whole framework or adding a build step the next developer has to discover. Plain CSS with custom properties is smaller, and readable by whoever inherits it.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Custom fonts", href: "/customization/fonts/", note: "The other half of typography" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "Tokens across every template" },
        { label: "Mobile layout", href: "/customization/mobile/", note: "Where the breakpoints matter" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "What the CSS is scoped to" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "Render-blocking stylesheets" },
        { label: "Edit theme code", href: "/guides/edit-theme/", note: "Where the files are" },
      ],
    },
    ctaBlock(
      "Send the styling change you want",
      "A screenshot with what should look different is enough. You get a fixed price and a delivery date within two business days."
    ),
  ],
};
