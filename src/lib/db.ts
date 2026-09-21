import { promises as fs } from "node:fs";
import path from "node:path";
import type { AcademyDb } from "./academy";
import { seedDatabase } from "./seed";

const DB_PATH = path.join(process.cwd(), "data", "academy.db.json");

let cache: AcademyDb | null = null;

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(seedDatabase(), null, 2), "utf-8");
  }
}

export async function readDb(): Promise<AcademyDb> {
  if (cache) return cache;
  await ensureFile();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  cache = JSON.parse(raw) as AcademyDb;
  return cache;
}

export async function writeDb(db: AcademyDb): Promise<void> {
  cache = db;
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  const tmp = `${DB_PATH}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf-8");
  await fs.rename(tmp, DB_PATH);
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function logActivity(
  db: AcademyDb,
  actor: string,
  action: string,
  entity: string,
  entityId: string
): Promise<void> {
  db.activity.unshift({
    id: uid("log"),
    actor,
    action,
    entity,
    entityId,
    createdAt: new Date().toISOString(),
  });
  db.activity = db.activity.slice(0, 500);
}
