import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { isAdminSession } from "@/lib/auth/session";

const CONTENT_FILE = join(process.cwd(), "visual-data", "content.json");

function readContent() {
  try {
    return JSON.parse(readFileSync(CONTENT_FILE, "utf-8"));
  } catch {
    return {};
  }
}

/** GET — return full content.json */
export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readContent());
}

/**
 * POST — patch a single field by dot-path
 * Body: { path: "hero.highlights.0.value", value: "15-16 July 2026" }
 */
export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { path, value } = await request.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ message: "path is required" }, { status: 400 });
    }

    const content = readContent();
    setByPath(content, path, value);
    writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");

    return NextResponse.json({ message: "Saved.", path, value });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Save failed" },
      { status: 500 },
    );
  }
}

/** Set a value in a nested object by dot-path e.g. "hero.highlights.0.value" */
function setByPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}
