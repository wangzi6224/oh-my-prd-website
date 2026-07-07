'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type CinematicScroll = {
  trackRef: React.RefObject<HTMLDivElement | null>;
  progressRef: React.MutableRefObject<number>;
  sceneRef: React.MutableRefObject<number>;
  activeAct: number;
  scrollToAct: (index: number) => void;
};

const ACTS_START = 0.075; // hero 停留区,之后才进第一幕
const TRACK_MULTIPLIER = 1.7; // 拉长轨道,给每幕更长的可读停留
// 第 6/12 幕让 3D 图谱当主角;第 7 幕有自己的 DOM 冲突图解,WebGL 退后避免图谱重叠
const FOREGROUND_ACTS = new Set([5, 11]);

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}
function smoothstep(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * 连续滚动叙事引擎:
 * - Lenis 惯性平滑滚动 + ScrollTrigger pin/scrub(单 rAF,合流 Three 渲染)
 * - 每帧为每幕连续计算 --rev(呈现度 0→1→0)/ --sp(有符号位置 −1→0→+1)
 *   → 整页随滚动一点点过渡,无离散切幕、无「到点放动画」
 */
export function useCinematicScroll(actCount: number): CinematicScroll {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const sceneRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [activeAct, setActiveAct] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actEls = Array.from(
      track.querySelectorAll<HTMLElement>('.cinematic-act'),
    );

    const span = (1 - ACTS_START) / actCount;
    const centerOf = (i: number) => ACTS_START + (i + 0.5) * span;

    // reduced-motion:纵向堆叠,所有幕呈现度锁 1(CSS 也兜底)
    if (reduceMotion) {
      progressRef.current = 0.55;
      sceneRef.current = 5;
      document.documentElement.style.setProperty('--p', '0.55');
      document.documentElement.style.setProperty('--canvas-dim', '1');
      actEls.forEach((el) => {
        el.style.setProperty('--rev', '1');
        el.style.setProperty('--sp', '0');
      });
      const raf = requestAnimationFrame(() => setActiveAct(5));
      return () => cancelAnimationFrame(raf);
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lastRev = new Array(actEls.length).fill(-1);
    const lastSp = new Array(actEls.length).fill(-2);

    const paint = (p: number) => {
      let best = 0;
      let bestRev = -1;
      for (let i = 0; i < actEls.length; i++) {
        // local:本幕坐标,0=正中,±1=相邻幕正中
        const local = (p - centerOf(i)) / span;
        const absL = Math.abs(local);
        // 呈现度:在 |local|<0.4 满显,0.4→0.52 快速淡出 → 近乎「同一时刻只有一幕」,消除重影
        const rev = 1 - smoothstep(0.4, 0.52, absL);
        // 位置:满显区内也连续移动(continuous 手感),边界处到 ±1
        const sp = clamp(local * 2, -1, 1);
        // 仅在有意义变化时写,限制 style 重算
        if (Math.abs(rev - lastRev[i]) > 0.002) {
          actEls[i].style.setProperty('--rev', rev.toFixed(3));
          lastRev[i] = rev;
        }
        if (rev > 0 && Math.abs(sp - lastSp[i]) > 0.004) {
          actEls[i].style.setProperty('--sp', sp.toFixed(3));
          lastSp[i] = sp;
        }
        if (rev > bestRev) {
          bestRev = rev;
          best = i;
        }
      }
      return best;
    };

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: () => `+=${window.innerHeight * actCount * TRACK_MULTIPLIER}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;
        document.documentElement.style.setProperty('--p', p.toFixed(4));
        const act = paint(p);
        if (act !== sceneRef.current) {
          sceneRef.current = act;
          document.documentElement.style.setProperty(
            '--canvas-dim',
            FOREGROUND_ACTS.has(act) ? '1' : '0.92',
          );
          setActiveAct(act);
        }
      },
    });

    paint(progressRef.current);

    return () => {
      st.kill();
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [actCount]);

  const scrollToAct = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const lenis = lenisRef.current;
      if (!track) return;
      const center = ACTS_START + (index + 0.5) * ((1 - ACTS_START) / actCount);
      const distance = window.innerHeight * actCount * TRACK_MULTIPLIER;
      const target = track.offsetTop + center * distance;
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else window.scrollTo({ top: target, behavior: 'smooth' });
    },
    [actCount],
  );

  return { trackRef, progressRef, sceneRef, activeAct, scrollToAct };
}
