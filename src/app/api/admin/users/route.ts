import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { readDb, writeDb, uid, logActivity } from "@/lib/db";
import { requirePerm, requireUser } from "@/lib/api-auth";
import { hashPassword } from "@/lib/auth";
import type { Role } from "@/lib/academy";

const ROLES: Role[] = ["super_admin", "content_manager", "admissions", "academic_manager"];

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  // Never expose password hashes or reset tokens
  return NextResponse.json(
    db.users.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, active: u.active, createdAt: u.createdAt }))
  );
}

export async function POST(req: Request) {
  const checked = await requirePerm("users:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  if (!body.name || !body.email || !body.password || !ROLES.includes(body.role)) {
    return NextResponse.json({ error: "Name, email, password and a valid role are required." }, { status: 422 });
  }
  if (String(body.password).length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 422 });
  }
  const db = await readDb();
  if (db.users.some((u) => u.email.toLowerCase() === String(body.email).toLowerCase())) {
    return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
  }
  const now = new Date().toISOString();
  const user = {
    id: uid("user"),
    name: String(body.name).slice(0, 200),
    email: String(body.email).toLowerCase().slice(0, 300),
    passwordHash: await hashPassword(String(body.password)),
    role: body.role as Role,
    active: true,
    createdAt: now,
    updatedAt: now,
  };
  db.users.push(user);
  await logActivity(db, checked.user.email, "create", "user", user.id);
  await writeDb(db);
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role }, { status: 201 });
}

export async function PUT(req: Request) {
  const checked = await requirePerm("users:write");
  if ("response" in checked) return checked.response;
  const body = await req.json();
  const db = await readDb();
  const user = db.users.find((u) => u.id === body.id);
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
  if (user.id === checked.user.id && body.active === false) {
    return NextResponse.json({ error: "You cannot deactivate your own account." }, { status: 422 });
  }
  if (body.role && ROLES.includes(body.role)) user.role = body.role;
  if (body.active !== undefined) user.active = Boolean(body.active);
  if (body.password) {
    if (String(body.password).length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 422 });
    }
    user.passwordHash = await hashPassword(String(body.password));
  }
  user.updatedAt = new Date().toISOString();
  await logActivity(db, checked.user.email, "update", "user", user.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}

// Admin-initiated password reset: generates a single-use token shown once.
// (Email delivery is integration-ready — no email provider is configured yet,
// so the token is returned to the requesting super-admin over the authed API.)
export async function PATCH(req: Request) {
  const checked = await requirePerm("users:write");
  if ("response" in checked) return checked.response;
  const { id } = await req.json();
  const db = await readDb();
  const user = db.users.find((u) => u.id === id);
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
  const token = randomBytes(24).toString("hex");
  db.passwordResets.push({ token, userId: id, expiresAt: new Date(Date.now() + 3600e3).toISOString() });
  await logActivity(db, checked.user.email, "password-reset-issued", "user", id);
  await writeDb(db);
  return NextResponse.json({ resetToken: token, note: "Single-use, expires in 1 hour. Deliver it to the user securely." });
}
