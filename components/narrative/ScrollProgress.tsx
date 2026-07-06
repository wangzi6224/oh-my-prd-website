'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-[#14aec2] shadow-[0_0_18px_rgba(20,174,194,0.8)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
