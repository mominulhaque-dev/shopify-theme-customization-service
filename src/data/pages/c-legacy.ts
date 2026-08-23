import type { PageContent } from "@/types/page";
import { CRUMB_CUSTOMIZATION, ctaBlock, priceBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/customization/legacy-themes/",
  title: "Legacy Shopify Theme Customization: Patch or Migrate",
  description:
    "Customizing Debut, Brooklyn, Minimal, Supply, Turbo and Narrative: what still works, what needs code that a 2.0 theme handles in settings, and the arithmetic that decides patch versus migrate.",
  breadcrumbs: CRUMB_CUSTOMIZATION,
  seo: {
    intent: "commercial",
    primary: "legacy Shopify theme customization",
    supporting: [
      "Debut theme customization",
      "Brooklyn theme Shopify",
      "Turbo theme customization",
      "vintage Shopify theme support",
    ],
  },
  hero: {
    eyebrow: "Legacy themes",
    h1: "Legacy theme customization, and the arithmetic behind patching it again",
    lede: "Debut, Brooklyn, Minimal, Supply, Turbo, Narrative. We customize these every week and they are far from hopeless. What we will also do is show you the running total, because there is a point where one more workaround costs more than moving — and most merchants pass it without noticing.",
    meta: ["From $1,000", "Patch or migrate, with both numbers", "No pressure to migrate"],
    cta: { label: "Get a quote either way", href: "/hire/" },
    secondary: { label: "See migration", href: "/migration/" },
    visual: "migration",
    backdrop: "contour",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "What is different",
      heading: "Sections only on the homepage, and everything follows from that",
      body: [
        "Pre-2.0 themes support sections on the homepage and nowhere else. Product, collection and page templates are plain Liquid, so anything a merchant would reorder or edit on those pages has to be hard-coded — which means a developer for every future change.",
        "There are no JSON templates, no app blocks, and limited metafield support. The practical effect is that requests a 2.0 theme absorbs in settings become code here, and the cost of each one is roughly one tier higher.",
      ],
      bullets: [
        "Sections: homepage only",
        "No JSON templates, so no per-page section order",
        "App blocks unavailable — apps embed via script tags",
        "Metafield rendering possible but manual",
      ],
      visual: "ceiling",
      caption: "The editor gap, drawn by theme generation",
      media: "right",
    },
    {
      type: "table",
      eyebrow: "The arithmetic",
      heading: "Patch or migrate, by request count",
      lede: "Rough figures from our own projects, using the published tiers. Your numbers will differ, and we will work them out for your store specifically.",
      columns: ["Situation", "Patch the legacy theme", "Migrate to 2.0 first", "Usually right"],
      rows: [
        ["One contained change", "$1,000–$1,400", "$4,200 + $1,000", "Patch"],
        ["Two or three changes over a year", "$3,000–$4,500", "$4,200 + $2,000", "Line call — depends what comes next"],
        ["A queue of four or more", "$6,000+, and rising per request", "$4,200 + $2,800", "Migrate"],
        ["Redesign wanted", "Constrained by the architecture", "$4,200 + $6,500, no constraint", "Migrate"],
        ["Editable sections wanted store-wide", "Not achievable", "Achievable by definition", "Migrate"],
      ],
      note: "The reason patching gets worse over time is compounding: each workaround has to coexist with the last, so the fourth change is more expensive to make than the first was.",
      tone: "tint",
    },
    {
      type: "cards",
      eyebrow: "Still worth doing",
      heading: "Legacy work that is genuinely good value",
      lede: "If you are staying on the theme for now, these are the changes that pay off without deepening the hole.",
      columns: 3,
      items: [
        {
          meta: "Cheap, high value",
          title: "Dead app cleanup",
          body: "Script tags and asset files left by apps you no longer pay for. Usually the biggest speed win on a legacy store, and it costs almost nothing.",
        },
        {
          meta: "Cheap, high value",
          title: "Image pipeline fixes",
          body: "Correct srcset and lazy loading, which most pre-2.0 themes never had. Immediate mobile improvement.",
        },
        {
          meta: "Contained",
          title: "Product page additions",
          body: "A size guide, a trust block, a bundle. Hard-coded, yes, but contained and unlikely to conflict with anything.",
        },
        {
          meta: "Contained",
          title: "Mobile layout repair",
          body: "Tap targets, sticky add-to-cart, filter behaviour. All CSS-level, all survivable.",
        },
        {
          meta: "Avoid",
          title: "Fake sections everywhere",
          body: "Rebuilding section-like editing on non-homepage templates in a legacy theme is possible and almost never worth it. This is the migration signal.",
        },
        {
          meta: "Avoid",
          title: "Deep restructuring",
          body: "A full redesign inside a legacy architecture spends real money on foundations you will replace within two years.",
        },
      ],
    },
    priceBlock({
      heading: "Legacy customization pricing",
      lede: "Same ladder as any theme, but the same request often sits one tier higher here — not a surcharge, simply more work. We say which tier and why before you commit.",
    }),
    {
      type: "faq",
      items: [
        {
          q: "Is my legacy theme a security risk?",
          a: "No. Shopify hosts the platform, so an unmaintained theme is not an attack surface in the way an unpatched CMS would be. The real cost is capability and speed, not security.",
        },
        {
          q: "Will Shopify stop supporting my theme?",
          a: "Vintage themes still run and Shopify has not announced an end date. What has already happened is that new platform features — app blocks, section groups, richer metafield support — are only available to 2.0 themes, so the gap widens with every release.",
        },
        {
          q: "Can I get sections on my product page without migrating?",
          a: "Not properly. You can approximate editable regions with settings and metafields, and it costs more than it is worth. Wanting this is the clearest signal that migrating is the cheaper path.",
        },
        {
          q: "Do you push everyone toward migration?",
          a: "No. Two of the ten projects on our work page ended in a migration recommendation, and several others were single patches we did and left alone. When patching is cheaper for you, patching is what we quote.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Migration to 2.0", href: "/migration/", note: "What it rebuilds, and the cost" },
        { label: "Themes we support", href: "/themes/", note: "Where legacy sits" },
        { label: "Dawn customization", href: "/customization/dawn/", note: "The usual destination" },
        { label: "Speed optimization", href: "/services/speed-optimization/", note: "The cheapest legacy win" },
        { label: "Rescoped case study", href: "/work/footwear-legacy-turbo-rescope/", note: "When we stopped and requoted" },
        { label: "Identify your theme", href: "/guides/identify-theme/", note: "Check which one you run" },
      ],
    },
    ctaBlock(
      "Get both numbers before deciding",
      "Send your store URL and the changes you want. You get the cost of patching, the cost of migrating first, and our recommendation with the reasoning — within two business days."
    ),
  ],
};
