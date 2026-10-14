import type {
  CaseStudy,
  DiffTier,
  FaqItem,
  PricingLineItem,
  ProcessStep,
  ScopeBlock,
  ThemeRow,
  TimeRow,
} from "@/types";

/* ==========================================================================
   HOMEPAGE COPY — verbatim from Homepage_Design_v3_-_Final.html.
   Do not edit wording here without sign-off; see AGENT rule in CLAUDE.md
   §"Homepage content" — layout/animation/imagery may change, copy may not.
   ========================================================================== */

export const hero = {
  h1Before: "Shopify theme customization services, ",
  h1Emphasis: "scoped and priced",
  h1After: " before we start.",
  deck: "Your theme is 80% right. We build the last 20%.",
  lede: "We modify the Shopify theme you already run. Section edits, product page rebuilds, custom Liquid and CSS, and Online Store 2.0 migrations. Every project gets a fixed scope, a written price and a delivery date before work starts, and it all happens on a duplicate theme so your live store keeps selling.",
  ctaLabel: "Start a customization project",
  ctaHref: "/hire/",
  note: "Scoped quote in 2 business days",
  creds: {
    partner: "Shopify Partner",
    projects: "25+ theme projects delivered",
    caseStudies: "10 documented case studies",
  },
};

export const pricingCard = {
  eyebrow: "Published pricing",
  figurePrefix: "from",
  figure: "$1,000",
  note: "Most agencies answer this with a contact form. Here is the range, before you talk to anyone.",
  items: [
    { label: "Single-section edit", price: "$1,000" },
    { label: "Page-level build", price: "$2,800" },
    { label: "Full theme customization", price: "$6,500" },
    { label: "Multi-template rebuild", price: "$12,000" },
  ] satisfies PricingLineItem[],
};

export const scopeSection = {
  eyebrow: "What the service covers",
  h2: "What Shopify theme customization includes",
  deckSm: "Where the theme editor stops, and what lies past it",
  paragraphs: [
    "Shopify theme customization means changing a theme you already own. Not replacing it, not rebuilding it from zero. We work inside your existing theme and change what it looks like, what it can do, and what your team can control after we leave.",
    "Every Shopify store eventually hits the same wall. Theme settings carry you a long way, then one change needs code. Customization is the work on both sides of that line. Projects go wrong when nobody names where the line sits, so we name it in the scope document before you approve anything.",
    "Which side of the wall a request falls on decides what it costs and how long it takes. A colour change and a new product page look similar on a wishlist and differ by a factor of ten in practice. Sorting requests by that line is the first thing we do on every project.",
  ],
  footNote:
    "If a request lands past the wall, we tell you what it would take and what it would cost before it enters scope. That conversation happens during scoping, not after you have committed budget.",
};

export const scopeLeft: ScopeBlock[] = [
  {
    heading: "Design and layout",
    body: "The visual work that makes a stock theme look built for your brand rather than bought off a shelf. Most of it stays adjustable in the theme editor afterwards, so your team can keep tuning it without calling us back.",
    items: [
      "Colour schemes and typography scales",
      "Section order, spacing and rhythm",
      "Header, footer and navigation structure",
      "Mobile breakpoints and responsive fixes",
      "Custom fonts installed, licensed and declared",
      "Accessible contrast and visible focus states",
      "Print and email template styling where it exists",
    ],
  },
  {
    heading: "Sections and blocks",
    body: "New building blocks with proper schema, which means they show up in your theme editor with real settings rather than sitting hard-coded in a template. You get components your team can place, reorder and edit without touching code, and without paying us again for a text change six months from now. Sections built without schema look identical on launch day and cost you every time you want to move a heading.",
    items: [
      "Custom sections with editable settings",
      "Reusable blocks and saved presets",
      "App block placement and leftover cleanup",
      "Product templates and variant behaviour",
      "Metafield-driven content areas",
    ],
  },
];

