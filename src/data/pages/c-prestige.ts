import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/prestige/",
  title: "Prestige Theme Customization Without Losing Updates",
  description:
    "Prestige theme customization: working with the vendor's conventions rather than against them, which features to strip, where its settings model ends, and how to keep the update path intact.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "Prestige theme customization",
    supporting: [
      "customize Prestige Shopify theme",
      "Prestige theme update",
      "Prestige vs Dawn",
      "premium Shopify theme customization",
    ],
  },
  hero: {
    eyebrow: "Prestige",
    h1: "Prestige customization that survives the next vendor release",
    lede: "Prestige is one of the best-built premium themes on Shopify, and it has strong opinions. Customizing it well means learning those opinions and working inside them — because the fastest way to lose your investment is to fight the vendor's structure and then accept an update.",
    meta: ["From $1,000", "Vendor update path preserved", "Unused features stripped deliberately"],
    cta: { label: "Get a Prestige quote", href: "/hire/" },
    secondary: { label: "Compare themes", href: "/themes/" },
    visual: "storefront",
    backdrop: "organic",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "The vendor question",
      heading: "Premium themes update too, and that is the constraint",
      body: [
        "Maison Made ships Prestige releases with fixes and new features. Taking them is valuable — but an update replaces the theme's own files, so any customization written inside those files disappears with it.",
        "So the discipline on a premium theme is stricter than on Dawn: new sections rather than edited ones, overrides in a separate stylesheet, and settings added through the theme's own conventions so an upgrade recognises them. Where a core edit is unavoidable, it goes in the handover log with the exact snippet to re-apply.",
      ],
      bullets: [
        "New files preferred over edited vendor files, always",
        "Overrides loaded after the vendor stylesheet",
        "The theme's own naming and settings patterns followed",
        "Every unavoidable core edit logged for the next upgrade",
      ],
      visual: "code-css",
      caption: "Overrides that respect the vendor's cascade",
      media: "right",
    },
    {
      type: "split",
      eyebrow: "Scoping a premium theme",
      heading: "Half the work is deciding what to remove",
      body: [
        "Prestige ships more features than almost any store uses: multiple header variants, several product page layouts, section types for merchandising patterns you may never run. Every unused one still loads, still needs testing when something changes, and still confuses whoever edits the store next year.",
        "So a Prestige project starts with an inventory of what is actually in use. Removing the rest is usually the cheapest performance work available on the theme, and it makes every later change simpler.",
      ],
      bullets: [
        "Inventory of sections and settings genuinely in use",
        "Unused section files and their assets removed",
        "Header and footer variants narrowed to the one you run",
        "Result: a smaller payload and a simpler editor for your team",
      ],
      visual: "speed",
      caption: "Removing dormant features is measurable, not cosmetic",
      tone: "tint",
    },
    {
      type: "table",
      eyebrow: "Prestige vs Dawn",
      heading: "Which to be on, honestly",
      lede: "We have no commercial interest in either answer — we do not resell themes.",
      columns: ["", "Prestige", "Dawn"],
      rows: [
        ["Cost", "One-off licence fee", "Free"],
        ["Out-of-the-box features", "Extensive, editorial-leaning", "Deliberately minimal"],
        ["Design opinion", "Strong — a real advantage if it matches your brand", "Almost none, so nothing to undo"],
        ["Customization cost", "Slightly higher: vendor conventions to respect", "Lower: no styling to unpick"],
        ["Updates", "Vendor releases; customizations must be structured for them", "Shopify releases, frequent and predictable"],
        ["Best when", "Its layouts already resemble the store you want", "You want a specific design built without compromise"],
      ],
      note: "If you already own Prestige and it broadly fits, keep it — switching costs more than customizing. If you are choosing now and intend a bespoke design, Dawn is usually the cheaper route to the same place.",
    },
    priceBlock({
      heading: "Prestige customization pricing",
      lede: "Same ladder as any theme. Premium themes occasionally add time at scoping, because respecting the vendor's structure takes longer than ignoring it — and saves a rebuild later.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Will updating Prestige delete my customizations?",
          a: "Anything written inside the vendor's own files, yes. Anything in new files, no. That is precisely why we keep custom sections, snippets and stylesheets separate, and why your handover notes list every core-file exception.",
        },
        {
          q: "Can you make Prestige look nothing like its demo?",
          a: "Yes, though it takes more effort than the same brief on Dawn — there is an existing design language to override rather than an empty canvas to fill. If a completely bespoke look is the goal and you have not bought a theme yet, we would steer you to Dawn.",
        },
        {
          q: "Should I switch from Prestige to Dawn?",
          a: "Only if Prestige is actively fighting what you need, and even then weigh it against the migration cost — you would be rebuilding your section content. If the theme broadly fits, customizing it is cheaper than moving.",
        },
        {
          q: "Do you work on other premium themes?",
          a: "Yes: Spotlight, Impulse, Motion, Warehouse and Symmetry regularly. The approach is identical — learn the vendor's conventions, build in new files, log the exceptions.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Spotlight customization", href: "/customization/spotlight/", note: "The other premium theme we see most" },
        { label: "Dawn customization", href: "/customization/dawn/", note: "The free comparison" },
        { label: "Themes we support", href: "/themes/", note: "Ceilings by generation" },
        { label: "Theme updates", href: "/guides/theme-updates/", note: "Taking vendor releases safely" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "Stripping unused features" },
        { label: "Store redesign", href: "/services/store-redesign/", note: "A full pass on a premium theme" },
      ],
    },
    ctaBlock(
      "Running Prestige?",
      "Send the store URL and your change list. We will tell you which items fit the theme's conventions cleanly and which ones need a core-file exception, before you commit."
    ),
  ],
};
