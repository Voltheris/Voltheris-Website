# Voltheris

AI systems that run lead generation, qualification, CRM management, and
appointment booking. This repo is the marketing site.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — all design tokens live in `tailwind.config.ts`
- **Framer Motion** — component-level animation, page/section reveals
- **GSAP** — scroll-triggered timelines (hero sequence, pinned sections)
- **Lenis** — smooth scrolling, wired once in `SmoothScrollProvider`
- **react-icons** — iconography

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/style-guide`
for the live design-token reference.

## Project structure

```
app/                  Route segments (App Router). One folder per page.
  layout.tsx          Root layout — fonts, metadata, SmoothScrollProvider
  globals.css          Base styles, CSS layer definitions, .the-current utility
  style-guide/         Internal token/type/color reference (not in nav)

components/
  ui/                  Primitive, reusable pieces (Button, Card, Accordion, …)
  sections/            Page-level sections composed from ui/ (Hero, ServicesGrid, …)
  layout/              Nav, Footer, page chrome
  providers/           App-wide context/providers (smooth scroll, etc.)

lib/
  fonts.ts             next/font definitions for the three type roles
  motion.ts            Shared easing curves + Framer Motion variants
  utils.ts             cn() class-merge helper

content/               Static copy/data (services, case studies, articles, jobs)
types/                 Shared TypeScript interfaces for the above
hooks/                 Reusable client hooks (e.g. useScrollProgress, useMagnetic)
public/                Static assets — images, favicon, og-image
```

## Design system

Full rationale (palette, type scale, spacing, motion, the signature
"Current" element) lives in [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).
Every visual decision in the codebase should trace back to a token
defined there and in `tailwind.config.ts` — no hardcoded hex values or
one-off font-families in components.

## Deploying (GitHub → Cloudflare Pages)

This project builds to a fully static export (`output: "export"` in
`next.config.mjs`) — nothing here needs a server at request time, so it
deploys to Cloudflare Pages directly with no adapter.

1. **Push to GitHub:** `git init`, commit, create a repo on GitHub, `git
   remote add origin <url>`, `git push -u origin main`.
2. **Cloudflare Pages:** dashboard → Workers & Pages → Create → Pages →
   Connect to Git → select the repo. Framework preset: **Next.js
   (Static HTML Export)**. Build command: `npx next build`. Output
   directory: `out`.
3. **Custom domain:** once deployed, Pages project → Custom domains →
   Add a domain. If the domain's DNS already lives in the same
   Cloudflare account, it's wired up automatically; otherwise add the
   CNAME record Cloudflare gives you.

## Build roadmap

1. ~~Architecture & design system~~
2. ~~Homepage — nav, cinematic hero, and all homepage sections~~
3. ~~Shared component library + Services page~~
4. ~~Solutions page — 7 industry sections~~
5. ~~Portfolio (index + dynamic case study pages) + About page~~
6. ~~Insights (index + dynamic article pages)~~
7. ~~Contact page — form, Calendly, FAQ~~
8. ~~Full design-polish pass~~ ← this stage
9. Remaining page — Careers
10. Remaining shared component — comparison table
11. Further performance pass — Lighthouse run, image optimization once
    real photography/assets exist

## Design-polish pass

A site-wide pass across timing, responsiveness, accessibility, SEO, and
visual consistency — done at the system level (tokens, shared
components, root layout) rather than page-by-page, so it propagates
everywhere those are used.

**Timing & interaction**
- All hover/interaction transitions tightened from 400ms → 300ms
  site-wide for a snappier feel; scroll-reveal and GSAP-drawn timings
  were left as-is (600–1400ms range is correct for those).
- `Button` and every other magnetic-button consumer now get real press
  feedback (`onPointerDown`/`onPointerUp` in `useMagnetic`, driven by
  GSAP) rather than a CSS `active:scale-*` class — the hook already
  drives `transform` via inline style on every pointer move, and an
  inline style always beats a class targeting the same property, so a
  class-based press effect would have been silently overridden the
  moment the pointer moved. See the comment in `hooks/useMagnetic.ts`.
- `Nav` now intensifies its glass background, border, and adds a
  shadow once the page has scrolled past 8px, instead of a single
  static glass state for the entire scroll range.

**Responsiveness**
- `PageHero` and the two custom detail-page hero sections
  (`/portfolio/[slug]`, `/insights/[slug]`) now use `pt-32 sm:pt-40`
  instead of a flat `pt-40` — on a short phone screen, 160px of top
  padding was eating a large share of the first viewport.

**Accessibility**
- **Contrast audit, not a guess:** actually computed WCAG contrast
  ratios (see `DESIGN_SYSTEM.md` → Color) and found two real failures:
  `ink-faint` measured 3.0–3.35:1 against ivory/sand (needs 4.5:1 for
  normal text), and the brand gold used as *text* on ivory/sand
  measured only 2.5–2.8:1 — failing even the relaxed 3:1 large-text
  threshold. Also found `gold-dim` was *darker* than the DEFAULT gold,
  which cuts contrast against a dark background rather than adding it
  (4.0:1, still short of AA).
  - `ink-faint` darkened to `#6B675C` (5.1:1 / 4.6:1).
  - `gold-dim` corrected to `#C2934F` (6.6:1 on charcoal).
  - New `gold-text` token (`#7A5F3C`, 5.4:1 / 4.8:1) introduced
    specifically for gold text/icons on light backgrounds; `gold`
    itself stays reserved for fills, borders, the Current line, and
    text on charcoal, where its contrast was already fine. Swept ~30
    call sites across the codebase to use the correct one — this
    wasn't a blind find-and-replace, each site was checked against
    which background it actually renders on.
