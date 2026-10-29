import { statusLabel } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { ProgressState, Project } from "@/types/content";

const statusDot: Record<Project["status"], string> = {
  "in-development": "bg-warn",
  planned: "bg-muted",
  completed: "bg-ok",
  hackathon: "bg-accent",
};

export function StatusBadge({ status, className }: { status: Project["status"]; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", statusDot[status])} />
      {statusLabel[status]}
    </span>
  );
}

export const progressLabel: Record<ProgressState, string> = {
  done: "Implemented",
  partial: "Partial",
  planned: "Planned",
};

export function ProgressMark({ state }: { state: ProgressState }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-[0.45em] inline-block size-2.5 shrink-0 rounded-full border",
        state === "done" && "border-ok bg-ok",
        state === "partial" && "border-warn bg-[linear-gradient(90deg,var(--warn)_50%,transparent_50%)]",
        state === "planned" && "border-dashed border-muted",
      )}
    />
  );
}
