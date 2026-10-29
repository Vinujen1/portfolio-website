export type LinkItem = {
  label: string;
  href: string;
};

export type ProjectStatus = "in-development" | "planned" | "completed" | "hackathon";

/** done = implemented and observable, partial = prototype exists, planned = not built yet */
export type ProgressState = "done" | "partial" | "planned";

export type ProgressItem = {
  label: string;
  state: ProgressState;
  note?: string;
};

export type DiagramNode = {
  id: string;
  label: string;
  detail?: string;
  /** Grid position. Columns flow left to right, rows top to bottom. */
  col: number;
  row: number;
  state?: ProgressState;
};

export type DiagramEdge = {
  from: string;
  to: string;
};

export type Diagram = {
  title: string;
  caption: string;
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  period: string;
  context: string;
  status: ProjectStatus;
  role: string;
  stack: string[];
  problem: string;
  motivation: string;
  approach: string[];
  contributions: string[];
  challenges: { title: string; body: string }[];
  progress: ProgressItem[];
  highlights?: { value: string; label: string }[];
  lessons: string[];
  next: string[];
  links: LinkItem[];
  diagram: Diagram;
  /** Where the content on this page was verified from. Shown on the case study. */
  sources: string[];
};

export type Experience = {
  role: string;
  organization: string;
  location?: string;
  period: string;
  summary: string;
  points: string[];
  skills: string[];
};

export type SkillGroup = {
  id: string;
  name: string;
  description: string;
  skills: string[];
};
