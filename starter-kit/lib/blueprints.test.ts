import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { describe, it, expect } from "vitest"
import { blueprints, getBlueprint, blueprintDocs } from "./blueprints"

describe("blueprints", () => {
  it("has at least one blueprint", () => {
    expect(blueprints.length).toBeGreaterThan(0)
  })

  it("has unique slugs", () => {
    const slugs = blueprints.map((b) => b.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("every blueprint has the required fields populated", () => {
    for (const b of blueprints) {
      expect(b.slug, `slug for ${b.title}`).toMatch(/^[a-z0-9-]+$/)
      expect(b.title.trim().length, `title for ${b.slug}`).toBeGreaterThan(0)
      expect(b.tagline.trim().length, `tagline for ${b.slug}`).toBeGreaterThan(0)
      expect(b.icon, `icon for ${b.slug}`).toBeTruthy()
      expect(b.featureChecklist.length, `features for ${b.slug}`).toBeGreaterThan(0)
    }
  })

  it("every build prompt is non-empty and references the SHIP Method", () => {
    for (const b of blueprints) {
      expect(b.prompt.trim().length, `prompt for ${b.slug}`).toBeGreaterThan(50)
      expect(b.prompt, `prompt for ${b.slug}`).toContain("SHIP Method")
      expect(b.prompt, `prompt for ${b.slug}`).toContain("/ship")
    }
  })

  it("every demoReady blueprint has a live demo page", () => {
    for (const b of blueprints.filter((x) => x.demoReady)) {
      const page = resolve(process.cwd(), "app", "demo", b.slug, "page.tsx")
      expect(existsSync(page), `demo page for ${b.slug} (${page})`).toBe(true)
    }
  })

  it("getBlueprint finds by slug and returns undefined otherwise", () => {
    expect(getBlueprint("crm")?.title).toBe("CRM")
    expect(getBlueprint("nope")).toBeUndefined()
  })

  it("blueprintDocs seeds PROJECT.md and FEATURE_MATRIX.md with placeholders", () => {
    for (const b of blueprints) {
      const { projectMd, featureMatrixMd } = blueprintDocs(b)
      expect(projectMd, `project for ${b.slug}`).toContain(b.title)
      expect(projectMd, `project gate for ${b.slug}`).toContain("[")
      expect(projectMd).toContain("/ship")
      expect(featureMatrixMd, `matrix for ${b.slug}`).toContain(b.featureChecklist[0])
    }
  })
})
