import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
};

/** Numbered section header: "02 — Experience" eyebrow over a display title. */
export function SectionHeading({ index, eyebrow, title, lead, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      <h2 id={id} className="type-h2 max-w-[18ch] text-balance">
        {title}
      </h2>
      {lead ? <p className="type-lead prose-measure mt-6 text-pretty">{lead}</p> : null}
    </Reveal>
  );
}
