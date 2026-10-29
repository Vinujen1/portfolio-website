import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ProgressMark, StatusBadge, progressLabel } from "@/components/ui/StatusBadge";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { TagList } from "@/components/ui/Tag";
import { getProject, projects } from "@/data/projects";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/projects/${project.slug}` },
  };
}

function Block({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-6 border-t border-line py-14 md:grid-cols-[14rem_1fr] md:gap-10 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
        <div>
          <h2 className="type-h3 max-w-[24ch] text-balance">{title}</h2>
          <div className="mt-6">{children}</div>
        </div>
      </section>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="prose-measure space-y-3 text-text/85">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const doneCount = project.progress.filter((item) => item.state === "done").length;

  return (
    <article className="mx-auto max-w-6xl px-5 md:px-8">
      <header className="relative pb-14 pt-10 md:pb-20 md:pt-16">
        <RevealGroup gap={0.07}>
          <RevealItem>
            <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              All projects
            </Link>
          </RevealItem>
          <RevealItem className="mt-10 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs text-muted">{project.period}</span>
          </RevealItem>
          <RevealItem>
            <h1 className="type-display mt-6 max-w-[14ch] text-balance">{project.title}</h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-[34ch] font-display text-2xl tracking-tight text-muted md:text-3xl">{project.tagline}</p>
          </RevealItem>
          <RevealItem>
            <p className="type-lead prose-measure mt-8 text-pretty text-text/85">{project.summary}</p>
          </RevealItem>
          <RevealItem>
            <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Context</dt>
                <dd className="mt-2 text-[0.9375rem]">{project.context}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">My role</dt>
                <dd className="mt-2 text-[0.9375rem]">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Links</dt>
                <dd className="mt-2 flex flex-col gap-1.5 text-[0.9375rem]">
                  {project.links.length > 0 ? (
                    project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-accent hover:underline"
                      >
                        {link.label}
                        <ArrowUpRight className="size-4" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ))
                  ) : (
                    <span className="text-muted">Repository is private or not yet public.</span>
                  )}
                </dd>
              </div>
            </dl>
          </RevealItem>
        </RevealGroup>
      </header>

      <Reveal>
        <SystemDiagram diagram={project.diagram} />
      </Reveal>

      {project.highlights ? (
        <Reveal>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.highlights.map((item) => (
              <li key={item.label} className="bg-surface p-6 md:p-8">
                <p className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{item.value}</p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      <div className="mt-16">
        <Block label="The problem" title="What needed solving">
          <p className="prose-measure text-pretty text-text/85">{project.problem}</p>
          <p className="prose-measure mt-5 text-pretty text-muted">{project.motivation}</p>
        </Block>

        <Block label="Approach" title="How it's engineered">
          <ol className="prose-measure space-y-5">
            {project.approach.map((step, stepIndex) => (
              <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-2 text-text/85">
                <span className="font-mono text-sm text-accent">{String(stepIndex + 1).padStart(2, "0")}</span>
                <span className="text-pretty">{step}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="My contributions" title="What I did">
          <Bullets items={project.contributions} />
          <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-muted">Stack</h3>
          <TagList items={project.stack} className="mt-4" />
        </Block>

        <Block label="Challenges" title="What was hard">
          <div className="grid gap-4 md:grid-cols-2">
            {project.challenges.map((challenge) => (
              <div key={challenge.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-medium">{challenge.title}</h3>
                <p className="mt-3 text-pretty text-[0.9375rem] text-muted">{challenge.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="Status" title={`${doneCount} of ${project.progress.length} milestones implemented`}>
          <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {project.progress.map((item) => (
              <li key={item.label} className="flex gap-4 px-5 py-4">
                <ProgressMark state={item.state} />
                <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className={item.state === "planned" ? "text-muted" : undefined}>{item.label}</span>
                  <span className="font-mono text-xs text-muted">
                    {progressLabel[item.state]}
                    {item.note ? ` · ${item.note}` : ""}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Reflection" title="Lessons and what's next">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">Lessons</h3>
              <Bullets items={project.lessons} />
            </div>
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">Next</h3>
              <Bullets items={project.next} />
            </div>
          </div>
          <p className="mt-12 font-mono text-xs text-muted">Sources for this page: {project.sources.join(" · ")}</p>
        </Block>
      </div>

      <Reveal>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group mb-24 mt-8 flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/60 md:p-10"
        >
          <span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Next project</span>
            <span className="type-h3 mt-2 block">{nextProject.title}</span>
          </span>
          <ArrowRight className="size-6 shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </Reveal>
    </article>
  );
}
