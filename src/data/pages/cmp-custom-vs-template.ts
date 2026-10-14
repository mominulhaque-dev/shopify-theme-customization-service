import type { PageContent } from "@/types/page";
import { ctaBlock } from "@/data/pages/_shared";

export const page: PageContent = {
  slug: "/custom-theme-vs-template/",
  title: "Custom Shopify Theme vs Template: The Real Difference",
  description:
    "Custom Shopify theme or a template from the Theme Store? What each actually costs over three years, what you can and cannot change in a template, and which one fits your stage.",
  seo: {
    intent: "commercial",
    primary: "custom Shopify theme vs template",
    supporting: [
      "Shopify template or custom theme",
      "free vs paid Shopify theme",
      "Shopify theme store worth it",
      "Shopify theme cost comparison",
    ],
  },
  hero: {
    eyebrow: "Comparison",
    h1: "Custom theme or template? Three questions decide it",
    lede: "The market frames this as a quality decision — templates are cheap and generic, custom is premium and distinctive. That framing is wrong. A customized template is what most excellent Shopify stores are, and the real decision is about maintenance and stage, not about ambition.",
    meta: ["No affiliate links", "Three-year cost comparison", "Written for merchants choosing now"],
    cta: { label: "Get a customization quote", href: "/hire/" },
    secondary: { label: "Compare themes", href: "/themes/" },
    visual: "ceiling",
    backdrop: "rings",
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "The framing",
      heading: "There are three options, not two",
      body: [
        "Presented as a binary, this decision is easy to get wrong in the expensive direction. There are really three: a template used close to stock, a template customized properly, and a theme built from zero. The middle option is where the great majority of good Shopify stores live, and it is the one that rarely gets named in the comparison.",
        "The reason is commercial. Agencies selling custom builds compare against stock templates, because a stock template is easy to make look inadequate. Compared against a properly customized template, the case for a bespoke build gets much harder to make.",
      ],
      subheads: [
        {
          title: "Stock template",
          body: [
            "A Theme Store theme with settings adjusted and your content in place. Costs a licence fee or nothing. Right for a store validating whether it has a market at all — spending on a bespoke storefront before you know that is the most common early mistake we see.",
          ],
        },
        {
          title: "Customized template",
          body: [
            "The same theme with a real brand system applied, the templates restructured to how you sell, and custom sections for what the theme lacks. Distinctive, maintainable, and still receiving vendor updates. This is what most stores you admire actually are.",
          ],
        },
        {
          title: "Custom theme",
          body: [
            "Built from zero, owned entirely by you, maintained entirely by you. Justified when the buying flow itself is unusual, or when you have an in-house team to maintain it. Rarely justified by wanting to look different.",
          ],
        },
      ],
    },
    {
      type: "table",
      eyebrow: "Three years out",
      heading: "What each option actually costs",
      lede: "Including the costs that do not appear on the first invoice.",
      columns: ["", "Stock template", "Customized template", "Custom theme"],
      rows: [
        ["Up front", "$0–$400", "$6,500–$12,000", "$25,000+"],
        ["Time to live", "Days", "3–8 weeks", "3–6 months"],
        ["Looks like your brand", "Partly", "Yes", "Yes"],
        ["Vendor updates and new features", "Yes", "Yes", "No — each one is a project"],
        ["Year 2–3 change costs", "Low, but the ceiling is low too", "Low: your team owns the settings", "Every change is developer work"],
        ["Who can maintain it", "Anyone", "Any Shopify developer", "Its author, or someone learning it"],
        ["Risk if your developer disappears", "None", "Low", "Significant"],
      ],
      note: "The last row is the one merchants underweight. A bespoke theme with no documentation and an unreachable author is the most expensive situation in this table, whatever the launch invoice said.",
      tone: "tint",
    },
    {
      type: "cards",
      eyebrow: "Decide",
      heading: "Three questions that settle it",
      lede: "Answer these honestly and the choice is usually obvious.",
      columns: 3,
      items: [
        {
          meta: "Question 1",
          title: "Have you proven demand?",
          body: "If not, use a stock template and spend the money on finding out. A beautiful storefront for a product nobody wants is the most expensive kind of pretty.",
        },
        {
          meta: "Question 2",
          title: "Is your requirement visual or structural?",
          body: "Visual — however distinctive — is customization. Structural, meaning a buying flow no product template can express, is the only honest reason to build from zero.",
        },
        {
          meta: "Question 3",
          title: "Who maintains it in year two?",
          body: "If the answer is not \"an in-house developer\", stay on a vendor-maintained theme. Owning a bespoke codebase you cannot maintain is a liability, not an asset.",
        },
      ],
    },
    {
      type: "split",
      eyebrow: "Free or paid",
      heading: "The sub-question: does a paid template buy you anything?",
      body: [
        "Sometimes. A premium theme buys a head start on features and a design point of view. If that point of view matches how you want to sell, the licence fee is trivially worth it.",
        "What it does not buy is a higher ceiling. Free themes including Dawn accept the same custom CSS, custom sections and Liquid changes. If you intend a bespoke design, you will override most of a premium theme's opinions anyway, and Dawn's plainness makes that cheaper.",
      ],
      bullets: [
        "Paid theme: buy it for its feature set, not for its looks",
        "Free theme: identical customization ceiling",
        "Overriding a premium theme's design costs more than starting plain",
        "We do not resell themes and earn nothing from either answer",
      ],
      visual: "palette",
      caption: "Either way, the brand system is what makes it yours",
      media: "right",
    },
    {
      type: "faq",
      items: [
        {
          q: "Will a template make my store look generic?",
          a: "Only if it is left near stock. A template with a real brand system, restructured templates and custom sections is not recognisable as its theme. Most Shopify stores you would call well-designed are exactly that.",
        },
        {
          q: "Do paid themes convert better than free ones?",
          a: "There is no credible evidence for it, and the claim usually comes from theme vendors. Conversion is driven by your product page, your clarity about cost and delivery, and your mobile speed — none of which a licence fee buys.",
        },
        {
          q: "Can I start with a template and go custom later?",
          a: "Yes, and it is the sensible sequence. Prove the store works, learn which parts of your merchandising are unusual, then decide whether anything genuinely needs a bespoke build. Most stores discover it does not.",
        },
        {
          q: "How distinctive can a customized template really be?",
          a: "Distinctive enough that nobody identifies the theme. The constraint on a 2.0 theme is almost never the theme — it is the design brief and the budget.",
        },
      ],
    },
    {
      type: "related",
      items: [
        { label: "Custom development", href: "/custom-theme-development/", note: "When bespoke is justified" },
        { label: "Themes we support", href: "/themes/", note: "Choosing a template" },
        { label: "Dawn and other themes", href: "/themes/", note: "Choosing a template" },
        { label: "Shopify development", href: "/services/shopify-development/", note: "Adding behavior to a theme" },
        { label: "Store setup", href: "/store-setup/", note: "If you are launching" },
        { label: "Pricing", href: "/pricing/", note: "What customization costs" },
      ],
    },
    ctaBlock(
      "Tell us your stage and your brief",
      "We will tell you which of the three options fits, with the numbers — including when the answer is to spend nothing on your storefront yet."
    ),
  ],
};
