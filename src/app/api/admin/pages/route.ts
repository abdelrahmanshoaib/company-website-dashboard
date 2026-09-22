import { NextResponse } from "next/server";
import { readDb, writeDb, uid, logActivity } from "@/lib/db";
import { requireUser, requirePerm } from "@/lib/api-auth";
import { syncMetaTitle } from "@/lib/sanitize";
import type { PageDoc } from "@/lib/academy";

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.pages);
}

export async function POST(req: Request) {
  const checked = await requirePerm("pages:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  if (!body.slug || !body.title?.en) {
    return NextResponse.json({ error: "slug and English title are required." }, { status: 422 });
  }
  const db = await readDb();
  if (db.pages.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "A page with this slug already exists." }, { status: 409 });
  }
  const now = new Date().toISOString();
  const page: PageDoc = {
    id: uid("page"),
    slug: String(body.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    title: { en: body.title.en, ar: body.title.ar ?? "" },
    metaTitle: { en: body.metaTitle?.en ?? body.title.en, ar: body.metaTitle?.ar ?? "" },
    metaDescription: { en: body.metaDescription?.en ?? "", ar: body.metaDescription?.ar ?? "" },
    content: { en: body.content?.en ?? "", ar: body.content?.ar ?? "" },
    status: body.status ?? "draft",
    updatedAt: now,
    updatedBy: checked.user.email,
  };
  db.pages.push(page);
  await logActivity(db, checked.user.email, "create", "page", page.id);
  await writeDb(db);
  return NextResponse.json(page, { status: 201 });
}

export async function PUT(req: Request) {
  const checked = await requirePerm("pages:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const page = db.pages.find((p) => p.id === body.id);
  if (!page) return NextResponse.json({ error: "Page not found." }, { status: 404 });
  for (const k of ["metaDescription", "content"] as const) {
    if (body[k]) {
      page[k] = { en: body[k].en ?? page[k].en, ar: body[k].ar ?? page[k].ar };
    }
  }
  if (body.title || body.metaTitle) {
    const oldTitle = { ...page.title };
    if (body.title) {
      page.title = { en: body.title.en ?? page.title.en, ar: body.title.ar ?? page.title.ar };
    }
    page.metaTitle = syncMetaTitle(page.metaTitle, oldTitle, body.title, body.metaTitle);
  }
  if (body.status) page.status = body.status;
  if (body.slug) page.slug = String(body.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-");
  page.updatedAt = new Date().toISOString();
  page.updatedBy = checked.user.email;
  await logActivity(db, checked.user.email, "update", "page", page.id);
  await writeDb(db);
  return NextResponse.json(page);
}

export async function DELETE(req: Request) {
  const checked = await requirePerm("pages:write");
  if ("response" in checked) return checked.response;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const db = await readDb();
  const idx = db.pages.findIndex((p) => p.id === id);
  if (idx < 0) return NextResponse.json({ error: "Page not found." }, { status: 404 });
  const [removed] = db.pages.splice(idx, 1);
  await logActivity(db, checked.user.email, "delete", "page", removed.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
