---
name: pixijs-webgl
description: PixiJS v8 for fast 2D WebGL — kept as a fallback/degrade tool for this site (Three.js owns the primary 3D canvas). Use when a cheap 2D fluid background, particle field, or a flat 2D projection of the 需求图谱 is needed on mobile / low-power / reduced-motion paths, or if a 2D layer is ever preferred over 3D. Covers v8 async init, particle/graphics batching, ticker整合, and the site's teal material language + 60fps rules.
---

# PixiJS v8 (fallback 2D layer) for Oh My PRD 官网

Primary heavy visual is Three.js (see `threejs-3d`). Pixi is the **cheap 2D option**: mobile/reduced-motion background, a flat 需求图谱 projection, or connective flow lines when a full 3D scene is overkill. Not installed by default in runtime — add `pixi.js` only if a fallback path actually ships.

## v8 essentials (differs from v7)
```ts
import { Application, Graphics, Container } from 'pixi.js';
const app = new Application();
await app.init({ antialias: true, backgroundAlpha: 0, resizeTo: hostEl, powerPreference: 'high-performance' });
host.appendChild(app.canvas);   // v8: app.canvas (not app.view)
```
- v8 `init()` is **async** — await before adding children (in Next 16, do it inside a `'use client'` useEffect, guard SSR).
- Cap resolution: `resolution: Math.min(devicePixelRatio, 1.5)`, `autoDensity: true`.

## Single rAF整合
Don't run Pixi's ticker independently alongside Lenis/GSAP. Either `app.ticker.stop()` and drive `app.render()` from the shared `gsap.ticker` (see `gsap-animation`), or keep only one ticker active. Never two rAF loops.

## 2D 需求图谱 projection (degrade path)
- Nodes: batch into one `Graphics` (v8 batches well) or `ParticleContainer` for many sprites; color by node type.
- Edges by RelationType color (match 3D): `depends_on` teal `#14AEC2`, `conflicts_with` red `#ff5d5d`, `overlaps` amber, `extends` green, `shares_rule` cyan, `unclear` gray dashed.
- Layout: reuse the baked positions from the 3D graph, projected to 2D (drop z) so the fallback matches the desktop composition.

## Material language / perf
- Teal on deep `#0d1416`; quiet, water-like drift; no neon. Use additive blend sparingly for glow.
- Prefer `ParticleContainer`/batched `Graphics` over many display objects.
- Pause on `document.hidden` and offscreen; render one static frame under `prefers-reduced-motion`.
- Destroy on unmount: `app.destroy(true, { children: true, texture: true })`.

## When to reach for Pixi here
- Mobile background where a full Three scene is too heavy.
- A flat, legible 2D relationship view if user testing shows the 3D graph is hard to read.
- Otherwise: default to Three.js. This skill exists as the documented fallback tool per the plan.
