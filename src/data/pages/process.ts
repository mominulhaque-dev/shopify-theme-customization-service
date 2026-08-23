import type { PageContent } from "@/types/page";
import { PROCESS_STEPS, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/process/",
  title: "Our Shopify Theme Customization Process, Stage by Stage",
  description:
    "How a Shopify theme customization project runs: scoping and fixed pricing, a staging duplicate, milestone previews, device QA, publish and a documented handover. Your live store keeps selling throughout.",
  seo: {
    intent: "informational",
    primary: "Shopify theme customization process",
    supporting: [
      "Shopify staging theme",
      "Shopify collaborator access",
      "Shopify theme QA",
      "Shopify project handover",
    ],
  },
  hero: {
    eyebrow: "Process",
    h1: "Four stages, and your live store stays untouched until the last one",
    lede: "The parts of a project that go wrong are rarely the code. They are the parts nobody agreed in writing: what was in scope, when it would land, and who could edit it afterwards. This is how we take those three off the table before starting.",
    meta: ["Fixed scope in writing", "Staging duplicate always", "Collaborator access, no passwords"],
    cta: { label: "Start a project", href: "/hire/" },
    secondary: { label: "See pricing", href: "/pricing/" },
    visual: "timeline",
    backdrop: "contour",
  },
  blocks: [
    {
      type: "steps",
      eyebrow: "The four stages",
      heading: "What actually happens, in order",
      lede: "Nothing starts until you approve stage one, and nothing publishes until you approve stage four.",
      items: PROCESS_STEPS,
      visual: "handover",
    },
    {
      type: "split",
      eyebrow: "Stage one in detail",
      heading: "Scoping is the deliverable that prevents the argument",
      body: [
        "We audit the theme you run now — version, vendor, how much has already been hand-edited, what the previous developer left behind — then take your list of changes and sort every item into editor-reachable, code-level, or outside theme work entirely.",
        "You get that back as a document with a fixed price and a delivery date. Requests we judge to sit past the boundary are named there, with what it would take to do them anyway, so the conversation happens before you commit budget rather than in week three.",
      ],
      bullets: [
        "Theme audit: version, vendor conventions, prior edits",
        "Every request sorted by which side of the wall it falls on",
        "Fixed price and delivery date in writing",
        "Out-of-scope items named, not quietly dropped",
      ],
      visual: "ceiling",
      caption: "Sorting requests by editor reach is the first thing scoping does",
      media: "right",
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Stage two in detail",
      heading: "Why every project runs on a duplicate",
      body: [
        "All work happens on a staging duplicate of your live theme. Your store keeps selling, your existing customizations stay intact, and there is no window where the site is half-built in public.",
        "Access is via Shopify collaborator request, not your account password. You approve the request, you can see exactly what it grants, and you can revoke it at any time — during the project or years after it.",
      ],
      bullets: [
        "Live theme never edited directly",
        "Collaborator access, revocable, no password sharing",
        "Your published theme unchanged until you say otherwise",
        "Staging theme left in place after launch for reference",
      ],
      visual: "theme-editor",
      caption: "Work happens in a duplicate, previewed with a shareable link",
    },
    {
      type: "split",
      eyebrow: "Stage three in detail",
      heading: "Milestone previews, because one big reveal is where scope fights start",
      body: [
        "You get a preview link at each milestone rather than a single unveiling at the end. Feedback goes straight into the same staging theme, so what you approve is what publishes — there is no separate \"production version\" that behaves differently.",
        "Revisions inside the agreed scope are included. Anything outside it is quoted before we build it rather than after, and you are free to decline and ship what was scoped.",
      ],
      bullets: [
        "Preview link per milestone",
        "Feedback applied in the same theme you reviewed",
        "In-scope revisions included",
        "Out-of-scope requests quoted, never assumed",
      ],
      visual: "before-after",
      caption: "Each milestone is reviewable against what it replaced",
      media: "right",
      tone: "tint",
    },
    {
      type: "split",
      eyebrow: "Stage four in detail",
      heading: "QA on real widths, then a handover you can act on",
      body: [
        "Every template is checked at 360, 390, 768, 1024 and 1440 pixels, plus whatever widths your own analytics show as significant. Core Web Vitals are measured before and after so a visual improvement cannot quietly cost you speed.",
        "Then you receive the theme files, a change log of every edit, and written notes on which changes need care during a future theme update — including which core files were touched and why. That log is the difference between a theme you can update and one you are locked out of.",
      ],
      bullets: [
        "Five viewport widths minimum, plus your analytics' outliers",
        "Core Web Vitals measured before and after",
        "Change log, file by file",
        "Editor walkthrough for your team if they want it",
      ],
      visual: "breakpoints",
      caption: "The QA matrix every template passes",
    },
    {
      type: "faq",
      items: [
        {
          q: "Do you need access to my live store?",
          a: "We need collaborator access to the store, but we never work in your live theme. Every change happens on a duplicate and you decide when it publishes. Collaborator access means no password sharing and access you can revoke at any time.",
        },
        {
          q: "What happens if I want something that was not in the scope?",
          a: "We quote it as an addition before building it. You can accept it, defer it to a second phase, or decline it and ship what was scoped. What does not happen is the work appearing on an invoice you did not agree to.",
        },
        {
          q: "How much of my time does a project take?",
          a: "Roughly two hours at scoping, then thirty to sixty minutes per milestone review. Projects that slip almost always slip while waiting on approval rather than while waiting on code, so the honest answer is that your turnaround matters more than ours.",
        },
        {
          q: "Can you publish during peak season?",
          a: "We would rather not, and we will say so. Publishing a theme change in late November is a risk no timeline can absorb. If it has to happen, we schedule it for a low-traffic window with the previous theme kept one click away.",
        },
        {
          q: "What if I want to end the project early?",
          a: "You own everything paid for to that point: the staging theme, the files, and the change log as it stands. There is no clause that keeps your code hostage.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Pricing", href: "/pricing/", note: "What each tier includes" },
        { label: "Customization services", href: "/customization/", note: "The layers we work in" },
        { label: "Theme updates", href: "/guides/theme-updates/", note: "Surviving vendor releases" },
        { label: "Hiring a theme developer", href: "/guides/hire-theme-developer/", note: "What to ask anyone, including us" },
        { label: "Case studies", href: "/work/", note: "The process applied, including rescopes" },
        { label: "Hire us", href: "/hire/", note: "Scoped quote in two business days" },
      ],
    },
    ctaBlock(
      "Start with a scope, not a call",
      "Send your store URL and the changes you have in mind. The scope document, the fixed price and the delivery date come back within two business days."
    ),
  ],
};
