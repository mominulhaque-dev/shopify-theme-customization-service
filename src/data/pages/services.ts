import type { PageContent } from "@/types/page";
import { ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/services/",
  title: "Shopify Services: Theme Customization, Development and CRO",
  description:
    "Every service we offer on Shopify themes: customization, Liquid development, Online Store 2.0 migration, redesign, speed work and conversion optimization. Scope and price for each.",
  seo: {
    intent: "commercial",
    primary: "Shopify services",
    supporting: [
      "Shopify theme customization services",
      "Shopify development agency",
      "Shopify store redesign",
      "Shopify speed optimization",
      "Shopify conversion optimization",
    ],
  },
  hero: {
    eyebrow: "Services",
    h1: "Shopify services, each one scoped before it starts",
    lede: "We work on the storefront layer: the theme, the templates, the Liquid, the CSS and the JavaScript your customers actually meet. Six services, each with a published price range and a written scope you approve before any code moves.",
    meta: ["Shopify Partner", "25+ theme projects delivered", "Fixed scope, fixed date"],
    cta: { label: "Get a scoped quote", href: "/hire/" },
    secondary: { label: "See pricing", href: "/pricing/" },
    visual: "overlap-store",
    backdrop: "aurora",
  },
  blocks: [
    {
      type: "cards",
      eyebrow: "What we do",
      heading: "Six services, one storefront layer",
      lede: "Pick the one that matches the problem. If you are not sure which it is, send the store URL and we will tell you which one your request actually is — including when the answer is that you do not need us yet.",
      columns: 3,
      items: [
        {
          meta: "From $1,000",
          title: "Theme customization",
          body: "Change the theme you already own. Sections, templates, Liquid, CSS, and schema so your team keeps control after handover.",
          href: "/customization/",
        },
        {
          meta: "From $2,800",
          title: "Shopify development",
          body: "Custom sections, apps blocks, metafield-driven content and the JavaScript behaviour a theme setting cannot reach.",
          href: "/services/shopify-development/",
        },
        {
          meta: "From $6,500",
          title: "Store redesign",
          body: "A new brand system applied across every template, with the section library your marketing team needs to keep shipping.",
          href: "/services/store-redesign/",
        },
        {
          meta: "From $2,400",
          title: "Speed optimization",
          body: "Theme-level Core Web Vitals work: render-blocking assets, image pipeline, third-party scripts, unused sections.",
          href: "/services/speed-optimization/",
        },
        {
          meta: "From $2,800",
          title: "Conversion optimization",
          body: "Product page, cart and collection changes aimed at the step your analytics say is leaking, not at a generic checklist.",
          href: "/services/conversion-optimization/",
        },
        {
          meta: "From $4,200",
          title: "Online Store 2.0 migration",
          body: "Move off a legacy theme with every existing customization rebuilt as schema-driven sections rather than lost.",
          href: "/migration/",
        },
      ],
    },
    {
      type: "split",
      eyebrow: "How to choose",
      heading: "Customization or development?",
      body: [
        "Customization modifies a theme you already own. Development builds behaviour that theme does not have. Most requests that arrive described as \"we need a custom build\" are the first kind, and cost a fraction of the second.",
        "The test we apply: can the outcome be reached by changing existing templates, styles and settings, or does it need new logic that does not exist in the theme yet? The first is customization. The second is development, and it is quoted separately because it carries its own QA surface.",
      ],
      bullets: [
        "Restyling, restructuring, new sections — customization",
        "New behaviour, new data, new integrations — development",
        "A theme fighting every request — usually a migration",
        "A store that does not exist yet — store setup",
      ],
      visual: "ceiling",
      caption: "How much each theme generation absorbs before code is required",
      cta: { label: "Compare customization and development", href: "/custom-theme-development/" },
      media: "right",
      tone: "tint",
    },
    priceBlock(),
    {
      type: "steps",
      eyebrow: "Engagement",
      heading: "The same four stages, whichever service you buy",
      lede: "Your live store keeps selling until the last one.",
      items: [
        {
          title: "Scope",
          body: "Audit, fixed scope document, price and delivery date in writing. Nothing starts until you approve it.",
          meta: "1–2 business days",
        },
        {
          title: "Stage",
          body: "A duplicate of your live theme, reached through collaborator access you can revoke at any time.",
          meta: "Same day",
        },
        {
          title: "Build",
          body: "Preview links at each milestone. Revisions inside scope are included; anything outside it is quoted before it is built.",
          meta: "Per milestone",
        },
        {
          title: "Hand over",
          body: "Device QA, publish, then theme files, a change log and update-risk notes for every core file touched.",
          meta: "Documented",
        },
      ],
      visual: "timeline",
    },
    {
      type: "faq",
      items: [
        {
          q: "Do you work with agencies as a white-label partner?",
          a: "Yes. We take theme-layer work under an agency's own client relationship, using their staging conventions and reporting into their project manager. The scope document and change log are written so they can be handed to the end client unedited.",
        },
        {
          q: "Can you take on retainer work rather than projects?",
          a: "For stores that ship regularly, yes — a monthly block of theme hours with the same scoping discipline applied per request. It suits merchants running frequent campaigns. It is a poor fit if you need one defined build, where a fixed-price project is cheaper for you.",
        },
        {
          q: "What do you not do?",
          a: "App development, checkout beyond what Shopify Plus exposes, ERP and inventory integrations, and paid media. We also do not take work where the honest answer is that the theme is fine and the problem is elsewhere in the funnel.",
        },
        {
          q: "Which platforms other than Shopify do you work on?",
          a: "None. Every hour we have goes into Shopify themes, which is what lets us quote a section rebuild in days rather than weeks and know before opening the file which vendor conventions a premium theme follows.",
        },
      ],
    },
    {
      type: "related",
      heading: "Go deeper",
      items: [
        { label: "Theme customization", href: "/customization/", note: "Every layer we touch inside a theme" },
        { label: "Pricing", href: "/pricing/", note: "The full ladder and what moves an estimate" },
        { label: "Process", href: "/process/", note: "How a project actually runs, stage by stage" },
        { label: "Themes we support", href: "/themes/", note: "Dawn, Prestige, Spotlight, legacy" },
        { label: "Case studies", href: "/work/", note: "Documented projects, including the rescopes" },
        { label: "Guides", href: "/guides/", note: "Do it yourself, if that is the right call" },
      ],
    },
    ctaBlock(
      "Tell us what you want changed",
      "Send your store URL and a short description. You get a scoped quote with a fixed price and a delivery date within two business days, and no obligation once you have it."
    ),
  ],
};
