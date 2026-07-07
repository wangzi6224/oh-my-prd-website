---
name: gsap-animation
description: Orchestrate this site's one-shot cinematic scroll with GSAP 3.15 ScrollTrigger + Lenis — pin the stage, scrub 12 acts, reveal text by line/word, and feed a single scroll progress scalar to the Three.js canvas. Use when writing lib/scroll/useCinematicScroll.ts, CinematicStory act timelines, or any scroll-linked reveal. Enforces the transform/opacity-only, single-rAF, reduced-motion rules.
---

# GSAP + ScrollTrigger + Lenis for Oh My PRD 官网

Goal: 一镜到底. One long track, one pinned stage, 12 acts scrubbed by scroll, WebGL object morphing continuously. GSAP owns DOM timelines + the master progress; Three reads progress from a ref.

## Single rAF (critical — no double loops)
Lenis drives smooth scroll; GSAP's ticker drives everything; Three renders inside the same tick. Wire it once:
```ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });          // inertia/damping the design doc wants
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));                   // one rAF for Lenis + GSAP
gsap.ticker.lagSmoothing(0);
// Three render is called from ScrollTrigger's onUpdate or a gsap.ticker.add(renderTick)
```
Do **not** also start Three's own `requestAnimationFrame`; register its render as a `gsap.ticker.add(...)` or call it from the master timeline's `onUpdate`. One loop total.

## Master pinned timeline
```ts
const st = ScrollTrigger.create({
  trigger: '#cinematic-story',
  start: 'top top',
  end: () => `+=${window.innerHeight * ACT_COUNT}`,   // ACT_COUNT = 12
  pin: true,
  scrub: 1,                                            // damping, not instant
  onUpdate: (self) => {
    progressRef.current = self.progress;               // 0..1 → Three reads this
    const act = Math.min(ACT_COUNT - 1, Math.floor(self.progress * ACT_COUNT));
    if (act !== sceneRef.current) { sceneRef.current = act; setActiveAct(act); } // setState only on act change, not per frame
  },
});
```
Per-act DOM reveals: build a scrubbed master `gsap.timeline({ scrollTrigger: { ...same trigger..., scrub } })` and place each act's tween in its window with `.to(el, {...}, actIndex / ACT_COUNT)`.

## Text reveal language (design doc §00)
- Hero H1 / brand: most expressive (blur-to-sharp + gradient sweep). Split into lines/words manually (wrap spans) — free GSAP 3.12+ ships **SplitText**, usable here (gsap 3.15). Prefer wrapping in build for SEO (real text stays in DOM).
- Scene sentences: reveal by line/phrase, staggered. UI labels: calmer, product-like.
- Use `yPercent`/`opacity`/`filter: blur()` **only as entrance**, never scrubbed continuously (scrubbed blur is banned by the perf 守则). For scrubbed motion use `transform`/`opacity` exclusively.

## Perf 守则 (hard 60fps)
- Animate `transform` (`x/y/scale/rotate` → GPU) and `opacity` only for scroll-scrubbed props.
- Never scrub `filter`, big dynamic blur, layout props (width/height/top/margin), or box-shadow.
- `will-change: transform` on the few pinned/animated layers, not everything.
- `ScrollTrigger.config({ ignoreMobileResize: true })`; refresh on resize debounced.
- Kill/disable timelines when their act is far offscreen if they're expensive.

## Reduced motion & mobile
```ts
gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
  // no pin, no scrub: show all acts stacked, instant opacity; Three renders one static frame
});
gsap.matchMedia().add('(max-width: 760px)', () => {
  // lighter pin or native scroll; fewer scrubbed tweens; Three degrades (see threejs-3d skill)
});
```

## Cleanup (React 19 / Next 16)
In `useEffect` cleanup: `st.kill(); mm.revert(); lenis.destroy(); gsap.ticker.remove(tick); ScrollTrigger.getAll().forEach(t=>t.kill())`. Guard all against SSR — this hook is `'use client'` and runs in `useEffect` only.

## Integration map
- `lib/scroll/useCinematicScroll.ts` — owns Lenis+ScrollTrigger, returns `{ progressRef, sceneRef, activeAct }`.
- `RequirementCanvas` — reads `progressRef`/`sceneRef` (see `threejs-3d` skill).
- `CinematicStory.tsx` — renders 12 act DOM layers, applies per-act reveal timelines.
