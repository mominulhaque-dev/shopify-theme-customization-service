import type { PageContent } from "@/types/page";
import { ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/store-setup/",
  title: "Shopify Store Setup: Launch-Ready Theme From Zero",
  description:
    "Shopify store setup for new merchants: theme selection, brand system, essential templates, navigation, apps, policies and pre-launch QA — quoted as a fixed-price launch package.",
  seo: {
    intent: "commercial",
    primary: "Shopify store setup",
    supporting: [
      "new Shopify store setup service",
      "Shopify launch checklist",
      "Shopify theme setup",
      "set up Shopify store for me",
    ],
  },
  hero: {
    eyebrow: "Store setup",
    h1: "New Shopify store, set up to be changed later",
    lede: "Setting up a store is mostly decisions, not code: which theme, which templates you actually need at launch, what your team will need to edit weekly. We make those decisions with you, build the launch-ready storefront, and hand over something your team can run.",
    meta: ["From $3,400", "2–3 weeks to launch-ready", "Built on Online Store 2.0"],
    cta: { label: "Get a setup quote", href: "/hire/" },
    secondary: { label: "See theme options", href: "/themes/" },
    visual: "overlap-store",
    backdrop: "aurora",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "Scope",
      heading: "Setup is not customization, and it is quoted separately",
      body: [
        "Customization changes a theme that is already live and already selling. Setup starts from an empty store, which means the work is different: choosing rather than modifying, and building the minimum set of templates that lets you open.",
        "It also means the risks are different. There is no live revenue to protect, but there is a launch date, and the most common way a launch slips is a decision nobody made — which theme, which payment provider, which shipping zones.",
      ],
      bullets: [
        "Theme selection with the customization ceiling in mind",
        "Only the templates you need to open, built properly",
        "Navigation, policies, shipping and tax configuration",
        "A brand system your team can extend without us",
      ],
      visual: "palette",
      caption: "Tokens written into the theme, not scattered inline",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "What is included",
      heading: "The launch package",
      lede: "Everything a store needs to take a real order, with nothing added because it looked good on a proposal.",
      columns: 3,
      items: [
        {
          meta: "Foundation",
          title: "Theme selection and install",
          body: "A 2.0 theme chosen for what you plan to change later, not only for how the demo looks. Dawn unless there is a reason.",
        },
        {
          meta: "Foundation",
          title: "Brand system applied",
          body: "Colour, type scale, spacing and button styles set as theme settings and tokens, so they change in one place afterwards.",
        },
        {
          meta: "Templates",
          title: "Core templates built",
          body: "Home, collection, product, cart, search, 404, plus about and contact. Each one styled and populated with your real content.",
        },
        {
          meta: "Templates",
          title: "Navigation and footer",
          body: "Menu structure, footer columns, policy links and utility pages, wired to real destinations rather than placeholders.",
        },
        {
          meta: "Configuration",
          title: "Store settings",
          body: "Shipping zones, tax regions, payment providers, notification emails, and the policy pages Shopify requires.",
        },
        {
          meta: "Configuration",
          title: "Apps, chosen sparingly",
          body: "Reviews, email and analytics installed and placed as app blocks. Every app you skip is speed you keep.",
        },
      ],
    },
    {
      type: "steps",
      eyebrow: "Pre-launch",
      heading: "The checks before you open",
      lede: "In order, because some of them can only be verified once the ones above are done.",
      items: [
        {
          title: "Test order end to end",
          body: "A real transaction through your live payment provider, including the notification emails, the receipt, and a refund. Nothing else proves the store works.",
        },
        {
          title: "Mobile pass at 360 and 390px",
          body: "Most first sessions are on a phone. Tap targets, thumb reach, sticky bars and image weight get checked there first, not last.",
        },
        {
          title: "Core Web Vitals baseline",
          body: "Measured before launch so future changes have something to be compared against, and so a slow theme is caught while it is still cheap to fix.",
        },
        {
          title: "Analytics and consent",
          body: "GA4 or Shopify analytics verified as receiving events, with a consent banner if you sell into regions that require one.",
        },
        {
          title: "Handover walkthrough",
          body: "A recorded pass through the theme editor showing your team which sections they own, which settings do what, and where not to go.",
        },
      ],
      visual: "handover",
      tone: "tint",
    },
    {
      type: "faq",
      items: [
        {
          q: "Do I need a paid theme to launch?",
          a: "No. Dawn is free, maintained by Shopify, and once customized gives up very little to paid themes. Buy a premium theme when its built-in feature set genuinely matches your merchandising — not because free feels risky.",
        },
        {
          q: "Can you migrate my products from another platform?",
          a: "Product import from WooCommerce, BigCommerce or a CSV export is part of setup when you need it. What we do not take on is ERP or inventory-system integration, which is outside the storefront layer.",
        },
        {
          q: "How long until I can take orders?",
          a: "Two to three weeks for a store with product photography and copy ready. The variable is almost never the build — it is whether the content exists. Stores waiting on photography routinely take twice as long.",
        },
        {
          q: "Will I be able to change things myself afterwards?",
          a: "That is the point of building it on 2.0 with proper schema. Content, imagery, section order and layout options are yours in the theme editor. The walkthrough recording at handover exists so nobody has to guess which setting does what.",
        },
        {
          q: "What does setup not include?",
          a: "Copywriting, product photography, paid media, and app subscriptions. We will tell you which apps are worth their monthly cost, but the accounts and invoices stay yours.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Themes we support", href: "/themes/", note: "Choosing with the ceiling in mind" },
        { label: "Customization", href: "/customization/", note: "After launch, when you change things" },
        { label: "Dawn customization", href: "/customization/dawn/", note: "The usual starting theme" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "Keep the launch baseline" },
        { label: "Pricing", href: "/pricing/", note: "How fixed pricing works" },
        { label: "Process", href: "/process/", note: "Scope, stage, build, hand over" },
      ],
    },
    ctaBlock(
      "Opening a store?",
      "Tell us what you sell, whether your content is ready, and the date you want to open. You get a fixed-price setup scope and a launch date within two business days."
    ),
  ],
};
