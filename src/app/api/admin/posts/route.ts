import { NextResponse } from "next/server";
import { readDb, writeDb, uid, logActivity } from "@/lib/db";
import { requireUser, requirePerm } from "@/lib/api-auth";
import type { PostDoc } from "@/lib/academy";

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.posts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
}

export async function POST(req: Request) {
  const checked = await requirePerm("blog:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  if (!body.slug || !body.title?.en) {
    return NextResponse.json({ error: "slug and English title are required." }, { status: 422 });
  }
  const db = await readDb();
  if (db.posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "An article with this slug already exists." }, { status: 409 });
  }
  const now = new Date().toISOString();
  const post: PostDoc = {
    id: uid("post"),
    slug: String(body.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    title: { en: body.title.en, ar: body.title.ar ?? "" },
    excerpt: { en: body.excerpt?.en ?? "", ar: body.excerpt?.ar ?? "" },
    content: { en: body.content?.en ?? "", ar: body.content?.ar ?? "" },
    category: body.category ?? "Guides",
    tags: Array.isArray(body.tags) ? body.tags : [],
    author: body.author ?? checked.user.name,
    status: body.status ?? "draft",
    publishedAt: body.status === "published" ? now : null,
    metaTitle: { en: body.metaTitle?.en ?? body.title.en, ar: body.metaTitle?.ar ?? "" },
    metaDescription: { en: body.metaDescription?.en ?? "", ar: body.metaDescription?.ar ?? "" },
    updatedAt: now,
  };
  db.posts.push(post);
  await logActivity(db, checked.user.email, "create", "post", post.id);
  await writeDb(db);
  return NextResponse.json(post, { status: 201 });
}

export async function PUT(req: Request) {
  const checked = await requirePerm("blog:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const doc = db.posts.find((x) => x.id === body.id);
  if (!doc) return NextResponse.json({ error: "Article not found." }, { status: 404 });
  for (const k of ["title", "excerpt", "content", "metaTitle", "metaDescription"] as const) {
    if (body[k]) doc[k] = { en: body[k].en ?? doc[k].en, ar: body[k].ar ?? doc[k].ar };
  }
  if (body.category !== undefined) doc.category = String(body.category);
  if (body.author !== undefined) doc.author = String(body.author);
  if (body.status !== undefined) doc.status = body.status;
  if (Array.isArray(body.tags)) doc.tags = body.tags;
  if (body.status === "published" && !doc.publishedAt) doc.publishedAt = new Date().toISOString();
  if (body.status === "draft") doc.publishedAt = null;
  doc.updatedAt = new Date().toISOString();
  await logActivity(db, checked.user.email, "update", "post", doc.id);
  await writeDb(db);
  return NextResponse.json(doc);
}

export async function DELETE(req: Request) {
  const checked = await requirePerm("blog:write");
  if ("response" in checked) return checked.response;
  const { searchParams } = new URL(req.url);
  const db = await readDb();
  const idx = db.posts.findIndex((x) => x.id === searchParams.get("id"));
  if (idx < 0) return NextResponse.json({ error: "Article not found." }, { status: 404 });
  const [removed] = db.posts.splice(idx, 1);
  await logActivity(db, checked.user.email, "delete", "post", removed.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
