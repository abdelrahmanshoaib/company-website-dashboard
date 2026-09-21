import { scrypt, randomBytes, timingSafeEqual, createHmac } from "node:crypto";
import { cookies } from "next/headers";
import type { DbUser, Role } from "./academy";
import { readDb, writeDb } from "./db";

export const SESSION_COOKIE = "academy_admin_session";
const SESSION_DAYS = 7;

const SECRET = process.env.SESSION_SECRET ?? "dev-insecure-secret-set-SESSION_SECRET-in-prod";
if (!process.env.SESSION_SECRET && process.env.NODE_ENV === "production") {
  console.warn("[auth] SESSION_SECRET is not set — using an insecure default. Set it in the hosting dashboard.");
}

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16).toString("hex");
    scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(`scrypt:${salt}:${key.toString("hex")}`);
    });
  });
}

export function verifyPassword(password: string, stored: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [algo, salt, hash] = stored.split(":");
    if (algo !== "scrypt" || !salt || !hash) return resolve(false);
    scrypt(password, salt, 64, (err, key) => {
      if (err) return reject(err);
      try {
        resolve(timingSafeEqual(Buffer.from(hash, "hex"), key));
      } catch {
        resolve(false);
      }
    });
  });
}

export { hashPassword };

// ---- Stateless sessions ----
// The cookie itself carries {userId, exp}, HMAC-signed. No server-side
// session store, so auth works consistently across route chunks and
// serverless instances. Logout clears the cookie client-side.
// Trade-off: tokens stay valid until expiry (server cannot revoke without
// a denylist); deactivating the user is enforced on every request.
function b64url(input: Buffer | string): string {
  return Buffer.from(input as string).toString("base64url");
}

export function signSession(userId: string): string {
  const payload = b64url(
    JSON.stringify({ uid: userId, iat: Date.now(), exp: Date.now() + SESSION_DAYS * 864e5 })
  );
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySession(token: string): { userId: string; iat: number } | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  let expect: string;
  try {
    expect = createHmac("sha256", SECRET).update(payload).digest("base64url");
  } catch {
    return null;
  }
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  } catch {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (!data.uid || typeof data.exp !== "number" || data.exp <= Date.now()) return null;
    if (typeof data.iat !== "number") return null;
    return { userId: data.uid, iat: data.iat };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<DbUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const parsed = verifySession(token);
  if (!parsed) return null;
  const db = await readDb();
  const user = db.users.find((u) => u.id === parsed.userId && u.active);
  if (!user) return null;
  // Password changes (updatedAt) invalidate older tokens.
  if (new Date(user.updatedAt).getTime() > parsed.iat) return null;
  return user;
}

// ---- RBAC ----

export const PERMISSIONS: Record<string, Role[]> = {
  "pages:write": ["super_admin", "content_manager"],
  "services:write": ["super_admin", "content_manager"],
  "teachers:write": ["super_admin", "academic_manager"],
  "faqs:write": ["super_admin", "content_manager"],
  "blog:write": ["super_admin", "content_manager"],
  "media:write": ["super_admin", "content_manager"],
  "requests:write": ["super_admin", "admissions"],
  "requests:read": ["super_admin", "admissions", "academic_manager"],
  "settings:write": ["super_admin"],
  "users:write": ["super_admin"],
};

export function can(user: DbUser | null, permission: string): boolean {
  if (!user) return false;
  const roles = PERMISSIONS[permission];
  if (!roles) return user.role === "super_admin";
  return roles.includes(user.role);
}

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  content_manager: "Content Manager",
  admissions: "Admissions / Support",
  academic_manager: "Academic Manager",
};

// Kept for compatibility; sessions are stateless so there is nothing to destroy server-side.
export async function destroySession(): Promise<void> {
  const db = await readDb();
  const now = new Date().toISOString();
  let changed = false;
  db.sessions = db.sessions.filter((s) => {
    const keep = new Date(s.expiresAt).getTime() > Date.now();
    if (!keep) changed = true;
    return keep;
  });
  void now;
  if (changed) await writeDb(db);
}
