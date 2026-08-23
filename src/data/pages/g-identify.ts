import type { PageContent } from "@/types/page";
import { CRUMB_GUIDES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/identify-theme/",
  title: "How to Identify a Shopify Theme (Yours or Anyone's)",
  description:
    "Two reliable ways to find out which Shopify theme a store uses, how to read the version number, and how to tell whether a theme is Online Store 2.0 or legacy in under a minute.",
  breadcrumbs: CRUMB_GUIDES,
  seo: {
    intent: "informational",
    primary: "how to identify a Shopify theme",
    supporting: [
      "what Shopify theme is this site using",
      "find Shopify theme name",
      "Shopify theme detector",
      "check Shopify theme version",
    ],
  },
  hero: {
    eyebrow: "Guide",
    h1: "Identify a Shopify theme in under a minute",
    lede: "Whether you have inherited a store and nobody knows what it runs, or you want to know what a competitor built on, the answer is in the page source and in your admin. No detector tool required, and the tools are frequently wrong.",
    meta: ["5 minute read", "Works on any storefront", "No tools needed"],
    cta: { label: "Then compare theme ceilings", href: "/themes/" },
    secondary: { label: "All guides", href: "/guides/" },
    visual: "theme-editor",
    backdrop: "dots",
  },
  blocks: [
    {
      type: "steps",
      eyebrow: "Your own store",
      heading: "The admin route",
      lede: "Thirty seconds, and it gives you the version number as well as the name.",
      items: [
        {
          title: "Open Online Store → Themes",
          body: "Your published theme is at the top. Beneath its name is the theme's own name and version, unless a previous developer renamed it — which is common and is why the next step exists.",
        },
        {
          title: "Check the version and update state",
          body: "Shopify shows when an update is available for themes installed from the Theme Store. A theme with no update indicator is either current or was uploaded manually, in which case Shopify cannot tell.",
        },
        {
          title: "If the name has been changed, read the files",
          body: "Actions → Edit code, then open config/settings_schema.json. The first block contains theme_name, theme_version and theme_author as the vendor set them, regardless of what the theme has been renamed to in the admin.",
        },
      ],
      visual: "code-schema",
    },
    {
      type: "steps",
      eyebrow: "Someone else's store",
      heading: "The page-source route",
      lede: "Works on any Shopify storefront, including one you have no access to.",
      items: [
        {
          title: "View the page source",
          body: "Ctrl+U on Windows or Cmd+Option+U on a Mac. This is the raw HTML rather than the inspected DOM, which matters because you want what the server sent.",
        },
        {
          title: "Search for Shopify.theme",
          body: "Ctrl+F for Shopify.theme. You will find a small JSON object containing the theme's name, id and role. The name is what the store owner called it, so it may be custom.",
        },
        {
          title: "Cross-check the asset filenames",
          body: "Search for .css?v= and read the stylesheet names. Vendor themes have recognisable ones: base.css points at Dawn, theme.css with a vendor prefix points at a premium theme. Dawn's section filenames are also distinctive.",
        },
        {
          title: "Confirm the generation",
          body: "Look for section-id attributes on more than one page type, or for data-section-type. Sections on a product page mean Online Store 2.0. Sections only on the homepage mean legacy.",
        },
      ],
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "The question that matters",
      heading: "2.0 or legacy is more useful than the name",
      body: [
        "Knowing you are on Brooklyn is interesting. Knowing that Brooklyn is a pre-2.0 theme, so sections only work on the homepage, is what tells you why your requests keep needing a developer.",
        "The fastest test in the admin: open the theme editor and switch the template selector to your product page. If there is a section list you can reorder, you are on 2.0. If the panel is essentially empty, you are on a legacy theme, and that single fact explains most of what you can and cannot change yourself.",
      ],
      bullets: [
        "Sections on the product template → Online Store 2.0",
        "Sections only on the homepage → legacy",
        "JSON files under templates/ → 2.0",
        ".liquid files under templates/ → legacy",
      ],
      visual: "ceiling",
      caption: "The practical consequence of the answer",
      media: "right",
    },
    {
      type: "faq",
      items: [
        {
          q: "Why do theme detector tools give the wrong answer?",
          a: "They read the theme name from the page source, and that name is whatever the store owner typed. A heavily customized Dawn renamed \"Custom Build 2024\" will be reported as an unknown custom theme. The asset filenames are far more reliable.",
        },
        {
          q: "Can I tell whether a theme has been customized?",
          a: "Roughly. Class names that do not match the vendor's conventions, an extra stylesheet beyond the theme's own, and section types not present in the stock theme are all signals. Certainty requires access to the files.",
        },
        {
          q: "How do I find out which theme version I am on?",
          a: "config/settings_schema.json, first block, theme_version. This is the vendor's own number and does not change when the theme is renamed. Quote it whenever you ask anyone — including us — for help.",
        },
        {
          q: "Can I buy the same theme a competitor uses?",
          a: "If it is a Theme Store theme, yes. Be aware you are buying their starting point, not their result — most of what distinguishes a good store from the demo is the customization on top.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Themes we support", href: "/themes/", note: "What your answer implies" },
        { label: "Legacy themes", href: "/customization/legacy-themes/", note: "If you are pre-2.0" },
        { label: "Dawn customization", href: "/customization/dawn/", note: "If you are on Dawn" },
        { label: "Theme editor guide", href: "/guides/theme-editor/", note: "What your theme exposes" },
        { label: "Migration", href: "/migration/", note: "Moving to 2.0" },
        { label: "Change your theme", href: "/guides/change-theme/", note: "If the answer is bad news" },
      ],
    },
    ctaBlock(
      "Send us the theme name and version",
      "With those two facts and your change list, we can usually quote without needing store access at all — within two business days.",
      false
    ),
  ],
};
