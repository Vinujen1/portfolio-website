import { ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { site } from "@/data/site";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-line-strong font-display text-sm font-semibold">
            {site.initials}
          </span>
          <p className="text-sm text-muted">
            © {year} {site.name}. Designed and built from scratch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <LinkedInIcon className="size-[18px]" />
          </a>
          <a
            href="#top"
            className="ml-2 inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-text"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
