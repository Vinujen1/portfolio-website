import { ArrowDownToLine, ArrowUpRight, FileText, Mail } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { CopyEmail } from "@/components/sections/CopyEmail";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

const channels = [
  { label: "LinkedIn", detail: "linkedin.com/in/vinujen-dilogen", href: site.social.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", detail: "github.com/Vinujen1", href: site.social.github, Icon: GitHubIcon },
];

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="border-t border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 md:grid-cols-[1fr_auto] md:px-8 md:py-28">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-accent">06</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            Résumé
          </p>
          <h2 id="resume-title" className="type-h2 max-w-[20ch] text-balance">
            The one-page version.
          </h2>
          <p className="mt-5 max-w-[48ch] text-muted">
            Experience, projects and skills on a single page, in PDF.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3">
          <ButtonLink
            href={site.resume.href}
            download={site.resume.fileName}
            prefetch={false}
            icon={<ArrowDownToLine className="size-4" aria-hidden />}
          >
            Download PDF
          </ButtonLink>
          <ButtonLink
            href={site.resume.href}
            target="_blank"
            rel="noreferrer"
            prefetch={false}
            variant="secondary"
            icon={<FileText className="size-4" aria-hidden />}
          >
            View in browser
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line">
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_80%_at_50%_100%,var(--glow),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
        <RevealGroup>
          <RevealItem>
            <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">07</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              Contact
            </p>
          </RevealItem>
          <RevealItem>
            <h2 id="contact-title" className="type-display max-w-[14ch] text-balance">
              Have an idea worth <span className="text-accent">building?</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="type-lead mt-8 max-w-[52ch] text-pretty">
              I&apos;m looking for new graduate software engineering roles for 2027, and I&apos;m always happy to talk about
              ML systems, robotics or a project you&apos;re working on. Email is the fastest way to reach me.
            </p>
          </RevealItem>
          <RevealItem className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={`mailto:${site.email}`} icon={<Mail className="size-4" aria-hidden />}>
              {site.email}
            </ButtonLink>
            <CopyEmail email={site.email} />
          </RevealItem>
        </RevealGroup>

        <Reveal delay={0.1} className="mt-20">
          <ul className="grid gap-4 sm:grid-cols-2">
            {channels.map(({ label, detail, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition-colors hover:border-line-strong"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-line">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{label}</span>
                    <span className="block truncate text-sm text-muted">{detail}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
