import { NextResponse } from "next/server";
import { readDb, writeDb, uid, logActivity } from "@/lib/db";
import { requireUser, requirePerm } from "@/lib/api-auth";
import type { TeacherDoc } from "@/lib/academy";

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.teachers.sort((a, b) => a.order - b.order));
}

export async function POST(req: Request) {
  const checked = await requirePerm("teachers:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  if (!body.name) return NextResponse.json({ error: "Name is required." }, { status: 422 });
  const db = await readDb();
  const teacher: TeacherDoc = {
    id: uid("t"),
    name: String(body.name),
    bio: { en: body.bio?.en ?? "", ar: body.bio?.ar ?? "" },
    subjects: Array.isArray(body.subjects) ? body.subjects : [],
    languages: Array.isArray(body.languages) ? body.languages : [],
    qualifications: body.qualifications ?? "",
    experience: body.experience ?? "",
    photo: body.photo ?? "",
    availability: { en: body.availability?.en ?? "", ar: body.availability?.ar ?? "" },
    published: body.published ?? false,
    placeholder: false,
    order: Number(body.order) || db.teachers.length + 1,
  };
  db.teachers.push(teacher);
  await logActivity(db, checked.user.email, "create", "teacher", teacher.id);
  await writeDb(db);
  return NextResponse.json(teacher, { status: 201 });
}

export async function PUT(req: Request) {
  const checked = await requirePerm("teachers:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const doc = db.teachers.find((x) => x.id === body.id);
  if (!doc) return NextResponse.json({ error: "Teacher not found." }, { status: 404 });
  if (body.name !== undefined) doc.name = String(body.name);
  if (body.qualifications !== undefined) doc.qualifications = String(body.qualifications);
  if (body.experience !== undefined) doc.experience = String(body.experience);
  if (body.photo !== undefined) doc.photo = String(body.photo);
  for (const k of ["bio", "availability"] as const) {
    if (body[k]) doc[k] = { en: body[k].en ?? doc[k].en, ar: body[k].ar ?? doc[k].ar };
  }
  for (const k of ["subjects", "languages"] as const) {
    if (Array.isArray(body[k])) doc[k] = body[k];
  }
  if (body.published !== undefined) doc.published = body.published;
  if (body.placeholder !== undefined) doc.placeholder = body.placeholder;
  if (body.order !== undefined) doc.order = Number(body.order);
  await logActivity(db, checked.user.email, "update", "teacher", doc.id);
  await writeDb(db);
  return NextResponse.json(doc);
}

export async function DELETE(req: Request) {
  const checked = await requirePerm("teachers:write");
  if ("response" in checked) return checked.response;
  const { searchParams } = new URL(req.url);
  const db = await readDb();
  const idx = db.teachers.findIndex((x) => x.id === searchParams.get("id"));
  if (idx < 0) return NextResponse.json({ error: "Teacher not found." }, { status: 404 });
  const [removed] = db.teachers.splice(idx, 1);
  await logActivity(db, checked.user.email, "delete", "teacher", removed.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