- Skip-to-content link (`.skip-link` in `globals.css`) plus
  `id="main-content"` added to every page's top-level `<main>`.
- `InsightsExplorer` now has an `aria-live="polite"` region announcing
  the result count as search/filter changes.
- `-webkit-tap-highlight-color: transparent`, a `scroll-padding-top`
  fallback for any anchor without its own `scroll-mt-*`, and
  `text-wrap: balance` on headings for cleaner line breaks.

**SEO**
- `app/sitemap.ts` (all static routes + every case study and article
  slug) and `app/robots.ts`.
- Organization JSON-LD in the root layout.
- A real Open Graph / Twitter card image (`app/opengraph-image.tsx`,
  generated with `next/og`) instead of no image at all.
- Twitter card metadata added alongside the existing Open Graph tags.

**Loading & error states**
- `app/loading.tsx` — a minimal branded loading state (a pulsing
  Current line) shown by Next.js between route segments, instead of a
  blank screen.
- `app/not-found.tsx` — a branded 404 page instead of the framework
  default.

Build verified locally with `npm run build` across all 28 routes
(Google Fonts can't be fetched from this sandbox, so that step was
checked with a stubbed `lib/fonts.ts` — restored before packaging; it
resolves normally wherever the project has open internet access).

## Contact

`/contact` composes: `PageHero` (with a "Book a call instead" CTA
jumping straight to `#schedule`) → `ContactSection` (form + sidebar) →
`ScheduleSection` (Calendly embed) → `FAQ`.

- `ContactForm` — presentational, same honesty pattern as
  `NewsletterSignup`: no email/CRM provider connected, clearly flagged
  in a comment and in a line of copy under the submit button. Built on
  a new shared `FormField` primitive (`components/ui/FormField.tsx`)
  that renders as an input, textarea, or select with identical label
  and focus styling — reused instead of hand-rolling each field.
- `CalendlyEmbed` (`components/ui/`) is a real, working Calendly
  inline-embed integration (their standard `.calendly-inline-widget` +
  `widget.js` pattern) — the only thing between this and a live booking
  flow is swapping the placeholder `CALENDLY_URL` for a real scheduling
  link, flagged with a `TODO` at the top of the file.
- `ContactInfo` (sidebar) and the Footer's contact column now both read
  from `content/company.ts`; social links now live in
  `content/social.ts` and are resolved through the shared `Icon`
  registry — previously the Footer had this data hardcoded and
  duplicated nowhere else, now it's shared.
