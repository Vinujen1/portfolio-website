import { ArrowUpRight, Award } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { community, education } from "@/data/education";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <SectionHeading id="education-title" index="05" eyebrow="Education & community" title="Learning in class, and outside it." />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-surface p-6 md:p-10">
              <p className="font-mono text-sm text-muted">{education.period}</p>
              <h3 className="type-h3 mt-4">{education.school}</h3>
              <p className="mt-1.5 text-accent">{education.degree}</p>

              {education.honours.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {education.honours.map((honour) => (
                    <li key={honour} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm">
                      <Award className="size-4 text-warn" aria-hidden />
                      {honour}
                    </li>
                  ))}
                </ul>
              ) : null}

              <h4 className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-muted">Relevant coursework</h4>
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-[0.9375rem] sm:grid-cols-2">
                {education.coursework.map((course) => (
                  <li key={course} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                    {course}
                  </li>
                ))}
              </ul>

              <Link
                href={education.capstone.href}
                className="group mt-10 flex items-start justify-between gap-4 rounded-xl border border-line bg-bg/50 p-5 transition-colors hover:border-accent/60"
              >
                <span>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Capstone</span>
                  <span className="mt-1.5 block font-medium">{education.capstone.title}</span>
                  <span className="mt-1 block text-sm text-muted">{education.capstone.note}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6">
              {community.map((item) => (
                <article key={item.event} className="flex flex-1 flex-col rounded-2xl border border-line bg-surface p-6 md:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Hackathon · {item.date}</p>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{item.event}</h3>
                  <p className="mt-1 text-sm text-accent">{item.track}</p>
                  <p className="mt-5 flex-1 text-pretty text-[0.9375rem] text-text/85">{item.body}</p>
                  <Link href={item.href} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                    See the EasyTransit case study
                    <ArrowUpRight className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
