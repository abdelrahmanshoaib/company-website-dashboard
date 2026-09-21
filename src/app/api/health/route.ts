import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

// Public health check — useful after deploying (e.g. Vercel).
export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json({
      ok: true,
      services: db.services.length,
      posts: db.posts.length,
      ephemeral: Boolean(process.env.VERCEL && !process.env.ACADEMY_DB_DIR),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
