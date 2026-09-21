import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb, writeDb, logActivity } from "@/lib/db";
import { verifyPassword, signSession, SESSION_COOKIE, destroySession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }
  const db = await readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || !(await verifyPassword(String(password), user.passwordHash))) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }
  if (!user.active) {
    return NextResponse.json({ error: "This account is deactivated." }, { status: 403 });
  }
  const token = signSession(user.id);
  const fresh = await readDb();
  await logActivity(fresh, user.email, "login", "session", user.id);
  await writeDb(fresh);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 7 * 86400,
  });
  return NextResponse.json({ ok: true, role: user.role, name: user.name });
}

export async function DELETE() {
  await destroySession();
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
