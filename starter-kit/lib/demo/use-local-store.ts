"use client";

import * as React from "react";

/**
 * State that persists to localStorage so demo CRUD survives a refresh without
 * a backend. SSR-safe: renders the seed on the server and first client paint,
 * then hydrates from storage on mount (gating writes until after hydration so
 * the seed never clobbers saved data).
 *
 * Pass a stable, module-level `seed` reference.
 */
export function useLocalStore<T>(
  key: string,
  seed: T
): {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  reset: () => void;
  hydrated: boolean;
} {
  const [data, setData] = React.useState<T>(seed);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setData(JSON.parse(raw) as T);
    } catch {
      // Corrupt/blocked storage — fall back to the seed already in state.
    }
    setHydrated(true);
  }, [key]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Storage may be full or unavailable; the in-memory state still works.
    }
  }, [key, data, hydrated]);

  const reset = React.useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setData(seed);
  }, [key, seed]);

  return { data, setData, reset, hydrated };
}

/** Stable id generator for demo records created at runtime. */
export function newId(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
