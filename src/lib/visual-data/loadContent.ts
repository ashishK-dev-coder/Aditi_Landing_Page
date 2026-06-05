import { readFileSync } from "fs";
import { join } from "path";
import type { VisualContent } from "./types";

export type { VisualContent } from "./types";

const CONTENT_FILE = join(process.cwd(), "visual-data", "content.json");

/** Load all page copy from visual-data/content.json (single source of truth). */
export function loadVisualContent(): VisualContent {
  try {
    return JSON.parse(readFileSync(CONTENT_FILE, "utf-8")) as VisualContent;
  } catch {
    return {};
  }
}
