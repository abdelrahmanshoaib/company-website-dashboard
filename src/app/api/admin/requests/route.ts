import { NextResponse } from "next/server";
import { readDb, writeDb, logActivity } from "@/lib/db";
import { requirePerm } from "@/lib/api-auth";
import type { RequestStatus } from "@/lib/academy";

const STATUSES: RequestStatus[] = ["new", "under_review", "contacted", "assessment_scheduled", "enrolled", "closed", "archived"];

export async function GET(req: Request) {
  const checked = await requirePerm("requests:read");
  if ("response" in checked) return checked.response;
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const q = (searchParams.get("q") ?? "").toLowerCase();
  const db = await readDb();
  let list = [...db.requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (status && status !== "all") list = list.filter((r) => r.status === status);
  if (q) list = list.filter((r) => `${r.fullName} ${r.email}`.toLowerCase().includes(q));
  return NextResponse.json(list);
}

export async function PUT(req: Request) {
  const checked = await requirePerm("requests:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const doc = db.requests.find((r) => r.id === body.id);
  if (!doc) return NextResponse.json({ error: "Request not found." }, { status: 404 });
  if (body.status && STATUSES.includes(body.status)) doc.status = body.status;
  if (body.assignee !== undefined) doc.assignee = String(body.assignee).slice(0, 200);
  doc.updatedAt = new Date().toISOString();
  await logActivity(db, checked.user.email, `request:${doc.status}`, "request", doc.id);
  await writeDb(db);
  return NextResponse.json(doc);
}
