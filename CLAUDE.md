# CLAUDE.md — Shopify Theme Customization Services

Read this before doing anything else. It is written so a fresh session can pick
up the project with no re-analysis.

## 0. State of the build

Verified in this environment: `npm run build` compiles and prerenders all 47
pages, `npm run lint` is clean, `npx tsc --noEmit` is clean, and the two audit
scripts pass (§10). `npx next start` serves every route with the expected status
codes.

**Not verified:** anything that needs eyes on a browser. No screenshot has been
taken, no hydration observed, no animation watched. Every claim below about how
something *looks* or *feels* is intent, not observation. The first job in a
session with a browser is §11.

## 1. Project overview

A Shopify theme *customization* agency site (not "we build themes from
scratch" — the distinction is a real content pillar, see
`/custom-theme-development/`).

- **Stack:** Next.js 14 (App Router), React 18, TypeScript strict with
  `noUncheckedIndexedAccess`, plain CSS, GSAP 3.15 + ScrollTrigger + SplitText +
  DrawSVG + CustomEase, Lenis for smooth scroll, Resend for the contact form.
- **Contact details (real, in `src/data/site.ts`):**
  - Email: `hihopifythemecustomization@gmail.com`
  - Phone: `01580424024` / `+8801580424024`
  - WhatsApp: `https://wa.me/8801580424024`

## 2. Architecture — the three decisions that shape everything

**a. One catch-all route renders 44 pages.** `src/app/[...slug]/page.tsx` looks
up `src/data/pages/index.ts` and hands the result to `PageRenderer`. Pages are
data (`PageContent` in `src/types/page.ts`), composed from a discriminated union
of block types. `generateStaticParams` means they are all still statically
prerendered; `dynamicParams = false` makes an unknown path a 404 rather than an
empty render.

To add a page: write `src/data/pages/<name>.ts`, add it to `PAGE_LIST`. That is
the whole procedure — the sitemap, the static params and the link audit all read
from that array, so there is no second place to forget.

**b. Motion is declarative.** Sections stay server components and declare intent
with data attributes (`data-reveal`, `data-split`, `data-parallax`, `data-tilt`,
`data-magnetic`, `data-counter`, `data-draw`, `data-hscroll`, `data-curtain`,
`data-marquee`, `data-mask-move`, `data-sweep`, `data-drift`). One client
component — `MotionProvider` — reads them and builds every GSAP animation inside
a single `gsap.context`. Adding an effect is an attribute, not another wrapper
component, and page bundles ship no animation code.

**c. The `.motion` class gates all of it.** An inline script in `layout.tsx` adds
`.motion` to `<html>` before the body paints, and only when JS is on and
`prefers-reduced-motion` is not set. Every pre-paint hidden state in
`src/styles/motion.css` is scoped to `.motion`. So no-JS and reduced-motion
visitors get the finished state with no flash, and `motionEnabled()` is the
single check any client code makes before animating.

**If you add a `[data-reveal]` value**, add it in three places or it breaks:
`MOTION_FROM`/`MOTION_TO` in `src/lib/motion.ts`, the `RevealKind` union in the
same file, and the pre-paint rule in `src/styles/motion.css`.

## 3. Folder structure

```
src/
├── app/
│   ├── layout.tsx            fonts, CSS entry, motion bootstrap, providers, Organization JSON-LD
│   ├── page.tsx              homepage — composes the section components
│   ├── [...slug]/page.tsx    every interior page, from the registry
│   ├── hire/page.tsx         the only hand-built interior page (it has the form)
│   ├── globals.css           import manifest only — the cascade order lives here
│   ├── not-found.tsx, robots.ts, sitemap.ts
│   └── api/contact/route.ts  contact form → Resend
├── components/
│   ├── animations/           Backdrop, Reveal, RevealGroup, TextReveal, ImageReveal,
│   │                         Magnetic, SpotlightCard, Marquee, ScrollProgress,
│   │                         MotionProvider (the only GSAP client), SmoothScrollProvider
│   ├── page/                 PageRenderer, PageHero, SectionShell, Breadcrumbs, Block*
│   ├── sections/             one component per homepage section + sections*.css
│   ├── ui/                   inline-SVG mockups, BrowserFrame, CodePanel, visuals registry
│   ├── layout/               Header, Footer + their CSS
│   ├── navigation/           HeaderScrollState, MobileMenu (focus-trapped)
│   └── forms/                ContactForm + forms.css
├── data/
│   ├── homepage.ts           homepage copy, verbatim — see §4
│   ├── site.ts               nav, footer columns, contact details
│   └── pages/                one file per interior page + index.ts registry
├── styles/                   the design system, split by concern (§6)
├── lib/                      gsap, motion*, linkify, slug
└── types/                    index.ts (homepage types), page.ts (PageContent)
```

## 4. Homepage content — DO NOT REWRITE

Every string in `src/data/homepage.ts` is verbatim from the approved design
reference. Layout, imagery, spacing and animation may change; wording may not.
Changing homepage copy is a deliberate exception to flag to the user, never a
default action.

`npm run audit:homepage` enforces this: it extracts every prose string from
`homepage.ts` and asserts each one appears in the prerendered homepage HTML. 140
strings currently pass. Run it after any homepage change.

The inline links that the original port flattened to plain text are restored via
`src/lib/linkify.tsx` — it maps phrases that already exist in the approved copy
to their destinations, so no wording was altered to make a link fit. Add to
`PHRASE_LINKS` there rather than editing the copy.

Other pages have no such restriction.

## 5. Routes — all 47 exist