export const scopeRight: ScopeBlock[] = [
  {
    heading: "Code-level changes",
    body: "Work no theme setting can reach. We write it into asset files and separate snippets wherever the theme allows, so your customization survives when the theme vendor ships an update. Where a change genuinely has to touch a core file, we log it in your handover notes so a future update does not quietly erase it. That log is the difference between a theme you can update and one you are locked out of.",
    items: [
      "Liquid templates and object logic",
      "Custom CSS in asset stylesheets",
      "JavaScript behaviour and interactions",
      "Schema that exposes new merchant settings",
      "Update-safe file structure and documentation",
    ],
  },
  {
    heading: "Where we stop",
    body: "Naming the boundary now costs nothing. Finding it in week three costs a rescope. These sit outside theme customization, and we will say so before you pay for anything.",
    isLimit: true,
    items: [
      "App functionality and third-party logic",
      "Checkout, unless you run Shopify Plus",
      "Platform limits Shopify enforces on all stores",
      "Inventory, ERP and backend systems",
      "Ground-up theme builds and migrations",
    ],
  },
];

export const themesSection = {
  eyebrow: "Supported themes",
  h2: "Which themes we customize",
  paragraph:
    "Every theme has a different ceiling. How far customization goes, how much stays editable afterwards, and how much a change costs all depend on which theme you started with. These are the ones we work in regularly and know the constraints of.",
};

export const themeRows: ThemeRow[] = [
  {
    name: "Online Store 2.0",
    note: "Highest ceiling",
    chips: ["Dawn", "Refresh", "Craft", "Sense", "Studio", "Ride"],
  },
  {
    name: "Premium themes",
    note: "Vendor update path",
    chips: ["Prestige", "Spotlight", "Impulse", "Motion", "Warehouse", "Symmetry"],
  },
  {
    name: "Legacy and vintage",
    note: "Pre-2.0 architecture",
    chips: ["Debut", "Brooklyn", "Minimal", "Supply", "Turbo", "Narrative"],
  },
];

export const themeNotes: string[] = [
  "Section-based architecture with JSON templates. Sections work on any page, settings live in schema, and the theme editor exposes far more than older themes did. The practical result is that more of what we build stays editable by your team after handover, and future changes cost less. If you are choosing a theme now and expect to customize it, start here. Dawn in particular is free, actively maintained by Shopify, and gives up very little to paid themes once customized.",
  "Heavier feature sets, and each vendor has its own conventions for how sections and settings are structured. Customization has to respect how that vendor ships updates, otherwise your changes get overwritten the first time you upgrade. We work with the theme's patterns rather than around them, which takes longer up front and saves you a rebuild later. Premium themes also ship with more features than most stores use, so part of scoping is deciding what to remove. Unused sections still load, still need testing, and still confuse whoever edits the store next year.",
  "Liquid templates without section support on most pages, so changes that a 2.0 theme handles in settings need code here. We customize these every week. We will also tell you when migrating to Online Store 2.0 costs less than another round of patching, which is more often than merchants expect. The tipping point usually arrives on the third or fourth significant request, when the workarounds start stacking on each other. At that point each new request costs more than the last, and the total spend passes what a migration would have cost.",
];

export const diffSection = {
  eyebrow: "Scope and cost",
  h2: "Customization scope tiers and what each costs",
  deckSm: "What each tier changes inside your theme",
  paragraph:
    "Priced by what actually gets touched in your theme, not by hours guessed in advance. Each tier below lists the files that change, so you can see what you are paying for before you commit. Every tier includes scoping, a staging theme, device QA and handover notes.",
  footNote:
    "Three variables move every estimate. Theme age, because pre-2.0 themes need workarounds that 2.0 themes handle in settings. Templates touched, because each one carries its own QA pass. And whether the change needs Liquid, since editor-level work costs a fraction of code-level work. Store setup and migration are quoted separately, see store setup. If your request sits between two tiers we quote the smaller one and tell you what the larger would add, rather than rounding up by default.",
};

