import type { PageContent } from "@/types/page";
import { CRUMB_GUIDES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/theme-updates/",
  title: "Shopify Theme Updates: Keeping Your Customizations",
  description:
    "Why customizations disappear when a Shopify theme updates, which ones survive, how to structure work so upgrades are routine, and the safe sequence for applying a vendor release.",
  breadcrumbs: CRUMB_GUIDES,
  seo: {
    intent: "informational",
    primary: "Shopify theme update",
    supporting: [
      "update Shopify theme without losing customization",
      "Shopify theme update lost changes",
      "Dawn theme update",
      "Shopify theme version upgrade",
    ],
  },
  hero: {
    eyebrow: "Guide",
    h1: "Theme updates, and why customizations vanish during them",
    lede: "An update does not merge your changes. It replaces the theme's files with the vendor's new ones, and anything you wrote inside those files goes with them. Which means the question of whether an upgrade is painless was decided months earlier, by where the code was put.",
    meta: ["11 minute read", "Applies to Dawn and premium themes", "Includes the safe upgrade sequence"],
    cta: { label: "See how we structure work", href: "/process/" },
    secondary: { label: "All guides", href: "/guides/" },
    visual: "handover",
    backdrop: "grid",
    tone: "dark",
  },
  blocks: [
    {
      type: "checklist",
      eyebrow: "The mechanics",
      heading: "What survives an update, and what does not",
      lede: "There is no ambiguity here, which is what makes it possible to plan for.",
      groups: [
        {
          title: "Survives",
          items: [
            "Theme settings you configured, as long as the setting ids still exist",
            "Content in section settings, for sections that still exist",
            "New section files you or a developer added",
            "New snippets and new asset files",
            "Everything store-level: products, pages, menus, metafields",
          ],
        },
        {
          title: "Does not survive",
          limit: true,
          items: [
            "Any edit inside a vendor file — theme.liquid, base.css, main-product.liquid",
            "CSS added to the vendor's own stylesheet",
            "Settings whose ids the vendor renamed in the new version",
            "Sections the vendor removed or restructured",
            "Anything nobody wrote down",
          ],
        },
      ],
      note: "The last item is the real one. A theme upgrade is only difficult when nobody knows which core files were touched — which is why every project we hand over ends with that list.",
    },
    {
      type: "split",
      eyebrow: "Prevention",
      heading: "Structure work so the upgrade is boring",
      body: [
        "Four habits cover almost everything. Put new behaviour in new files. Load your stylesheet after the vendor's rather than editing theirs. Prefer overriding a CSS custom property the theme already defines to overriding a rule. And when a core edit is genuinely unavoidable, write it down with a dated comment and add it to a list.",
        "Do that and an upgrade becomes: install the new version, re-apply four documented snippets, check the templates, publish. Skip it and an upgrade becomes an archaeology project with an unknown budget, which is why so many stores simply never upgrade.",
      ],
      bullets: [
        "New sections and snippets, not edited vendor ones",
        "Custom stylesheet loaded after the theme's own",
        "Override the theme's custom properties where it defines them",
        "A written list of every core-file exception",
      ],
      visual: "code-css",
      caption: "An override that does not need to win a specificity fight",
      media: "right",
    },
    {
      type: "steps",
      eyebrow: "Doing the upgrade",
      heading: "The safe sequence",
      lede: "Never on your live theme, and never with the tab closed halfway through.",
      items: [
        {
          title: "Read the vendor's release notes",
          body: "Look specifically for renamed settings, removed sections and changed class names. Those three are what turn a routine upgrade into a rebuild, and they are usually mentioned.",
          meta: "10 minutes",
        },
        {
          title: "Install the new version as an unpublished theme",
          body: "It sits in your library, invisible to customers. Do not use Shopify's in-place update on a customized theme until you have compared the two.",
          meta: "2 minutes",
        },
        {
          title: "Re-apply your documented changes",
          body: "Work through the change log. Each entry should say which file, what the change was and why. This is where a good log earns its keep.",
          meta: "Depends on the log",
        },
        {
          title: "Compare every template side by side",
          body: "Preview the new theme against your live store, template by template, desktop and mobile. Check app blocks are still placed and still rendering.",
          meta: "1–2 hours",
        },
        {
          title: "Publish at a quiet hour, keep the old theme",
          body: "Publish, place a test order, then leave the previous theme in your library for a month. It is a one-click rollback and problems often surface in week two.",
          meta: "30 minutes",
        },
      ],
      visual: "timeline",
      tone: "tint",
    },
    {
      type: "faq",
      items: [
        {
          q: "Should I update my theme at all?",
          a: "If it is customized and running well, an update is not urgent — themes are not a security surface on Shopify. The reasons to do it are new platform features, vendor bug fixes, and avoiding a version gap so large that the eventual upgrade becomes a rebuild.",
        },
        {
          q: "How often does Dawn update?",
          a: "Shopify ships Dawn releases regularly, several times a year. Because Dawn is the reference theme, taking those updates is also how you get new Online Store 2.0 capabilities first.",
        },
        {
          q: "I updated and lost my changes. Can they be recovered?",
          a: "If the old theme is still in your library, yes — everything is there and we can port the changes forward. If it was deleted, the theme file export you took beforehand is the next hope. Failing both, it is a rebuild.",
        },
        {
          q: "Can you handle updates for us?",
          a: "Yes, and for stores with significant customization it is worth doing deliberately once a year rather than reactively. It is quoted like any other work, usually first-tier when we hold the change log.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Process", href: "/process/", note: "The change log we hand over" },
        { label: "Edit theme code", href: "/guides/edit-theme/", note: "Which files are risky" },
        { label: "Prestige customization", href: "/customization/prestige/", note: "Vendor release discipline" },
        { label: "Dawn customization", href: "/customization/dawn/", note: "Shopify's release cadence" },
        { label: "Custom CSS", href: "/customization/css/", note: "Where styling should live" },
        { label: "Migration", href: "/migration/", note: "When the gap is too large" },
      ],
    },
    ctaBlock(
      "Facing an upgrade you are nervous about",
      "Send the store URL and the theme version you are on. We will tell you what the upgrade involves and what it costs, before you touch anything."
    ),
  ],
};
