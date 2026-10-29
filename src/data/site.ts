export const site = {
  name: "Vinujen Dilogen",
  initials: "VD",
  role: "Software Engineering student",
  headline: "Software engineer building systems that see, understand and act.",
  intro:
    "I'm a Software Engineering student at Ontario Tech University focused on AI engineering: taking models from training and evaluation to systems people can rely on, from a vision-language-action excavator to semantic search. I'm looking for new graduate software engineering roles starting in 2027.",
  description:
    "Vinujen Dilogen is a Software Engineering student at Ontario Tech University (graduating 2027) focused on AI engineering: machine learning, computer vision and the software around them. Projects, experience and résumé.",
  location: "Greater Toronto Area, Ontario",
  email: "vinujen200444@gmail.com",
  graduation: "May 2027",
  // Set NEXT_PUBLIC_SITE_URL once a deployment domain exists so canonical URLs and the sitemap are correct.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  resume: {
    href: "/resume/Vinujen_Dilogen_Resume.pdf",
    fileName: "Vinujen_Dilogen_Resume.pdf",
  },
  social: {
    github: "https://github.com/Vinujen1",
    linkedin: "https://www.linkedin.com/in/vinujen-dilogen/",
  },
} as const;

// Written from verified facts only: degree, projects, roles and the hackathon are all sourced elsewhere in /data.
export const about = {
  statement: "I'm studying how to make AI work outside the notebook — in systems with real data, real hardware and real consequences.",
  paragraphs: [
    "I'm a Software Engineering student at Ontario Tech University, graduating in 2027, and AI engineering is where I've focused my degree. My coursework in deep learning architectures, AI engineering and MLOps, and distributed and cloud systems is about the full lifecycle of a model: training it, evaluating it honestly against a baseline, and deploying it so it stays reliable once real data starts arriving.",
    "That's the part I find most interesting. A model is only one component. The engineering is in the data pipeline feeding it, the API in front of it, the checks around it and the interface that turns its output into something a person can act on.",
    "Right now that means my capstone — a five-person team teaching a scale excavator to take spoken instructions, see its workspace and plan a dig, with a deterministic safety layer that always gets the final say. Speech recognition, object detection and an LLM planner all have to cooperate in real time, and my code has to answer to hardware.",
    "Before engineering took most of my time, I ran the front end of a busy Walmart store as a Customer Service Manager. That's where I learned to prioritise under pressure, explain decisions clearly and fix the problem in front of me — habits that carry straight into team projects, hackathons and the analyst work I do now.",
  ],
  facts: [
    { label: "Studying", value: "B.Eng. Software Engineering, Ontario Tech" },
    { label: "Graduating", value: "May 2027" },
    { label: "Focus", value: "AI engineering, ML systems, computer vision" },
    { label: "Based in", value: "Greater Toronto Area" },
    { label: "Looking for", value: "New grad SWE roles, 2027" },
  ],
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
