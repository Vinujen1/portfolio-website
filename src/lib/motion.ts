import type { Transition, Variants } from "motion/react";

/** One easing curve for the whole site keeps motion feeling like a single system. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const reveal: Transition = { duration: 0.8, ease };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: reveal },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
