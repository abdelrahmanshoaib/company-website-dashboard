import { NextResponse } from "next/server";
import { getUsers, addUser, deleteUser } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getUsers());
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "الاسم والبريد مطلوبان" }, { status: 400 });
  }
  const created = addUser({
    name: body.name,
    email: body.email,
    role: body.role ?? "viewer",
    status: body.status ?? "pending",
  });
  return NextResponse.json(created);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
  deleteUser(id);
  return NextResponse.json({ ok: true });
}
