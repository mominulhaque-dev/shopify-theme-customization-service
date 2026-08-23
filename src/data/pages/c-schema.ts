import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/schema/",
  title: "Shopify Theme Schema: The Settings Layer, Done Right",
  description:
    "Shopify theme schema explained: settings_schema.json, section schema, setting types, presets and metafield-backed settings. Why schema decides how much your team can edit after handover.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "informational",
    primary: "Shopify theme schema",
    supporting: [
      "settings_schema.json",
      "Shopify section schema settings",
      "Shopify theme settings JSON",
      "Shopify schema setting types",
    ],
  },
  hero: {
    eyebrow: "Theme schema",
    h1: "Schema is the difference between a theme you own and one you rent",
    lede: "Schema is the JSON that tells Shopify what a merchant is allowed to change. It is invisible, unglamorous, and the single strongest predictor of whether you will need to hire a developer again next quarter. Most of the value we add on a project is decided here.",
    meta: ["Included in every build", "Settings designed, not defaulted", "Documented at handover"],
    cta: { label: "Get a quote", href: "/hire/" },
    secondary: { label: "See sections and blocks", href: "/customization/sections/" },
    visual: "code-schema",
    backdrop: "grid",
    tone: "dark",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "Where it lives",
      heading: "Two kinds of schema, two different jobs",
      body: [
        "Global schema lives in config/settings_schema.json and defines the store-wide settings — colour, typography, layout defaults — that appear under Theme settings. It is the right home for anything that should be consistent everywhere.",
        "Section schema lives inside each section file, in a {% schema %} tag, and defines what that section exposes when a merchant adds it. It is the right home for anything that should vary per instance. Putting a decision in the wrong one of these two is how stores end up with nine slightly different greens.",
      ],
      bullets: [
        "Global: brand tokens, defaults, anything store-wide",
        "Section: content, sources, per-instance layout options",
        "Blocks: repeatable items, with a deliberate maximum",
        "Presets: the configuration a new instance starts from",
      ],
      visual: "code-schema",
      caption: "A section schema with the setting types that matter",
      media: "right",
    },
    {
      type: "table",
      eyebrow: "Setting types",
      heading: "The types worth knowing, and when to reach for each",
      lede: "Choosing the right input is most of what makes a theme editor pleasant to use rather than a wall of text fields.",
      columns: ["Type", "Gives the merchant", "Use it for"],
      rows: [
        ["text / textarea", "A plain field", "Headings and short copy — never for markup"],
        ["richtext / inline_richtext", "Basic formatting", "Body copy where a link or bold is legitimate"],
        ["image_picker", "Media library access with focal point", "Any image, so alt text and crops stay theirs"],
        ["product / collection / blog", "A resource picker", "Anything that should follow the catalogue, not a hard-coded handle"],
        ["range", "A slider with real bounds", "Counts, sizes and spacing — bounded so the layout cannot be broken"],
        ["select / radio", "A constrained choice", "Layout variants, so there are three good options rather than infinite bad ones"],
        ["color_scheme", "A theme colour scheme", "Section tone on 2.0 themes, instead of a raw colour picker"],
        ["link_list / url", "A menu or a link", "Navigation, so the merchant edits menus in one place"],
      ],
      note: "The mistake we correct most often is a text field where a resource picker belonged: a hard-coded product handle that breaks silently the day the product is renamed.",
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Judgement",
      heading: "Not everything should be a setting",
      body: [
        "It is tempting to expose everything. Resist it: forty settings in one section is worse for a merchant than eight, because the eight that matter get lost. Every setting is also a state we have to QA, and a way the layout can be broken by someone with good intentions.",
        "The rule we apply is frequency. If your team will change it more than once a quarter, it is a setting. If it is a brand decision that should not drift, it belongs in global schema or in CSS. If it would break the layout at either extreme, it is a bounded range or a select, never a free field.",
      ],
      bullets: [
        "Changed often → section setting",
        "Should stay consistent → global setting or token",
        "Could break the layout → bounded range or select",
        "Structural → not a setting at all",
      ],
      visual: "theme-editor",
      caption: "Fewer, better settings — each one connected to a visible result",
    },
    priceBlock({
      heading: "Schema work in context",
      lede: "Schema is never billed on its own — it is part of every section and template we build, and part of what makes the tiers below worth their price.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Can schema be added to an existing hard-coded section?",
          a: "Yes, and it is one of the best-value small projects there is. Taking content currently buried in Liquid and exposing it as settings pays for itself the second time you would otherwise have asked a developer to change a word.",
        },
        {
          q: "Is schema the same as metafields?",
          a: "No. Schema settings belong to the theme and describe presentation. Metafields belong to the resource — a product, a collection — and describe data. A spec table is metafields; how that table is laid out is schema. Getting this split right is what lets you change themes later without losing content.",
        },
        {
          q: "What happens to my settings when the theme updates?",
          a: "Settings you have configured persist, as long as the setting ids still exist in the new version. A vendor who renames an id in an update effectively resets that setting, which is one of the things we check before applying an upgrade.",
        },
        {
          q: "Why do some themes expose so little?",
          a: "Because schema is work with no visible payoff on launch day, so it is the first thing cut under deadline. It is also why two themes that look equally good in a demo can differ enormously in what they cost you to run.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Sections and blocks", href: "/customization/sections/", note: "Where section schema lives" },
        { label: "Liquid customization", href: "/customization/liquid/", note: "The logic settings drive" },
        { label: "Customizing without code", href: "/customization/no-code/", note: "What good schema unlocks" },
        { label: "Theme editor guide", href: "/guides/theme-editor/", note: "The merchant's side of it" },
        { label: "Migration", href: "/migration/", note: "Schema rebuilt, not copied" },
        { label: "Shopify development", href: "/services/shopify-development/", note: "Behaviour beyond settings" },
      ],
    },
    ctaBlock(
      "Want more of your store editable?",
      "Send the store URL and the things you currently have to ask a developer to change. We will tell you which of them can become settings, and what that costs, within two business days."
    ),
  ],
};
