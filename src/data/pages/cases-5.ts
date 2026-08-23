import { buildCase } from "@/data/pages/_case";

export const b2bWholesale = buildCase({
  slug: "/work/b2b-wholesale-price-list-templates/",
  title: "Case Study: Wholesale Price Lists Without Shopify Plus",
  description:
    "A merchant needing customer-specific wholesale pricing and quick ordering, built inside standard Shopify theme limits using customer tags, metafields and a quick-order form.",
  eyebrow: "B2B · Dawn",
  h1: "Wholesale ordering inside the limits of a standard plan",
  lede: "The merchant wanted trade customers to log in and see their own pricing, then order by SKU rather than browsing. Half of what they described needs Shopify Plus. The other half was achievable, and the useful part of the project was drawing that line before anyone paid for anything.",
  meta: ["Dawn · Online Store 2.0", "Multi-template rebuild · $12,000", "6 weeks"],
  visual: "code-template",
  backdrop: "grid",
  brief: [
    "Trade customers should log in, see trade prices, order in case quantities, and place an order by typing SKUs and quantities into a form rather than navigating the catalogue. They also wanted net payment terms and per-customer catalogues.",
    "They were on a standard Shopify plan and did not want to upgrade unless it was genuinely required.",
  ],
  constraint: {
    heading: "Half the brief needed Plus, and we said so in week one",
    body: [
      "Net payment terms and true B2B company accounts are Plus features. Nothing in the theme layer approximates them safely — you can hide a checkout button and email an invoice, and we declined to build that because it moves an accounting process into a storefront hack.",
      "What was achievable: customer-tag-driven templates showing trade pricing from metafields, case-quantity enforcement, a quick-order form using the cart AJAX API, and per-customer catalogue visibility. The scope document listed the Plus-only items explicitly, with what upgrading would cost, so the merchant could decide with real numbers.",
    ],
    bullets: [
      "Trade pricing from metafields, gated on customer tag",
      "Case quantities enforced in the theme and re-validated in cart",
      "Quick-order form built on the cart AJAX API",
      "Payment terms and company accounts declined, with the Plus cost stated",
    ],
    visual: "code-liquid",
  },
  changes: [
    ["+ 3 templates", "templates/page.quick-order.json, page.trade.json, customers/account.json", "Trade surfaces as their own templates"],
    ["+ 6 sections", "sections/", "Quick-order form, trade price table, case-quantity selector, account summary"],
    ["+ 4 snippets", "snippets/", "Tag gating and trade-price resolution, shared rather than duplicated"],
    ["+ 4 metafield definitions", "variant.trade_price, variant.case_qty, product.trade_only, customer tags", "Pricing data owned by the merchant"],
    ["+ 1 asset", "assets/quick-order.js", "Custom element posting to /cart/add.js with per-line validation"],
    ["~ 1 layout", "layout/theme.liquid", "Trade navigation shown only to tagged, logged-in customers"],
  ],
  outcome: [
    "Trade customers log in, see their pricing, and place a fifty-line order in a couple of minutes through the quick-order form. Retail customers see none of it. The merchant chose not to upgrade to Plus and handles payment terms in their accounting system, which was a deliberate decision made with the cost in front of them.",
    "The merchant tracked average trade order size and time-to-order. Independently: the quick-order form replaced a spreadsheet emailed back and forth, which is the operational change they mention when they refer us.",
  ],
  differently: [
    "Gating on customer tags is fragile in a way we should have flagged harder. Tags are editable by anyone with staff access and there is no audit trail, so a mis-tagged customer sees the wrong prices with no record of who changed it.",
    "For work like this we now recommend a customer metafield rather than a tag where the client's admin has multiple staff, and we say plainly in the scope that tag-based gating is a convention rather than a permission system.",
  ],
  related: [
    { label: "Shopify development", href: "/services/shopify-development/", note: "The service this sat under" },
    { label: "Liquid customization", href: "/customization/liquid/", note: "Tag gating and price resolution" },
    { label: "Theme schema", href: "/customization/schema/", note: "Settings versus metafields" },
    { label: "Pricing", href: "/pricing/", note: "Where this tier sits" },
  ],
});

