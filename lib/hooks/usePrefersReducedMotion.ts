'use client';

import { useMemo, useSyncExternalStore } from 'react';

export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';

  const store = useMemo(
    () => ({
      subscribe(callback: () => void) {
        const media = window.matchMedia(query);
        media.addEventListener('change', callback);
        return () => media.removeEventListener('change', callback);
      },
      getSnapshot() {
        return window.matchMedia(query).matches;
      },
      getServerSnapshot() {
        return false;
      },
    }),
    [],
  );

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
