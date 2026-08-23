import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/no-code/",
  title: "Customize a Shopify Theme Without Coding: Real Limits",
  description:
    "What you can genuinely customize in Shopify without code, step by step — and the exact point where no-code stops being cheaper. Includes what page builder apps really cost you.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "informational",
    primary: "customize Shopify theme without coding",
    supporting: [
      "Shopify no code customization",
      "Shopify theme editor limits",
      "Shopify page builder app",
      "edit Shopify theme without developer",
    ],
  },
  hero: {
    eyebrow: "Without code",
    h1: "How far you can get without code, and where that stops",
    lede: "A great deal further than most merchants think, and a lot less far than page builder apps advertise. This page is the honest map: what the theme editor genuinely handles, what it handles badly, and the four signals that mean you have reached the end of the no-code road.",
    meta: ["No sales pitch", "Written for 2.0 themes", "Includes what to avoid"],
    cta: { label: "Read the editor guide", href: "/guides/theme-editor/" },
    secondary: { label: "Or get a quote", href: "/hire/" },
    visual: "theme-editor",
    backdrop: "contour",
  },
  blocks: [
    {
      type: "checklist",
      eyebrow: "The map",
      heading: "What the theme editor really covers",
      lede: "On an Online Store 2.0 theme. Legacy themes cover far less, which is usually the actual reason a merchant concludes \"my theme can't do this\".",
      groups: [
        {
          title: "Yours already — do not pay anyone",
          items: [
            "Colours, colour schemes and typography choices",
            "Section order on every template, not just the homepage",
            "Adding, removing and duplicating sections",
            "All copy, imagery, video and alt text",
            "Menus, footer columns and policy links",
            "Product and collection templates assigned per item",
            "App blocks placed inside sections",
          ],
        },
        {
          title: "Possible, but where it gets fragile",
          limit: true,
          body: "Doable without code, and where we see stores get into trouble.",
          items: [
            "Custom CSS pasted into the theme settings box",
            "Copying a competitor's layout section by section",
            "Duplicating a section instead of asking for a block type",
            "Installing a page builder app for one landing page",
            "Editing a template's JSON directly in the code editor",
          ],
        },
      ],
      note: "Roughly half of what merchants ask us to quote is in the left column. When it is, we say so — a quote for work you could do in ten minutes is not a business we want.",
    },
    {
      type: "cards",
      eyebrow: "The signals",
      heading: "Four signs you have reached the end of no-code",
      lede: "Any one of these means the cheapest remaining route involves code.",
      columns: 2,
      items: [
        {
          meta: "Signal 1",
          title: "You are repeating yourself",
          body: "The same manual change every campaign — reordering, re-uploading, retyping. Repetition is the clearest signal that something should have been a setting or a block.",
        },
        {
          meta: "Signal 2",
          title: "It must be consistent across templates",
          body: "A change that has to look identical on product, collection and search pages cannot be made reliably section by section. That is a stylesheet's job.",
        },
        {
          meta: "Signal 3",
          title: "It depends on product data",
          body: "\"Show this badge when stock is low\" or \"hide shipping copy for pre-orders\" needs logic. There is no editor setting for a conditional.",
        },
        {
          meta: "Signal 4",
          title: "You are fighting the theme",
          body: "Negative margins in the CSS box, sections used for something they were not built for, six duplicated blocks to fake a grid. All of it breaks on the next update.",
        },
      ],
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Page builders",
      heading: "What a page builder app actually costs",
      body: [
        "Page builder apps do deliver on their promise: you can drag a landing page together without a developer. The costs are real but deferred, which is why they surprise people twelve months in.",
        "You pay a monthly fee indefinitely. The app's script loads on the pages it powers, so those pages are slower than the theme's own. The output is not part of your theme, so it does not follow you to a new theme and the next developer cannot maintain it. And the pages usually stop matching the rest of the store, because the builder does not know your theme's tokens.",
      ],
      bullets: [
        "Monthly fee for as long as the page exists",
        "Extra script on your highest-intent landing pages",
        "Output stranded outside the theme, lost on a theme change",
        "Design drift from the rest of the store",
      ],
      visual: "speed",
      caption: "The cost usually lands on LCP first",
      media: "right",
    },
    {
      type: "steps",
      eyebrow: "Do this first",
      heading: "The no-code sequence that avoids redoing work",
      lede: "Order matters. Most wasted effort comes from styling content that later gets restructured.",
      items: [
        {
          title: "Set the global theme settings",
          body: "Colour schemes and typography before anything else, so every section you touch afterwards inherits the right defaults instead of needing individual overrides.",
        },
        {
          title: "Fix the structure",
          body: "Decide which sections each template needs and in what order. Do this before writing copy — reordering is free, rewriting is not.",
        },
        {
          title: "Then the content",
          body: "Copy, imagery and alt text, in the structure you settled. Real content, not placeholders, because placeholder-sized text hides layout problems.",
        },
        {
          title: "Then per-section tuning",
          body: "Padding, alignment and layout options where the section exposes them. If you find yourself wanting an option that is not there, note it — that is a scope item, not a defeat.",
        },
        {
          title: "Only then consider code",
          body: "With a written list of what the editor could not do. That list is a scope document, and it is the cheapest thing you can hand a developer.",
        },
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Can I customize a Shopify theme without any coding at all?",
          a: "Substantially, yes — on a 2.0 theme, colours, typography, section order, content and per-section layout options are all yours. What you cannot do is add behaviour the theme does not have, or make a change apply consistently to templates that do not share a section.",
        },
        {
          q: "Is the theme settings custom CSS box safe to use?",
          a: "For a few declarations, yes. It becomes a liability once it grows: it is invisible to version control, it cannot express media queries cleanly, and specificity fights there usually end in !important, which makes every later change harder.",
        },
        {
          q: "Should I switch to a theme with more settings instead of hiring anyone?",
          a: "Sometimes, genuinely — if your theme is legacy, a 2.0 theme will give you more control than any amount of patching. But you will rebuild your content in the process, so treat it as a migration rather than a shortcut.",
        },
        {
          q: "Will you tell me if I do not need you?",
          a: "Yes, and it happens on roughly half of enquiries. Send the list; if it is all editor work we will point you at the guide instead of a quote.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Theme editor guide", href: "/guides/theme-editor/", note: "Every panel, properly" },
        { label: "How to customize a theme", href: "/guides/customize-theme/", note: "The full DIY sequence" },
        { label: "Theme schema", href: "/customization/schema/", note: "Why some themes expose more" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "Turning repetition into settings" },
        { label: "Custom CSS", href: "/customization/css/", note: "When the CSS box runs out" },
        { label: "Pricing", href: "/pricing/", note: "If it turns out you do need code" },
      ],
    },
    ctaBlock(
      "Send your list and we will sort it",
      "Store URL plus the changes you want. You get them split into what you can do yourself today and what needs code, with a price for the second half only.",
      false
    ),
  ],
};
