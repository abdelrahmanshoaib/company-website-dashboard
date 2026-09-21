import { NextResponse } from "next/server";
import { readDb, writeDb, uid, logActivity } from "@/lib/db";
import { requireUser, requirePerm } from "@/lib/api-auth";
import type { FaqDoc } from "@/lib/academy";

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.faqs.sort((a, b) => a.order - b.order));
}

export async function POST(req: Request) {
  const checked = await requirePerm("faqs:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  if (!body.question?.en || !body.answer?.en) {
    return NextResponse.json({ error: "English question and answer are required." }, { status: 422 });
  }
  const db = await readDb();
  const faq: FaqDoc = {
    id: uid("faq"),
    category: body.category ?? "General",
    question: { en: body.question.en, ar: body.question.ar ?? "" },
    answer: { en: body.answer.en, ar: body.answer.ar ?? "" },
    order: Number(body.order) || db.faqs.length + 1,
    published: body.published ?? false,
  };
  db.faqs.push(faq);
  await logActivity(db, checked.user.email, "create", "faq", faq.id);
  await writeDb(db);
  return NextResponse.json(faq, { status: 201 });
}

export async function PUT(req: Request) {
  const checked = await requirePerm("faqs:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const doc = db.faqs.find((x) => x.id === body.id);
  if (!doc) return NextResponse.json({ error: "FAQ not found." }, { status: 404 });
  if (body.question) doc.question = { en: body.question.en ?? doc.question.en, ar: body.question.ar ?? doc.question.ar };
  if (body.answer) doc.answer = { en: body.answer.en ?? doc.answer.en, ar: body.answer.ar ?? doc.answer.ar };
  if (body.category) doc.category = body.category;
  if (body.published !== undefined) doc.published = body.published;
  if (body.order !== undefined) doc.order = Number(body.order);
  await logActivity(db, checked.user.email, "update", "faq", doc.id);
  await writeDb(db);
  return NextResponse.json(doc);
}

export async function DELETE(req: Request) {
  const checked = await requirePerm("faqs:write");
  if ("response" in checked) return checked.response;
  const { searchParams } = new URL(req.url);
  const db = await readDb();
  const idx = db.faqs.findIndex((x) => x.id === searchParams.get("id"));
  if (idx < 0) return NextResponse.json({ error: "FAQ not found." }, { status: 404 });
  const [removed] = db.faqs.splice(idx, 1);
  await logActivity(db, checked.user.email, "delete", "faq", removed.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
