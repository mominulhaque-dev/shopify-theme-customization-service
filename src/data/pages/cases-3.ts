import { buildCase } from "@/data/pages/_case";

export const furnitureFiltering = buildCase({
  slug: "/work/furniture-collection-filtering/",
  title: "Case Study: Collection Filtering Rebuilt on Real Metafields",
  description:
    "A furniture catalogue whose customers shop by dimension and material, filtered by a theme that only understood tags. Rebuilt on metafields, with the theme's own filter markup kept.",
  eyebrow: "Furniture · Craft",
  h1: "Filters that could express the catalogue",
  lede: "The merchant's customers shop by whether a piece fits a space: width, depth, material. The theme filtered by tag, so the previous developer had encoded dimensions as tags — hundreds of them, maintained by hand, and wrong wherever someone had mistyped.",
  meta: ["Craft · Online Store 2.0", "Page-level build · $2,800", "12 working days"],
  visual: "storefront",
  backdrop: "contour",
  brief: [
    "Rebuild collection filtering so customers can filter by dimension range and material without the merchant maintaining a tag taxonomy by hand. The existing setup had around four hundred tags, several of them near-duplicates from typos, and adding a product meant remembering the convention.",
    "They also wanted the filter usable on mobile, where the theme rendered it as a collapsed sidebar squeezed into a third of the screen.",
  ],
  constraint: {
    heading: "Tags are not a data model",
    body: [
      "Shopify's storefront filtering works from tags, variant options and metafields — but only metafields of specific types are filterable, and numeric range filtering needs the value stored as a number rather than as text. The previous tag approach existed because that constraint had not been understood.",
      "So the work started in the admin rather than the theme: metafield definitions of the correct types, then a one-time migration of the tag data into them. Only after that was the filter rebuild a theme problem, and it reused the theme's own filter markup so vendor updates to it still apply.",
    ],
    bullets: [
      "Metafield definitions created with filterable types",
      "Existing tag data migrated once, then the tags retired",
      "Theme's own filter markup reused rather than replaced",
      "Mobile filter moved to a full-height sheet with a focus trap",
    ],
    visual: "code-template",
  },
  changes: [
    ["+ 6 metafield definitions", "product.width, depth, height, material, finish, assembly", "Correct filterable types, replacing a hand-maintained tag taxonomy"],
    ["+ 1 section", "sections/collection-filters-mobile.liquid", "Full-height sheet with focus trap and a result count"],
    ["~ 1 section", "sections/main-collection.liquid", "Facet configuration updated; markup structure left as the vendor wrote it"],
    ["~ 1 asset", "assets/custom.css", "Filter sheet styling and 44px minimum tap targets on every facet"],
    ["+ 1 asset", "assets/filter-sheet.js", "Custom element handling open, close, focus trap and scroll lock"],
    ["− ~400 tags", "product tags", "Retired after migration; the merchant now edits structured fields"],
  ],
  outcome: [
    "Customers filter by dimension range, material and finish. The merchant adds a product by filling six fields instead of remembering a tag convention, and the near-duplicate tags are gone. On mobile the filter is a full-height sheet rather than a compressed sidebar, keyboard operable and scroll-locked.",
    "The merchant tracked collection-to-product click-through and filter usage. The operational change is easier to state: product setup went from a convention nobody had written down to six labelled fields.",
  ],
  differently: [
    "We migrated the tag data with a one-off script and did not give the merchant a way to re-run it. When they bulk-imported a hundred products from a supplier feed two months later, those arrived with tags and no metafields, and the filter quietly did not include them.",
    "Data migrations for a live catalogue now ship with a documented, repeatable process rather than a script we ran once. If the merchant can import products, they can import products that need migrating.",
  ],
  related: [
    { label: "Sections and blocks", href: "/customization/sections/", note: "What was built" },
    { label: "Theme schema", href: "/customization/schema/", note: "Settings versus metafields" },
    { label: "Mobile layout", href: "/customization/mobile/", note: "The filter sheet" },
    { label: "Liquid customization", href: "/customization/liquid/", note: "Rendering metafield values" },
  ],
});

