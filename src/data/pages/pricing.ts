import type { PageContent } from "@/types/page";
import { TIER_ITEMS, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/pricing/",
  title: "Shopify Theme Customization Pricing: Published Rates",
  description:
    "What Shopify theme customization costs: four published tiers from $1,000 to $12,000, what each includes, the three variables that move an estimate, and what is quoted separately.",
  seo: {
    intent: "commercial",
    primary: "Shopify theme customization cost",
    supporting: [
      "Shopify theme customization pricing",
      "how much does Shopify customization cost",
      "Shopify developer rates",
      "Shopify redesign cost",
    ],
  },
  hero: {
    eyebrow: "Pricing",
    h1: "Shopify theme customization pricing, published",
    lede: "Most agencies answer this with a contact form. Here is the range before you talk to anyone: four tiers, what each one changes in your theme, and the three variables that move a quote up or down. Every project is fixed-price before work starts.",
    meta: ["From $1,000", "Fixed price before work starts", "Quote in 2 business days"],
    cta: { label: "Get a scoped quote", href: "/hire/" },
    secondary: { label: "Explore services", href: "/services/" },
    visual: "code-template",
    backdrop: "grid",
    tone: "dark",
  },
  blocks: [
    {
      type: "priceList",
      eyebrow: "The ladder",
      heading: "Four tiers, priced by what gets touched",
      lede: "Not by hours guessed in advance. Each tier lists the files that change, so you can see what you are paying for before you commit.",
      items: TIER_ITEMS,
      note: "Every tier includes scoping, a staging theme, QA on real devices, and handover notes. Revisions inside the agreed scope are included.",
    },
    {
      type: "table",
      eyebrow: "Line by line",
      heading: "What changes inside your theme at each tier",
      lede: "The same information a developer would want before quoting: which files move.",
      columns: ["Tier", "Templates", "Sections", "Assets", "Config"],
      rows: [
        ["Single-section edit", "None", "1 added or reworked", "Stylesheet", "Theme settings"],
        ["Page-level build", "1 rebuilt", "3–5 added", "Stylesheet and scripts", "Template settings"],
        ["Full theme customization", "All", "Custom section library", "Stylesheet, scripts, fonts", "Settings and locales"],
        ["Multi-template rebuild", "All, restructured", "New schema throughout", "Full asset pass", "Settings, locales, handover docs"],
      ],
      note: "If your request sits between two tiers we quote the smaller one and tell you what the larger would add, rather than rounding up by default.",
      tone: "tint",
    },
    {
      type: "cards",
      eyebrow: "What moves a quote",
      heading: "Three variables, in order of impact",
      lede: "These are the questions we ask during scoping, and the honest answers to them are what make a fixed price possible.",
      columns: 3,
      items: [
        {
          meta: "Biggest factor",
          title: "Theme age",
          body: "Pre-2.0 themes need workarounds that a 2.0 theme handles in settings. The same request can differ by a full tier between Dawn and Brooklyn.",
        },
        {
          meta: "Second",
          title: "Templates touched",
          body: "Each template carries its own QA pass across five viewport widths. Two templates is not twice the work of one, but it is not the same either.",
        },
        {
          meta: "Third",
          title: "Editor or code",
          body: "Editor-level work costs a fraction of code-level work. Sorting your request list along that line is the first thing scoping does.",
        },
      ],
    },
    {
      type: "checklist",
      eyebrow: "Inclusions",
      heading: "What every quote includes, and what it does not",
      lede: "Naming the boundary now costs nothing. Finding it in week three costs a rescope.",
      groups: [
        {
          title: "Included in every project",
          items: [
            "Written scope document with a fixed price",
            "A confirmed delivery date before work starts",
            "Staging theme duplicated from your live theme",
            "Milestone preview links, not one reveal at the end",
            "Revisions inside the agreed scope",
            "QA at 360, 390, 768, 1024 and 1440px",
            "Theme files, change log and update-risk notes",
          ],
        },
        {
          title: "Quoted separately",
          limit: true,
          items: [
            "Online Store 2.0 migration",
            "New store setup",
            "App configuration and third-party subscriptions",
            "Copywriting, photography and product data entry",
            "Ongoing retainers after handover",
            "Anything outside the storefront theme layer",
          ],
        },
      ],
      note: "Font licences, paid theme purchases and app subscriptions are yours and billed to you directly by their vendors — we never mark them up or resell them.",
    },
    {
      type: "split",
      eyebrow: "Payment",
      heading: "How billing works",
      body: [
        "Fifty per cent on scope approval, fifty per cent on publish. No hourly billing, no timesheets to audit, and no invoice that arrives larger than the number you approved.",
        "If a request outside the agreed scope appears mid-project — and on about a third of projects one does — it gets quoted as an addition before it is built, not billed after. You can always decline it and ship what was scoped.",
      ],
      bullets: [
        "50% on approval, 50% on publish",
        "Fixed price, not an estimate",
        "Out-of-scope work quoted before it is built",
        "No lock-in: the theme files are yours at handover",
      ],
      visual: "handover",
      caption: "What you receive at close",
      media: "right",
    },
    {
      type: "faq",
      items: [
        {
          q: "Why publish prices when most agencies do not?",
          a: "Because the first question every merchant has is whether this is a $1,000 job or a $12,000 one, and making them book a call to find out wastes both parties' time. If the range does not fit your budget you should know that in thirty seconds, not after a discovery call.",
        },
        {
          q: "Is the price really fixed?",
          a: "For the scope you approve, yes. The scope document lists what is in and what is out, and the price does not move unless you ask for something that is not on it. When that happens it is quoted as an addition first.",
        },
        {
          q: "Do you charge more for legacy themes?",
          a: "The same request often lands a tier higher on a pre-2.0 theme, because changes a 2.0 theme handles in settings need code there. It is not a surcharge — it is more work. During scoping we will tell you if migrating first would cost you less overall.",
        },
        {
          q: "What is the cheapest useful thing you do?",
          a: "A single-section edit at $1,000: one section added or reworked with schema so it stays editable afterwards. It suits stores that know exactly what is missing. Below that, you are better served making the change yourself than hiring anyone.",
        },
        {
          q: "Do you offer retainers?",
          a: "Yes, for stores shipping campaign work regularly, as a monthly block of theme hours with the same scoping discipline per request. For one defined build, a fixed-price project costs you less.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Services", href: "/services/", note: "What we do and how projects run" },
        { label: "Migration", href: "/migration/", note: "Quoted separately, and why" },
        { label: "Store setup", href: "/store-setup/", note: "New store, not an existing theme" },
        { label: "Case studies", href: "/work/", note: "Scope and outcome per project" },
        { label: "Hire us", href: "/hire/", note: "Send a URL, get a number" },
      ],
    },
    ctaBlock(
      "Get the number for your actual request",
      "Send your store URL and what you want changed. You get a fixed price, a delivery date and the scope in writing within two business days. No discovery call required."
    ),
  ],
};