- `FAQ` is reused again here (as on Services) with Contact-specific
  content from `content/contactFAQ.ts`.

Build verified locally with `npm run build` across all 25 routes
(Google Fonts can't be fetched from this sandbox, so that step was
checked with a stubbed `lib/fonts.ts` — restored before packaging; it
resolves normally wherever the project has open internet access).

## Insights

`content/articles.ts` holds 8 articles across 4 categories (Automation,
Strategy, Industry Notes, Product) — each with real body copy, an
author, a publish date, and a reading-time estimate.

- `/insights` — `PageHero` → `FeaturedArticle` (dark spotlight band) →
  `InsightsExplorer` (client-side search + category filter, no
  backend — see the comment in that file) → `NewsletterSignup` →
  `CTABand`.
- `/insights/[slug]` — statically generated for all 8 slugs, long-form
  typography (`max-w-prose`, `text-body-l`), three related articles,
  `CTABand`.
- `InsightsExplorer` filters the static articles array in the browser
  by title/excerpt match and category, with `AnimatePresence`
  handling the grid re-layout as results change.
- `NewsletterSignup` is presentational — there's no email provider
  wired up. The success state shown after submit is what should render
  once a real API call is connected; see the comment in
  `components/sections/NewsletterSignup.tsx` before wiring one up.
- `ArticleCard` follows the same icon-watermark hover pattern as
  `CaseStudyCard`, keeping the two content-heavy sections of the site
  visually consistent.

Build verified locally with `npm run build`, including static
prerendering of `/insights` and all 8 `/insights/[slug]` routes
(Google Fonts can't be fetched from this sandbox, so that step was
checked with a stubbed `lib/fonts.ts` — restored before packaging; it
resolves normally wherever the project has open internet access).

## Portfolio

`content/caseStudies.ts` is the single source of truth for all six case
studies (Harrow Realty Group, Meridian Law Partners, Birchfield
Construction, Ashcombe Health Partners, Lindqvist Capital Advisors,
Fernwood Growth Marketing) — challenge/solution copy, before/after
metrics, ROI, a four-phase timeline, and a testimonial for each. The
homepage's `PortfolioPreview` now pulls from the same file instead of a
separate, thinner content model.

- `/portfolio` — `PageHero` → `StatsBand` (portfolio-wide aggregate
  numbers) → `FeaturedCaseStudy` (the Harrow spotlight, dark band, full
  before/after + ROI + testimonial) → a grid of the remaining five via
  `CaseStudyCard` → `CTABand`.
- `/portfolio/[slug]` — statically generated for all six slugs
  (`generateStaticParams`). Challenge/solution, `BeforeAfter`, a big
  animated ROI stat, `CaseTimeline`, `TestimonialCard`, three
  cross-linked case studies, `CTABand`.
- `CaseStudyCard` (`components/ui/`) is the shared immersive-hover grid
  card — a subtle pointer-driven 3D tilt (`useTilt`), a faint oversized
  icon watermark that brightens on hover, and an animated hero stat.
  Used on the homepage, `/portfolio`, and the "more work" cross-links
  on each detail page.
