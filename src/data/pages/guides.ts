import type { PageContent } from "@/types/page";
import { ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/",
  title: "Shopify Theme Guides: Editor, Editing Code, Switching Themes",
  description:
    "Practical Shopify theme guides: using the theme editor, customizing and editing a theme, changing themes safely, identifying which theme a store runs, surviving updates, and hiring a developer.",
  seo: {
    intent: "informational",
    primary: "Shopify theme guides",
    supporting: [
      "how to customize a Shopify theme",
      "Shopify theme editor guide",
      "how to edit Shopify theme code",
      "how to change Shopify theme",
    ],
  },
  hero: {
    eyebrow: "Guides",
    h1: "Shopify theme guides, including when not to hire anyone",
    lede: "Seven guides covering the things merchants ask us about most. Each one tells you how to do the thing yourself, and is honest about the point where doing it yourself starts costing more than it saves. Several will save you a quote entirely.",
    meta: ["Written for merchants, not developers", "No gated downloads", "Updated as Shopify changes"],
    cta: { label: "Browse the guides", href: "/guides/theme-editor/" },
    secondary: { label: "Or get a quote", href: "/hire/" },
    visual: "theme-editor",
    backdrop: "contour",
  },
  blocks: [
    {
      type: "cards",
      eyebrow: "Start here",
      heading: "The seven guides",
      lede: "In rough order of how often the question arrives.",
      columns: 2,
      items: [
        {
          meta: "15 min read",
          title: "The Shopify theme editor, properly",
          body: "Every panel, what each setting group actually controls, and the six things that are not where you expect them to be.",
          href: "/guides/theme-editor/",
        },
        {
          meta: "12 min read",
          title: "How to customize a Shopify theme",
          body: "The full sequence from a stock theme to a branded one, in the order that avoids redoing work.",
          href: "/guides/customize-theme/",
        },
        {
          meta: "14 min read",
          title: "How to edit Shopify theme code",
          body: "Where the files are, which ones are safe to touch, how to back up first, and the four edits that break stores.",
          href: "/guides/edit-theme/",
        },
        {
          meta: "10 min read",
          title: "How to change your Shopify theme",
          body: "What transfers, what does not, and the pre-flight checks that stop a theme switch losing content.",
          href: "/guides/change-theme/",
        },
        {
          meta: "5 min read",
          title: "How to identify a Shopify theme",
          body: "Two ways to find out which theme a store runs — yours or a competitor's — and how to read the version number.",
          href: "/guides/identify-theme/",
        },
        {
          meta: "11 min read",
          title: "Surviving theme updates",
          body: "Why customizations disappear on upgrade, which ones survive, and how to structure work so the next release is boring.",
          href: "/guides/theme-updates/",
        },
        {
          meta: "9 min read",
          title: "Hiring a Shopify theme developer",
          body: "What to ask, what a real scope document looks like, and the four answers that should end the conversation.",
          href: "/guides/hire-theme-developer/",
        },
        {
          meta: "Comparison",
          title: "Custom theme or template?",
          body: "The decision most merchants get wrong in the expensive direction, with the actual cost difference.",
          href: "/custom-theme-vs-template/",
        },
      ],
    },
    {
      type: "split",
      eyebrow: "The honest version",
      heading: "When to do it yourself, and when not to",
      body: [
        "Roughly half of what merchants ask us to quote is genuinely a theme-editor task, and we say so. Colour and type changes, section order, imagery, menu structure, most content: those are yours, and paying anyone for them is waste.",
        "The line moves when a change needs to be repeatable, needs to work across templates, or needs behaviour the theme does not have. Doing that yourself usually means an inline style or a hard-coded value that works today and becomes a support ticket on the next theme update.",
      ],
      bullets: [
        "Do it yourself: content, colour, type, order, imagery",
        "Careful: custom CSS in the editor's CSS box",
        "Get help: new sections, Liquid logic, variant behaviour",
        "Get help sooner: anything you will need to repeat monthly",
      ],
      visual: "ceiling",
      caption: "The same line, drawn by theme generation",
      media: "right",
      tone: "tint",
    },
    {
      type: "faq",
      items: [
        {
          q: "Can I customize a Shopify theme without coding?",
          a: "A great deal of it, yes — Online Store 2.0 themes expose colour, type, layout, section order and content through the theme editor. What you cannot do without code is add behaviour the theme does not have, or make a change apply consistently across templates that do not share a section.",
        },
        {
          q: "Will these guides break my store?",
          a: "The code-editing guide tells you to duplicate your theme before touching anything, and means it. Follow that one instruction and the worst case is a staging theme you delete. Skip it and a single unclosed Liquid tag can take a template down.",
        },
        {
          q: "Are these guides written for Online Store 2.0?",
          a: "Yes, with legacy differences called out where they matter — the theme editor guide in particular, because what a pre-2.0 theme exposes is dramatically narrower.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Customization services", href: "/customization/", note: "When DIY runs out" },
        { label: "Themes we support", href: "/themes/", note: "Ceilings by generation" },
        { label: "Pricing", href: "/pricing/", note: "What a quote looks like" },
        { label: "Process", href: "/process/", note: "How we work" },
        { label: "Migration", href: "/migration/", note: "Moving off a legacy theme" },
        { label: "Case studies", href: "/work/", note: "The same work, shipped" },
      ],
    },
    ctaBlock(
      "Read the guide, then decide",
      "If it turns out the change needs code, send the store URL and the guide section you got stuck on. You get a scoped quote within two business days.",
      false
    ),
  ],
};
