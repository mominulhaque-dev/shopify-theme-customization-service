import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/dawn/",
  title: "Dawn Theme Customization: Shopify's Reference Theme",
  description:
    "Dawn theme customization: what Dawn does well, its real limitations, how to extend it without breaking the update path, and why it is the theme we recommend for most stores that plan to customize.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "Dawn theme customization",
    supporting: [
      "customize Dawn theme Shopify",
      "Dawn theme limitations",
      "Dawn vs paid theme",
      "Shopify Dawn sections",
    ],
  },
  hero: {
    eyebrow: "Dawn",
    h1: "Dawn customization: the highest ceiling of any free theme",
    lede: "Dawn is Shopify's reference implementation of Online Store 2.0 — free, actively maintained, and deliberately plain out of the box. That plainness is the feature: there is very little vendor opinion to fight, which makes it the cheapest theme to customize well and the one we recommend most often.",
    meta: ["Free and Shopify-maintained", "From $1,000", "Update path stays clean"],
    cta: { label: "Get a Dawn quote", href: "/hire/" },
    secondary: { label: "Compare themes", href: "/themes/" },
    visual: "theme-editor",
    backdrop: "aurora",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "Why we default to it",
      heading: "Plain is cheaper to customize than opinionated",
      body: [
        "Premium themes arrive with a hundred features and a strong point of view about how a store should look. Every one of those decisions you disagree with is work to undo, and every feature you do not use is code your visitors still download.",
        "Dawn arrives with a solid structure and almost no styling opinion. There is nothing to undo, so the budget goes into building what you actually want rather than into unpicking someone else's demo.",
      ],
      bullets: [
        "No vendor styling to override",
        "Reference implementation: every 2.0 feature arrives here first",
        "Shopify maintains it, so updates are frequent and predictable",
        "Smallest baseline payload of any mainstream theme",
      ],
      visual: "theme-editor",
      caption: "Dawn's editor: settings on the left, result on the right",
      media: "right",
    },
    {
      type: "checklist",
      eyebrow: "Honest assessment",
      heading: "What Dawn does well, and where it needs help",
      lede: "It is not perfect out of the box, and pretending otherwise leads to the wrong scope.",
      groups: [
        {
          title: "Strong out of the box",
          items: [
            "Section architecture on every template",
            "Colour schemes applied per section",
            "Accessible markup and keyboard behaviour",
            "Lean CSS and JavaScript baseline",
            "Predictable, documented file structure",
          ],
        },
        {
          title: "Usually needs work",
          limit: true,
          items: [
            "Product page: bundles, spec tables, richer variant states",
            "Collection filtering beyond basic facets",
            "Editorial layouts — its content sections are minimal",
            "Mega menu behaviour on large catalogues",
            "Typographic personality, which is deliberately absent",
          ],
        },
      ],
      note: "This list is also roughly the shape of a typical Dawn project: three or four additions on top of an already-sound base, rather than a rebuild.",
    },
    {
      type: "split",
      eyebrow: "Keeping updates painless",
      heading: "How we extend Dawn without stranding you",
      body: [
        "Shopify ships Dawn releases regularly, and the value of being on Dawn is partly that you can take them. So customizations go into new files: new sections, new snippets, a separate stylesheet loaded after the theme's own.",
        "Where a change genuinely has to touch a core file — occasionally the layout or the main product section — it is logged in your handover notes with what to re-apply. Every project ends with a list short enough to act on.",
      ],
      bullets: [
        "New sections and snippets rather than edited core ones",
        "Custom stylesheet loaded after theme.css, never inside it",
        "Overrides via CSS custom properties Dawn already defines",
        "Core-file edits listed with their upgrade risk",
      ],
      visual: "code-css",
      caption: "Overrides that do not need !important to win",
      tone: "tint",
    },
    priceBlock({
      heading: "Dawn customization pricing",
      lede: "Because there is no vendor styling to unpick, Dawn projects tend to land at the lower end of each tier than the same request would on a premium theme.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Is Dawn good enough for a serious store?",
          a: "Yes. It is the theme Shopify builds its own examples on, and once customized it gives up very little to paid themes. What you are buying with a premium theme is a head start on features, not a higher ceiling.",
        },
        {
          q: "Should I update Dawn before customizing?",
          a: "Yes, and before rather than after — customizing an old version then upgrading means doing parts of the work twice. If your current Dawn has already been hand-edited, we audit those edits during scoping so nothing is lost in the upgrade.",
        },
        {
          q: "Can Dawn be made to look completely different?",
          a: "Yes, and that is the usual brief. Its plainness is the reason it can: colour, typography, spacing, section structure and layout are all yours, and there is no vendor design language pushing back.",
        },
        {
          q: "Is Dawn slow?",
          a: "It is the fastest mainstream baseline available. Slow Dawn stores are almost always slow because of apps, unoptimised images and third-party scripts, not the theme — which is why our speed work starts by measuring those rather than the theme.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Themes we support", href: "/themes/", note: "Dawn against the alternatives" },
        { label: "Migration to 2.0", href: "/migration/", note: "Dawn is the usual destination" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "Extending Dawn properly" },
        { label: "Product page", href: "/customization/product-page/", note: "Where Dawn needs the most help" },
        { label: "Theme updates", href: "/guides/theme-updates/", note: "Taking Shopify's releases" },
        { label: "Prestige customization", href: "/customization/prestige/", note: "The premium comparison" },
      ],
    },
    ctaBlock(
      "Running Dawn?",
      "Send the store URL and your list of changes. Because we know Dawn's file tree by heart, the quote comes back fast — usually inside two business days."
    ),
  ],
};