export const diffTiers: DiffTier[] = [
  {
    id: "Tier 01",
    name: "Single-section edit",
    description:
      "One section changed or added, with schema so it stays editable in the theme editor afterwards. Typical requests: a custom hero, a trust bar, a revised collection grid. Suits stores that know exactly what is missing and want it fixed without opening a wider project.",
    changes: [
      { op: "add", label: "1 new section", path: "sections/custom-*.liquid" },
      { op: "mod", label: "Stylesheet", path: "assets/theme.css" },
      { op: "mod", label: "Theme settings", path: "config/settings_schema.json" },
    ],
    price: "$1,000",
    time: "2–4 days",
  },
  {
    id: "Tier 02",
    name: "Page-level build",
    description:
      "One template rebuilt end to end, including mobile behaviour and every new block it needs. Most often the product page, a landing page, or a filtered collection. QA covers the template across the devices your analytics actually show, rather than a generic breakpoint list.",
    changes: [
      { op: "mod", label: "1 template", path: "templates/product.json" },
      { op: "add", label: "3–5 sections", path: "sections/" },
      { op: "add", label: "Reusable snippets", path: "snippets/" },
      { op: "mod", label: "Stylesheet and scripts", path: "assets/" },
    ],
    price: "$2,800",
    time: "1–2 weeks",
  },
  {
    id: "Tier 03",
    name: "Full theme customization",
    description:
      "Every template touched. Your brand system applied store-wide, a custom section library your team can reuse, plus a performance pass and QA on real devices. This is the tier most brands pick when the store looks dated rather than broken.",
    changes: [
      { op: "mod", label: "All templates", path: "templates/" },
      { op: "add", label: "Custom section library", path: "sections/" },
      { op: "mod", label: "Layout", path: "layout/theme.liquid" },
      { op: "mod", label: "Settings and locales", path: "config/, locales/" },
    ],
    price: "$6,500",
    time: "3–5 weeks",
  },
  {
    id: "Tier 04",
    name: "Multi-template rebuild",
    description:
      "The deepest tier we offer. Theme architecture reworked on your existing base, new schema throughout, plus merchant training and written handover documentation. Chosen when the theme has become the constraint on what marketing can ship.",
    changes: [
      { op: "mod", label: "Theme architecture", path: "full file tree" },
      { op: "add", label: "New schema throughout", path: "merchant-editable" },
      { op: "add", label: "Handover docs", path: "change log and notes" },
    ],
    price: "$12,000",
    time: "6–8 weeks",
  },
];

export const timelineSection = {
  eyebrow: "Timeline and process",
  h2: "How long a Shopify theme customization takes",
  lede: "Most projects finish inside four weeks. Scope drives the number far more than our queue does, and we confirm the delivery date in writing before work starts rather than estimating as we go.",
  note: "Legacy themes sit at the longer end of each range, because pre-2.0 architecture needs workarounds a modern theme handles in settings. Feedback turnaround on your side is the other variable, and in practice it is the bigger one. Projects that slip almost always slip while waiting on approval, not while waiting on code. Peak retail season is the other constraint worth planning around, since publishing a theme change in late November is a risk no timeline can absorb.",
};

export const timeRows: TimeRow[] = [
  { label: "Single-section edit", time: "2–4 days" },
  { label: "Page-level build", time: "1–2 weeks" },
  { label: "Full theme customization", time: "3–5 weeks" },
  { label: "Multi-template rebuild", time: "6–8 weeks" },
  { label: "Online Store 2.0 migration", time: "2–3 weeks" },
];

export const processSection = {
  h2: "How the customization process works",
  lede: "Four stages, and your live store stays untouched until the last one.",
};

export const processSteps: ProcessStep[] = [
  {
    title: "Scope the work",
    body: "We audit your current theme, agree exactly what changes, and write a fixed scope with a price and a delivery date. You see the boundary before you commit, and nothing starts until you approve it. Anything we judge to sit past the wall gets flagged here, with what it would take to do it anyway.",
  },
  {
    title: "Duplicate the theme",
    body: "All work happens on a staging duplicate of your live theme. Your store keeps selling, your existing customizations stay intact, and there is no window where the site is half-built in public. As a Shopify Partner we request collaborator access, so you never share your account password and you can revoke access whenever you like. Your published theme stays exactly as it was until you decide otherwise.",
  },
  {
    title: "Build and review",
    body: "You get a preview link at each milestone rather than one reveal at the end, which is when scope disagreements usually surface. Feedback goes straight into the same staging theme, so what you approve is what publishes. Revisions inside the agreed scope are included, and anything outside it gets quoted before we build it rather than after.",
  },
  {
    title: "Launch and hand over",
    body: "QA on real devices, then publish. You receive the theme files, a change log of every edit, and written notes on which changes need care during a future theme update, including which files were touched and why. If your team wants to run the new sections themselves, we walk them through the theme editor before we close the project.",
  },
];

