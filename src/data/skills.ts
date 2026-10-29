import type { SkillGroup } from "@/types/content";

// Every skill here appears on the résumé or in a verified project. Do not add tools that aren't used.
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    name: "Languages",
    description: "What I write most of my code in.",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "C/C++"],
  },
  {
    id: "ml",
    name: "AI & machine learning",
    description: "Training, evaluating and serving models, plus the perception stack for robotics.",
    skills: ["PyTorch", "scikit-learn", "NumPy", "pandas", "Matplotlib", "OpenCV", "YOLO", "Whisper", "LangChain", "LLM APIs"],
  },
  {
    id: "backend",
    name: "Backend",
    description: "APIs that put models and data behind a clean contract.",
    skills: ["FastAPI", "Flask", "Django", "Node.js", "Express", "REST APIs", "Pydantic"],
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Interfaces for the people who use the system.",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML & CSS"],
  },
  {
    id: "data",
    name: "Data",
    description: "Where the data lives and how it gets reported.",
    skills: ["PostgreSQL", "MySQL", "SQLite", "Power BI", "GTFS / GTFS-Realtime"],
  },
  {
    id: "platforms",
    name: "Tools & platforms",
    description: "Shipping, testing and the hardware the code runs on.",
    skills: ["Git", "Docker", "AWS", "pytest", "Jupyter", "VS Code", "NVIDIA Jetson", "Raspberry Pi", "Arduino", "ROS 2"],
  },
];
