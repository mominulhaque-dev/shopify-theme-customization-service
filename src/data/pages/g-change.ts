import type { PageContent } from "@/types/page";
import { CRUMB_GUIDES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/change-theme/",
  title: "How to Change Your Shopify Theme Without Losing Content",
  description:
    "Changing a Shopify theme safely: what transfers and what does not, the pre-flight checklist, how to test before publishing, and how to keep the old theme available for a rollback.",
  breadcrumbs: CRUMB_GUIDES,
  seo: {
    intent: "informational",
    primary: "how to change Shopify theme",
    supporting: [
      "switch Shopify theme",
      "Shopify change theme without losing content",
      "Shopify publish theme",
      "Shopify theme rollback",
    ],
  },
  hero: {
    eyebrow: "Guide",
    h1: "Changing your theme: what carries over and what you rebuild",
    lede: "Switching themes is one click, which is exactly the problem. Your products and pages are safe, but everything about how they are presented — sections, settings, custom code — belongs to the old theme and stays there. Knowing which is which before you click is the whole job.",
    meta: ["10 minute read", "Includes rollback plan", "Applies to any theme switch"],
    cta: { label: "See migration services", href: "/migration/" },
    secondary: { label: "All guides", href: "/guides/" },
    visual: "migration",
    backdrop: "contour",
  },
  blocks: [
    {
      type: "table",
      eyebrow: "The inventory",
      heading: "What transfers when you change theme",
      lede: "Check your own store against this list before you decide the switch is cheap.",
      columns: ["Item", "Transfers?", "What that means for you"],
      rows: [
        ["Products, collections, customers, orders", "Yes", "Store-level data, untouched by a theme change."],
        ["Pages and blog posts", "Yes", "The content stays; the templates rendering it are new."],
        ["Navigation menus", "Yes", "Menus are store-level. The new theme must be told which to use where."],
        ["URLs, page titles, redirects", "Yes", "Unaffected. A theme change is not a URL change."],
        ["Theme settings (colour, type, layout)", "No", "Reconfigured from scratch in the new theme's settings."],
        ["Homepage and template sections", "No", "Section content lives in the old theme's template JSON. Rebuilt and repopulated."],
        ["Custom sections and code", "No", "Theme-specific files. Rewritten for the new theme's structure."],
        ["App embeds and blocks", "Partly", "Embeds re-enable; app blocks must be re-placed in the new templates."],
        ["Metafield definitions", "Yes", "Definitions persist, but the templates surfacing them are new."],
      ],
      note: "The rule of thumb: data transfers, presentation does not. If a large part of your store's value is in presentation, a theme change is a project rather than a click.",
    },
    {
      type: "steps",
      eyebrow: "Doing it safely",
      heading: "The pre-flight sequence",
      lede: "Follow this and the worst outcome is a wasted afternoon rather than a broken storefront.",
      items: [
        {
          title: "Screenshot and document the current store",
          body: "Every template, desktop and mobile, plus your theme settings. Once the new theme is published, this is the only record of what the old arrangement was.",
          meta: "20 minutes",
        },
        {
          title: "Export the current theme",
          body: "Themes → three-dot menu → Download theme file. It arrives by email as a .zip. Keep it: it is your only offline copy of your custom code.",
          meta: "2 minutes",
        },
        {
          title: "Add the new theme without publishing",
          body: "Install it to your theme library. It sits unpublished and invisible to customers while you build it out.",
          meta: "1 minute",
        },
        {
          title: "Build the new theme fully, then compare",
          body: "Settings, sections, content and app blocks. Then open a preview of the new theme beside your live store and walk every template, on desktop and on a phone.",
          meta: "The real work",
        },
        {
          title: "Publish at a quiet hour and watch",
          body: "Publish when traffic is lowest, then place a real test order immediately. Check analytics is still receiving events and that email notifications still fire.",
          meta: "30 minutes",
        },
        {
          title: "Leave the old theme in place",
          body: "Do not delete it for at least a month. It is your rollback: one click restores the exact store you had, and problems tend to surface in week two rather than hour one.",
          meta: "Keep for 30 days",
        },
      ],
      visual: "timeline",
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "The honest cost",
      heading: "Why a theme change is rarely free",
      body: [
        "The click is free. Rebuilding your section content, reconfiguring settings, re-placing app blocks and rewriting custom code is not — and on a store with any real customization history it is comfortably the largest part of the exercise.",
        "This is also why we quote migration separately from customization. If you are moving off a legacy theme, most of the cost is rebuilding what your store already does in an architecture that will accept future changes.",
      ],
      bullets: [
        "Budget for rebuilding sections, not for installing a theme",
        "Custom code is rewritten, not copied",
        "SEO is unaffected by the switch itself — verify rather than worry",
        "Keep the old theme as a rollback for a month",
      ],
      visual: "before-after",
      caption: "Parity first, improvements second",
      media: "right",
    },
    {
      type: "faq",
      items: [
        {
          q: "Will changing my Shopify theme hurt SEO?",
          a: "Not by itself: URLs, titles, meta descriptions and redirects are store-level and unchanged. The risks are template-level — structured data, heading hierarchy, image alt text and page speed. Check all four against the old theme before you publish.",
        },
        {
          q: "Can I copy my sections to the new theme?",
          a: "No. Section content lives in the old theme's template JSON and is meaningless to a different theme's section types. Some apps claim to migrate content; in practice you rebuild.",
        },
        {
          q: "How long should I keep the old theme?",
          a: "At least thirty days. Themes are cheap to store and the problems that matter often surface in the second week, when someone tries to run a campaign the old theme supported.",
        },
        {
          q: "Should I change theme or customize the one I have?",
          a: "If you are on a 2.0 theme, customizing is almost always cheaper — the ceiling is higher than most merchants realise. If you are on a legacy theme, changing is usually the better investment, because it lowers the cost of every change afterwards.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Migration to 2.0", href: "/migration/", note: "The managed version of this" },
        { label: "Themes we support", href: "/themes/", note: "Choosing the destination" },
        { label: "Identify your theme", href: "/guides/identify-theme/", note: "Know what you are on" },
        { label: "Legacy themes", href: "/customization/legacy-themes/", note: "Patch or move" },
        { label: "Customize a theme", href: "/guides/customize-theme/", note: "Building out the new one" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "Often the real goal" },
      ],
    },
    ctaBlock(
      "Thinking about switching?",
      "Send your store URL and the theme you are considering. We will tell you what the switch would actually cost you in rebuilt work, within two business days.",
      false
    ),
  ],
};
