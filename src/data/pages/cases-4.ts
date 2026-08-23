import { buildCase } from "@/data/pages/_case";

export const outdoorSpeed = buildCase({
  slug: "/work/outdoor-gear-speed-rebuild/",
  title: "Case Study: Theme-Level Speed Work on a Heavy Impulse Store",
  description:
    "An outdoor gear store failing LCP on mobile. Four abandoned apps' scripts, an unbounded image pipeline and render-blocking vendor CSS — fixed in that order of impact.",
  eyebrow: "Outdoor gear · Impulse",
  h1: "Four dead apps, then the images, then the CSS",
  lede: "The merchant had bought a speed optimization app, seen no change, and concluded their theme was the problem. The theme was not the problem. Four apps they had uninstalled eighteen months earlier were still loading on every page.",
  meta: ["Impulse · premium 2.0", "Speed work · $2,400", "8 working days"],
  visual: "speed",
  backdrop: "beams",
  brief: [
    "Fix mobile page speed. The store was failing LCP in field data on both the home and product templates, and the merchant had already spent money on an optimization app that promised deferred scripts and delivered a slightly worse experience for the same LCP.",
    "They wanted to know what was actually costing them the time, in order, with numbers.",
  ],
  constraint: {
    heading: "The score was hiding the causes",
    body: [
      "Lighthouse reported a long list of findings ranked by detectability, and the merchant had been working down it. The real distribution was lopsided: four orphaned app script tags accounted for most of the main-thread work, and no amount of image optimization was going to compensate for that.",
      "So we measured field data per template, isolated each cause by disabling it in a staging theme, and reported the cost of each in order. Then we fixed them in that order, re-measuring after each one rather than at the end.",
    ],
    bullets: [
      "Field data per template, segmented by device",
      "Each cause isolated in staging before being fixed",
      "Re-measured after each fix, not once at the end",
      "The optimization app's own script removed as part of the work",
    ],
    visual: "speed",
  },
  changes: [
    ["− 4 script tags", "layout/theme.liquid", "Orphaned embeds from apps uninstalled 18 months earlier"],
    ["− 1 app", "speed optimization app", "Its own script cost more than the deferral it provided"],
    ["~ 8 sections", "sections/ (image rendering)", "Correct srcset and sizes; loading eager above the fold, lazy below"],
    ["~ 1 layout", "layout/theme.liquid", "Hero image preloaded; two non-critical stylesheets moved off the critical path"],
    ["~ 1 asset", "assets/custom.css", "Explicit aspect ratios on every image container to remove layout shift"],
    ["− 3 sections", "sections/ (unused vendor files)", "Dormant Impulse features confirmed unused and removed"],
  ],
  outcome: [
    "All three Core Web Vitals moved into the good range in field data on mobile for the home and product templates, and stayed there through the following quarter. The merchant also cancelled the optimization app subscription, which was a small recurring saving on top.",
    "The specific numbers belong to the merchant. The reproducible finding worth publishing is the ordering: on this store, and on most legacy-heavy stores we audit, orphaned third-party scripts outweighed every theme-level factor combined.",
  ],
  differently: [
    "We did not set up ongoing monitoring, so the merchant had no way to notice regression. Four months later they installed a chat widget that pushed INP back into the needs-improvement band, and nobody knew for weeks.",
    "Speed work now finishes with a monitoring setup and a one-page note on how to check the vitals before and after installing anything. Fixing a store once without giving anyone a way to see it drift is half a job.",
  ],
  related: [
    { label: "Speed optimization", href: "/services/speed-optimization/", note: "The service this sat under" },
    { label: "Legacy themes", href: "/customization/legacy-themes/", note: "Where dead scripts accumulate" },
    { label: "Mobile layout", href: "/customization/mobile/", note: "Image weight and layout stability" },
    { label: "Prestige customization", href: "/customization/prestige/", note: "Removing unused vendor features" },
  ],
});

export const jewelleryEditorial = buildCase({
  slug: "/work/jewellery-spotlight-editorial-templates/",
  title: "Case Study: Editorial Spotlight Templates Inside a Speed Budget",
  description:
    "A jewellery brand wanting magazine-style templates on Spotlight, without failing Core Web Vitals. How a performance budget shaped the design rather than diluting it.",
  eyebrow: "Jewellery · Spotlight",
  h1: "Editorial ambition, rationed above the fold",
  lede: "The brief was a magazine. Spotlight is happy to build one, and the default result was a six-second render on a mid-range phone. Setting a budget before design started is what let the store keep its drama and still pass the vitals.",
  meta: ["Spotlight · premium 2.0", "Multi-template rebuild · $12,000", "7 weeks"],
  visual: "storefront",
  backdrop: "organic",
  brief: [
    "Rebuild home, collection, product and two editorial landing templates in a magazine idiom: full-bleed imagery, large type, layered compositions, considered motion. The brand had a photographer on retainer and wanted the photography to carry the store.",
    "They also sold at a price point where a slow, cheap-feeling experience is a direct commercial problem, so the performance requirement was theirs, not ours.",
  ],
  constraint: {
    heading: "A budget agreed before any design, not after",
    body: [
      "The tension in an image-led theme is not fixable at the end. If a design has three above-the-fold hero assets, no amount of optimization saves it — so the constraint has to shape the design.",
      "We agreed a budget at scoping: one hero asset above the fold, preloaded and correctly sized; video below the fold only and never autoplaying on cellular; motion via transforms only, and nothing animating before first interaction. The designs were then made inside that, which produced better compositions than the unconstrained version — a single decisive image beats three competing ones.",
    ],
    bullets: [
      "One above-the-fold hero asset per template, preloaded",
      "Video below the fold, click to play on small screens",
      "Transforms only for motion; reduced-motion honoured throughout",
      "Vitals measured on every template at each milestone, not at the end",
    ],
    visual: "speed",
  },
  changes: [
    ["+ 14 sections", "sections/", "Editorial section library with block types, so the team composes new pages themselves"],
    ["+ 5 templates", "templates/*.json", "Home, collection, product and two landing templates"],
    ["+ 2 assets", "assets/fonts/*.woff2", "Licensed display face, subset, with fallback metrics tuned"],
    ["~ 1 layout", "layout/theme.liquid", "Per-template hero preload driven by the template's own settings"],
    ["+ 1 asset", "assets/reveal.js", "Transform-only scroll reveals, disabled under prefers-reduced-motion"],
    ["− 6 sections", "sections/ (unused vendor files)", "Spotlight features the brand confirmed they would never use"],
  ],
  outcome: [
    "Five templates in a genuinely editorial idiom, and Core Web Vitals in the good range on mobile for all five at handover. The section library is the part the brand values most: their team has since built four campaign landing pages without us.",
    "The brand tracked engaged session duration on the editorial templates. The measurable thing on our side is that the vitals budget held across every milestone, which is unusual for a project of this visual ambition and was entirely a function of agreeing it first.",
  ],
  differently: [
    "Fourteen sections was too many. Three of them are barely used, and in retrospect they were variations that should have been block types or layout settings on an existing section. The team has a slightly bloated section list to scroll past as a result.",
    "We now cap a section library deliberately and push variation into settings. A shorter list of more flexible sections is easier for a marketing team than a long list of specific ones.",
  ],
  related: [
    { label: "Spotlight customization", href: "/customization/spotlight/", note: "The theme" },
    { label: "Store redesign", href: "/services/store-redesign/", note: "Designing against a budget" },
    { label: "Speed optimization", href: "/services/speed-optimization/", note: "The vitals work" },
    { label: "Custom fonts", href: "/customization/fonts/", note: "The display face" },
  ],
});
