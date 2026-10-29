"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { experience } from "@/data/experience";

export function Experience() {
  const track = useRef<HTMLOListElement>(null);
  // The accent line fills as the timeline passes through the middle of the viewport.
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title="Where I've worked."
          lead="An analyst role working with data and process at Ontario Tech, and two years leading a front-end retail team before that."
        />

        <ol ref={track} className="relative space-y-12 md:space-y-16">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[calc(14rem+7px)]" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(14rem+7px)]"
          />

          {experience.map((job) => (
            <li key={`${job.organization}-${job.role}`} className="relative grid gap-3 pl-10 md:grid-cols-[14rem_1fr] md:gap-0 md:pl-0">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-accent bg-bg md:left-[14rem]"
              />
              <Reveal className="md:pr-10 md:pt-0.5">
                <p className="font-mono text-sm text-text">{job.period}</p>
                {job.location ? <p className="mt-1 text-sm text-muted">{job.location}</p> : null}
              </Reveal>

              <Reveal delay={0.08} className="md:pl-12">
                <article className="rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong md:p-8">
                  <h3 className="type-h3">{job.role}</h3>
                  <p className="mt-1.5 text-accent">{job.organization}</p>
                  <p className="mt-5 text-pretty text-text/85">{job.summary}</p>
                  <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-muted">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                        <span className="text-pretty">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <TagList items={job.skills} className="mt-6" />
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
