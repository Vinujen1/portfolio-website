import { expect, test } from "@playwright/test";
import { projects } from "../../src/data/projects";

test.describe("home page", () => {
  test("renders every section without console errors or horizontal overflow", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Vinujen Dilogen");

    for (const id of ["home", "about", "experience", "projects", "skills", "education", "resume", "contact"]) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });

  test("résumé PDF is linked and served", async ({ page, request }) => {
    await page.goto("/");
    const href = await page.locator("a[download]").first().getAttribute("href");
    expect(href).toBeTruthy();
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("pdf");
  });

  test("external profile links point at the real accounts", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href="https://github.com/Vinujen1"]').first()).toBeAttached();
    await expect(page.locator('a[href="https://www.linkedin.com/in/vinujen-dilogen/"]').first()).toBeAttached();
  });

  test("theme toggle switches and persists", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("skills tabs support arrow-key navigation", async ({ page }) => {
    await page.goto("/#skills");
    const selected = page.getByRole("tab", { selected: true });
    await selected.focus();
    const before = await selected.textContent();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { selected: true })).not.toHaveText(before ?? "");
    await expect(page.getByRole("tabpanel")).toBeVisible();
  });
});

test.describe("navigation", () => {
  test("desktop nav scrolls to sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop navigation only");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#projects-title")).toBeInViewport();
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile navigation only");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: /Contact/ }).click();
    await expect(menu).toBeHidden();
    await expect(page.locator("#contact-title")).toBeInViewport();
  });
});

test.describe("project case studies", () => {
  for (const project of projects) {
    test(`${project.slug} renders its case study`, async ({ page }) => {
      await page.goto(`/projects/${project.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
      await expect(page.getByText(project.diagram.caption)).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("project cards link to case studies", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: `${projects[0].title} case study` }).click();
    await expect(page).toHaveURL(new RegExp(`/projects/${projects[0].slug}$`));
  });

  test("unknown project shows the 404 page", async ({ page }) => {
    await page.goto("/projects/does-not-exist");
    await expect(page.getByText("404 · target not found")).toBeVisible();
  });
});