export const workSection = {
  eyebrow: "Selected work",
  h2: "Customization work we have shipped",
  paragraph:
    "Twenty-five theme projects delivered, ten written up in full. Each case study lists the starting theme, the scope requested, the technical constraint we hit, and what the client tracked afterwards. Where a decision would go differently today, we say so rather than editing it out. Projects that needed a rescope are documented alongside the ones that ran clean, because the first kind is more useful to read before hiring anyone.",
};

export const caseStudies: CaseStudy[] = [
  {
    href: "/work/apparel-dawn-product-page/",
    visual: "product-page",
    imgLabel: "Before / after screenshot — the product page",
    theme: "Dawn",
    title: "[Client name], apparel",
    body: "Product page rebuilt around variant-aware bundles, with a custom size guide block the merchandising team edits themselves.",
    outcomeLabel: "[ Result the client measured ]",
  },
  {
    href: "/work/home-goods-prestige-brand-system/",
    visual: "storefront",
    imgLabel: "Before / after screenshot — the collection grid",
    theme: "Prestige",
    title: "[Client name], home goods",
    body: "Brand system applied across every template, plus a filtered collection rebuild that kept the vendor's update path intact.",
    outcomeLabel: "[ Result the client measured ]",
  },
  {
    href: "/work/accessories-brooklyn-to-dawn-migration/",
    visual: "theme-editor",
    imgLabel: "Before / after screenshot — the theme editor",
    theme: "Brooklyn to Dawn",
    title: "[Client name], accessories",
    body: "Legacy theme migrated to Online Store 2.0 with every existing customization rebuilt as editable sections.",
    outcomeLabel: "[ Result the client measured ]",
  },
];

export const faqSection = {
  eyebrow: "Common questions",
  h2: "Frequently asked questions",
};

export const faqItems: FaqItem[] = [
  {
    question: "Can any Shopify theme be customized?",
    answer:
      "Yes, though the ceiling differs. Online Store 2.0 themes like Dawn expose far more through the theme editor, so more work stays editable after handover. Legacy themes such as Brooklyn and Debut need code for edits a 2.0 theme handles in settings, which makes the same change cost more. If your theme is fighting every request, migrating to Online Store 2.0 is sometimes cheaper than another round of customization.",
    open: true,
  },
  {
    question: "Will my customization survive a theme update?",
    answer:
      "It depends where the code lives. Changes made through the theme editor and in separate asset files carry over cleanly. Direct edits to core theme files get overwritten the moment the vendor ships an update. We write customizations to be update-safe wherever the theme's structure allows, and document the exceptions. See theme updates and migration.",
  },
  {
    question: "Do you need access to my live store?",
    answer:
      "We need collaborator access, but we never work in your live theme. Every change happens on a duplicate and you decide when it publishes. Collaborator access means no password sharing and access you can revoke at any time. Read the full process.",
  },
  {
    question: "What is the difference between customization and development?",
    answer:
      "Customization modifies a theme you already own. Development builds one from zero. Most merchants asking for a custom theme actually need deep customization, which delivers the same result at a fraction of the cost and keeps them on a theme that still receives vendor updates. We break the trade-off down in custom theme development versus customization.",
  },
  {
    question: "Should I hire a Shopify Partner for theme customization?",
    answer:
      "Partner status means the agency is in Shopify's formal programme and uses collaborator access rather than your account password. It is a floor, not a guarantee, so check it alongside published work and clear scoping. We are a Shopify Partner with 25+ theme projects delivered and ten documented publicly. More on vetting at hiring a Shopify theme developer.",
  },
  {
    question: "Can I customize a free Shopify theme?",
    answer:
      "Yes. Free themes including Dawn accept custom CSS, custom sections and Liquid changes exactly like paid ones. The difference is what you get out of the box, not the ceiling. Compare the trade-offs in custom theme versus template.",
  },
];

export const finalCta = {
  h2: "Start a customization project",
  paragraph:
    "Send your store URL and a short description of what you want changed. You get a scoped quote with a fixed price and a delivery date within two business days. No discovery call required to get a number, and no obligation once you have it.",
  ctaLabel: "Get a scoped quote",
  ctaHref: "/hire/",
};
