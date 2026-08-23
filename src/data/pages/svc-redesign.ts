import type { PageContent } from "@/types/page";
import { CRUMB_SERVICES, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/services/store-redesign/",
  title: "Shopify Store Redesign Without Rebuilding From Scratch",
  description:
    "Shopify store redesign applied to the theme you already run: brand system, type scale, template-by-template rework and a reusable section library. Fixed price, staging theme, no lost content.",
  breadcrumbs: CRUMB_SERVICES,
  seo: {
    intent: "commercial",
    primary: "Shopify store redesign",
    supporting: [
      "Shopify redesign service",
      "Shopify store makeover",
      "rebrand Shopify store",
      "Shopify theme restyle",
    ],
  },
  hero: {
    eyebrow: "Redesign",
    h1: "Store redesign on the theme you already own",
    lede: "A redesign does not require a new theme. In most cases the theme you run is capable of the store you want and has simply never been styled past its demo defaults. We apply a real brand system across every template and leave your team a section library they can keep building with.",
    meta: ["From $6,500", "3–5 weeks typical", "No content lost, no theme change required"],
    cta: { label: "Get a redesign quote", href: "/hire/" },
    secondary: { label: "See the price ladder", href: "/pricing/" },
    visual: "before-after",
    backdrop: "mesh",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The premise",
      heading: "Most stores do not look dated. They look un-designed",
      body: [
        "The usual symptom is a store that resembles its theme's demo more than the brand. Stock proportions, default type sizes, section spacing nobody chose, and a homepage carrying the arrangement the theme shipped with.",
        "That is not a reason to buy a new theme. It is a reason to make the decisions the theme left to you: a type scale, a spacing rhythm, a colour system with real contrast pairs, and a set of sections designed for your merchandising rather than a generic catalogue.",
      ],
      bullets: [
        "Type scale and spacing rhythm decided, then applied everywhere",
        "Colour tokens with contrast checked at AA or better",
        "Section library designed around what you actually sell",
        "The theme's update path left intact",
      ],
      visual: "palette",
      caption: "Tokens written into the theme, editable afterwards",
      media: "right",
    },
    {
      type: "steps",
      eyebrow: "How it runs",
      heading: "Redesign, template by template",
      lede: "In this order, because every later step depends on the one above it.",
      items: [
        {
          title: "Audit and inventory",
          body: "Every template, every section in use, every page that gets real traffic. Sections nobody uses get named for removal rather than restyled.",
          meta: "Week 1",
        },
        {
          title: "Design system decisions",
          body: "Type scale, spacing, colour, border and shadow language, all set as theme settings and CSS custom properties so they change in one place later.",
          meta: "Week 1",
        },
        {
          title: "Home and product first",
          body: "The two templates that carry the most traffic and the most revenue get built and reviewed before anything else moves.",
          meta: "Weeks 2–3",
        },
        {
          title: "Remaining templates",
          body: "Collection, cart, search, account, blog, policies and the 404. Consistency here is what makes the store feel designed rather than decorated.",
          meta: "Weeks 3–4",
        },
        {
          title: "Section library and handover",
          body: "The reusable sections your team will need for the next campaign, with presets, plus the walkthrough of which settings they own.",
          meta: "Week 5",
        },
      ],
      visual: "timeline",
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Guardrails",
      heading: "A redesign that cannot quietly cost you speed or accessibility",
      body: [
        "Visual ambition is where Core Web Vitals go to die: a hero video, three webfonts, an animation library and a carousel above the fold. Every redesign here runs against a performance budget measured before and after, and a heading and contrast pass on every template.",
        "That constraint changes design decisions rather than diluting them. It means one display face rather than three, transforms rather than layout animation, and imagery sized to the container it lands in.",
      ],
      bullets: [
        "Core Web Vitals measured on the old and new theme",
        "One display face, self-hosted, with a measured fallback",
        "Contrast pairs verified at AA; focus states visible",
        "Motion honours prefers-reduced-motion by default",
      ],
      visual: "speed",
      caption: "The thresholds the redesign is held to",
    },
    priceBlock({
      heading: "Redesign pricing",
      lede: "A full redesign is the third tier. A single-template refresh — usually the product page — sits in the second.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Do I need a new theme for a redesign?",
          a: "Usually not. If you are on an Online Store 2.0 theme, its ceiling is almost certainly higher than the design you have. The exception is a legacy theme, where the architecture itself limits what a redesign can express — there, migrating first is the cheaper route to the same result.",
        },
        {
          q: "Will I lose my product content or SEO?",
          a: "No. Products, collections, pages, URLs, titles and redirects are store-level and unaffected. Section content is re-populated as templates are rebuilt, and we check structured data and heading hierarchy against the old theme before publishing.",
        },
        {
          q: "Can we redesign one template at a time?",
          a: "Yes, and for stores with limited budget it is the sensible sequence: product page first, then home, then collection. The risk is a store that looks half-redesigned for months, so we set the design system in the first phase to keep the parts consistent.",
        },
        {
          q: "Do you provide the design in Figma first?",
          a: "For a full redesign, yes — home and product as static designs before any code, because changing a decision in Figma costs minutes and changing it in Liquid costs hours. Single-template work often skips it and reviews in the staging theme instead.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Custom CSS", href: "/customization/css/", note: "How the styling is written" },
        { label: "Custom fonts", href: "/customization/fonts/", note: "Licensing and load behaviour" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "The library you keep" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "The budget a redesign runs against" },
        { label: "Mobile layout", href: "/customization/mobile/", note: "Where most of the traffic is" },
        { label: "Case studies", href: "/work/", note: "Redesigns we have shipped" },
      ],
    },
    ctaBlock(
      "Send the store you want redesigned",
      "We will tell you whether your theme can carry the design you have in mind, and what the full pass costs, within two business days."
    ),
  ],
};
