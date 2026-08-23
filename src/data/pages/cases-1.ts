import { buildCase } from "@/data/pages/_case";

export const apparelDawnProductPage = buildCase({
  slug: "/work/apparel-dawn-product-page/",
  title: "Case Study: Variant-Aware Bundle Product Page on Dawn",
  description:
    "An apparel merchant on Dawn needed bundles that respected per-variant stock, plus a size guide their merchandising team could edit. What we built, what fought back, and what we would change.",
  eyebrow: "Apparel · Dawn",
  h1: "A bundle product page that could not oversell a single size",
  lede: "The brief looked like a styling job and turned out to be an inventory-logic job. Bundles are easy until one item in the bundle is out of stock in one size, at which point every naive implementation either hides the bundle or sells something that cannot ship.",
  meta: ["Dawn · Online Store 2.0", "Page-level build · $2,800", "11 working days"],
  visual: "product-page",
  backdrop: "aurora",
  brief: [
    "The merchant sold apparel in five sizes with a small number of recurring pairings — a shirt and a matching short, a jacket and a liner. They wanted those pairings offered on the product page with a modest discount, and they wanted the size guide to stop being an image file their designer had to re-export whenever a fit changed.",
    "They had already tried a bundling app, removed it after two months because it rendered its own widget that did not match the theme, and been left with its script tag still loading on every page.",
  ],
  constraint: {
    heading: "Bundles are an inventory problem wearing a UI costume",
    body: [
      "A bundle offer has to reflect the stock state of every item in it, per variant. If the shirt exists in five sizes and the short in four, the pairing is only buyable in four — and if the medium short sells out mid-season, the medium pairing has to disappear without the section vanishing entirely.",
      "Dawn's product section had no concept of this, and neither did the app they had tried. We built the pairing as its own section reading a metafield list of companion products, then resolved availability per size at render time and disabled the combinations that could not ship.",
    ],
    bullets: [
      "Companion products set per product via a metafield, not hard-coded",
      "Availability resolved per size, not per product",
      "Unavailable combinations disabled before they can be clicked",
      "Section renders nothing when no pairing is buyable",
    ],
    visual: "code-liquid",
  },
  changes: [
    ["+ 2 sections", "sections/product-pairing.liquid, sections/size-table.liquid", "Both with schema, so merchandising controls sources and copy"],
    ["+ 1 snippet", "snippets/variant-availability.liquid", "Shared availability logic rather than duplicating it in both sections"],
    ["~ 1 template", "templates/product.json", "New sections placed and ordered; no Liquid edited"],
    ["+ 1 asset", "assets/custom.css", "Loaded after Dawn's stylesheet; no vendor file touched"],
    ["+ 2 metafield definitions", "product.companion_products, product.size_table", "Content owned by the merchandising team, not the theme"],
    ["− 1 script tag", "layout/theme.liquid", "Dead bundling app tag, still loading two months after uninstall"],
  ],
  outcome: [
    "The pairing section shipped as a merchant-editable component: the merchandising team sets companions per product and the section handles the rest, including going quiet when nothing in the pairing is buyable. The size table became a metafield, so a fit change is a spreadsheet edit rather than a design request.",
    "The client tracked add-to-cart rate on the product template and average order value for sessions that viewed a pairing. Both numbers are theirs to publish; what we can say is that removing the dead app script also took roughly 90KB of JavaScript off every page on the store, which was an accidental byproduct of the cleanup rather than the goal.",
  ],
  differently: [
    "We built the size table as its own section, and a year later that looks like a mistake. It should have been a block inside a generic \"spec table\" section, because the merchant later wanted the same table pattern for fabric composition and care instructions, and we ended up building a second nearly identical section rather than a second instance.",
    "The lesson we now apply during scoping: if a component's shape could plausibly recur, it is a block type, not a section. It costs almost nothing to decide that upfront and it is expensive to retrofit.",
  ],
  related: [
    { label: "Product page customization", href: "/customization/product-page/", note: "The service this sat under" },
    { label: "Sections and blocks", href: "/customization/sections/", note: "Why the retrospective matters" },
    { label: "Liquid customization", href: "/customization/liquid/", note: "The availability logic" },
    { label: "Dawn customization", href: "/customization/dawn/", note: "Working in Dawn" },
  ],
});

