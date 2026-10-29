import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Tilt } from "@/components/animations/Tilt";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { TagList } from "@/components/ui/Tag";
import { otherWork } from "@/data/education";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow="Selected work"
          title="What I'm building."
          lead="Each project links to a case study covering the problem, the architecture and what's actually implemented. Diagrams are drawn from the real systems. None of them are screenshots."
        />

        <ol className="space-y-24 md:space-y-32">
          {projects.map((project, index) => {
            const flipped = index % 2 === 1;
            const repo = project.links.find((link) => link.href.includes("github.com"));
            return (
              <li key={project.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className={cn("lg:col-span-7", flipped && "lg:order-2")}>
                  <Tilt>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group relative block overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_30px_80px_-40px_var(--glow)] md:p-7"
                      aria-label={`${project.title} case study`}
                    >
                      <div aria-hidden className="grid-field absolute inset-0 opacity-40" />
                      <div className="relative flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                        <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                        <span>Architecture diagram</span>
                      </div>
                      <SystemDiagram
                        diagram={project.diagram}
                        compact
                        className="relative mt-6 transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                      />
                    </Link>
                  </Tilt>
                </Reveal>

                <Reveal delay={0.1} className={cn("lg:col-span-5", flipped && "lg:order-1")}>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={project.status} />
                    <span className="font-mono text-xs text-muted">{project.period}</span>
                  </div>
                  <h3 className="type-h3 mt-5">
                    <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 font-display text-lg text-muted">{project.tagline}</p>
                  <p className="mt-5 text-pretty text-text/85">{project.summary}</p>
                  <TagList items={project.stack} limit={6} className="mt-6" />
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-1.5 font-medium text-text"
                    >
                      Read the case study
                      <ArrowUpRight className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                    {repo ? (
                      <a
                        href={repo.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-muted transition-colors hover:text-text"
                      >
                        <GitHubIcon className="size-4" />
                        Source
                        <span className="sr-only">for {project.title} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {otherWork.length > 0 ? (
          <Reveal className="mt-28">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">Also on GitHub</h3>
            <ul className="divide-y divide-line border-y border-line">
              {otherWork.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid gap-2 py-5 transition-colors md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-6"
                  >
                    <span className="font-mono text-sm text-muted">{item.year}</span>
                    <span>
                      <span className="font-medium transition-colors group-hover:text-accent">{item.title}</span>
                      <span className="mt-1 block text-[0.9375rem] text-muted">{item.body}</span>
                    </span>
                    <span className="flex items-center gap-2 font-mono text-xs text-muted">
                      {item.stack.slice(0, 3).join(" · ")}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
