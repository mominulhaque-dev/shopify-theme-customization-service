import { buildCase } from "@/data/pages/_case";

export const accessoriesMigration = buildCase({
  slug: "/work/accessories-brooklyn-to-dawn-migration/",
  title: "Case Study: Brooklyn to Dawn Migration, Rebuilt Properly",
  description:
    "Six years of hard-coded Brooklyn customizations rebuilt as schema-driven Dawn sections. What transferred, what did not, and why the inventory document was the most valuable deliverable.",
  eyebrow: "Accessories · Brooklyn to Dawn",
  h1: "Six years of hard-coded sections, rebuilt as things the team can edit",
  lede: "The merchant had accumulated a decade's habits in a pre-2.0 theme: content in Liquid, three developers' worth of undocumented edits, and a homepage nobody dared touch. The migration's real deliverable was not the new theme — it was the inventory of what the old one actually did.",
  meta: ["Brooklyn → Dawn", "Migration · $4,200", "3 weeks"],
  visual: "migration",
  backdrop: "beams",
  brief: [
    "Move off Brooklyn. The trigger was a request to add an editable content block to the product page, which in Brooklyn meant a developer, and the merchant had finally asked why that was true for something so small.",
    "They wanted visual parity at launch — no redesign, no surprises — and they wanted their marketing coordinator to be able to change homepage and product-page content without filing a ticket.",
  ],
  constraint: {
    heading: "Nobody knew what the old theme did",
    body: [
      "Three developers had worked on the theme over six years and none had left notes. Content was embedded in Liquid, one section used a hard-coded product handle that had been renamed at some point and was silently rendering nothing, and two script tags belonged to apps the merchant had never heard of.",
      "So week one was archaeology rather than building: every template read line by line, every hard-coded value listed, every script tag traced. The resulting inventory was the document the fixed price was based on, and the merchant kept a copy regardless of whether they proceeded.",
    ],
    bullets: [
      "Every template read and inventoried before quoting",
      "Two orphaned app script tags identified and traced",
      "One section found broken and unnoticed for an unknown period",
      "Hard-coded content catalogued for conversion to settings",
    ],
    visual: "migration",
  },
  changes: [
    ["+ 7 templates", "templates/*.json", "Every page type as a JSON template with reorderable sections"],
    ["+ 11 sections", "sections/", "Each with schema; the eight hard-coded Brooklyn blocks became four reusable sections"],
    ["+ 4 snippets", "snippets/", "Shared logic instead of the same code in four templates"],
    ["+ 1 asset", "assets/custom.css", "Ported styling, rewritten without the legacy workarounds"],
    ["+ 5 metafield definitions", "product.*, collection.*", "Content that had been Liquid literals"],
    ["− 2 script tags", "layout/theme.liquid", "Orphaned app embeds, one for an app cancelled in 2021"],
  ],
  outcome: [
    "Visual parity at launch, verified template by template against the live Brooklyn store at five widths. The marketing coordinator now edits homepage and product-page content directly, and the request that triggered the whole project took four minutes rather than a quote.",
    "The eight hard-coded blocks became four sections with block types, because half of them were variations of the same pattern — which is the kind of consolidation that only becomes visible once someone inventories the old theme properly.",
  ],
  differently: [
    "We quoted the inventory as part of the migration rather than as its own small engagement, which meant the merchant committed to a full migration before seeing what was in their theme. It worked out, but they were taking our word for the scale.",
    "We now offer the inventory as a standalone first step where the legacy theme is old enough to be a genuine unknown. It de-risks the decision for the merchant and costs us little, and twice since then it has ended with us recommending a patch rather than a migration.",
  ],
  related: [
    { label: "Migration to 2.0", href: "/migration/", note: "The service this sat under" },
    { label: "Legacy theme customization", href: "/customization/legacy-themes/", note: "Patch versus migrate" },
    { label: "Theme schema", href: "/customization/schema/", note: "What made the content editable" },
    { label: "Change your theme", href: "/guides/change-theme/", note: "Doing it yourself" },
  ],
});