Homepage, `/hire/`, and 44 registry pages: `/services/` (+4 service pages),
`/customization/` (+12 layer and theme pages), `/themes/`, `/work/` (+10 case
studies), `/pricing/`, `/guides/` (+7 guides), `/process/`, `/migration/`,
`/store-setup/`, `/custom-theme-development/`, `/custom-theme-vs-template/`.

`npm run audit:links` walks the prerendered HTML, collects every internal href
and checks it against the pages that actually built. It also fails on `#`,
`javascript:void(0)` and empty hrefs. Currently: 46 distinct internal targets,
zero broken, zero placeholders, zero orphan pages.

`trailingSlash: true` is on because every href in the site is written with one.
Three legacy case-study slugs (`/work/client-slug-{1,2,3}`) 308 to their real
URLs via `next.config.mjs`.

## 6. CSS

Plain CSS, not Tailwind: the reference design specified exact hex values, an
exact spacing scale and an exact type scale, all of which port 1:1 into custom
properties. `src/app/globals.css` is an import manifest and nothing else — it is
the only place the cascade order is declared, and the only stylesheet
`layout.tsx` imports. Files are split by concern under `src/styles/` plus the
component-local sheets. Add a new file there and import it in the manifest; do
not scatter imports into components.

**Density lives in one place.** All vertical rhythm derives from the `--sp-*`
tokens in `tokens.css`. The previous build used 5.5rem section padding and
3.5rem heading gaps, which read as empty; section padding is now
`clamp(2.75rem, 5.5vw, 4.5rem)` and heading gaps `clamp(1.5rem, 2.6vw, 2.25rem)`.
Retune density there rather than per section.

**Contrast is checked, not assumed.** Every text pair passes WCAG AA:
`--muted` 6.37:1 on `--paper`, `--muted-soft` 4.87:1, `--ink-2` 10.5:1,
`--forest` 7.68:1, `--on-deep` 8.22:1 on `--deep`, `--signal` 6.51:1 on `--deep`.
If you change a colour token, recompute rather than eyeballing.

## 7. Imagery

Every visual is inline SVG — no binary assets, no stock photography. They live in
`src/components/ui/mockups-*.tsx` and are registered by key in
`visuals.tsx`, which is what makes a real screenshot a one-line swap later. Page
data references a visual by name (`visual: "product-page"`), never by import.

Available keys: `theme-editor`, `storefront`, `product-page`, `mobile`,
`before-after`, `migration`, `sections`, `speed`, `funnel`, `ceiling`, `fonts`,
`palette`, `breakpoints`, `timeline`, `handover`, `code-liquid`, `code-schema`,
`code-css`, `code-js`, `code-template`, plus three overlapping compositions
(`overlap-store`, `overlap-editor`, `overlap-product`).

The code panels contain real, correct theme code (`ui/code-samples.ts`) — Liquid
that guards for missing objects, schema that produces editable settings, CSS
scoped to a section id. They double as evidence on the customization pages, so
keep them correct if you edit them.

## 8. Backgrounds

`Backdrop` has eight variants (`aurora`, `mesh`, `grid`, `dots`, `beams`,
`rings`, `contour`, `organic`) plus composable `noise` and `shapes`, so adjacent
bands never share an effect. All decorative: `aria-hidden`, `pointer-events:
none`, pinned behind content by `.has-backdrop`. Motion comes from CSS keyframes
plus the `data-mask-move` / `data-sweep` / `data-drift` hooks, so reduced-motion
visitors get the same composition standing still. The heaviest layers are
dropped below 700px in `backdrops-2.css`.

## 9. Fonts — why not `next/font`

`next/font/google` fetches woff2 from `fonts.gstatic.com` **at build time**, and
that host is unreachable from this environment, which failed the whole build.
Fonts are therefore loaded with a `<link>` to the Google Fonts CSS API plus
preconnects. If you are somewhere with gstatic access and want self-hosting
back, it is a contained change in `layout.tsx` — but re-verify the build.

## 10. Verification

```
npm run verify        # build + link audit + homepage content guard
npm run lint
npx tsc --noEmit
```

`scripts/audit-links.mjs` and `scripts/check-homepage-content.mjs` both read the
prerendered HTML, so they only mean something after a build.

## 11. What is left

1. **Look at it in a browser.** Nothing visual has been observed. Specifically
   check: the SplitText line reveals on the hero H1 and section H2s (do lines
   break sensibly at every width, and does `autoSplit` re-split cleanly on
   resize?); the pinned horizontal gallery on `/themes/`; the `data-curtain`
   scrub on the dark pricing band; the spotlight/tilt on cards; and the aurora
   mask movement — is it too much or too little?
2. **Reduced motion.** Turn it on and confirm every page renders its finished
   state with no hidden content and no animation.
3. **`public/og-image.png`.** The design is ready at `public/og-image.svg`;
   export it at 1200×630 and wire it up per the comment in `layout.tsx` — which
   includes switching `twitter.card` back to `summary_large_image` (it is
   `summary` while no image exists, because a large-image card with no image
   renders as an empty panel). The `next/og` route was removed because @vercel/og
   cannot resolve its bundled font when the project path contains a space or
   brackets, and it fails at module load, so the route 500s rather than
   degrading.
4. **Resend credentials.** Set `RESEND_API_KEY` and `CONTACT_EMAIL` (see
   `.env.example`), then test the idle → submitting → success/error flow against
   the real endpoint. The route deliberately returns 503 rather than faking a
   send when the key is missing.
5. **Case-study specifics.** The ten write-ups are structurally complete and
   deliberately carry no merchant names or uplift percentages — that is the
   stated policy on `/work/`, not a gap. If a client signs off on being named,
   their file in `src/data/pages/cases-*.ts` is where it goes.
6. **A real favicon.ico** alongside `public/icon.svg`, for older clients.

Update this file as each of those lands.
