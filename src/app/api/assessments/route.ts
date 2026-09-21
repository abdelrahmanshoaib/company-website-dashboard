import { NextResponse } from "next/server";
import { readDb, writeDb, uid } from "@/lib/db";

const EMAIL = /^\S+@\S+\.\S+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");
  const fullName = str(body.fullName);
  const email = str(body.email).toLowerCase();
  const country = str(body.country);
  const goals = str(body.goals);

  if (!fullName || !EMAIL.test(email) || !country || !goals || body.consent !== true) {
    return NextResponse.json({ error: "Please complete all required fields with a valid email and consent." }, { status: 422 });
  }

  const db = await readDb();

  // Duplicate prevention: same email + program within 24h
  const dayAgo = Date.now() - 864e5;
  const dupe = db.requests.find(
    (r) => r.email === email && r.program === str(body.program) && new Date(r.createdAt).getTime() > dayAgo
  );
  if (dupe) return NextResponse.json({ error: "duplicate", duplicate: true }, { status: 409 });

  const now = new Date().toISOString();
  db.requests.unshift({
    id: uid("req"),
    fullName,
    email,
    phone: str(body.phone),
    country,
    category: str(body.category) || "adult",
    ageRange: str(body.ageRange),
    preferredLanguage: str(body.preferredLanguage),
    program: str(body.program) || "quran-classes",
    level: str(body.level),
    goals,
    days: str(body.days),
    timeRange: str(body.timeRange),
    timeZone: str(body.timeZone),
    notes: str(body.notes),
    consent: true,
    status: "new",
    assignee: "",
    createdAt: now,
    updatedAt: now,
  });
  await writeDb(db);
  // NOTE: staff notification (email/SMS) is integration-ready — configure an
  // email provider and hook it here. Requests are securely stored meanwhile.
  return NextResponse.json({ ok: true });
}
