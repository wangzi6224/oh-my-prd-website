# Oh My PRD Website Technical Architecture

This project is a Next.js App Router narrative website for Oh My PRD. The current implementation is intentionally an architecture-first scaffold: it establishes runtime boundaries, content modeling, animation layers, and responsive fallback before final visual design is locked.

## Stack

- Next.js App Router
- TypeScript strict mode
- React
- Tailwind CSS
- GSAP + ScrollTrigger
- PixiJS v8
- lucide-react

## Source Layout

```txt
app/
  layout.tsx        # metadata, root HTML, global CSS imports
  page.tsx          # lightweight server entry, dynamic client page
  globals.css       # reset, tokens, Tailwind entry
components/
  narrative/
    MarketingPage.tsx
    SceneShell.tsx
    ScrollProgress.tsx
    FloatingNav.tsx
    scenes/
  pixi/
    PixiStage.tsx
    ParticleField.ts
    KnowledgeGraph.ts
    FlowLines.ts
  ui/
content/
  narrative.ts      # copy, scene metadata, demo data
lib/
  gsap.ts
  hooks/
styles/
  narrative.css
.codex/skills/
  gsap/SKILL.md     # project-local rules, not official OpenAI skill
  pixijs/SKILL.md   # project-local rules, not official OpenAI skill
```

## Server And Client Boundary

- `app/page.tsx` stays light and dynamically loads `MarketingPage` with `ssr: false`.
- `app/layout.tsx` owns SEO metadata and never imports GSAP or PixiJS.
- GSAP is initialized only in `MarketingPage.tsx`.
- PixiJS is loaded only through `PixiStage.tsx`, then renderer classes are imported dynamically.

## Content Model

`content/narrative.ts` is the single source of truth for:

- 12 scene ids and navigation labels
- hero and scene copy
- CTA labels
- requirement demo data
- PRD section names
- review issues
- knowledge chunks
- impact report
- final loop labels

Scene components should consume this config and avoid hardcoding product copy inside animation logic.

## Animation Layer

GSAP responsibilities:

- scene entrance reveal
- scroll progress spine
- desktop-only pin/scrub sections

PixiJS responsibilities:

- ambient flow lines
- hero particles
- knowledge graph point cloud
- final loop path

CSS/Tailwind responsibilities:

- typography
- layout
- glass surfaces
- responsive fallback
- non-critical hover/focus transitions

## Accessibility And SEO

- H1 is real HTML in the hero.
- Each scene is a semantic `section`.
- CTA labels are HTML text and keyboard focusable.
- Canvas layers are decorative and use `aria-hidden="true"`.
- Core copy never lives in PixiJS.
- Reduced-motion users get a static readable page.

## Responsive Strategy

- Desktop: one-shot narrative with pin/scrub and PixiJS background.
- Tablet: keep basic scene reveals, reduce pinned emphasis.
- Mobile: no forced one-shot choreography; scenes read as stacked narrative blocks and PixiJS is disabled.

## Design Strategy Pending

The visual design is deliberately not final. Current scene internals are low-density architecture placeholders. The next design pass should decide:

- how the single Requirement Core evolves across the page
- how many visible UI fragments each scene may show
- exact transition language between scenes
- final typography scale and spacing rhythm
- whether the site stays dark-only or includes product-light UI islands from the real Oh My PRD app
