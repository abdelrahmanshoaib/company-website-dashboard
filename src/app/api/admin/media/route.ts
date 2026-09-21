import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { readDb, writeDb, uid, logActivity } from "@/lib/db";
import { requireUser, requirePerm } from "@/lib/api-auth";

const MAX_BYTES = 5 * 1024 * 1024;

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.media.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export async function POST(req: Request) {
  const checked = await requirePerm("media:write");
  if ("response" in checked) return checked.response;
  const form = await req.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") ?? "").slice(0, 300);
  const category = String(form.get("category") ?? "general").slice(0, 100);
  if (!(file instanceof File)) return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed." }, { status: 422 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File must be 5 MB or smaller." }, { status: 422 });
  }
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const fileName = `${Date.now()}_${safe}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, fileName), buf);

  const db = await readDb();
  const doc = {
    id: uid("media"),
    fileName,
    url: `/uploads/${fileName}`,
    alt: alt || fileName,
    mime: file.type,
    size: file.size,
    category,
    createdAt: new Date().toISOString(),
  };
  db.media.push(doc);
  await logActivity(db, checked.user.email, "upload", "media", doc.id);
  await writeDb(db);
  return NextResponse.json(doc, { status: 201 });
}

export async function DELETE(req: Request) {
  const checked = await requirePerm("media:write");
  if ("response" in checked) return checked.response;
  const { searchParams } = new URL(req.url);
  const db = await readDb();
  const idx = db.media.findIndex((m) => m.id === searchParams.get("id"));
  if (idx < 0) return NextResponse.json({ error: "Media not found." }, { status: 404 });
  const [removed] = db.media.splice(idx, 1);
  try {
    await fs.unlink(path.join(process.cwd(), "public", removed.url));
  } catch {
    // file already gone — record removal is what matters
  }
  await logActivity(db, checked.user.email, "delete", "media", removed.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
