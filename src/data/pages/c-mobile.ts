import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/mobile/",
  title: "Shopify Mobile Layout Customization, Built Mobile-First",
  description:
    "Shopify mobile customization: thumb reach, tap targets, sticky bars, image weight, mobile gallery behaviour and the breakpoints we actually QA. Not a shrunk desktop layout.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "Shopify mobile customization",
    supporting: [
      "Shopify mobile layout",
      "Shopify responsive theme fix",
      "Shopify mobile menu customization",
      "Shopify mobile speed",
    ],
  },
  hero: {
    eyebrow: "Mobile layout",
    h1: "Mobile decisions, not a scaled-down desktop",
    lede: "On most stores seven to nine of every ten sessions are on a phone, and the mobile layout is still the one that was checked last. Mobile-first means deciding what belongs on a 390-pixel screen and what merely fits — then designing the desktop version outward from that.",
    meta: ["From $1,000", "QA at 360, 390, 768, 1024, 1440", "Touch targets at 44px minimum"],
    cta: { label: "Get a mobile quote", href: "/hire/" },
    secondary: { label: "See speed work", href: "/services/speed-optimization/" },
    visual: "mobile",
    backdrop: "dots",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The difference",
      heading: "Shrinking is not designing",
      body: [
        "A responsive theme will reflow a three-column grid into one column, and stop there. What it will not do is decide that the third column was desktop-only garnish, that the filter belongs in a sheet rather than a sidebar, or that the sticky header is eating a fifth of a small screen.",
        "Those are editorial decisions, and they are what separates a store that works on a phone from one that merely renders on a phone.",
      ],
      bullets: [
        "Content ranked for a small screen, not just stacked",
        "Primary action always within thumb reach",
        "Filters and navigation in sheets, not squeezed sidebars",
        "Sticky elements budgeted against screen height",
      ],
      visual: "mobile",
      caption: "Single column, sticky action bar, one decision per screen",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "What we change",
      heading: "The mobile work that matters most",
      lede: "Roughly in order of measured impact across projects.",
      columns: 3,
      items: [
        {
          meta: "1",
          title: "Image weight",
          body: "Correct srcset and sizes so a phone downloads a phone-sized image. The single biggest mobile speed factor on most stores.",
        },
        {
          meta: "2",
          title: "Thumb reach",
          body: "Primary actions in the lower two-thirds of the screen, sticky where the page is long, never behind a scroll.",
        },
        {
          meta: "3",
          title: "Tap targets",
          body: "44px minimum on every control, with real spacing between adjacent links. Chips and swatches are the usual offenders.",
        },
        {
          meta: "4",
          title: "Navigation and filters",
          body: "Menu and filter panels as full-height sheets with a focus trap, so keyboard and screen reader users are not stranded behind them.",
        },
        {
          meta: "5",
          title: "Gallery behaviour",
          body: "Swipe that does not fight page scroll, pinch zoom where it helps, and video that does not autoplay on cellular.",
        },
        {
          meta: "6",
          title: "Form usability",
          body: "Correct input types and autocomplete attributes so the right keyboard appears and the browser can fill the rest.",
        },
      ],
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "QA",
      heading: "The widths every template is checked at",
      body: [
        "360 and 390 pixels for phones, 768 for tablets, 1024 for laptops and 1440 for desktops — plus any width your own analytics show as significant. Emulator checks are the first pass, not the last: touch behaviour, sticky positioning and viewport-unit bugs only reveal themselves on a real device.",
        "We also check with the on-screen keyboard open, because a sticky footer bar that covers the field a customer is typing into is a bug no desktop test will ever surface.",
      ],
      bullets: [
        "Five widths minimum, plus your analytics' outliers",
        "Real devices for touch, sticky and viewport-unit behaviour",
        "Keyboard-open state checked on every form",
        "Landscape checked on phones, not assumed",
      ],
      visual: "breakpoints",
      caption: "The QA matrix every template passes",
    },
    priceBlock({
      heading: "Mobile work pricing",
      lede: "A contained mobile fix on one template is first-tier. A mobile-first pass across the whole store sits in the third.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "My theme is responsive. Why would I need mobile work?",
          a: "Responsive means it reflows without breaking. It does not mean the resulting layout is a good use of a small screen, that the primary action is reachable, or that a phone is being sent phone-sized images. Those are decisions the theme cannot make for you.",
        },
        {
          q: "Do you build a separate mobile site?",
          a: "No, and nobody should. One codebase, one set of templates, decisions made mobile-first. Separate mobile sites were a 2013 answer and they double every future change.",
        },
        {
          q: "Can you fix mobile without touching desktop?",
          a: "Usually yes — most changes are contained in mobile-only media queries. Occasionally the honest answer is that the underlying structure is the problem, in which case fixing mobile properly does change desktop, and we will say so in the scope rather than after.",
        },
        {
          q: "Is mobile speed part of this?",
          a: "Image weight and layout stability always are, because they are layout decisions. Deeper work — third-party scripts, render-blocking assets, app audit — is speed optimization, quoted separately so you can see what you are buying.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Product page", href: "/customization/product-page/", note: "Where mobile matters most" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "The other half of mobile UX" },
        { label: "Custom CSS", href: "/customization/css/", note: "Breakpoints and container queries" },
        { label: "Conversion optimization", href: "/services/conversion-optimization/", note: "Measuring the result" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "Mobile-first across the store" },
        { label: "Case studies", href: "/work/", note: "A mobile-first rebuild, documented" },
      ],
    },
    ctaBlock(
      "Send the store and a phone screenshot",
      "Point at what feels wrong on mobile. You get a scoped quote with a fixed price and a delivery date within two business days."
    ),
  ],
};
