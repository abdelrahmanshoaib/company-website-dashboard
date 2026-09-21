import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { StatusBadge } from "@/components/sections";

export default async function AdminOverview() {
  const user = await getSessionUser();
  const db = await readDb();
  const fresh = db.requests.filter((r) => r.status === "new");
  const cards = [
    { label: "New assessment requests", value: fresh.length, href: "/admin/requests?status=new" },
    { label: "Pending inquiries", value: db.requests.filter((r) => ["under_review", "contacted", "assessment_scheduled"].includes(r.status)).length, href: "/admin/requests" },
    { label: "Published pages", value: db.pages.filter((p) => p.status === "published").length, href: "/admin/pages" },
    { label: "Draft pages", value: db.pages.filter((p) => p.status === "draft").length, href: "/admin/pages" },
    { label: "Published posts", value: db.posts.filter((p) => p.status === "published").length, href: "/admin/blog" },
    { label: "Active teachers", value: db.teachers.filter((x) => x.published).length, href: "/admin/teachers" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-sm text-[var(--color-muted)]">Role: {user?.role}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="glass glass-card block p-5">
            <p className="text-sm text-[var(--color-muted)]">{c.label}</p>
            <p className="font-display mt-1 text-4xl font-bold">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="glass rounded-3xl p-6">
          <h2 className="font-bold">Latest assessment requests</h2>
          {db.requests.slice(0, 5).length === 0 ? (
            <p className="mt-3 text-sm text-[var(--color-muted)]">No data yet — new items will appear here.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {db.requests.slice(0, 5).map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2">
                  <span className="truncate">{r.fullName} · {r.program}</span>
                  <StatusBadge value={r.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="glass rounded-3xl p-6">
          <h2 className="font-bold">Recent activity</h2>
          {db.activity.slice(0, 8).length === 0 ? (
            <p className="mt-3 text-sm text-[var(--color-muted)]">No data yet — new items will appear here.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {db.activity.slice(0, 8).map((a) => (
                <li key={a.id} className="rounded-xl bg-white px-3 py-2">
                  <span className="font-semibold">{a.actor}</span> {a.action} <span className="text-[var(--color-muted)]">{a.entity}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
