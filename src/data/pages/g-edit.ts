import type { PageContent } from "@/types/page";
import { CRUMB_GUIDES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/edit-theme/",
  title: "How to Edit Shopify Theme Code Without Breaking It",
  description:
    "Where Shopify theme files live, which ones are safe to edit, how to back up first, what each folder does, and the four edits that most often take a storefront down.",
  breadcrumbs: CRUMB_GUIDES,
  seo: {
    intent: "informational",
    primary: "how to edit Shopify theme code",
    supporting: [
      "Shopify edit code",
      "Shopify theme files explained",
      "Shopify theme.liquid",
      "Shopify code editor",
    ],
  },
  hero: {
    eyebrow: "Guide",
    h1: "Editing theme code: where the files are and which ones bite",
    lede: "Shopify's code editor is one click from your live theme, with no confirmation and no version history you can trust. That is a fair amount of power for a text box in a browser. This guide covers what each folder does, which files are safe, and the four edits we most often get called in to undo.",
    meta: ["14 minute read", "Duplicate first — genuinely", "Includes the four dangerous edits"],
    cta: { label: "See Liquid customization", href: "/customization/liquid/" },
    secondary: { label: "All guides", href: "/guides/" },
    visual: "code-liquid",
    backdrop: "grid",
    tone: "dark",
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "Before anything else",
      heading: "Duplicate the theme. Every time.",
      body: [
        "Online Store → Themes → the three-dot menu on your live theme → Duplicate. Edit the duplicate, preview it, and publish it only when you are satisfied. Shopify does not offer meaningful rollback on code edits — the older-versions feature is limited and not a substitute.",
        "If you work on themes regularly, connect the store to Git through the GitHub integration or use the Shopify CLI locally. Then you have real history, real diffs, and a way to see what changed last Tuesday.",
      ],
      subheads: [
        {
          title: "The one-minute backup",
          body: [
            "Even on a duplicate, before editing a file: select all, copy, paste into a text file, save it with the date in the filename. It takes ten seconds and it is the difference between an inconvenience and an evening.",
          ],
        },
      ],
    },
    {
      type: "table",
      eyebrow: "The file tree",
      heading: "What each folder does, and how risky it is",
      lede: "Shopify themes all share this structure, which means a habit learned on one theme transfers to the next.",
      columns: ["Folder", "Contains", "Edit risk"],
      rows: [
        ["layout/", "theme.liquid — the HTML shell wrapping every page, plus checkout.liquid on Plus", "High: an error here takes down every page at once"],
        ["templates/", "Per-page-type templates; .json on 2.0 themes, .liquid on legacy", "Medium: breaks one page type; JSON is easy to invalidate"],
        ["sections/", "Section files with their {% schema %} blocks", "Low for new files, medium for vendor ones"],
        ["snippets/", "Reusable fragments included by sections and templates", "Low, unless widely included"],
        ["assets/", "CSS, JS, fonts and images the theme ships", "Low for new files; high if you edit the vendor stylesheet, which an update replaces"],
        ["config/", "settings_schema.json and settings_data.json", "High: malformed JSON can lock you out of the theme editor"],
        ["locales/", "Translation strings", "Low, but a missing key renders as an ugly placeholder"],
      ],
      note: "The safest habit in theme work is a bias toward new files. A new section, a new snippet and a new stylesheet almost never break anything and always survive an update.",
      tone: "tint",
    },
    {
      type: "cards",
      eyebrow: "Learn from other people",
      heading: "The four edits that most often break stores",
      lede: "In rough order of how often we are called to undo them.",
      columns: 2,
      items: [
        {
          meta: "1",
          title: "An unclosed Liquid tag",
          body: "Every {% if %} needs an {% endif %}, every {% for %} an {% endfor %}. Miss one and the template throws a Liquid error — visible to customers, on that page, immediately.",
        },
        {
          meta: "2",
          title: "Editing the vendor stylesheet",
          body: "Adding your CSS to the theme's own base.css or theme.css works perfectly until the vendor ships an update and replaces the file. Put custom CSS in a new asset and load it after.",
        },
        {
          meta: "3",
          title: "Invalid JSON in config or templates",
          body: "A trailing comma in settings_data.json or a template's JSON can lock the theme editor entirely, leaving you editing blind through code only.",
        },
        {
          meta: "4",
          title: "Removing a script tag an app needs",
          body: "Cleaning theme.liquid is worthwhile, but app embeds hide there. Remove the wrong line and reviews, subscriptions or analytics stop working — usually noticed a week later.",
        },
      ],
    },
    {
      type: "split",
      eyebrow: "Doing it properly",
      heading: "Habits that make edits survivable",
      body: [
        "Comment what you change and why, with a date. Six months on, the difference between a five-minute upgrade and a two-hour archaeology session is whether someone left a note.",
        "And keep a list. Every project we hand over includes a change log naming the files touched and which ones a theme update will overwrite. Doing your own work? Keep the same list — it is the single most valuable artefact of the whole exercise.",
      ],
      bullets: [
        "New files over edited vendor files, always",
        "A dated comment above every core-file change",
        "One change, one preview, one check — not ten at once",
        "A running list of which core files you have touched",
      ],
      visual: "handover",
      caption: "The change log is the artefact that makes upgrades possible",
      media: "right",
    },
    {
      type: "faq",
      items: [
        {
          q: "Can I edit theme code without knowing how to code?",
          a: "You can paste a snippet someone gave you into the right place, and often that works. What you cannot do is diagnose it when it fails, which is where the cost lands. If you are pasting code you do not understand, do it on a duplicate and be ready to delete the duplicate.",
        },
        {
          q: "Does editing theme code void my theme support?",
          a: "Premium theme vendors generally will not support a modified theme, which is reasonable. Keeping changes in new files rather than theirs means you can revert to a stock state before asking them for help.",
        },
        {
          q: "Will my code edits survive a theme update?",
          a: "Only if they are in files the update does not replace. Anything inside vendor files is overwritten. This is the single most common way merchants lose paid-for customization.",
        },
        {
          q: "Should I use the Shopify CLI instead of the browser editor?",
          a: "If you are editing more than occasionally, yes. Local development gives you version control, a real editor and the ability to test before pushing. For a one-line change, the browser editor on a duplicate is fine.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Liquid customization", href: "/customization/liquid/", note: "What the logic layer can do" },
        { label: "Custom CSS", href: "/customization/css/", note: "Where styling should live" },
        { label: "Theme schema", href: "/customization/schema/", note: "The config files explained" },
        { label: "Theme updates", href: "/guides/theme-updates/", note: "Surviving vendor releases" },
        { label: "Sections and blocks", href: "/customization/sections/", note: "The safest place to build" },
        { label: "Shopify development", href: "/services/shopify-development/", note: "When you would rather not" },
      ],
    },
    ctaBlock(
      "Edited something and now it is broken?",
      "Send the store URL and what you changed. Recovery work is quoted like anything else — usually first-tier, and usually faster than you expect.",
      false
    ),
  ],
};
