import type { PageContent } from "@/types/page";
import { CRUMB_GUIDES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/customize-theme/",
  title: "How to Customize a Shopify Theme: The Right Order",
  description:
    "A step-by-step sequence for customizing a Shopify theme without redoing work: duplicate, set global settings, fix structure, add real content, tune sections, then decide what needs code.",
  breadcrumbs: CRUMB_GUIDES,
  seo: {
    intent: "informational",
    primary: "how to customize a Shopify theme",
    supporting: [
      "customize Shopify theme step by step",
      "Shopify theme setup guide",
      "personalise Shopify theme",
      "Shopify theme settings",
    ],
  },
  hero: {
    eyebrow: "Guide",
    h1: "How to customize a Shopify theme, in the order that avoids rework",
    lede: "Most wasted effort in theme customization comes from doing the right things in the wrong order — styling content that later gets restructured, or writing copy for a layout that changes. This is the sequence we use on paid projects, which works just as well when you are doing it yourself.",
    meta: ["12 minute read", "No code required for steps 1–5", "Works on any 2.0 theme"],
    cta: { label: "Start with the editor guide", href: "/guides/theme-editor/" },
    secondary: { label: "All guides", href: "/guides/" },
    visual: "overlap-store",
    backdrop: "mesh",
  },
  blocks: [
    {
      type: "steps",
      eyebrow: "The sequence",
      heading: "Six steps, strictly in this order",
      lede: "Each step assumes the one above it is settled. Skipping ahead is what causes rework.",
      items: [
        {
          title: "Duplicate your theme",
          body: "Online Store → Themes → three-dot menu → Duplicate. Every step below happens on the copy. This is not optional caution; it is the reason you can experiment at all.",
          meta: "2 minutes",
        },
        {
          title: "Set global theme settings first",
          body: "With nothing selected in the editor, work through Colours, Typography, Layout and Buttons. Define colour schemes rather than colouring sections individually — every section you add later will inherit these, and getting them right now removes dozens of later overrides.",
          meta: "30–60 minutes",
        },
        {
          title: "Fix structure before content",
          body: "On each template, decide which sections you need and in what order. Hide what you will not use rather than deleting it, so you can reconsider. Do not write copy yet — reordering is free, rewriting is not.",
          meta: "1–2 hours",
        },
        {
          title: "Add real content",
          body: "Real copy, real product imagery, real alt text. Placeholder text hides layout problems: a heading written to fit looks fine, and the actual heading wraps to three lines and breaks the section.",
          meta: "The long part",
        },
        {
          title: "Tune sections individually",
          body: "Now padding, alignment, image ratios and per-section layout options. Check the mobile viewport after every change, not at the end. Keep a note of any option you wished existed — that list is valuable.",
          meta: "1–2 hours",
        },
        {
          title: "Publish, then review on real devices",
          body: "Publish the duplicate. Then open the store on your own phone and place a test order. The editor's mobile preview does not model touch, sticky positioning or an on-screen keyboard.",
          meta: "30 minutes",
        },
      ],
      visual: "breakpoints",
    },
    {
      type: "split",
      eyebrow: "Step 2 in detail",
      heading: "Why global settings come first",
      body: [
        "A 2.0 theme applies colour through schemes: a named set of background, text, button and border colours that sections reference. Define three or four schemes — a light one, a tinted one, a dark one, an accent one — and every section becomes a choice between them rather than eight individual colour pickers.",
        "The same logic applies to typography. Choose your heading and body faces and their scale once, and every section inherits. Merchants who skip this end up with section-level overrides everywhere, and a store where changing the brand colour means visiting forty places.",
      ],
      bullets: [
        "Three to four colour schemes beat per-section colours",
        "Set type scale globally, not per heading",
        "Button style and border radius are global decisions",
        "Product card settings are global too — set them before building grids",
      ],
      visual: "palette",
      caption: "Tokens set once, referenced everywhere",
      media: "right",
      tone: "tint",
    },
    {
      type: "checklist",
      eyebrow: "Before you publish",
      heading: "The pre-publish checklist",
      lede: "Ten minutes here saves the message from a customer who could not check out.",
      groups: [
        {
          title: "Check on every template",
          items: [
            "Mobile viewport at 390px, including the header",
            "Every image has meaningful alt text",
            "No placeholder copy left anywhere, including the 404",
            "Navigation links go to real pages, not to #",
            "Footer policy links resolve",
            "Search returns sensible results",
          ],
        },
        {
          title: "Check once, on the store",
          limit: false,
          items: [
            "A real test order, including the confirmation email",
            "Cart behaviour: add, change quantity, remove",
            "Contact form actually delivers to an inbox you read",
            "Analytics receiving pageviews after publish",
          ],
        },
      ],
      note: "If you are on a duplicate, do the first column before publishing and the second immediately after — a test order can only be placed against the live theme.",
    },
    {
      type: "faq",
      items: [
        {
          q: "How long does customizing a theme take?",
          a: "A focused day for global settings, structure and tuning on a small store, assuming your content is ready. Content is almost always the bottleneck: stores waiting on product photography routinely take three times as long as the ones that are not.",
        },
        {
          q: "Can I customize a theme before adding products?",
          a: "You can, and the result will mislead you. Grid layouts, filtering and product cards all behave differently with three products than with three hundred. Add a representative sample of real products first.",
        },
        {
          q: "What if I break something?",
          a: "If you are on a duplicate, delete it and duplicate your live theme again. That is the whole recovery plan, and it is why step one is step one.",
        },
        {
          q: "When should I stop and hire someone?",
          a: "When you find yourself repeating a manual change every campaign, when a change has to be consistent across templates that do not share a section, or when what you need depends on product data. Those three have no editor answer.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Theme editor guide", href: "/guides/theme-editor/", note: "Every panel, in detail" },
        { label: "Customizing without code", href: "/customization/no-code/", note: "The honest ceiling" },
        { label: "Edit theme code", href: "/guides/edit-theme/", note: "If you go further" },
        { label: "Change your theme", href: "/guides/change-theme/", note: "If this is the wrong theme" },
        { label: "Custom sections", href: "/customization/sections/", note: "Turning repetition into settings" },
        { label: "Pricing", href: "/pricing/", note: "If you would rather not" },
      ],
    },
    ctaBlock(
      "Got a list the editor cannot handle?",
      "Send it with your store URL. Anything on it you can do yourself, we will tell you how — and quote only for the rest.",
      false
    ),
  ],
};
