import { NextResponse } from "next/server";
import { readDb, writeDb, logActivity } from "@/lib/db";
import { requireUser, requirePerm } from "@/lib/api-auth";

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.settings);
}

export async function PUT(req: Request) {
  const checked = await requirePerm("settings:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const s = db.settings;
  if (body.academyName) {
    s.academyName = { en: body.academyName.en ?? s.academyName.en, ar: body.academyName.ar ?? s.academyName.ar };
  }
  if (body.tagline) {
    s.tagline = { en: body.tagline.en ?? s.tagline.en, ar: body.tagline.ar ?? s.tagline.ar };
  }
  if (body.footerNote) {
    s.footerNote = { en: body.footerNote.en ?? s.footerNote.en, ar: body.footerNote.ar ?? s.footerNote.ar };
  }
  for (const k of ["contactEmail", "contactPhone", "whatsapp"] as const) {
    if (body[k] !== undefined) s[k] = String(body[k]).slice(0, 300);
  }
  if (body.social) s.social = { ...s.social, ...body.social };
  if (body.defaultLang === "en" || body.defaultLang === "ar") s.defaultLang = body.defaultLang;
  if (Array.isArray(body.timeZones)) s.timeZones = body.timeZones.slice(0, 20);
  if (body.colors) s.colors = { ...s.colors, ...body.colors };
  await logActivity(db, checked.user.email, "update", "settings", "site");
  await writeDb(db);
  return NextResponse.json(s);
}
