import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";
import { requireUser } from "@/lib/api-auth";

export async function GET() {
  const checked = await requireUser();
  if ("response" in checked) return checked.response;
  const db = await readDb();
  const freshRequests = db.requests.filter((r) => r.status === "new").length;
  const pending = db.requests.filter((r) => ["under_review", "contacted", "assessment_scheduled"].includes(r.status)).length;
  return NextResponse.json({
    newRequests: freshRequests,
    pending,
    publishedPages: db.pages.filter((p) => p.status === "published").length,
    draftPages: db.pages.filter((p) => p.status === "draft").length,
    publishedPosts: db.posts.filter((p) => p.status === "published").length,
    activeTeachers: db.teachers.filter((x) => x.published).length,
    totalRequests: db.requests.length,
    recent: db.activity.slice(0, 10),
  });
}
