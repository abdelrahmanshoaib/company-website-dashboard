import { NextResponse } from "next/server";
import { getPages, upsertPage, deletePage } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getPages());
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "slug و title مطلوبان" }, { status: 400 });
  }
  upsertPage(body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug مطلوب" }, { status: 400 });
  deletePage(slug);
  return NextResponse.json({ ok: true });
}
