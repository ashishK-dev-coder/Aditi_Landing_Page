import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { isAdminSession } from "@/lib/auth/session";

const CONTENT_FILE = join(process.cwd(), "visual-data", "content.json");
const UPLOAD_DIR_BASE = join(process.cwd(), "public", "images");

function setByPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) current[key] = {};
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const jsonPath = formData.get("jsonPath") ? String(formData.get("jsonPath")) : null;
    let sectionType = formData.get("sectionType") ? String(formData.get("sectionType")) : "general";

    // Clean sectionType for safe directory names
    sectionType = sectionType.replace(/[^a-z0-9_-]/gi, '').toLowerCase() || "general";

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Image file is required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const UPLOAD_DIR = join(process.cwd(), "public", "images", sectionType);
    
    // Ensure the section subdirectory exists
    mkdirSync(UPLOAD_DIR, { recursive: true });

    // Save to local public folder
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = join(UPLOAD_DIR, filename);
    writeFileSync(filePath, buffer);
    const secure_url = `/images/${sectionType}/${filename}`;

    if (jsonPath) {
      // Save to visual-data/content.json
      const content = JSON.parse(readFileSync(CONTENT_FILE, "utf-8"));
      setByPath(content, jsonPath, secure_url);
      writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
    }

    return NextResponse.json({
      message: "Image uploaded.",
      url: secure_url,
      publicId: filename,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to upload image." },
      { status: 400 },
    );
  }
}
