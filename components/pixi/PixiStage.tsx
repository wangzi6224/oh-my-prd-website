'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

export type PixiStageMode = 'hero' | 'knowledge' | 'flow' | 'final';

type PixiRenderer = {
  start: () => void;
  stop: () => void;
  resize: () => void;
  destroy: () => void;
};

export function PixiStage({
  mode,
  className,
}: {
  mode: PixiStageMode;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const target = host;

    let renderer: PixiRenderer | null = null;
    let cancelled = false;

    async function boot() {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const isMobile = window.matchMedia('(max-width: 760px)').matches;

      if (prefersReducedMotion || isMobile) {
        return;
      }

      if (mode === 'knowledge') {
        const { createKnowledgeGraph } = await import('./KnowledgeGraph');
        renderer = await createKnowledgeGraph(target);
      } else if (mode === 'final' || mode === 'flow') {
        const { createFlowLines } = await import('./FlowLines');
        renderer = await createFlowLines(target, { mode });
      } else {
        const { createParticleField } = await import('./ParticleField');
        renderer = await createParticleField(target, { density: 'desktop' });
      }

      if (cancelled) {
        renderer?.destroy();
        renderer = null;
        return;
      }

      renderer?.start();
    }

    void boot();

    const resize = () => renderer?.resize();
    window.addEventListener('resize', resize);

    // Canvas 不在视口或浏览器标签隐藏时暂停 ticker，避免后台空转。
    const visibility = () => {
      if (document.hidden) renderer?.stop();
      else renderer?.start();
    };
    document.addEventListener('visibilitychange', visibility);

    const observer = new IntersectionObserver(([entry]) => {
      if (!renderer) return;
      if (entry.isIntersecting) renderer.start();
      else renderer.stop();
    });
    observer.observe(host);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
      observer.disconnect();
      renderer?.destroy();
      renderer = null;
    };
  }, [mode]);

  return (
    <div
      ref={hostRef}
      className={clsx('pointer-events-none', className)}
      aria-hidden="true"
    />
  );
}
