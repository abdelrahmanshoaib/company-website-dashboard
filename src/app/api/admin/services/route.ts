import { NextResponse } from "next/server";
import { readDb, writeDb, uid, logActivity } from "@/lib/db";
import { requireUser, requirePerm } from "@/lib/api-auth";
import { syncMetaTitle } from "@/lib/sanitize";
import type { ServiceDoc } from "@/lib/academy";

const bi = (v: unknown, fallback = "") => ({
  en: (v as { en?: string })?.en ?? fallback,
  ar: (v as { ar?: string })?.ar ?? "",
});
const biList = (v: unknown): { en: string; ar: string }[] =>
  Array.isArray(v) ? v.map((x) => bi(x)) : [];

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.services.sort((a, b) => a.order - b.order));
}

export async function POST(req: Request) {
  const checked = await requirePerm("services:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  if (!body.slug || !body.name?.en) {
    return NextResponse.json({ error: "slug and English name are required." }, { status: 422 });
  }
  const db = await readDb();
  if (db.services.some((s) => s.slug === body.slug)) {
    return NextResponse.json({ error: "A service with this slug already exists." }, { status: 409 });
  }
  const svc: ServiceDoc = {
    id: uid("svc"),
    slug: String(body.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    name: bi(body.name),
    short: bi(body.short),
    content: bi(body.content),
    outcomes: biList(body.outcomes),
    audience: biList(body.audience),
    curriculum: biList(body.curriculum),
    icon: body.icon ?? "📖",
    order: Number(body.order) || db.services.length + 1,
    featured: body.featured ?? true,
    active: body.active ?? true,
    status: body.status ?? "draft",
    metaTitle: bi(body.metaTitle, body.name?.en ?? ""),
    metaDescription: bi(body.metaDescription),
    updatedAt: new Date().toISOString(),
  };
  db.services.push(svc);
  await logActivity(db, checked.user.email, "create", "service", svc.id);
  await writeDb(db);
  return NextResponse.json(svc, { status: 201 });
}

export async function PUT(req: Request) {
  const checked = await requirePerm("services:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const svc = db.services.find((s) => s.id === body.id);
  if (!svc) return NextResponse.json({ error: "Service not found." }, { status: 404 });
  for (const k of ["short", "content", "metaDescription"] as const) {
    if (body[k]) svc[k] = { en: body[k].en ?? svc[k].en, ar: body[k].ar ?? svc[k].ar };
  }
  if (body.name || body.metaTitle) {
    const oldName = { ...svc.name };
    if (body.name) svc.name = { en: body.name.en ?? svc.name.en, ar: body.name.ar ?? svc.name.ar };
    svc.metaTitle = syncMetaTitle(svc.metaTitle, oldName, body.name, body.metaTitle);
  }
  for (const k of ["outcomes", "audience", "curriculum"] as const) {
    if (body[k]) svc[k] = biList(body[k]);
  }
  if (body.icon !== undefined) svc.icon = String(body.icon);
  if (body.featured !== undefined) svc.featured = Boolean(body.featured);
  if (body.active !== undefined) svc.active = Boolean(body.active);
  if (body.status !== undefined) svc.status = body.status;
  if (body.order !== undefined) svc.order = Number(body.order);
  svc.updatedAt = new Date().toISOString();
  await logActivity(db, checked.user.email, "update", "service", svc.id);
  await writeDb(db);
  return NextResponse.json(svc);
}

export async function DELETE(req: Request) {
  const checked = await requirePerm("services:write");
  if ("response" in checked) return checked.response;
  const { searchParams } = new URL(req.url);
  const db = await readDb();
  const idx = db.services.findIndex((s) => s.id === searchParams.get("id"));
  if (idx < 0) return NextResponse.json({ error: "Service not found." }, { status: 404 });
  const [removed] = db.services.splice(idx, 1);
  await logActivity(db, checked.user.email, "delete", "service", removed.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
