import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";
import { requireUser } from "@/lib/api-auth";

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  return NextResponse.json(db.activity.slice(0, 100));
}
