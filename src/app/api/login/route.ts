import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === "admin@company.com" && password === "admin123") {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("site_session", "admin-logged-in", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  }
  return NextResponse.json({ error: "بيانات خاطئة" }, { status: 401 });
}
