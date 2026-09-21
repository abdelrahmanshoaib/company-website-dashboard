import { readDb } from "./db";
import { getLang } from "./lang";
import type { Lang, SiteSettings } from "./academy";

export async function getSite(): Promise<{ lang: Lang; settings: SiteSettings }> {
  const [lang, db] = await Promise.all([getLang(), readDb()]);
  return { lang, settings: db.settings };
}

export async function getNavServices() {
  const db = await readDb();
  return db.services
    .filter((s) => s.status === "published" && s.active)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ slug: s.slug, name: s.name }));
}

export async function getPublicServices() {
  const db = await readDb();
  return db.services
    .filter((s) => s.status === "published" && s.active)
    .sort((a, b) => a.order - b.order);
}

export async function getPublicTeachers() {
  const db = await readDb();
  return db.teachers.filter((x) => x.published).sort((a, b) => a.order - b.order);
}

export async function getPublicFaqs() {
  const db = await readDb();
  return db.faqs.filter((f) => f.published).sort((a, b) => a.order - b.order);
}

export async function getPublishedPosts() {
  const db = await readDb();
  return db.posts
    .filter((p) => p.status === "published")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export async function getPageBySlug(slug: string) {
  const db = await readDb();
  return db.pages.find((p) => p.slug === slug && p.status === "published") ?? null;
}
