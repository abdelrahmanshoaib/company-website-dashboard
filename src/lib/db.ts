import { promises as fs } from "node:fs";
import path from "node:path";
import type { AcademyDb } from "./academy";
import { seedDatabase } from "./seed";
import { seedPages } from "./seed-legal";

// Writable location for the JSON database.
// - Local dev: ./data/academy.db.json
// - Vercel / serverless: /tmp (ephemeral — use ACADEMY_DB_DIR or Postgres for persistence).
//
// IMPORTANT: no module-level cache. Turbopack may bundle separate copies of
// this module per route, so cached state would diverge between API routes
// and layouts. Every read hits the disk (cheap for this file size), which is
// always consistent within an instance.
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

// Last-resort in-memory copy when the disk is not writable at all.
// Only used for rendering; admin writes still apply to it for this chunk.
let memoryFallback: AcademyDb | null = null;

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(seedDatabase(), null, 2), "utf-8");
  }
}

function migrate(db: AcademyDb): boolean {
  let migrated = false;
  for (const p of seedPages) {
    if (!db.pages.some((x) => x.slug === p.slug)) {
      db.pages.push(p);
      migrated = true;
    }
  }
  if (!db.settings.timeZones?.length) {
    db.settings.timeZones = seedDatabase().settings.timeZones;
    migrated = true;
  }
  return migrated;
}

export async function readDb(): Promise<AcademyDb> {
  try {
    await ensureFile();
    const raw = await fs.readFile(DB_PATH, "utf-8");
    const db = JSON.parse(raw) as AcademyDb;
    if (migrate(db)) {
      try {
        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
      } catch {
        // read-only FS — merged copy is still returned for this request
      }
    }
    return db;
  } catch {
    if (!memoryFallback) memoryFallback = seedDatabase();
    return memoryFallback;
  }
}

export async function writeDb(db: AcademyDb): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    const tmp = `${DB_PATH}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf-8");
    await fs.rename(tmp, DB_PATH);
    memoryFallback = null;
  } catch {
    // No writable disk: keep serving the updated copy in memory.
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
