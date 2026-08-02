import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const siteUrl = "https://cooldecode-beryl.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessonsDir = path.join(process.cwd(), "public", "lessons");
  let lessonFiles: string[] = [];

  try {
    lessonFiles = fs
      .readdirSync(lessonsDir)
      .filter((file) => file.endsWith(".html"));
  } catch {
    lessonFiles = [];
  }

  const lessonEntries: MetadataRoute.Sitemap = lessonFiles.map((file) => {
    const filePath = path.join(lessonsDir, file);
    const lastModified = fs.statSync(filePath).mtime;
    return {
      url: `${siteUrl}/lessons/${file}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...lessonEntries,
  ];
}
