import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/fonts/",
  title: "Custom Fonts on Shopify: Licensing, Hosting, No Shift",
  description:
    "Adding custom fonts to a Shopify theme: licence types that actually cover a storefront, self-hosting in assets, font-display behaviour, measured fallbacks and avoiding layout shift.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "custom fonts Shopify",
    supporting: [
      "add custom font to Shopify theme",
      "Shopify font licence",
      "Shopify Google Fonts",
      "Shopify font layout shift",
    ],
  },
  hero: {
    eyebrow: "Custom fonts",
    h1: "Custom fonts, licensed properly and loaded without a jump",
    lede: "Installing a font is ten minutes. Doing it so the licence covers your traffic, the text is readable before the file arrives, and nothing shifts when it does — that is the part worth paying for. Typography is also the fastest way to stop a store looking like its theme's demo.",
    meta: ["From $1,000", "Self-hosted in your theme", "Measured fallback, no shift"],
    cta: { label: "Get a font quote", href: "/hire/" },
    secondary: { label: "See CSS customization", href: "/customization/css/" },
    visual: "fonts",
    backdrop: "organic",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "First, the licence",
      heading: "The part that gets stores in trouble",
      body: [
        "A desktop licence — the one bundled with most font purchases — does not cover a website. Webfont licences are sold separately and are usually capped by monthly pageviews, which means a store that grows can quietly fall out of compliance without changing anything.",
        "We will not install a font without seeing that it is licensed for web use at your traffic level. Where a foundry font is not workable, there is almost always an open-source face with the same character, and we would rather propose that than leave you exposed.",
      ],
      bullets: [
        "Webfont licence confirmed before installation",
        "Pageview tier checked against your actual traffic",
        "Self-hosted rather than hotlinked from a foundry CDN",
        "Open-source alternatives proposed where they fit",
      ],
      visual: "fonts",
      caption: "The specimen, its weights, and the declared fallback",
      media: "right",
    },
    {
      type: "split",
      eyebrow: "Then, the loading",
      heading: "Why fonts cause layout shift, and how to stop it",
      body: [
        "A webfont arrives after the HTML. Whatever the browser drew first gets replaced, and if the fallback's metrics differ from the real face, every line reflows. That reflow is Cumulative Layout Shift, and it is the vital most stores fail.",
        "The fix is unglamorous and effective: subset the font to the characters you use, self-host it in the theme's assets, preload the one face used above the fold, declare font-display: swap, and tune the fallback's size-adjust so the swap is nearly invisible.",
      ],
      bullets: [
        "woff2 only, subset to the ranges you serve",
        "Preload the single above-the-fold face, not all six",
        "font-display: swap so text is never invisible",
        "Fallback metrics adjusted with size-adjust and ascent-override",
      ],
      visual: "speed",
      caption: "CLS is the vital a careless font swap ruins",
      tone: "tint",
    },
    {
      type: "table",
      eyebrow: "Options",
      heading: "Four ways to get a font onto a Shopify store",
      lede: "In descending order of how well they usually work.",
      columns: ["Approach", "Speed", "Licensing", "When it is right"],
      rows: [
        [
          "Self-hosted woff2 in theme assets",
          "Fastest — same origin, preloadable, subsettable",
          "You must hold a webfont licence",
          "Almost always the right answer",
        ],
        [
          "Shopify's own font picker",
          "Fast, and licence-free",
          "Covered by Shopify",
          "When one of its faces genuinely fits the brand",
        ],
        [
          "Google Fonts via link",
          "Acceptable; an extra connection and no subsetting control",
          "Open source, unrestricted",
          "Prototypes, or when self-hosting is blocked",
        ],
        [
          "Foundry-hosted script (Adobe, Monotype)",
          "Slowest — third-party script, render-blocking",
          "Covered by the subscription",
          "Only when the licence forbids self-hosting",
        ],
      ],
      note: "Shopify's font picker is underrated. If one of its faces fits, you save a licence, a request and a whole class of loading bug.",
    },
    priceBlock({
      heading: "What font work costs",
      lede: "A font installed properly across a theme, with the type scale applied, is first-tier work. A full typographic system as part of a redesign sits in the third.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Can I use any font I have bought?",
          a: "Only if the purchase included a webfont licence. Desktop licences cover documents and artwork, not a storefront serving thousands of pageviews. Check the licence before you fall in love with the face.",
        },
        {
          q: "How many weights should I use?",
          a: "Two or three. Each weight is another file, and most stores use one display weight, one body weight and one emphasis. Six weights is a common self-inflicted performance problem.",
        },
        {
          q: "Do custom fonts hurt SEO?",
          a: "Indirectly, through Core Web Vitals — a font that blocks rendering hurts LCP and a mismatched fallback hurts CLS. Installed as described here, the effect is negligible.",
        },
        {
          q: "Can I change fonts myself in the theme editor?",
          a: "Between Shopify's own font options, yes, in Theme settings → Typography. A custom self-hosted face has to be declared in the theme's CSS first; after that we expose it as a setting so switching is yours.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Custom CSS", href: "/customization/css/", note: "Where the type scale lives" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "Typography across every template" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "Font loading and CLS" },
        { label: "Theme editor guide", href: "/guides/theme-editor/", note: "Which settings you already own" },
        { label: "Dawn customization", href: "/customization/dawn/", note: "How Dawn declares its faces" },
        { label: "Pricing", href: "/pricing/", note: "The ladder in full" },
      ],
    },
    ctaBlock(
      "Send the font and the store",
      "Tell us which face you want and roughly your monthly pageviews. We will confirm whether the licence works and what installing it properly involves, within two business days."
    ),
  ],
};
