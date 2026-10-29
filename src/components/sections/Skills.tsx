"use client";

import { AnimatePresence, motion } from "motion/react";
import { BrainCircuit, Code2, Database, Layout, Server, Wrench, type LucideIcon } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const icons: Record<string, LucideIcon> = {
  languages: Code2,
  ml: BrainCircuit,
  backend: Server,
  frontend: Layout,
  data: Database,
  platforms: Wrench,
};

/** Accessible tabs (WAI-ARIA pattern): arrow keys move between categories. */
export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[1]?.id ?? skillGroups[0].id);
  const baseId = useId();
  const active = skillGroups.find((group) => group.id === activeId) ?? skillGroups[0];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let next: number | null = null;
    if (event.key in keys) next = (index + keys[event.key] + skillGroups.length) % skillGroups.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = skillGroups.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveId(skillGroups[next].id);
    document.getElementById(`${baseId}-tab-${skillGroups[next].id}`)?.focus();
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <SectionHeading
          id="skills-title"
          index="04"
          eyebrow="Skills"
          title="The toolkit, as used."
          lead="Every item here shows up on my résumé or in a project on this page. No proficiency bars: the projects are the evidence."
        />

        <Reveal className="grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-10">
          <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillGroups.map((group, index) => {
              const Icon = icons[group.id] ?? Code2;
              const selected = group.id === active.id;
              return (
                <button
                  key={group.id}
                  id={`${baseId}-tab-${group.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(group.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors",
                    selected ? "text-text" : "text-muted hover:bg-surface-2/60 hover:text-text",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="skill-tab"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-xl border border-line-strong bg-surface"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <Icon className={cn("size-4 shrink-0", selected && "text-accent")} aria-hidden />
                  <span className="whitespace-nowrap">{group.name}</span>
                  <span className="ml-auto hidden font-mono text-xs text-muted lg:inline">{group.skills.length}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active.id}`}
            tabIndex={0}
            className="min-h-[18rem] rounded-2xl border border-line bg-surface p-6 md:p-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease }}
              >
                <h3 className="type-h3">{active.name}</h3>
                <p className="mt-2 text-muted">{active.description}</p>
                <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {active.skills.map((skill, index) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.04 * index }}
                      className="rounded-xl border border-line bg-bg/60 px-4 py-3.5 text-[0.9375rem] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/60"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
