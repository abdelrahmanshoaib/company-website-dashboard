import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { DbUser, Role } from "./academy";
import { readDb, writeDb } from "./db";

export const SESSION_COOKIE = "academy_admin_session";
const SESSION_DAYS = 7;

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

export async function createSession(userId: string): Promise<string> {
  const db = await readDb();
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  db.sessions.push({ token, userId, expiresAt: expires, createdAt: new Date().toISOString() });
  // prune expired
  db.sessions = db.sessions.filter((s) => new Date(s.expiresAt).getTime() > Date.now());
  await writeDb(db);
  return token;
}

export async function getSessionUser(): Promise<DbUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await readDb();
  const session = db.sessions.find((s) => s.token === token);
  if (!session || new Date(session.expiresAt).getTime() <= Date.now()) return null;
  const user = db.users.find((u) => u.id === session.userId && u.active);
  return user ?? null;
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return;
  const db = await readDb();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  await writeDb(db);
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