export const footwearRescope = buildCase({
  slug: "/work/footwear-legacy-turbo-rescope/",
  title: "Case Study: The Project We Stopped and Requoted in Week Two",
  description:
    "A Turbo store where the third request made patching more expensive than migrating. We paused the project, showed the merchant both numbers, and refunded the difference.",
  eyebrow: "Footwear · Turbo",
  h1: "The project we stopped in week two",
  lede: "This is the write-up merchants tell us is the most useful one here. We scoped three changes on a legacy theme, started building, and realised by the second that we had quoted the wrong thing — so we stopped, showed our arithmetic, and let the merchant decide.",
  meta: ["Turbo · legacy", "Rescoped mid-project", "Refunded, then requoted"],
  visual: "migration",
  backdrop: "contour",
  brief: [
    "Three changes on a Turbo store: an editable content block on the product page, a revised collection grid, and a trust bar in the header. Quoted as a page-level build because two of the three touched the product template.",
    "The merchant had been quoted twice before by other developers, both times higher, and had chosen us partly on price.",
  ],
  constraint: {
    heading: "Each workaround made the next one more expensive",
    body: [
      "Turbo has no section support outside the homepage, so the editable content block had to be built from theme settings and a hard-coded template edit. That worked. The collection grid change then had to coexist with it, and the trust bar needed a header edit that interacted with both.",
      "By the second change it was clear the third would cost roughly what the first two had together, and that any further request from the merchant would be worse again. The honest total for patching had passed what a migration to Dawn plus the same three changes would cost — so continuing would have been billing them for a route we knew was the wrong one.",
    ],
    bullets: [
      "No section support outside the homepage on Turbo",
      "Each workaround constrained the next",
      "Patch total passed the migration total by the second change",
      "We stopped rather than finishing a scope we no longer believed in",
    ],
    visual: "ceiling",
  },
  changes: [
    ["~ 1 template", "templates/product.liquid", "First change shipped, then reverted when the project was rescoped"],
    ["+ 1 snippet", "snippets/trust-bar.liquid", "Built, then carried forward into the migration rather than discarded"],
    ["— paused", "remaining scope", "Stopped in week two; the collection grid was never built on Turbo"],
    ["+ inventory", "documentation", "Full theme inventory produced, given to the merchant regardless of outcome"],
    ["→ requoted", "migration to Dawn + the three changes", "New fixed price, with the difference from the original credited"],
  ],
  outcome: [
    "The merchant migrated to Dawn and got the three original changes plus editable sections across every template, for less than continuing to patch would have cost over the following year. We credited the difference between the work delivered and the work billed.",
    "The commercially uncomfortable part: telling a client who chose us on price that the cheaper option was the wrong one, and that we had helped them make that mistake. They have since referred two other merchants, both of whom mentioned this project by name.",
  ],
  differently: [
    "The failure was at scoping, not during the build. We priced the three requests individually and did not ask the question that mattered: what is this merchant likely to ask for next? A store with three requests today has six within a year, and on a legacy theme that changes the answer entirely.",
    "Scoping for legacy themes now includes a forward-looking question about the next twelve months, and a patch-versus-migrate comparison in every quote whether or not the merchant asked for one. Two subsequent projects have gone straight to migration because of it — and several others were single patches we did and left alone.",
  ],
  related: [
    { label: "Legacy theme customization", href: "/customization/legacy-themes/", note: "The arithmetic in full" },
    { label: "Migration to 2.0", href: "/migration/", note: "Where this ended up" },
    { label: "Pricing", href: "/pricing/", note: "How rescopes are handled" },
    { label: "Hiring a developer", href: "/guides/hire-theme-developer/", note: "Ask anyone about their rescopes" },
  ],
});