- `StatsBand` was made prop-driven (`stats`/`eyebrow`/`heading`,
  defaulting to the homepage's numbers) so Portfolio could reuse it
  with its own aggregate stats instead of duplicating the component.

## About

`/about` composes: `PageHero` → `MissionVision` → `Philosophy` (the same
component the homepage uses — the brand statement is stated once and
reused, not rewritten per page) → `CompanyTimeline` → `FounderStory` →
`ValuesGrid` → `CTABand`.

- `CompanyTimeline` is the year-keyed sibling of `ProcessCurrent` — same
  horizontal signature-line draw, hover-brightening year badges instead
  of step numbers.
- `FounderStory` uses a monogram card with the same `useTilt` hover
  instead of a stock photo — consistent with the icon-over-imagery
  approach used everywhere else on the site (no fabricated portraits of
  a real person).
- `ValuesGrid` reuses the click-to-expand pattern from Services'
  `ServiceCard`: each of the four values expands to a concrete
  "in practice" example instead of staying a static wall-plaque quote.

Build verified locally with `npm run build`, including static
prerendering of `/about`, `/portfolio`, and all six
`/portfolio/[slug]` routes (Google Fonts can't be fetched from this
sandbox, so that step was checked with a stubbed `lib/fonts.ts` —
restored before packaging; it resolves normally wherever the project
has open internet access).

## Solutions page

`/solutions` composes: `PageHero` → `IndustryJumpNav` (sticky, scrollspy
via IntersectionObserver) → seven `IndustrySection`s → `CTABand`.

Each `IndustrySection` alternates layout (copy/diagram swap sides via
`reverse`) and background (`tone`) independently, so seven sections in a
row read with rhythm instead of repeating one block seven times. Every
section has its own:

- Icon + eyebrow + headline + description, revealed with a staggered
  Framer Motion sequence
- Two animated stats (`AnimatedCounter`)
- A `WorkflowDiagram` — a compact vertical version of the signature
  Current line, drawn once with GSAP the first time it scrolls into
  view (own `ScrollTrigger` instance per section, independent of the
  others)
- A "Talk to us about {industry}" CTA

Industries covered: Real Estate, Healthcare, Law, Construction, Finance,
Marketing, Enterprise — content lives in `content/industries.ts`.

## Shared component library

`components/ui/` now holds the primitives every page reuses:

- `SectionHeader` — the eyebrow + headline (+ description) pattern used
  at the top of nearly every section
- `Accordion` — single-open expand/collapse list (powers `FAQ`)
- `PricingCard` / `PricingPreview` — tiered pricing, one `featured` tier
- `ServiceCard` — click-to-expand card (works identically on touch and
  desktop, unlike a hover-only interaction)
- `Icon` — resolves a content-layer icon key to its react-icons component
- `Button` — the single magnetic-hover button primitive, three variants

`components/sections/ProcessCurrent` is now a reusable ordered-step
timeline (drawn once with GSAP, not scrubbed): pass `steps` to reuse it
for a different sequence. The homepage's lead pipeline and the Services
page's engagement process are the same component with different props.

`components/sections/PageHero` is the inner-page counterpart to the
homepage's cinematic `Hero` — no pin/scrub, but it draws the same
signature underline once on mount so every page opens with the same
gesture.

`Nav` now highlights the active route and closes the mobile menu on
navigation.

## Services page

`/services` composes: `PageHero` → `ServicesGrid` (all eight services,
click-to-expand, one open at a time) → `ProcessCurrent` (engagement
process) → `PricingPreview` (three tiers) → `FAQ` → `CTABand`, plus a
second CTA in the hero and a third inline after pricing.

## Homepage — how the hero works

`components/sections/Hero.tsx` pins itself for 175% of a viewport height
and scrubs a single GSAP timeline as the user scrolls:

1. **Rest state** — only the VOLTHERIS wordmark and its underline (the
   Current) are visible. No nav, no copy, no buttons.
2. **Phase 1** — letters separate (`letter-spacing` widens), the
   underline stretches, the word swells slightly.
3. **Phase 2** — particles and thin lines drift in; the wordmark settles
   to a smaller, permanent scale near the top of the viewport.
4. **Phase 3** — the tagline, description, and CTAs rise in, then the
   floating nav (`#site-nav`, rendered once in the root layout) fades
   in last.

`SmoothScrollProvider` drives Lenis from the GSAP ticker (not its own
rAF loop) so this stays perfectly in sync with scroll input — see the
comment in that file before changing either.

Everything here respects `prefers-reduced-motion`: the hero skips
straight to its fully revealed state, `ProcessCurrent`'s line draws in
immediately, and `AnimatedCounter` jumps to its final value instead of
counting up.

Build verified locally with `npm run build` (Google Fonts can't be
fetched from this sandbox, so that step was checked with a stubbed
`lib/fonts.ts` — restored before packaging; it resolves normally
wherever the project has open internet access).
