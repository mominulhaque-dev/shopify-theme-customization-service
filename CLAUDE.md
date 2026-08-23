# CLAUDE.md — Shopify Theme Customization Services

Read this before doing anything else. It's written so a fresh Claude Code
session can pick up this project with zero re-analysis.

## 0. Where this came from

Built in a Claude.ai chat session (no network access, so **nothing here has
been `npm install`'d, built, or visually verified**). The design source of
truth was a single reference file: `Homepage_Design_v3_-_Final.html` (a
hand-coded static HTML/CSS homepage for a Shopify theme customization
agency — forest-green palette, Bricolage Grotesque / Instrument Sans /
JetBrains Mono, pricing-tier ladder, "the wall" editor-vs-code diagram).

**Your first task in Claude Code should be:** `npm install`, then `npm run
dev`, then visually diff the rendered homepage against the original
`Homepage_Design_v3_-_Final.html` (open both side by side) and fix whatever
doesn't match pixel-for-pixel. Treat every animation, hover state and
breakpoint as unverified until you've seen it render.

## 1. Project overview

A premium Shopify theme *customization* agency site (not "we build themes
from scratch" — see `/hire/` copy and the scope-wall section, the
distinction matters and is a real content pillar, not just marketing).

- **Tech stack:** Next.js 14 (App Router), React 18, TypeScript, plain CSS
  (global stylesheets, not Tailwind — see §5 for why), GSAP + ScrollTrigger,
  Lenis for smooth scroll, Resend for the contact form.
- **Contact details (real, already wired in `src/data/site.ts`):**
  - Email: `hihopifythemecustomization@gmail.com`
  - Phone: `01580424024` / `+8801580424024`
  - WhatsApp: `https://wa.me/8801580424024`

## 2. Folder structure

```
src/
├── app/
│   ├── layout.tsx          root layout: fonts, global CSS imports, header/footer, Lenis provider, Organization JSON-LD
│   ├── page.tsx             homepage — composes all section components, FAQPage JSON-LD
│   ├── globals.css          design tokens (colors/type/spacing) ported 1:1 from the reference HTML
│   ├── robots.ts / sitemap.ts
│   ├── not-found.tsx
│   ├── api/contact/route.ts contact form → Resend
│   └── hire/page.tsx        contact page, only non-homepage page built so far
├── components/
│   ├── layout/               Header, Footer, header.css, footer.css
│   ├── navigation/            HeaderScrollState (scroll shadow), MobileMenu (animated slide-in panel)
│   ├── sections/               one component per homepage <section>, plus sections.css
│   ├── cards/                  PriceCard
│   ├── forms/                   ContactForm + forms.css
│   └── animations/              SmoothScrollProvider (Lenis+GSAP), Reveal, RevealGroup — the whole motion system funnels through these two
├── data/
│   ├── homepage.ts            ALL homepage copy, verbatim from the reference file — see §3 before touching this
│   └── site.ts                 nav, footer links, contact details
├── types/index.ts
└── lib/gsap.ts                 plugin registration + prefersReducedMotion() helper
```

## 3. Homepage content — DO NOT REWRITE

The task brief was explicit: homepage copy must be preserved, not rewritten.
Every string in `src/data/homepage.ts` was copied verbatim from
`Homepage_Design_v3_-_Final.html`. If you need to change homepage text,
that's a deliberate exception to flag to the user, not a default action.

**One known content gap from the port:** a handful of inline links inside
longer paragraphs (e.g. the scope-wall "Where we stop" list's `comparison`
link, the diff-section footnote's `store setup` link) were flattened to
plain text during the port so the data file could stay simple strings. Go
back to the original HTML (§0) and reinstate those inline `<a>` tags — search
`homepage.ts` for the plain-text remnants ("see the comparison", "see store
setup") and wrap the right word in a `<Link>` inside the JSX, not in the
data string.

Other pages (everything except `/` and `/hire/`) do NOT have this
restriction — write real, specific, non-generic agency copy per the
original brief's §8 rules (no fake clients/stats/awards).

## 4. Routes — what exists vs. what's next

**Built:** `/` (homepage), `/hire/` (contact form).

**Referenced by nav/footer/homepage links but NOT yet built** (creating
these, with real content, is the single biggest remaining task — check
`src/data/site.ts` `footerColumns` and `mainNav` for the full canonical
list before starting, it's the source of truth for the sitemap):

```
/themes/          /work/             /pricing/          /guides/
/process/         /migration/        /store-setup/
/customization/liquid/   /customization/css/   /customization/fonts/
/customization/sections/  /customization/schema/  /customization/no-code/
/customization/product-page/  /customization/mobile/
/customization/dawn/  /customization/prestige/  /customization/spotlight/
/customization/legacy-themes/
/guides/theme-editor/  /guides/customize-theme/  /guides/edit-theme/
/guides/change-theme/  /guides/identify-theme/
/custom-theme-development/  /custom-theme-vs-template/
/work/[client-slug]/ (×10 real case studies once real client data exists)
```

Until these exist, every link to them will 404 — the brief's "zero broken
links" rule is **not yet met**. Prioritize this before polish work.

## 5. Why plain CSS, not Tailwind

The reference design's visual identity (exact hex values, exact spacing
scale, exact type scale) was already fully specified in the source HTML's
`<style>` block. Porting it 1:1 into global CSS with the same custom
properties (`src/app/globals.css`) guaranteed pixel accuracy without a
Tailwind config translation step I couldn't verify compiles (no network in
the authoring sandbox — see §0). If you want to migrate to Tailwind later,
do it as a refactor with visual diffing at each step, not a rewrite.

Global CSS files are imported once, in `src/app/layout.tsx`, in this order:
`globals.css` → `header.css` → `footer.css` → `sections.css` → `forms.css`.
New sections should add their own `<name>.css` file next to the component
and import it in `layout.tsx` the same way — don't scatter imports across
component files.

## 6. Animation system

Five reusable primitives now live in `src/components/animations/`, each with
a distinct job rather than one fade-in reused everywhere:

- **`Reveal`** — single-block fade+rise on scroll (GSAP ScrollTrigger,
  plays once). Used for section intros/paragraphs.
- **`RevealGroup`** — staggers all children matching a CSS selector
  (`.tier`, `.spotlight-card`, `.theme-row`, `.step`, `details`), so each
  section's cards/rows enter with rhythm instead of all at once.
- **`HeroReveal`** — hero-only entrance timeline for the deck/lede/CTA/
  creds line (plays on load, not scroll-triggered). Deliberately excludes
  the H1 — see `TextReveal` below — animating the same node from two
  places caused a visible conflict during the build.
- **`TextReveal`** — mask reveal for headings: wraps the heading in an
  `overflow:hidden` div and animates it in via `clip-path` (inset from the
  bottom) + a slight rise, so it reads as "unmasking" rather than fading.
  Used on the hero H1 (`trigger="load"`) and every section H2
  (`trigger="scroll"`, the default). Deliberately a single-block technique,
  not per-line/per-character — true line-splitting needs real-browser
  measurement (`getClientRects()`) that this sandbox can't verify renders
  correctly across wrap widths and font-loading timing. **If you want true
  per-line stagger, that's the first upgrade to do once you have a browser
  open** — verify one heading first before rolling it out everywhere.
- **`ImageReveal`** — scroll-triggered scale+clip-path settle for imagery
  (starts at `scale(1.06)` clipped 3% on each edge, eases to full size).
  Used on the new theme-editor mockup in `ThemesSection` — see §11.
- **`Magnetic`** — cursor-pull micro-interaction for buttons (desktop
  pointer only, `matchMedia("(hover: hover) and (pointer: fine)")` guarded).
  Applied to the hero CTA and final CTA arrow button. Kept small
  (`strength={10-12}`) per the brief's "professional, not gimmicky" note.
- **`SpotlightCard`** — cursor-follow radial glow (via `--mx`/`--my` CSS
  custom properties, read by `.spotlight-card::after` in `sections.css`)
  plus an optional subtle 3D tilt (`transform-style: preserve-3d`,
  `rotateX`/`rotateY`). Wraps the case-study cards (`tilt={4}`) and the
  hero price card (`tilt={3}`). Same pointer-guard as `Magnetic`.
- **`MaskedAurora`** — the brief's "mask-based background animation"
  requirement: two blurred, drifting color blobs (CSS keyframe) underneath
  a `mask-image: radial-gradient(...)` layer whose center point is tweened
  by GSAP through `--mask-x`/`--mask-y` custom properties on a slow
  14s yoyo loop — so the *mask itself* moves, not just shapes underneath a
  static mask. Two variants: `"hero"` (signal-green, positioned via the
  existing `.hero-ambient` class) and `"dark"` (muted, positioned via
  `.diff-ambient`, used behind the pricing-tier section alongside the
  existing `.diff-grid` texture for layered depth).
- **`SmoothScrollProvider`** — Lenis synced to GSAP's ticker.

All of the above check `prefersReducedMotion()` and either skip entirely or
render a static end-state — verify this in a real browser with reduced
motion turned on, it's implemented but unverified (§0).

**Still not built** from the fuller brief: per-line/per-character text
stagger (see `TextReveal` note above), pinned/horizontal ScrollTrigger
sections, noise-texture backgrounds, glass-morphism card variants, and
page-specific motion personalities for pages that don't exist yet (§4) —
do those as each new page is built, not generically in advance.

## 11. Image strategy — current state

One real illustration exists: `src/components/ui/ThemeEditorMockup.tsx`, an
inline SVG of a browser window (sidebar settings + storefront preview),
used in `ThemesSection` as a genuine image+content composition (content
left, image right, via `.split-visual` in `sections.css`) rather than a
stock photo. It's intentionally abstract/on-brand rather than a real
screenshot — swap it for an actual theme-editor screenshot the moment one
exists, keeping the same `ImageReveal` wrapper and `.split-visual-media`
class so the reveal animation and layout carry over unchanged.

Every other page-level visual called for in the brief (storefront
screenshots, before/after panels, mobile mockups, dashboard visuals) is
still a placeholder gap — build them as each corresponding page (§4) is
built, following this same pattern: a small `components/ui/*Mockup.tsx` SVG
or a real optimized image, wrapped in `<ImageReveal>`, named descriptively
per the brief's filename rule (`shopify-theme-customization.webp`, not
`image1.webp`) once real assets exist.

## 12. Content depth — not yet done

This round only touched animation/visual layers, per explicit instruction
not to remove or rewrite homepage content. The separate, larger brief
requirement — every page having a full information architecture (hero →
problem → solution → capabilities → process → FAQ → CTA, SEO keyword
strategy per page, internal linking between related services) — has not
been started. That's real writing + IA work best done page-by-page once
the routes in §4 are being built, not retrofitted here.


## 7. Email / contact form

`src/app/api/contact/route.ts` uses Resend. It fails loudly (503, logged
server error) if `RESEND_API_KEY` is unset rather than pretending to send —
per the brief's "do not fake email delivery" rule. To make it live:

1. Create a Resend account, verify a sending domain (or use their
   `onboarding@resend.dev` sandbox sender, already set as the `from`).
2. Set `RESEND_API_KEY` and `CONTACT_EMAIL` in Vercel project env vars (see
   `.env.example`).
3. Test the idle → submitting → success/error flow in
   `src/components/forms/ContactForm.tsx` against the real endpoint.

## 8. SEO status

Done: per-page `Metadata` API usage (see `app/page.tsx`, `app/hire/page.tsx`),
canonical URLs, Organization + FAQPage JSON-LD, `robots.ts`, `sitemap.ts`.

Not done: `sitemap.ts` only lists the 2 built routes — extend it as pages
are added (§4). No BreadcrumbList structured data yet (add once nested
routes like `/customization/dawn/` exist, since breadcrumbs need real
hierarchy). No `/og-image.jpg` file exists yet — `layout.tsx` references
`/og-image.jpg` at 1200×630, create and add to `public/`.

## 9. Accessibility status

Done: skip link, visible focus rings (`:focus-visible` outline using the
`--signal` color), semantic `<header>/<nav>/<main>/<section>/<footer>`,
real `<button>`/`<a>`/`<form>`/`<label>` throughout, reduced-motion
handling in both CSS (`globals.css`) and every GSAP animation.

Not verified: color contrast on `--muted` (#566B62) against `--paper`
(#FBFCFB) for body text — check with a contrast checker before shipping.
Mobile menu focus trapping isn't implemented (focus can currently escape
the open panel to the page behind it) — add a focus trap.

## 10. Known gaps / immediate next task

Recommended order for the next session:

1. `npm install`, `npm run dev`, visually diff against
   `Homepage_Design_v3_-_Final.html`. Fix any drift. **Pay particular
   attention to the new `TextReveal`/`MaskedAurora`/`SpotlightCard`
   components (§6) — none of them have been seen in a real browser.**
   Check: does the hero H1 clip-path mask look intentional or glitchy on
   first load? Does the spotlight glow track the cursor smoothly on the
   case-study cards? Does the aurora mask move too much / too little
   behind the pricing tiers?
2. Reinstate the flattened inline links noted in §3.
3. Build out the route list in §4, starting with `/pricing/`, `/work/`,
   `/process/` since they're the most-linked from the homepage. Give each
   page real content per the separate content brief (§12) — full IA,
   keyword strategy, internal links — not just a hero+CTA.
4. Wire real Resend credentials (§7) and test the form end to end.
5. Add `/og-image.jpg` and a real `favicon.ico` to `public/` (neither
   exists yet — `layout.tsx` and `metadata.icons` reference paths that
   currently 404).
6. Once §1 is verified working, extend the motion system: per-line text
   stagger (see `TextReveal` note in §6), pinned/horizontal ScrollTrigger
   sections, real product screenshots replacing `ThemeEditorMockup.tsx`
   (§11) with `ImageReveal` wraps.
7. Full link audit once all routes exist — brief requires zero broken
   links.

Update this file after each of the above lands, per the original brief's
instruction to keep it current for the next session.