export const cosmeticsMobile = buildCase({
  slug: "/work/cosmetics-mobile-conversion-pass/",
  title: "Case Study: Mobile-First Rebuild at 91% Phone Traffic",
  description:
    "A cosmetics store where nine in ten sessions were on a phone and the layout had been designed on a desktop. Product and cart templates rebuilt mobile-first, with the desktop derived from it.",
  eyebrow: "Cosmetics · Refresh",
  h1: "Designing for the screen the customers actually used",
  lede: "The merchant's analytics showed the overwhelming majority of sessions on phones. The store had been built desktop-first and then made to reflow, which is a different thing from being designed for a phone — and the product template showed it.",
  meta: ["Refresh · Online Store 2.0", "Full customization · $6,500", "4 weeks"],
  visual: "mobile",
  backdrop: "aurora",
  brief: [
    "Rebuild the product and cart experience for mobile. The specific complaints were that the add-to-cart button required scrolling past a tall image gallery, that shade swatches were too small to hit reliably, and that the cart drawer covered the form field a customer was typing a discount code into once the keyboard opened.",
    "The desktop layout was not to get worse, but it was explicitly the secondary concern.",
  ],
  constraint: {
    heading: "Reflow is not a mobile design",
    body: [
      "The theme's product template stacked correctly on a phone. What it did not do was decide anything: the gallery kept its desktop prominence, the swatch row kept its desktop density, and the sticky header kept a height chosen for a wide viewport.",
      "So the rebuild started at 390 pixels and worked outward. Gallery height capped so the primary action sits above the fold, swatches at 44 pixels with real spacing, sticky bar height budgeted against the viewport, and the cart drawer tested with the on-screen keyboard open — which is where the discount-code bug lived and where no desktop test would ever have found it.",
    ],
    bullets: [
      "Layout decisions made at 390px first, desktop derived from it",
      "Every control at 44px minimum with adjacent spacing",
      "Sticky element heights budgeted as a share of viewport height",
      "Tested with the on-screen keyboard open on real devices",
    ],
    visual: "breakpoints",
  },
  changes: [
    ["~ 3 sections", "sections/main-product.liquid, main-cart-items, cart-drawer", "Vendor sections copied to new files before editing, so updates remain reviewable"],
    ["+ 1 section", "sections/product-sticky-bar.liquid", "Sticky action bar showing selected variant and price"],
    ["~ 1 asset", "assets/custom.css", "Mobile-first media queries; desktop rules as min-width additions"],
    ["+ 1 asset", "assets/gallery.js", "Swipe gallery that does not fight vertical page scroll"],
    ["~ 1 template", "templates/product.json", "Section order reworked for a single-column reading order"],
    ["~ config", "config/settings_schema.json", "Sticky bar and gallery height exposed as bounded ranges"],
  ],
  outcome: [
    "The primary action is above the fold on a 390-pixel screen with a variant selected, swatches are reliably tappable, and the discount field is no longer covered by the keyboard. Desktop was rebuilt from the mobile layout outward and reviewed as a secondary target rather than the default.",
    "The merchant tracked add-to-cart rate and cart-to-checkout rate on mobile. What we can state independently is that the keyboard-overlap bug was reproducible before the work and is not reproducible after it.",
  ],
  differently: [
    "We copied three vendor sections into new files so we could edit them safely, and that decision has a cost we underweighted: the merchant no longer receives vendor improvements to those three sections. It was the right trade for two of them and probably wrong for the cart drawer, where the changes were small enough to have been done with CSS alone.",
    "We now ask a sharper question before copying a vendor section: can this be achieved with styling and a wrapper? If yes, keep the vendor's file and keep its updates.",
  ],
  related: [
    { label: "Mobile layout customization", href: "/customization/mobile/", note: "The service this sat under" },
    { label: "Product page", href: "/customization/product-page/", note: "The main template" },
    { label: "Conversion optimization", href: "/services/conversion-optimization/", note: "How the target was chosen" },
    { label: "Theme updates", href: "/guides/theme-updates/", note: "The cost of copying vendor sections" },
  ],
});
