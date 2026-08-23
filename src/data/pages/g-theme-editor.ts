import type { PageContent } from "@/types/page";
import { CRUMB_GUIDES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/theme-editor/",
  title: "The Shopify Theme Editor: A Complete Working Guide",
  description:
    "How the Shopify theme editor actually works: sections and blocks, colour schemes, template switching, section groups, app blocks, and the six settings that are not where you expect them.",
  breadcrumbs: CRUMB_GUIDES,
  seo: {
    intent: "informational",
    primary: "Shopify theme editor",
    supporting: [
      "how to use Shopify theme editor",
      "Shopify theme customize page",
      "Shopify section groups",
      "Shopify colour schemes",
    ],
  },
  hero: {
    eyebrow: "Guide",
    h1: "The Shopify theme editor, panel by panel",
    lede: "Most merchants use maybe a third of what the theme editor offers, usually because the other two thirds are not where you would look for them. This is the full map for an Online Store 2.0 theme, plus the handful of settings that live somewhere counter-intuitive.",
    meta: ["15 minute read", "Written for 2.0 themes", "Legacy differences noted"],
    cta: { label: "Next: customize a theme", href: "/guides/customize-theme/" },
    secondary: { label: "All guides", href: "/guides/" },
    visual: "theme-editor",
    backdrop: "dots",
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "Orientation",
      heading: "What the editor is, and what it is not",
      body: [
        "The theme editor edits one theme at a time, and the changes you make are saved to that theme immediately — there is no draft state. What protects you is not an undo button but which theme you are editing: work on a duplicate and your live store is unaffected until you publish it.",
        "It is also not a page builder. It edits the sections a theme provides, in the order the template allows. If a layout you want cannot be expressed by arranging the available sections, no amount of clicking will get there; that is the boundary where code starts.",
      ],
      subheads: [
        {
          title: "Duplicate before you experiment",
          body: [
            "Online Store → Themes → the three-dot menu on your live theme → Duplicate. Edit the copy. When you are happy, publish it. This single habit removes almost all risk from everything else in this guide.",
          ],
        },
        {
          title: "Where you are actually editing",
          body: [
            "The template selector at the top centre of the editor decides which page's arrangement you are changing. Editing the header while viewing the product template still changes the header everywhere — headers and footers are shared. Editing a section inside the product template changes only that template.",
          ],
        },
      ],
    },
    {
      type: "steps",
      eyebrow: "The panels",
      heading: "Left, centre, right",
      lede: "Three regions, and knowing which one owns a given decision saves most of the hunting.",
      items: [
        {
          title: "Left: the section tree",
          body: "Every section on the current template, in render order. Drag to reorder, click the eye to hide without deleting, click a section to open its settings. Nested items are blocks belonging to that section.",
          meta: "Structure lives here",
        },
        {
          title: "Left, at the top: header and footer groups",
          body: "On 2.0 themes these are section groups, which is why they appear above the template's own sections and persist across every page. Announcement bars usually live inside the header group.",
          meta: "Shared across templates",
        },
        {
          title: "Centre: the preview",
          body: "A real render, not a mock. Clicking an element selects its section. The device toggle at the bottom switches to a mobile viewport — use it constantly rather than at the end.",
          meta: "Click to select",
        },
        {
          title: "Right: settings for the selection",
          body: "Whatever you have selected. With nothing selected, this is where theme-wide settings live: colour schemes, typography, layout, buttons, product cards, cart behaviour, animation.",
          meta: "Global settings hide here",
        },
        {
          title: "Top right: the template switcher and publish",
          body: "Change which template you are editing, preview in a new tab, share a preview link with someone who has no admin access, or publish.",
          meta: "Preview links are shareable",
        },
      ],
      visual: "theme-editor",
      tone: "tint",
    },
    {
      type: "cards",
      eyebrow: "Not where you would look",
      heading: "Six settings merchants routinely cannot find",
      lede: "Each of these is somewhere defensible and nowhere obvious.",
      columns: 3,
      items: [
        {
          meta: "Theme settings → Colours",
          title: "Colour schemes",
          body: "On 2.0 themes you do not set a section's colours directly. You define schemes globally, then pick a scheme per section. Changing a scheme changes every section using it.",
        },
        {
          meta: "Theme settings → Product cards",
          title: "How grids show products",
          body: "Badges, second image on hover, vendor and rating visibility are global card settings, not collection-section settings.",
        },
        {
          meta: "Theme settings → Cart",
          title: "Drawer or page",
          body: "Whether the cart opens as a drawer, a popup or its own page is a theme-wide setting, not something on the cart template.",
        },
        {
          meta: "Header group",
          title: "Announcement bar",
          body: "It is a section inside the header group rather than a global toggle, which is why it does not appear in theme settings.",
        },
        {
          meta: "Admin, not editor",
          title: "Menus",
          body: "The header links to a menu; the menu itself is edited in Online Store → Navigation. The editor only chooses which menu to use.",
        },
        {
          meta: "Product admin",
          title: "Template per product",
          body: "Which product template a product uses is set on the product page in the admin, under Theme template — not in the editor.",
        },
      ],
    },
    {
      type: "prose",
      eyebrow: "Legacy themes",
      heading: "If your editor looks much emptier than this",
      body: [
        "You are almost certainly on a pre-2.0 theme. The tell is that the section tree only appears on the homepage: open the product or collection template and there is nothing to reorder, because those templates are plain Liquid.",
        "Nothing in this guide is wrong for you, there is simply much less of it available. If the settings you want do not exist anywhere in the editor, that is not user error — it is the theme's ceiling, and the options are code or a migration.",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Can I undo a change in the theme editor?",
          a: "There is limited undo within a session, but no version history you can rely on. The real safeguard is editing a duplicate theme rather than your live one, so a bad afternoon costs you a deleted copy instead of your storefront.",
        },
        {
          q: "Why can I not move a section on my product page?",
          a: "Either you are on a legacy theme, where only the homepage supports sections, or you are trying to move the main product section, which several themes pin in place deliberately.",
        },
        {
          q: "Can two people edit a theme at once?",
          a: "Technically yes, and you should not. There is no conflict resolution — the last save wins, silently. Agree who is in the editor before either of you starts.",
        },
        {
          q: "How do I show someone the changes before publishing?",
          a: "Use the share preview link from the editor's top-right menu. It works without admin access and expires, which makes it the right way to get sign-off from someone outside the store.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "How to customize a theme", href: "/guides/customize-theme/", note: "The full sequence" },
        { label: "Customizing without code", href: "/customization/no-code/", note: "Where the editor stops" },
        { label: "Theme schema", href: "/customization/schema/", note: "Why some themes expose more" },
        { label: "Edit theme code", href: "/guides/edit-theme/", note: "The next step down" },
        { label: "Identify your theme", href: "/guides/identify-theme/", note: "2.0 or legacy?" },
        { label: "All guides", href: "/guides/", note: "Seven more" },
      ],
    },
    ctaBlock(
      "Hit the editor's ceiling?",
      "Send the store URL and the change the editor could not make. We will tell you what it takes in code, and what it costs, within two business days.",
      false
    ),
  ],
};
