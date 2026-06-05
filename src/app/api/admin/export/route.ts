import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { isAdminSession } from "@/lib/auth/session";

function extractMediaPaths(obj: any): string[] {
  let paths: string[] = [];
  if (typeof obj === "string") {
    if (obj.startsWith("/images/") || obj.startsWith("/videos/")) {
      paths.push(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => {
      paths = paths.concat(extractMediaPaths(item));
    });
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      paths = paths.concat(extractMediaPaths(obj[key]));
    }
  }
  return paths;
}

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dataFilePath = path.join(process.cwd(), "visual-data", "content.json");
    let contentData = "{}";
    try {
      contentData = await fs.readFile(dataFilePath, "utf-8");
    } catch {
      // Ignore if doesn't exist
    }

    // Ensure themeId is set
    const parsedData = JSON.parse(contentData);
    if (!parsedData.site) parsedData.site = {};
    if (!parsedData.site.themeId) {
      // Import themes to get the default theme ID
      const themes = require("@/visual-data/themes.json");
      parsedData.site.themeId = themes[0].id;
      contentData = JSON.stringify(parsedData, null, 2);
    }

    const zip = new AdmZip();
    
    // Add content.json
    zip.addFile("content.json", Buffer.from(contentData, "utf8"));

    // Find media files
    const mediaPaths = Array.from(new Set(extractMediaPaths(parsedData)));

    const publicDir = path.join(process.cwd(), "public");

    // Add each media file
    for (const mediaPath of mediaPaths) {
      // mediaPath is like "/images/file.png"
      const absolutePath = path.join(publicDir, mediaPath);
      try {
        const fileBuffer = await fs.readFile(absolutePath);
        // We add it to the zip in the exact same folder structure inside the zip
        // e.g., "images/file.png"
        const zipPath = mediaPath.startsWith("/") ? mediaPath.substring(1) : mediaPath;
        zip.addFile(zipPath, fileBuffer);
      } catch (err) {
        console.warn(`Could not find media file for export: ${absolutePath}`);
      }
    }

    const zipBuffer = zip.toBuffer();

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `aditi-wellness-export-${timestamp}.zip`;

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
