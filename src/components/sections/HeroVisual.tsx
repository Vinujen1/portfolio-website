"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, type PointerEvent } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

// Mirrors the stages of the excavator prototype's pipeline. Values are illustrative.
const steps = [
  { stage: "heard", text: "“dig a trench near the red marker”" },
  { stage: "parsed", text: "{ action: dig, target: red_marker }" },
  { stage: "vision", text: "red_marker → x 2.41 m, y 0.62 m" },
  { stage: "plan", text: "approach → lower → curl → lift" },
  { stage: "safety", text: "workspace clear · ALLOW" },
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [step, setStep] = useState(0);

  // Reticle eases toward the cursor; without a cursor it rests on the marker.
  const rx = useSpring(useMotionValue(262), { stiffness: 90, damping: 18 });
  const ry = useSpring(useMotionValue(196), { stiffness: 90, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % steps.length), 2200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  function onMove(event: PointerEvent<SVGSVGElement>) {
    if (!fine) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rx.set(((event.clientX - rect.left) / rect.width) * 400);
    ry.set(112 + ((event.clientY - rect.top) / rect.height) * 148);
  }

  function onLeave() {
    rx.set(262);
    ry.set(196);
  }

  const visible = reduce ? steps.length - 1 : step;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease, delay: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-40px_var(--glow)]"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-ok" />
          cam0 · perception
        </span>
        <span>Illustration</span>
      </div>

      <svg
        viewBox="0 112 400 148"
        className="block h-auto w-full touch-pan-y"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        aria-hidden
      >
        {/* Ground plane in perspective */}
        <g stroke="var(--line)" strokeWidth={1}>
          {[150, 172, 198, 228, 260].map((y) => (
            <line key={y} x1={0} x2={400} y1={y} y2={y} />
          ))}
          {[-260, -140, -40, 60, 160, 260, 340, 440, 560, 680].map((x) => (
            <line key={x} x1={200} y1={128} x2={x} y2={260} />
          ))}
        </g>
        <line x1={0} x2={400} y1={128} y2={128} stroke="var(--line-strong)" strokeWidth={1} />

        {/* Detected marker */}
        <g>
          <circle cx={262} cy={196} r={9} fill="var(--accent)" opacity={0.9} />
          <circle cx={262} cy={196} r={16} fill="none" stroke="var(--accent)" opacity={0.35} />
          <g className="hero-box">
            <rect x={238} y={172} width={48} height={48} fill="none" stroke="var(--accent)" strokeWidth={1.25} />
            <rect x={238} y={160} width={86} height={12} fill="var(--accent)" />
            <text x={241} y={169} fontSize={8.5} fontFamily="var(--font-plex-mono)" fill="var(--on-accent)">
              red_marker 0.94
            </text>
          </g>
        </g>

        {/* Secondary detection */}
        <g opacity={0.75}>
          <rect x={86} y={148} width={58} height={70} fill="none" stroke="var(--muted)" strokeDasharray="3 3" />
          <text x={86} y={143} fontSize={8.5} fontFamily="var(--font-plex-mono)" fill="var(--muted)">
            rock 0.71 · ignored
          </text>
        </g>

        {/* Geofence */}
        <path d="M40 252 L120 150 L330 150 L380 252" fill="none" stroke="var(--ok)" strokeDasharray="2 6" strokeWidth={1.25} opacity={0.7} />
        <text x={300} y={146} fontSize={8} fontFamily="var(--font-plex-mono)" fill="var(--ok)" opacity={0.85}>
          geofence
        </text>

        {/* Reticle that follows the cursor */}
        <motion.g style={{ x: rx, y: ry }}>
          <circle r={22} fill="none" stroke="var(--text)" strokeOpacity={0.45} strokeWidth={1} />
          <path d="M-30 0 H-14 M14 0 H30 M0 -30 V-14 M0 14 V30" stroke="var(--text)" strokeOpacity={0.6} strokeWidth={1} />
        </motion.g>
      </svg>

      <ol className="space-y-1.5 border-t border-line px-4 py-4 font-mono text-[0.75rem] leading-relaxed sm:text-[0.8125rem]">
        {steps.map((item, index) => (
          <li
            key={item.stage}
            className={cn(
              "grid grid-cols-[4.5rem_1fr] gap-2 transition-[opacity,color] duration-500",
              index <= visible ? "opacity-100" : "opacity-25",
              index === visible ? "text-text" : "text-muted",
            )}
          >
            <span className={cn(index === visible ? "text-accent" : undefined)}>{item.stage}</span>
            <span className="truncate">{item.text}</span>
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">
        Illustration of a perception pipeline: a spoken command is parsed, a marker is located by the camera, a plan is made
        and a safety check allows it.
      </figcaption>
    </motion.figure>
  );
}
