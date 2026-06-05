import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { isAdminSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the File to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Load the ZIP
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();

    let contentFound = false;

    for (const entry of zipEntries) {
      if (entry.entryName === "content.json") {
        // Save content.json to visual-data directory
        const dataFilePath = path.join(process.cwd(), "visual-data", "content.json");
        await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
        await fs.writeFile(dataFilePath, entry.getData());
        contentFound = true;
      } else if (entry.entryName.startsWith("images/") || entry.entryName.startsWith("videos/")) {
        // Only extract files (not pure directories)
        if (!entry.isDirectory) {
          const targetPath = path.join(process.cwd(), "public", entry.entryName);
          await fs.mkdir(path.dirname(targetPath), { recursive: true });
          await fs.writeFile(targetPath, entry.getData());
        }
      }
    }

    if (!contentFound) {
      return NextResponse.json({ error: "Invalid ZIP: content.json missing" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Import successful" });
  } catch (error) {
    console.error("Import Error:", error);
    return NextResponse.json({ error: "Failed to import data" }, { status: 500 });
  }
}