export const homeGoodsPrestige = buildCase({
  slug: "/work/home-goods-prestige-brand-system/",
  title: "Case Study: Prestige Brand System Across Every Template",
  description:
    "A home goods merchant on Prestige needed a brand system applied store-wide and a filtered collection rebuild — without losing the vendor's update path. How we kept both.",
  eyebrow: "Home goods · Prestige",
  h1: "A store-wide restyle that still takes vendor updates",
  lede: "Prestige is well built and opinionated. The merchant wanted a look that owed nothing to the demo, and they wanted to keep receiving vendor releases. Those two goals pull against each other, and reconciling them was most of the engineering.",
  meta: ["Prestige · premium 2.0", "Full customization · $6,500", "4 weeks"],
  visual: "storefront",
  backdrop: "organic",
  brief: [
    "The store had been on Prestige for two years, lightly configured, and looked like a well-lit version of the theme's demo. The merchant had a new brand identity — a serif display face, a much tighter spacing rhythm, a muted palette — and wanted it applied everywhere rather than on the homepage only.",
    "They also wanted collection filtering that reflected how customers actually shop their catalogue: by room, by material and by dimension range, none of which the stock filters expressed.",
  ],
  constraint: {
    heading: "Every override is a bet against the next release",
    body: [
      "Prestige defines its own type scale, spacing and colour handling. Overriding those is straightforward with enough specificity, and that is exactly the trap: a stylesheet full of high-specificity overrides works perfectly until the vendor renames a class, at which point some of it silently stops applying.",
      "So we worked with the theme's own custom properties where it defined them, and only introduced new selectors where it did not. The dimension filter also could not come from the stock facets, so it was rebuilt on real metafields with the theme's own filter markup reused rather than replaced.",
    ],
    bullets: [
      "The theme's existing custom properties overridden, not its rules",
      "One override stylesheet, no !important anywhere in it",
      "Filter markup reused so vendor updates to it still apply",
      "Nine unused section files removed after an inventory",
    ],
    visual: "code-css",
  },
  changes: [
    ["+ 1 asset", "assets/brand.css", "Token overrides plus the new type scale, loaded after the vendor stylesheet"],
    ["+ 1 asset", "assets/fonts/*.woff2", "Licensed display face, subset and self-hosted"],
    ["~ config", "config/settings_schema.json", "Brand tokens exposed as theme settings so the merchant can adjust them"],
    ["+ 1 section", "sections/collection-filter-dimensions.liquid", "Metafield-backed range filter reusing the theme's filter markup"],
    ["~ 6 templates", "templates/*.json", "Section order and colour schemes applied per template"],
    ["− 9 sections", "sections/ (unused vendor files)", "Dormant features removed after confirming with the merchant"],
  ],
  outcome: [
    "The store no longer reads as Prestige, and the theme still updates: two vendor releases have been applied since handover, each requiring only the four documented core-file re-applications from the change log.",
    "The merchant tracked collection-to-product click-through after the filter rebuild. Separately, removing the nine unused section files and their assets reduced the CSS shipped on every page, which was measurable regardless of what the filter did.",
  ],
  differently: [
    "We exposed too many brand tokens as theme settings — fourteen, when four were genuinely useful. The merchant's team found the typography panel intimidating and stopped using it, which is the opposite of the intended outcome.",
    "Now we cap merchant-facing tokens at the handful that will realistically change, and keep the rest in CSS where they belong. More settings is not more control; it is more places to get lost.",
  ],
  related: [
    { label: "Prestige customization", href: "/customization/prestige/", note: "Working with vendor themes" },
    { label: "Store redesign", href: "/services/store-redesign/", note: "The service this sat under" },
    { label: "Custom CSS", href: "/customization/css/", note: "How the overrides were written" },
    { label: "Custom fonts", href: "/customization/fonts/", note: "The display face" },
  ],
});
