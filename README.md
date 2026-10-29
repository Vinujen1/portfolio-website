# Vinujen Dilogen — Portfolio

Personal portfolio for a Software Engineering student (Ontario Tech, 2027) pursuing new graduate SWE roles. A home page with About, Experience, Projects, Skills, Education & Community, Résumé and Contact, plus a case study page for each project.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, tokens in `src/app/globals.css` |
| Motion | `motion` (Framer Motion) |
| Icons | `lucide-react` (+ two inline brand SVGs) |
| Tests | Vitest (content rules), Playwright (desktop + mobile browser tests) |

No GSAP, Lenis or 3D library: the effects here are all transform/opacity animations that `motion` and CSS already cover, so they'd add weight without adding anything.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (prerenders every page) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |
| `npm test` | Unit tests for the content data |
| `npm run test:e2e` | Builds must exist first. Starts `next start` on port 3100 and runs Playwright on desktop and Pixel 7 viewports. Set `BASE_URL` to test an already-running server instead. |

First Playwright run on a new machine: `npx playwright install chromium`.

## Editing content

All copy lives in `src/data/`. Components never hard-code personal details.

| File | Contains |
| --- | --- |
| `site.ts` | Name, headline, intro, email, social links, résumé path, About copy, nav items |
| `experience.ts` | Roles for the timeline |
| `projects.ts` | Projects and case studies, including status, milestones and architecture diagrams |
| `skills.ts` | Skill categories |
| `education.ts` | Degree, coursework, honours, hackathons, other GitHub work |

**Content rules** (enforced partly by `tests/unit/content.test.ts`):

- Only verified facts. Each project lists its `sources`.
- Every milestone is `done`, `partial` or `planned`. A `completed` project can't have planned milestones.
- Diagrams are architecture drawings and are captioned that way. Don't add screenshots unless they're real.

**Résumé:** replace `public/resume/Vinujen_Dilogen_Resume.pdf` (keep the name, or update `site.resume` in `site.ts`) and update `site.resume.updated`.

**Adding a project:** add an object to `projects` in `projects.ts`. The home page card, the case study at `/projects/<slug>`, the sitemap and the tests all pick it up automatically. Diagram nodes sit on a `cols × rows` grid. Edges are drawn between them.

## Structure

```
src/
  app/                  routes, metadata, sitemap, robots, OG image, 404, error
    projects/[slug]/    case study pages (statically generated)
  components/
    animations/         Reveal, Magnetic, Tilt, MotionProvider
    layout/             header, footer, theme toggle, scroll progress
    sections/           home page sections
    ui/                 buttons, tags, status badges, SystemDiagram
  data/                 all content
  hooks/                active section, fine-pointer detection
  lib/                  motion presets, class helper
  types/                content types
tests/
  unit/                 Vitest
  e2e/                  Playwright
```

## Accessibility and motion

- Skip link, semantic landmarks, visible focus rings, ARIA tabs for Skills, an Escape-to-close mobile menu.
- `prefers-reduced-motion` disables transforms, CSS animations and smooth scrolling.
- Cursor effects (magnetic buttons, tilt, hero light, reticle) only run on hover-capable fine pointers.
- Diagrams are hidden from screen readers and replaced with an equivalent text list.

## Deployment

The site is Vercel-ready with no extra configuration:

1. Push the repository to GitHub and import it in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://vinujen.dev`). Canonical URLs, the sitemap, robots.txt and Open Graph metadata all use it.
3. Deploy.

There's no contact form on purpose. A form needs a real backend (e.g. Resend), or messages would be silently lost. Email and LinkedIn are linked instead.
