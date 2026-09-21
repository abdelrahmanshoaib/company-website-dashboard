import { NextResponse } from "next/server";
import { getSessionUser, can } from "./auth";
import type { DbUser } from "./academy";

export async function requireUser(): Promise<{ user: DbUser } | { response: NextResponse }> {
  const user = await getSessionUser();
  if (!user) return { response: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  return { user };
}

export async function requirePerm(
  permission: string
): Promise<{ user: DbUser } | { response: NextResponse }> {
  const checked = await requireUser();
  if ("response" in checked) return checked;
  if (!can(checked.user, permission)) {
    return { response: NextResponse.json({ error: "forbidden" }, { status: 403 }) };
  }
  return checked;
}
