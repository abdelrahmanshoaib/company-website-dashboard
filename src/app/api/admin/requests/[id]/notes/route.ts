import { NextResponse } from "next/server";
import { readDb, writeDb, uid } from "@/lib/db";
import { requirePerm } from "@/lib/api-auth";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const checked = await requirePerm("requests:read");
  if ("response" in checked) return checked.response;
  const { id } = await params;
  const db = await readDb();
  return NextResponse.json(db.notes.filter((n) => n.requestId === id));
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const checked = await requirePerm("requests:write");
  if ("response" in checked) return checked.response;
  const { id } = await params;
  const { body } = await req.json();
  if (!body?.trim()) return NextResponse.json({ error: "Note body is required." }, { status: 422 });
  const db = await readDb();
  const note = {
    id: uid("note"),
    requestId: id,
    author: checked.user.email,
    body: String(body).slice(0, 5000),
    createdAt: new Date().toISOString(),
  };
  db.notes.push(note);
  await writeDb(db);
  return NextResponse.json(note, { status: 201 });
}
