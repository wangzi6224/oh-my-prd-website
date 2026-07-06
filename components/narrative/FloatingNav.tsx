'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { scenes, type SceneId } from '@/content/narrative';

export function FloatingNav({ enabled = true }: { enabled?: boolean }) {
  const [active, setActive] = useState(scenes[0].id);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive((current) =>
            current === visible.target.id ? current : (visible.target.id as SceneId),
          );
        }
      },
      { threshold: [0.35, 0.6] },
    );

    scenes.forEach((scene) => {
      const node = document.getElementById(scene.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <nav
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 opacity-35 transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100 lg:flex"
      aria-label="场景导航"
    >
      {scenes.map((scene) => (
        <a
          key={scene.id}
          href={`#${scene.id}`}
          className={clsx(
            'group flex items-center justify-end gap-3 rounded-full py-1 pl-3 pr-1 text-xs text-[#6f7d7f] outline-none transition',
            'focus-visible:ring-2 focus-visible:ring-[#14aec2]',
            active === scene.id && 'text-[#e9f0f1]',
          )}
        >
          <span className="pointer-events-none opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            {scene.nav}
          </span>
          <span
            className={clsx(
              'size-2.5 rounded-full border transition',
              active === scene.id
                ? 'border-[#14aec2] bg-[#14aec2] shadow-[0_0_18px_rgba(20,174,194,0.7)]'
                : 'border-[rgba(194,205,206,0.2)] bg-[rgba(255,255,255,0.04)] group-hover:border-[#14aec2]',
            )}
          />
        </a>
      ))}
    </nav>
  );
}
