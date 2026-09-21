import type { MetadataRoute } from "next";
import { readDb } from "@/lib/db";

const STATIC = [
  "", "/about", "/approach", "/how-it-works", "/teachers", "/faq", "/contact",
  "/book-assessment", "/blog", "/privacy", "/terms", "/safeguarding", "/accessibility",
  "/cancellation", "/complaints",
  "/programs/children", "/programs/adults", "/programs/converts", "/programs/families",
  "/online-quran-classes-uk", "/online-quran-classes-canada",
  "/online-quran-classes-for-kids", "/online-quran-classes-for-adults",
  "/student/login",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://example.com";
  const now = new Date();
  let db;
  try {
    db = await readDb();
  } catch {
    db = null;
  }
  const serviceUrls = (db?.services ?? [])
    .filter((s) => s.status === "published" && s.active)
    .map((s) => ({ url: `${base}/programs/${s.slug}`, lastModified: now }));
  const postUrls = (db?.posts ?? [])
    .filter((p) => p.status === "published")
    .map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: now }));
  const pageUrls = (db?.pages ?? [])
    .filter((p) => p.status === "published")
    .map((p) => ({ url: `${base}/p/${p.slug}`, lastModified: now }));
  return [
    ...STATIC.map((p) => ({ url: `${base}${p || "/"}`, lastModified: now })),
    ...serviceUrls,
    ...postUrls,
    ...pageUrls,
  ];
}
