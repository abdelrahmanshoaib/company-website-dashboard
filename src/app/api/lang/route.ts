import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LANG_COOKIE } from "@/lib/lang";

export async function POST(req: Request) {
  const { lang } = await req.json();
  if (lang !== "en" && lang !== "ar") {
    return NextResponse.json({ error: "invalid lang" }, { status: 400 });
  }
  const jar = await cookies();
  jar.set(LANG_COOKIE, lang, { path: "/", maxAge: 31536000 });
  return NextResponse.json({ ok: true });
}
