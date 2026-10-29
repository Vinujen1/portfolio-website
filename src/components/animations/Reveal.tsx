"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay before this element animates in, in seconds. */
  delay?: number;
};

/** Fades and lifts its content in once, the first time it scrolls into view. */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Container whose RevealItem children animate in one after another. */
export function RevealGroup({
  children,
  gap = 0.08,
  ...props
}: HTMLMotionProps<"div"> & { gap?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={stagger(gap)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  );
}
