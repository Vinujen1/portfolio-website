"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/cn";

/** Subtle 3D tilt that follows the cursor. Falls back to a flat element on touch or reduced motion. */
export function Tilt({ children, className, max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const enabled = useFinePointer();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        className="h-full [transform-style:preserve-3d]"
        style={enabled ? { rotateX, rotateY } : undefined}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        {children}
      </motion.div>
    </div>
  );
}
