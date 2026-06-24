"use server";

import { mkdir, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";

import { getBlueprint, blueprintDocs } from "@/lib/blueprints";

export type ApplyResult =
  | { ok: true; written: string[]; skipped: string[]; dir: string }
  | { ok: false; error: string };

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Writes the seeded SHIP docs for a blueprint into ./docs (relative to where the
 * app runs). Never overwrites existing docs — an already-present file is reported
 * as skipped so a user can't clobber work in progress.
 */
export async function applyBlueprint(slug: string): Promise<ApplyResult> {
  const blueprint = getBlueprint(slug);
  if (!blueprint) {
    return { ok: false, error: `Unknown blueprint: ${slug}` };
  }

  const { projectMd, featureMatrixMd } = blueprintDocs(blueprint);
  const dir = resolve(process.cwd(), "docs");
  const targets = [
    { name: "PROJECT.md", content: projectMd },
    { name: "FEATURE_MATRIX.md", content: featureMatrixMd },
  ];

  try {
    await mkdir(dir, { recursive: true });
    const written: string[] = [];
    const skipped: string[] = [];

    for (const t of targets) {
      const path = resolve(dir, t.name);
      if (await exists(path)) {
        skipped.push(t.name);
        continue;
      }
      await writeFile(path, t.content, "utf8");
      written.push(t.name);
    }

    return { ok: true, written, skipped, dir };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to write docs" };
  }
}
