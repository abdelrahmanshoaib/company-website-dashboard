import { NextResponse } from "next/server";
import { readDb, writeDb, logActivity } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

// Redeem a single-use reset token issued by a super-admin (Admin → Users).
export async function POST(req: Request) {
  const { token, password } = await req.json();
  if (!token || !password || String(password).length < 8) {
    return NextResponse.json({ error: "A valid token and an 8+ character password are required." }, { status: 422 });
  }
  const db = await readDb();
  const idx = db.passwordResets.findIndex((r) => r.token === token);
  if (idx < 0) return NextResponse.json({ error: "Invalid or already-used token." }, { status: 400 });
  const reset = db.passwordResets[idx];
  if (new Date(reset.expiresAt).getTime() <= Date.now()) {
    db.passwordResets.splice(idx, 1);
    await writeDb(db);
    return NextResponse.json({ error: "Token expired. Ask an admin for a new one." }, { status: 400 });
  }
  const user = db.users.find((u) => u.id === reset.userId && u.active);
  if (!user) return NextResponse.json({ error: "Account not found or deactivated." }, { status: 404 });
  user.passwordHash = await hashPassword(String(password));
  user.updatedAt = new Date().toISOString();
  db.passwordResets.splice(idx, 1);
  db.sessions = db.sessions.filter((s) => s.userId !== user.id);
  await logActivity(db, user.email, "password-reset-redeemed", "user", user.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
