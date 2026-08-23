import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/liquid/",
  title: "Shopify Liquid Customization: Template and Object Logic",
  description:
    "Shopify Liquid customization: conditional content, variant and inventory logic, metafield output, snippets and update-safe file structure. What Liquid can and cannot do, and what it costs.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "Shopify Liquid customization",
    supporting: [
      "Shopify Liquid developer",
      "edit Shopify Liquid template",
      "Shopify Liquid conditional logic",
      "Shopify metafields in Liquid",
    ],
  },
  hero: {
    eyebrow: "Liquid",
    h1: "Liquid customization: the logic layer of your theme",
    lede: "Liquid decides what appears, for whom, and under which conditions. It is where a theme stops being a set of styles and starts expressing your catalogue's actual rules — which variants can be bought, what shows on a bundle, when a badge appears. It is also where badly written customizations do the most damage.",
    meta: ["From $1,000", "Update-safe file structure", "Documented, every edit"],
    cta: { label: "Get a Liquid quote", href: "/hire/" },
    secondary: { label: "All customization layers", href: "/customization/" },
    visual: "code-liquid",
    backdrop: "grid",
    tone: "dark",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "What it is",
      heading: "Liquid is a template language, not a programming language",
      body: [
        "It renders on Shopify's servers before the page reaches the browser, with access to the objects Shopify exposes: products, variants, collections, cart, customer, metafields, settings. There is no database access, no external calls, and no state between requests.",
        "That constraint is the whole shape of the work. Anything the objects expose is cheap. Anything they do not requires either the Storefront API called from the browser, an app, or a rethink — and knowing which of those three applies before quoting is most of the value of scoping.",
      ],
      bullets: [
        "Conditional content by variant, tag, collection, customer",
        "Inventory and availability states rendered honestly",
        "Metafield and metaobject output with fallbacks",
        "Snippets so the same logic is not pasted in four templates",
      ],
      visual: "code-liquid",
      caption: "A section that renders nothing rather than an empty block",
      media: "right",
    },
    {
      type: "split",
      eyebrow: "How we write it",
      heading: "Guarded, translated and kept out of core files",
      body: [
        "Three rules cover most of what separates Liquid that lasts from Liquid that becomes a support ticket. Guard for absence, because a merchant will eventually delete the collection your section depends on. Use translation keys rather than hard-coded strings, because you will eventually sell in a second language. And keep new logic in new files.",
        "Where a change genuinely has to touch a core theme file, it goes in your handover notes with what to re-apply after an upgrade. That log is the difference between a theme you can update and one you are locked out of.",
      ],
      bullets: [
        "Every object access guarded for empty and missing",
        "Strings via translation keys, not literals",
        "New logic in new sections and snippets",
        "Core-file edits logged with their upgrade risk",
      ],
      visual: "code-template",
      caption: "JSON templates keep section order out of Liquid entirely",
      tone: "tint",
    },
    {
      type: "checklist",
      eyebrow: "Reach",
      heading: "What Liquid can and cannot reach",
      lede: "This list is the honest boundary of the layer, and the reason some requests get quoted as development or declined outright.",
      groups: [
        {
          title: "Liquid can do this",
          items: [
            "Show, hide and reorder content by any object property",
            "Compute derived values: savings, bundle totals, unit prices",
            "Render metafield content with sensible fallbacks",
            "Vary output by customer tag, market or language",
            "Generate structured data from real product values",
          ],
        },
        {
          title: "Liquid cannot do this",
          limit: true,
          items: [
            "Call an external API during rendering",
            "Write data anywhere — it only reads",
            "React to user input without JavaScript",
            "Access another store's or another customer's data",
            "Change checkout behaviour outside Shopify Plus",
          ],
        },
      ],
      note: "When a request needs the right-hand column, the answer is the Storefront API called from the theme, an app, or a different approach — and we will tell you which before you commit budget.",
    },
    priceBlock({
      heading: "What Liquid work costs",
      lede: "Liquid work is priced on the standard ladder. A contained piece of logic in one template is the first tier; logic that spans templates and needs its own settings is the second.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Can I edit Liquid myself?",
          a: "You can, and for small changes it is reasonable — duplicate the theme first, always. What catches people out is that Liquid errors do not always fail loudly: an unguarded object access renders an empty block rather than an error, so a broken template can sit live for weeks.",
        },
        {
          q: "Will Liquid changes survive a theme update?",
          a: "Changes in new files always do. Edits inside core theme files are overwritten when the vendor ships a release, which is why we keep new logic in new sections and snippets and document the exceptions.",
        },
        {
          q: "Is Liquid being replaced by React or Hydrogen?",
          a: "Not for themes. Hydrogen is a separate way to build a storefront from scratch, with its own hosting and its own cost base. Liquid themes remain how the overwhelming majority of Shopify stores are built, and they are the only option if you want the theme editor.",
        },
        {
          q: "How do I know if my request is Liquid or something else?",
          a: "If the information you want to show already exists in Shopify, it is almost certainly Liquid. If it does not exist yet, or has to come from another system, it is not — and that is the single most useful question to answer before asking anyone for a quote.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Sections and blocks", href: "/customization/sections/", note: "Where Liquid usually lands" },
        { label: "Theme schema", href: "/customization/schema/", note: "Making logic merchant-editable" },
        { label: "Custom CSS", href: "/customization/css/", note: "The styling layer" },
        { label: "Shopify development", href: "/services/shopify-development/", note: "When Liquid is not enough" },
        { label: "Edit theme code", href: "/guides/edit-theme/", note: "Doing it yourself, safely" },
        { label: "Product page", href: "/customization/product-page/", note: "The template with the most logic" },
      ],
    },
    ctaBlock(
      "Describe the rule you need expressed",
      "Send the store URL and what should appear when. We will tell you whether Liquid can reach it, and what it costs, within two business days."
    ),
  ],
};
