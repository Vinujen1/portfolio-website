import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading id="about-title" index="01" eyebrow="About" title={about.statement} />

      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <RevealGroup className="space-y-6 text-[1.0625rem] leading-relaxed md:text-lg">
          {about.paragraphs.map((paragraph) => (
            <RevealItem key={paragraph.slice(0, 24)}>
              <p className="prose-measure text-pretty text-text/85">{paragraph}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <dl className="divide-y divide-line border-y border-line">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{fact.label}</dt>
                <dd className="text-[0.9375rem]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
