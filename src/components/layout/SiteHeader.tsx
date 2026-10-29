"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navItems, site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const sectionIds = navItems.map((item) => item.id);

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome ? sectionIds : []);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close the mobile menu on Escape and return focus to the button that opened it.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Link
          href="/#home"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 rounded-md"
          aria-label={`${site.name}, home`}
        >
          <span className="grid size-9 place-items-center rounded-lg border border-line-strong font-display text-sm font-semibold tracking-tight transition-colors group-hover:border-accent group-hover:text-accent">
            {site.initials}
          </span>
          <span className="hidden font-display text-[0.95rem] font-medium tracking-tight sm:block">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = onHome && active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.resume.href}
            download={site.resume.fileName}
            className="hidden h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            Résumé
            <ArrowDownToLine className="size-4" aria-hidden />
          </a>
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-text transition-colors hover:bg-surface-2 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <motion.ul
              className="flex flex-col px-5 pt-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                  className="border-b border-line"
                >
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-3xl font-medium tracking-tight"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted">{String(index).padStart(2, "0")}</span>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
                className="pt-8"
              >
                <a
                  href={site.resume.href}
                  download={site.resume.fileName}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-on-accent"
                >
                  Download résumé
                  <ArrowDownToLine className="size-4" aria-hidden />
                </a>
              </motion.li>
            </motion.ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
