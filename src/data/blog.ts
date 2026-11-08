import type { VisualKey } from "@/components/ui/visuals";

/**
 * Blog posts. Written for store owners, not developers: plain words, the
 * problem first, then what fixes it. Each post targets one search phrase
 * (`keyword`), which appears in the title, the description, the first
 * paragraph and at least one heading.
 *
 * Inline links use [text](/path/) and must point at a published route — the
 * link audit fails the build otherwise.
 */

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; columns: string[]; rows: string[][] };

export interface BlogPost {
  slug: string;
  title: string;
  /** <title> tag; ~60 characters. */
  metaTitle: string;
  /** Meta description; ~150 characters. */
  description: string;
  keyword: string;
  category: string;
  date: string;
  readMinutes: number;
  visual: VisualKey;
  excerpt: string;
  takeaways: string[];
  body: BlogBlock[];
  faq: Array<{ q: string; a: string }>;
}

export const BLOG_AUTHOR = "Shopify Theme Customization Services";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "shopify-theme-customization-cost",
    title: "How much does Shopify theme customization cost in 2026?",
    metaTitle: "Shopify Theme Customization Cost: 2026 Price Guide",
    description:
      "What Shopify theme customization really costs in 2026, from a $50 section edit to a $1,500 rebuild, and the three things that push a price up or down.",
    keyword: "shopify theme customization cost",
    category: "Pricing",
    date: "2026-11-08",
    readMinutes: 6,
    visual: "ill-fixed-quote",
    excerpt:
      "Most store owners only need one or two changes, not a new website. Here is what each size of job costs, and how to avoid paying for work you do not need.",
    takeaways: [
      "Small changes to one section usually cost $50 to $250.",
      "A full theme makeover usually costs $800 to $1,500.",
      "The age of your theme matters more than the size of your store.",
      "Always ask for a fixed price before work starts, not an hourly estimate.",
    ],
    body: [
      { type: "p", text: "If you have searched for Shopify theme customization cost, you have probably seen answers anywhere from $30 to $30,000. Both numbers are real. They just describe very different jobs. This guide explains what you actually pay for, what a fair price looks like for each size of job, and how to keep the bill small." },
      { type: "h2", text: "What you are actually paying for" },
      { type: "p", text: "Customizing a theme means changing the Shopify theme you already own: adding a section that is missing, reworking your product page, or giving the whole store a new look. You are not paying for a new website. Your products, customers, orders and apps stay exactly where they are." },
      { type: "p", text: "So the price depends on one thing above everything else: how much of your theme has to change. A new banner on the homepage touches one small part. A new look across every page touches all of it." },
      { type: "h2", text: "Shopify theme customization cost by job size" },
      { type: "table", columns: ["Job", "Typical examples", "Price", "Time"], rows: [
        ["One section", "A trust bar, a custom banner, a better collection grid", "$50", "2–4 days"],
        ["One full page", "A new product page, a landing page, a filtered collection", "$250", "1–2 weeks"],
        ["Whole theme", "Your brand applied to every page, plus a set of reusable sections", "$800", "2–3 weeks"],
        ["Rebuild", "Theme structure reworked, every template, training for your team", "$1,500", "3–4 weeks"],
      ] },
      { type: "p", text: "These are our own published prices — see the full [pricing ladder](/pricing/) for what each one includes. Other agencies often charge more for the same work, and freelancers on marketplaces sometimes charge less. What matters is that the price is fixed and the scope is written down." },
      { type: "h2", text: "Three things that change the price" },
      { type: "h3", text: "1. How old your theme is" },
      { type: "p", text: "Newer themes (called Online Store 2.0 themes, like Dawn) let you move and edit sections from the theme editor. Older themes do not, so the same change takes more work. If your theme is older than 2021, expect to pay a little more, or read our guide on [whether to upgrade to Online Store 2.0](/blog/shopify-online-store-2-0-upgrade/)." },
      { type: "h3", text: "2. How many pages are touched" },
      { type: "p", text: "Every page type — home, product, collection, cart — has to be checked on phones and computers after a change. More pages means more testing, so the price goes up with each one." },
      { type: "h3", text: "3. Whether it needs code or just settings" },
      { type: "p", text: "Some changes only need the right settings in the theme editor. Others need new code. A good developer will tell you when something is a settings change you can make yourself, for free." },
      { type: "h2", text: "Hourly price vs fixed price" },
      { type: "p", text: "Many agencies quote by the hour. That sounds flexible, but it means you carry the risk: if the job takes longer, you pay more. A fixed price puts the risk on the developer and gives you a number you can plan around." },
      { type: "callout", title: "Before you hire anyone", text: "Ask for three things in writing: exactly what will change, the total price, and the delivery date. If someone cannot give you all three, they have not understood the job yet." },
      { type: "h2", text: "How to keep the cost down" },
      { type: "list", items: [
        "Send screenshots or links of what you want. Clear examples save hours.",
        "Group your changes. Two changes in one job cost less than two separate jobs.",
        "Check the theme settings first. Some things are already possible without code.",
        "Ask for changes to stay editable, so you never pay for the same text change twice.",
      ] },
      { type: "p", text: "If you are not sure which size your job is, [send us your store link](/hire/). We will tell you the price and the date within two business days, or tell you if you can do it yourself." },
    ],
    faq: [
      { q: "Can I customize my Shopify theme for free?", a: "Yes, partly. The theme editor lets you change colours, fonts, text, images and the order of sections at no cost. You only need to pay someone when you want something the theme settings cannot do." },
      { q: "Is it cheaper to buy a new theme than to customize mine?", a: "Usually not. A premium theme costs a few hundred dollars, and you still have to set it up and move your content. Customizing the theme you have is often cheaper and keeps everything that already works." },
      { q: "Why do some agencies charge $10,000 or more?", a: "That price is usually for a theme built from scratch, plus design, strategy and project management. Most stores do not need that. Customizing an existing theme covers most needs for a fraction of the cost." },
    ],
  },
  {
    slug: "customize-shopify-theme-or-buy-new",
    title: "Customize your Shopify theme or buy a new one? How to decide",
    metaTitle: "Customize Your Shopify Theme or Buy a New One?",
    description:
      "Not sure whether to customize your current Shopify theme, buy a new one or build a custom theme? A simple way to decide, with the costs of each option.",
    keyword: "customize shopify theme or buy new",
    category: "Guides",
    date: "2026-11-08",
    readMinutes: 5,
    visual: "ill-redesign",
    excerpt:
      "A dated-looking store does not always need a new theme. Three questions that tell you whether to customize, switch or build from scratch.",
    takeaways: [
      "Most stores that look dated just need their current theme customized.",
      "Switch themes only when your theme is very old or missing a key feature.",
      "A fully custom theme makes sense for a small number of large brands.",
    ],
    body: [
      { type: "p", text: "When a store starts to feel tired, the first idea is often to buy a new theme. Sometimes that is right. Often it is not. Before you decide whether to customize your Shopify theme or buy a new one, it helps to know what each option really involves." },
      { type: "h2", text: "Your three options" },
      { type: "table", columns: ["Option", "What it means", "Typical cost"], rows: [
        ["Customize your theme", "Change the theme you already have to fit your brand and needs", "$50 – $1,500"],
        ["Switch to a new theme", "Buy a different theme, set it up and move your content", "Theme price + setup"],
        ["Build a custom theme", "A theme designed and coded from zero just for you", "Usually $10,000+"],
      ] },
      { type: "h2", text: "Question 1: Is the problem how it looks, or what it can do?" },
      { type: "p", text: "If your store looks plain or off-brand, that is a design problem, and design can be changed inside your current theme: colours, fonts, spacing, images and layout. That is exactly what a [store redesign](/services/store-redesign/) on your existing theme does." },
      { type: "p", text: "If your theme simply cannot do something you need, like showing bundles or filtering products the way your customers shop, that is a feature problem. It can usually still be added with a [custom section](/services/shopify-development/), without switching themes." },
      { type: "h2", text: "Question 2: How old is your theme?" },
      { type: "p", text: "Shopify themes released before 2021 are often called vintage themes. They do not support moving sections around on every page. If yours is one of them and you keep asking for changes, each change gets more expensive. At that point, moving to a newer theme is often the cheaper long-term choice. Our [theme comparison](/themes/) shows where common themes sit." },
      { type: "h2", text: "Question 3: How many changes are on your list?" },
      { type: "list", items: [
        "One to three changes: customize your current theme.",
        "A long list, on an older theme: consider switching or upgrading first.",
        "A long list on a modern theme: a full customization is usually enough.",
      ] },
      { type: "callout", title: "A simple rule", text: "If your current theme is an Online Store 2.0 theme, customize it. If it is older and you have a long list of changes, upgrade first, then customize." },
      { type: "h2", text: "What about a fully custom theme?" },
      { type: "p", text: "A custom-built theme gives you complete control, but it costs far more, takes months, and you lose the free updates Shopify and theme makers provide. It makes sense for large brands with very specific needs. For most stores, customizing a good theme gets 90% of the result for a small part of the price." },
      { type: "p", text: "Still unsure? [Send us your store link](/hire/) and what you want to change. We will tell you honestly which option fits, even if the answer is that you do not need us." },
    ],
    faq: [
      { q: "Will switching themes affect my products or orders?", a: "No. Products, customers, orders and most apps stay in Shopify when you change themes. What you lose is the setup of your old theme: its sections, settings and any custom code." },
      { q: "Will customizing my theme stop me getting theme updates?", a: "Not if it is done carefully. Changes should be kept in separate files where possible and every edit written down, so updates can be applied later without losing your work." },
      { q: "How long does it take to customize a theme?", a: "Anywhere from a few days for one section to around a month for a full rebuild. You should get the exact delivery date in writing before work starts." },
    ],
  },
  {
    slug: "shopify-online-store-2-0-upgrade",
    title: "Shopify Online Store 2.0: should you upgrade your old theme?",
    metaTitle: "Shopify Online Store 2.0 Upgrade: Is It Worth It?",
    description:
      "What Shopify Online Store 2.0 is, how to tell if your theme is outdated, and when upgrading saves money compared with patching an old theme.",
    keyword: "shopify online store 2.0 upgrade",
    category: "Themes",
    date: "2026-11-08",
    readMinutes: 6,
    visual: "ill-migration",
    excerpt:
      "If your theme is from before 2021, every change costs more than it should. Here is how to check your theme and decide whether to upgrade.",
    takeaways: [
      "Online Store 2.0 lets you add and move sections on every page, not just the homepage.",
      "Themes like Debut, Brooklyn and other vintage themes are not 2.0.",
      "Upgrading keeps your products and orders; only the theme changes.",
      "Upgrade when you have several changes planned, not for one small fix.",
    ],
    body: [
      { type: "p", text: "Online Store 2.0 is the way Shopify themes have worked since 2021. If your store still runs on an older theme, a Shopify Online Store 2.0 upgrade can make every future change easier and cheaper. But it is not always needed right away. This guide helps you decide." },
      { type: "h2", text: "What Online Store 2.0 means for you" },
      { type: "p", text: "In older themes, you could only rearrange sections on the homepage. Every other page — product, collection, about — was fixed unless a developer edited the code. Online Store 2.0 changed that. Now you can add, remove and reorder sections on every page from the theme editor, without code." },
      { type: "list", items: [
        "Sections on every page, not just the homepage.",
        "App features that drop into the page without editing code.",
        "Different layouts for different products or pages.",
        "Custom information (like ingredients or size guides) shown from product fields.",
      ] },
      { type: "h2", text: "How to check if your theme is Online Store 2.0" },
      { type: "list", ordered: true, items: [
        "In your Shopify admin, go to Online Store, then Themes.",
        "Click Customize on your live theme.",
        "Open a product page in the editor and look for an Add section option.",
        "If you can add sections on the product page, your theme is 2.0. If not, it is a vintage theme.",
      ] },
      { type: "p", text: "Common vintage themes include Debut, Brooklyn, Minimal, Supply, Narrative and older versions of many paid themes. Dawn and the other free Shopify themes released since 2021 are all 2.0." },
      { type: "h2", text: "When an upgrade is worth it" },
      { type: "p", text: "An old theme is not broken. One or two small changes can still be made to it at a fair price. The problem is that each workaround makes the next change harder. At some point, patching costs more than upgrading." },
      { type: "callout", title: "The tipping point", text: "In our experience it usually comes around the third or fourth bigger change. If you have that many on your list, upgrading first is often cheaper overall." },
      { type: "h2", text: "What moves across, and what gets rebuilt" },
      { type: "table", columns: ["Part of your store", "What happens"], rows: [
        ["Products, collections, customers, orders", "Stay exactly as they are"],
        ["Pages and blog posts", "Stay; they just show in the new design"],
        ["Your web addresses (URLs)", "Stay the same, so search rankings are kept"],
        ["Homepage sections and custom design", "Rebuilt in the new theme"],
        ["Custom code", "Moved across properly, not copied blindly"],
      ] },
      { type: "h2", text: "Will upgrading hurt my SEO?" },
      { type: "p", text: "Changing the theme does not change your web addresses, page titles or product descriptions, so done properly it should not hurt your search rankings. The things to check are headings, image descriptions and page speed, which a careful [Online Store 2.0 migration](/migration/) checks before going live." },
      { type: "p", text: "Not sure whether to patch or upgrade? [Send us your store link](/hire/) and your list of changes. We will price both options so you can compare." },
    ],
    faq: [
      { q: "Is upgrading to Online Store 2.0 free?", a: "Switching to a free 2.0 theme like Dawn costs nothing, but rebuilding your design and custom features in it takes work. How much depends on how much your old theme was customized." },
      { q: "How long does an Online Store 2.0 upgrade take?", a: "For a typical store, two to three weeks. All the work happens on a copy of your theme, so your live store keeps selling until the new one is ready." },
      { q: "Will my apps still work after upgrading?", a: "Most do, and many work better because 2.0 themes support app blocks. A few older apps add code to the theme directly; those need checking and reconnecting." },
    ],
  },
  {
    slug: "shopify-dawn-theme-customization",
    title: "Shopify Dawn theme customization: what you can do yourself",
    metaTitle: "Shopify Dawn Theme Customization: A Plain Guide",
    description:
      "A plain-English guide to Shopify Dawn theme customization: what you can change yourself in the theme editor, and which changes need a developer.",
    keyword: "shopify dawn theme customization",
    category: "Themes",
    date: "2026-11-08",
    readMinutes: 6,
    visual: "ill-edit-yourself",
    excerpt:
      "Dawn is free, fast and flexible, and you can change much more of it yourself than most people think. Here is where the limits are.",
    takeaways: [
      "Colours, fonts, text, images and section order can all be changed for free.",
      "Always duplicate your theme before making big changes.",
      "Custom layouts, new features and logic need a developer.",
    ],
    body: [
      { type: "p", text: "Dawn is Shopify's free default theme, and it is a great starting point. Many store owners pay for changes they could make themselves in a few minutes. This guide to Shopify Dawn theme customization shows what you can do on your own, and when it makes sense to get help." },
      { type: "h2", text: "First, make a safe copy" },
      { type: "list", ordered: true, items: [
        "Go to Online Store, then Themes in your Shopify admin.",
        "Next to your live theme, open the menu (…) and choose Duplicate.",
        "Make your changes on the copy and preview them.",
        "When you are happy, publish the copy.",
      ] },
      { type: "p", text: "This way, your live store never shows a half-finished change." },
      { type: "h2", text: "What you can change yourself, for free" },
      { type: "h3", text: "Colours and fonts" },
      { type: "p", text: "In the theme editor, open Theme settings. You can set your brand colours, choose fonts for headings and text, and adjust button styles. These apply across the whole store at once." },
      { type: "h3", text: "Sections and their order" },
      { type: "p", text: "On any page, you can add sections like image banners, featured collections, testimonials and FAQs, then drag them into the order you want. Because Dawn is an Online Store 2.0 theme, this works on product and collection pages too, not just the homepage." },
      { type: "h3", text: "Text, images and menus" },
      { type: "p", text: "Every heading, paragraph and image in a section can be edited in place. Menus are managed under Online Store, then Navigation." },
      { type: "h2", text: "What needs a developer" },
      { type: "p", text: "Dawn's settings are flexible, but they have limits. These are the requests we see most often that the theme editor cannot do on its own:" },
      { type: "list", items: [
        "A section layout Dawn does not offer, such as a comparison table or a bundle builder.",
        "Showing different content for different products automatically.",
        "Product filters based on your own product details.",
        "A sticky add-to-cart bar on mobile.",
        "Matching an exact design from a mockup or another site.",
      ] },
      { type: "callout", title: "Ask for it to stay editable", text: "When a developer adds something new, ask for it as a section with settings. That way you can change its text and images later yourself, without paying again." },
      { type: "h2", text: "Do not edit the code directly" },
      { type: "p", text: "Dawn lets you open the code editor, and it is tempting to paste in a snippet from a forum. The risk is that a small mistake breaks a page, and code pasted into core files is lost when you update the theme. If you need code, keep it in separate files, and keep a note of every change." },
      { type: "p", text: "If you hit a limit, a [single-section edit](/pricing/) is usually enough. Or [send us what you want to change](/hire/) and we will tell you whether you can do it yourself first." },
    ],
    faq: [
      { q: "Is the Dawn theme good enough for a serious store?", a: "Yes. Dawn is fast, maintained by Shopify, and used by many successful stores. With a few custom sections it can look and work like a premium theme." },
      { q: "Will my changes be lost when Dawn updates?", a: "Changes made in the theme editor are kept. Code changes made directly in Dawn's files may need to be reapplied after an update, which is why careful developers keep custom code in separate files." },
      { q: "Can Dawn look like a premium theme?", a: "Mostly, yes. A consistent brand style, good photography and two or three custom sections close most of the gap with paid themes." },
    ],
  },
  {
    slug: "shopify-product-page-customization",
    title: "Shopify product page customization: 8 changes that help shoppers buy",
    metaTitle: "Shopify Product Page Customization: 8 Changes That Sell",
    description:
      "Eight Shopify product page customization ideas that answer shoppers' questions and make buying easier, plus which ones you can do without a developer.",
    keyword: "shopify product page customization",
    category: "Conversion",
    date: "2026-11-08",
    readMinutes: 7,
    visual: "ill-new-section",
    excerpt:
      "Your product page is where people decide. Eight practical changes that remove doubt and make the buy button easier to reach, especially on phones.",
    takeaways: [
      "Most shoppers browse on their phone, so design the product page for mobile first.",
      "Answer the top questions (size, delivery, returns) right next to the buy button.",
      "Show real photos and real reviews; they do more than clever design.",
      "Change one thing at a time so you can see what works.",
    ],
    body: [
      { type: "p", text: "The product page is where a visitor decides to buy or leave. Small changes here often matter more than a full redesign. These eight Shopify product page customization ideas are the ones we are asked for most, ordered roughly from easiest to most involved." },
      { type: "h2", text: "1. Put the key facts next to the buy button" },
      { type: "p", text: "Shoppers want to know delivery time, returns and whether the item is in stock before they commit. Show these in short lines right under the Add to cart button, not hidden at the bottom of the page." },
      { type: "h2", text: "2. Better photos, in the right order" },
      { type: "p", text: "Lead with the clearest photo of the product, then show it in use, then the details. Make sure images are sized for phones so the page loads quickly." },
      { type: "h2", text: "3. A size guide that opens in place" },
      { type: "p", text: "If you sell clothing or shoes, a size guide that opens as a pop-up, without leaving the page, reduces both doubt and returns." },
      { type: "h2", text: "4. Reviews near the top" },
      { type: "p", text: "A star rating near the product title, linked to the full reviews further down, reassures people early. Most review apps can place this as a block in Online Store 2.0 themes." },
      { type: "h2", text: "5. A sticky add-to-cart bar on mobile" },
      { type: "p", text: "On a phone, the buy button scrolls away quickly. A slim bar that stays at the bottom of the screen keeps it in reach. This usually needs a developer, but it is a small job." },
      { type: "h2", text: "6. Clear options and stock" },
      { type: "p", text: "Show colours as swatches rather than a drop-down, and grey out sizes that are sold out. Shoppers should never pick an option and only then find out it is unavailable." },
      { type: "h2", text: "7. Bundles and \"frequently bought together\"" },
      { type: "p", text: "Offering a set, or a matching item, raises the average order. This can be done with an app or as a custom section built into your theme, which is faster and matches your design." },
      { type: "h2", text: "8. Product details from your own fields" },
      { type: "p", text: "Ingredients, materials, care instructions or specifications can be stored as product fields (called metafields) and shown in a tidy section. Each product then shows its own details automatically." },
      { type: "callout", title: "Test one change at a time", text: "If you change five things at once and sales go up, you will not know which change worked. Make one change, wait a couple of weeks, then look at your numbers." },
      { type: "h2", text: "Which of these can you do yourself?" },
      { type: "table", columns: ["Change", "Do it yourself?"], rows: [
        ["Key facts under the button", "Often yes, with a text block"],
        ["Photo order and sizing", "Yes"],
        ["Reviews near the title", "Yes, with most review apps"],
        ["Size guide pop-up", "Sometimes; depends on the theme"],
        ["Sticky add-to-cart on mobile", "Usually needs a developer"],
        ["Swatches and sold-out states", "Depends on the theme"],
        ["Custom bundles", "Needs an app or a developer"],
        ["Details from product fields", "Needs a developer to set up once"],
      ] },
      { type: "p", text: "A full product page rework is our [page-level build](/pricing/). If you only need one or two of these, a single-section edit may be enough. [Tell us what your product page needs](/hire/) and we will price it." },
    ],
    faq: [
      { q: "How much does it cost to customize a Shopify product page?", a: "A single change, like a sticky add-to-cart bar, is usually a small job. A full product page rebuild with several new sections is a bigger one; on our pricing it is the $250 page-level build." },
      { q: "Do I need an app for product page changes?", a: "Not always. Many changes can be built into the theme as sections, which loads faster than an app and matches your design. Apps make sense for things like reviews and subscriptions." },
      { q: "Can I have a different layout for different products?", a: "Yes. Online Store 2.0 themes let you create several product templates and choose which one each product uses." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
