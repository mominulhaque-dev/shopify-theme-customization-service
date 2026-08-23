import type { PageContent } from "@/types/page";
import { CRUMB_GUIDES, ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/guides/hire-theme-developer/",
  title: "Hiring a Shopify Theme Developer: What to Ask",
  description:
    "How to vet a Shopify theme developer or agency: what Partner status actually means, what a real scope document contains, fair rates, and the four answers that should end the conversation.",
  breadcrumbs: CRUMB_GUIDES,
  seo: {
    intent: "informational",
    primary: "hire a Shopify theme developer",
    supporting: [
      "Shopify developer vetting",
      "Shopify Partner meaning",
      "Shopify agency questions to ask",
      "Shopify freelancer or agency",
    ],
  },
  hero: {
    eyebrow: "Guide",
    h1: "Hiring a theme developer, including how to vet us",
    lede: "This page is written to be used against us as much as against anyone else. The questions below are the ones that separate a developer who will leave you with a maintainable store from one who will leave you dependent — and they are mostly about process, not about code.",
    meta: ["9 minute read", "Use it on us too", "No affiliate links, ever"],
    cta: { label: "See our process", href: "/process/" },
    secondary: { label: "All guides", href: "/guides/" },
    visual: "handover",
    backdrop: "contour",
  },
  blocks: [
    {
      type: "split",
      eyebrow: "Start here",
      heading: "What Shopify Partner status does and does not tell you",
      body: [
        "Partner status means the developer is in Shopify's formal programme and can request collaborator access rather than asking for your account password. That second point is genuinely worth having: collaborator access is scoped, visible in your admin and revocable at any time.",
        "What it does not mean is vetting. Shopify does not audit code quality, and the programme is open to anyone who signs up. Treat it as a floor — no Partner status is a warning sign, but Partner status alone is not evidence of anything.",
      ],
      bullets: [
        "No Partner status: expect password requests, which you should refuse",
        "Partner status: a floor, not a recommendation",
        "Ask for two references, one of them a project that went badly",
        "Ask what they will not take on — vagueness here is the real signal",
      ],
      visual: "theme-editor",
      caption: "Collaborator access, granted and revocable in your admin",
      media: "right",
    },
    {
      type: "cards",
      eyebrow: "The questions",
      heading: "Eight questions, and the answers you want",
      lede: "Ask all eight before money changes hands. The answers take five minutes and predict most of the outcome.",
      columns: 2,
      items: [
        {
          meta: "Access",
          title: "\"How will you access my store?\"",
          body: "Want: a collaborator request. Refuse: a request for your admin password or a staff account with full permissions for a two-day job.",
        },
        {
          meta: "Safety",
          title: "\"Will you work on my live theme?\"",
          body: "Want: a duplicate, always, with a preview link. Refuse: anything that involves editing the published theme because it is faster.",
        },
        {
          meta: "Scope",
          title: "\"What does your scope document contain?\"",
          body: "Want: a list of what is in, what is out, a fixed price and a date. Refuse: an hourly estimate with no boundary and no exclusions.",
        },
        {
          meta: "Ownership",
          title: "\"What do I get at handover?\"",
          body: "Want: theme files, a change log naming every file touched, and update-risk notes. Refuse: \"it's all in the theme\" with no documentation.",
        },
        {
          meta: "Maintainability",
          title: "\"Will my team be able to edit this?\"",
          body: "Want: schema on every section, so content and layout are yours. Refuse: hard-coded content that requires a developer for a text change.",
        },
        {
          meta: "Updates",
          title: "\"What happens when my theme updates?\"",
          body: "Want: new files where possible, a written list of core-file exceptions. Refuse: \"don't update it\" — which means you are now locked in.",
        },
        {
          meta: "Boundaries",
          title: "\"What would you decline to build?\"",
          body: "Want: a specific list — apps, checkout on non-Plus, ERP integration. Refuse: \"we can do anything\", which means they have not hit the platform's limits yet.",
        },
        {
          meta: "Change",
          title: "\"What happens if I want something extra mid-project?\"",
          body: "Want: quoted as an addition before it is built. Refuse: absorbed silently, which means it will appear on an invoice or be traded against something you wanted.",
        },
      ],
      tone: "tint",
    },
    {
      type: "table",
      eyebrow: "Rates",
      heading: "What theme work costs, honestly",
      lede: "Broad ranges, and the trade-offs are as important as the numbers.",
      columns: ["Who", "Typical range", "Works best when", "Watch for"],
      rows: [
        ["Marketplace freelancer", "$15–$40/hr", "One contained, well-specified change", "No scoping, no documentation, communication gaps"],
        ["Experienced freelancer", "$60–$120/hr", "Ongoing small work with someone who learns your store", "Single point of failure; availability"],
        ["Specialist theme agency", "$1,000–$12,000 per project", "A defined build where a fixed price matters", "Whether the specialism is real or just positioning"],
        ["Full-service digital agency", "$15,000+", "Brand, strategy and build together", "Theme work sub-contracted to whoever is free"],
      ],
      note: "We are in the third row, and we publish our ladder rather than making you ask. Cheaper work is not automatically bad value — it is bad value when the absence of scoping means the cost lands later, on you.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Freelancer or agency?",
          a: "A freelancer is usually better value for a single contained change and for ongoing familiarity with your store. An agency is better when the work spans several templates, needs a fixed price, or has a date attached — mostly because someone is being paid to scope it before anyone codes.",
        },
        {
          q: "Should I pay hourly or fixed price?",
          a: "Fixed price for defined work, because it moves the risk of a bad estimate onto the person who wrote it. Hourly for exploratory work where nobody can honestly define the scope yet — but cap it and review at the cap.",
        },
        {
          q: "What is a reasonable deposit?",
          a: "Fifty per cent on scope approval is standard and fair. A hundred per cent up front for a multi-week project is not, and neither is nothing — a developer with no deposit has no protection against a project being abandoned.",
        },
        {
          q: "How do I check the code is good if I cannot read code?",
          a: "Ask three proxy questions. Can your team edit the content afterwards without help? Is there a written change log? Was anything added to your monthly app bill to achieve it? Those three correlate with code quality better than any portfolio.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Our process", href: "/process/", note: "Answers to all eight questions" },
        { label: "Pricing", href: "/pricing/", note: "Published, not on request" },
        { label: "Case studies", href: "/work/", note: "Including the rescopes" },
        { label: "Theme schema", href: "/customization/schema/", note: "Why editability matters" },
        { label: "Theme updates", href: "/guides/theme-updates/", note: "The lock-in question" },
        { label: "Hire us", href: "/hire/", note: "If we passed" },
      ],
    },
    ctaBlock(
      "Ask us the eight questions",
      "Send them with your store URL and we will answer all eight in writing, alongside a scoped quote — within two business days.",
      false
    ),
  ],
};
