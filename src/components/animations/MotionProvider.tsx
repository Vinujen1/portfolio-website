"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** reducedMotion="user" turns transform animations into simple fades for people who ask for less motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
