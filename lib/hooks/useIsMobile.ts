'use client';

import { useMemo, useSyncExternalStore } from 'react';

export function useIsMobile(breakpoint = 760) {
  const query = `(max-width: ${breakpoint}px)`;

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
    [query],
  );

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
