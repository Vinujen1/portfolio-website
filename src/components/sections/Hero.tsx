"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowDownToLine, ArrowRight } from "lucide-react";
import type { PointerEvent } from "react";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";
import { useFinePointer } from "@/hooks/useFinePointer";
import { ease, fadeUp, stagger } from "@/lib/motion";

const headline = ["Software", "engineer", "building", "systems", "that", "see,", "understand", "and", "act."];
const accentWords = new Set(["see,", "understand", "act."]);

export function Hero() {
  const fine = useFinePointer();

  // Writes the cursor position to CSS variables; the .pointer-light gradient reads them.
  function onMove(event: PointerEvent<HTMLElement>) {
    if (!fine) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate overflow-hidden"
    >
      <div aria-hidden className="grid-field absolute inset-0 -z-20 opacity-60" />
      <div aria-hidden className="pointer-light absolute inset-0 -z-10" />

      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-14 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-8">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.09, 0.1)}>
          <motion.p
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-3.5 text-sm text-muted"
          >
            <span className="relative flex size-2">
              <span aria-hidden className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            Open to new grad SWE roles · {site.graduation}
          </motion.p>

          <motion.p variants={fadeUp} className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-muted">
            {site.name}
          </motion.p>

          <h1 id="hero-title" className="type-hero max-w-[14ch] text-balance">
            <span className="sr-only">{site.name}, </span>
            {headline.map((word, index) => (
              <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${accentWords.has(word) ? "text-accent" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.2 + index * 0.055 }}
                >
                  {word}
                </motion.span>
                {index < headline.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <motion.p variants={fadeUp} className="type-lead prose-measure mt-8 max-w-[52ch] text-pretty">
            {site.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#projects" icon={<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}>
              View projects
            </ButtonLink>
            <ButtonLink
              href={site.resume.href}
              download={site.resume.fileName}
              variant="secondary"
              prefetch={false}
              icon={<ArrowDownToLine className="size-4" aria-hidden />}
            >
              Download résumé
            </ButtonLink>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 flex items-center gap-5 text-sm text-muted">
            <li>
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-text"
              >
                <GitHubIcon className="size-4" />
                GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-text"
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </motion.ul>
        </motion.div>

        <HeroVisual />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-text md:flex"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  );
}
