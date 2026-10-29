import { describe, expect, it } from "vitest";
import { projects } from "../../src/data/projects";
import { skillGroups } from "../../src/data/skills";

// Guards the content rules: honest status labels and diagrams that actually connect.
describe("project content", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(projects)("$slug diagram edges reference existing nodes", (project) => {
    const ids = new Set(project.diagram.nodes.map((node) => node.id));
    for (const edge of project.diagram.edges) {
      expect(ids, `${edge.from} -> ${edge.to}`).toContain(edge.from);
      expect(ids, `${edge.from} -> ${edge.to}`).toContain(edge.to);
    }
  });

  it.each(projects)("$slug diagram nodes fit inside the declared grid", (project) => {
    for (const node of project.diagram.nodes) {
      expect(node.col).toBeLessThan(project.diagram.cols);
      expect(node.row).toBeLessThan(project.diagram.rows);
    }
  });

  it.each(projects)("$slug never shows a completed status with planned milestones", (project) => {
    if (project.status === "completed") {
      expect(project.progress.every((item) => item.state === "done")).toBe(true);
    }
  });

  it("planned projects show no implemented milestones beyond planning", () => {
    for (const project of projects.filter((item) => item.status === "planned")) {
      const built = project.progress.filter((item) => item.state !== "planned");
      expect(built.length).toBeLessThanOrEqual(1);
    }
  });
});

describe("skills", () => {
  it("has no duplicate skills within a group", () => {
    for (const group of skillGroups) {
      expect(new Set(group.skills).size).toBe(group.skills.length);
    }
  });
});
