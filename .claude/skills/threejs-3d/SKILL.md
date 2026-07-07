---
name: threejs-3d
description: Build and tune Three.js (r185) WebGL scenes for this site — the single fixed full-screen canvas that morphs 流体场 → Requirement Core → 3D 需求图谱 → 生命周期轨道. Use when writing anything under components/webgl/ (RequirementCanvas, graph, shaders), driving uniforms/camera from scroll progress, or hitting the 60fps bar. Covers instanced force-directed graphs, GLSL fluid, DPR/perf discipline, React 19 + Next 16 client-component integration, and reduced-motion/mobile degrade.
---

# Three.js for Oh My PRD 官网

The whole cinematic uses **one renderer, one scene, one canvas** (`position: fixed; inset: 0; z-index: 0`, pointer-events none). Scroll progress (0→1) and the active act index are the only inputs. The object never hard-cuts; it continuously reshapes.

## Non-negotiables (from the plan's perf 守则)
- **One rAF only.** Do NOT run Three's internal loop AND Lenis's rAF separately. Drive `renderer.render()` from the same rAF that ticks Lenis/ScrollTrigger (see `gsap-animation` skill). Keep a single `tick(time)` and call `lenis.raf(time)` → update uniforms → `renderer.render()`.
- **DPR cap:** `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))`. Never uncapped.
- **Only `transform`/`opacity` style changes on DOM.** All motion of the heavy visual lives in WebGL uniforms, not layout.
- **Pause when hidden/offscreen:** stop rendering on `document.visibilitychange` (hidden) and when the canvas' IntersectionObserver says it's out of view.
- **`prefers-reduced-motion` / mobile:** render exactly one static frame (or a cheap 2D projection) and stop; no camera orbit, fewer nodes.
- **Instancing for the graph.** Nodes = one `InstancedMesh`; edges = one `LineSegments` (or instanced quads for thick lines). Never one mesh per node.
- Dispose geometries/materials/renderer on unmount; call `renderer.dispose()` and `cancelAnimationFrame`.

## Canvas skeleton (client component, Next 16 / React 19)
```tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function RequirementCanvas({ progressRef, sceneRef }: {
  progressRef: React.MutableRefObject<number>;   // 0..1 whole-page
  sceneRef: React.MutableRefObject<number>;       // active act index
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    // ...build fluid mesh + graph InstancedMesh + orbit here, keep refs...

    let raf = 0, visible = true;
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const p = progressRef.current;
      // drive uniforms + camera from p / sceneRef.current
      renderer.render(scene, camera);
    };
    // NOTE: if合流 with Lenis, do not start this rAF; export tick to the shared loop instead.
    tick();

    const onResize = () => { renderer.setSize(host.clientWidth, host.clientHeight); camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix(); };
    const onVis = () => { visible = !document.hidden; };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); renderer.dispose(); host.removeChild(renderer.domElement); };
  }, []);
  return <div ref={hostRef} aria-hidden className="fixed inset-0 -z-0 pointer-events-none" />;
}
```
Pass **refs, not props/state**, for progress — updating React state per frame kills perf. The scroll hook writes `progressRef.current` each rAF; the canvas reads it.

## 3D 需求图谱 (核心, acts 06–10)
- Layout: precompute a **static 3D layout** (deterministic — seed positions on a sphere/fibonacci or a light offline force pass baked to an array). Do NOT run live force simulation every frame at scale; either bake positions or run a capped, damped sim only during act 06 reveal then freeze.
- Nodes: `InstancedMesh(sphereGeo, meshBasicOrStandard, N)`; set per-instance color via `instanceColor` by node type (需求/PRD段/评审/代码).
- Edges by **RelationType → color** (real product semantics):
  - `depends_on` 依赖 → teal `#14AEC2`
  - `conflicts_with` 冲突 → red `#ff5d5d` (act 07 hero moment)
  - `overlaps` 重叠 → amber; `extends` 扩展 → green; `shares_rule` 共享规则 → soft cyan; `unclear` 待定 → muted gray, dashed
- Reveal act 07 by animating edge opacity/`drawRange` so conflict/dependency edges "light up" toward历史需求 nodes.
- Camera "环绕": lerp `camera.position` along a gentle arc keyed to scroll `p`; use damping (lerp toward target, factor ~0.06) for the inertia the design doc wants.

## GLSL fluid field (Hero, act 01) & orbit (act 12)
- Use a full-screen `ShaderMaterial` plane or a `THREE.Points` field. Keep it a **flow/curl-noise** look in teal, base `#0d1416`, highlight `#14aec2` — quiet, submerged, no neon.
- Uniforms: `uTime`, `uProgress`, `uPointer` (damped 200–400ms), `uAccent`. Morph the same field's uniforms to converge inward (act 02) rather than swapping meshes.
- Orbit (act 12): reuse the point field but constrain to a slow circular flow around the lifecycle core.

## Morph state machine
Keep one function `applyPhase(p)` that cross-fades material/uniform sets between adjacent acts so nothing pops. Use smoothstep windows per act (e.g. act 06 owns p∈[0.42,0.55]). Overlap windows so transitions blend.

## Gotchas
- Next 16: canvas component must be `'use client'`; never import `three` in a server component. Lazy-load with `next/dynamic({ ssr: false })` if it touches `window` at module scope.
- r185: `outputColorSpace = THREE.SRGBColorSpace` (not the old `outputEncoding`).
- Thin GL lines ignore width on most platforms — for visible edges use instanced quad "fat lines" (three/examples `Line2`) or a shader, not `LineBasicMaterial.linewidth`.
