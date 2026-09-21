import { promises as fs } from "node:fs";
import path from "node:path";
import type { AcademyDb } from "./academy";
import { seedDatabase } from "./seed";
import { seedPages } from "./seed-legal";

// Writable location for the JSON database.
// - Local dev: ./data/academy.db.json
// - Vercel / serverless: the filesystem is read-only except /tmp, so we fall
//   back to /tmp (ephemeral — use ACADEMY_DB_DIR or Postgres for persistence).
//   NOTE: on serverless, data resets between deployments/instances.
function resolveDbPath(): string {
  if (process.env.ACADEMY_DB_DIR) {
    return path.join(process.env.ACADEMY_DB_DIR, "academy.db.json");
  }
  if (process.env.VERCEL) {
    return path.join("/tmp", "academy-data", "academy.db.json");
  }
  return path.join(process.cwd(), "data", "academy.db.json");
}

const DB_PATH = resolveDbPath();

let cache: AcademyDb | null = null;
// If the primary path is not writable (e.g. read-only serverless FS),
// fall back to an in-memory seeded database so the site still renders.
let memoryFallback: AcademyDb | null = null;

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
  if (memoryFallback) return memoryFallback;
  try {
    await ensureFile();
    const raw = await fs.readFile(DB_PATH, "utf-8");
    cache = JSON.parse(raw) as AcademyDb;
    // Migrate: add seed pages missing from older databases (never overwrite).
    let migrated = false;
    for (const p of seedPages) {
      if (!cache.pages.some((x) => x.slug === p.slug)) {
        cache.pages.push(p);
        migrated = true;
      }
    }
    if (!cache.settings.timeZones?.length) {
      cache.settings.timeZones = seedDatabase().settings.timeZones;
      migrated = true;
    }
    if (migrated) {
      try {
        await fs.writeFile(DB_PATH, JSON.stringify(cache, null, 2), "utf-8");
      } catch {
        // read-only FS — merged copy stays in memory for this instance
      }
    }
    return cache;
  } catch {
    // Read-only filesystem or any FS failure → serve seeded in-memory DB.
    memoryFallback = seedDatabase();
    return memoryFallback;
  }
}

export async function writeDb(db: AcademyDb): Promise<void> {
  cache = db;
  if (memoryFallback) {
    // No writable disk: keep serving the in-memory copy for this instance.
    memoryFallback = db;
    return;
  }
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    const tmp = `${DB_PATH}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf-8");
    await fs.rename(tmp, DB_PATH);
  } catch {
    memoryFallback = db;
  }
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