export const supplementsSubscription = buildCase({
  slug: "/work/supplements-subscription-product-page/",
  title: "Case Study: Subscription Product Page Without the App Widget",
  description:
    "A supplements merchant whose subscription app widget was unreadable on mobile. We surfaced selling plans natively in the theme, keeping the app but not its interface.",
  eyebrow: "Supplements · Dawn",
  h1: "Selling plans that read clearly on a phone",
  lede: "The subscription app worked correctly and looked wrong: a widget in its own visual language, with one-off and subscription pricing competing for attention on a 390-pixel screen. The fix was to keep the app's logic and replace its interface with the theme's.",
  meta: ["Dawn · Online Store 2.0", "Page-level build · $2,800", "9 working days"],
  visual: "mobile",
  backdrop: "dots",
  brief: [
    "Two thirds of the merchant's revenue came from subscriptions, and their own analytics showed subscription selection dropping sharply on mobile. The app's widget rendered a radio group, a frequency dropdown and a discount badge in a stack that pushed the add-to-cart button below the fold.",
    "They did not want to change subscription providers — the billing worked and the migration risk was unacceptable. They wanted the same selling plans presented properly.",
  ],
  constraint: {
    heading: "Keeping the app's logic while dropping its interface",
    body: [
      "Selling plans are Shopify objects, not app objects: the plan groups, frequencies and discounts are all available in Liquid regardless of which app created them. That means the interface can be rebuilt in the theme while the app continues to own billing.",
      "The risk is drift. If the merchant later adds a plan group with different options, a hand-built interface can misrepresent it. So the section reads plan groups generically rather than assuming the current shape, and falls back to the app's own block if it encounters a configuration it cannot render.",
    ],
    bullets: [
      "Selling plans read from Shopify's own objects, not the app's markup",
      "Interface built generically, not against the current plan shape",
      "Falls back to the app block if a configuration is unrecognised",
      "One-off versus subscription framed as one decision, not three controls",
    ],
    visual: "product-page",
  },
  changes: [
    ["+ 1 section", "sections/selling-plan-picker.liquid", "Native picker reading selling_plan_groups, with schema for labels and default"],
    ["+ 1 snippet", "snippets/plan-price.liquid", "Per-plan price and saving, formatted with the store's money format"],
    ["~ 1 template", "templates/product.json", "App block replaced by the new section, app block retained as fallback"],
    ["~ 1 asset", "assets/custom.css", "Sticky add-to-cart on mobile with the plan state visible in the bar"],
    ["+ 1 asset", "assets/plan-picker.js", "Custom element, so it re-initialises when the theme editor re-renders the section"],
  ],
  outcome: [
    "One decision above the fold on mobile — one-off or subscribe, with the price difference stated in the same line — and a sticky add-to-cart that shows which plan is selected. The app still handles billing, and the merchant can revert to its own widget by toggling a section setting.",
    "The merchant tracked subscription selection rate by device. The structural change we can state without their numbers: the primary action moved from below the fold to above it on a 390px viewport, which was the actual complaint.",
  ],
  differently: [
    "We shipped the fallback-to-app-block behaviour but did not document it well enough. When the merchant added a second plan group six months later, they saw the app widget reappear and assumed something had broken rather than that the fallback had done its job.",
    "The change log now describes fallback behaviour in plain language, with what triggers it and who to ask. A safety net nobody knows about reads as a bug.",
  ],
  related: [
    { label: "Product page customization", href: "/customization/product-page/", note: "The service this sat under" },
    { label: "Mobile layout", href: "/customization/mobile/", note: "Where the problem was" },
    { label: "Shopify development", href: "/services/shopify-development/", note: "The custom element approach" },
    { label: "Conversion optimization", href: "/services/conversion-optimization/", note: "How we chose the target" },
  ],
});
