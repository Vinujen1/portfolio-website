"use client";

import { useSyncExternalStore } from "react";

const query = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** True only for mouse/trackpad users who haven't asked for reduced motion. Gates hover-driven effects. */
export function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
