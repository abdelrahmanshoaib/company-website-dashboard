"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/pages", label: "Pages", icon: "📄" },
  { href: "/admin/services", label: "Services", icon: "🧩" },
  { href: "/admin/teachers", label: "Teachers", icon: "👩‍🏫" },
  { href: "/admin/faqs", label: "FAQs", icon: "❓" },
  { href: "/admin/blog", label: "Blog", icon: "✍️" },
  { href: "/admin/media", label: "Media Library", icon: "🖼️" },
  { href: "/admin/requests", label: "Assessment Requests", icon: "📥" },
  { href: "/admin/settings", label: "Site Settings", icon: "⚙️" },
  { href: "/admin/users", label: "Users & Roles", icon: "👥" },
  { href: "/admin/activity", label: "Activity Log", icon: "📜" },
];

export default function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav className="space-y-1 text-sm" aria-label="Admin">
      {ITEMS.map((i) => {
        const active = i.href === "/admin" ? pathname === "/admin" : pathname.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 font-semibold ${active ? "bg-[var(--color-primary)] text-white" : "hover:bg-white"}`}
          >
            <span aria-hidden>{i.icon}</span> {i.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-e bg-white/70 p-5 backdrop-blur lg:flex">
        <Link href="/admin" className="font-display text-lg font-bold">Admin Panel</Link>
        <p className="mt-1 truncate text-xs text-[var(--color-muted)]">{user.name} · {user.role}</p>
        <div className="mt-5 flex-1">{nav}</div>
        <Link href="/" className="mt-4 block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-white">🌐 View website</Link>
        <button onClick={logout} className="mt-1 w-full rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-700">Logout</button>
      </aside>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3 border-b bg-white/70 px-4 py-3 backdrop-blur lg:hidden">
          <span className="font-display font-bold">Admin Panel</span>
          <button onClick={() => setOpen((v) => !v)} className="rounded-lg border px-3 py-1.5" aria-expanded={open}>
            {open ? "✕" : "☰"}
          </button>
        </div>
        {open && <div className="border-b bg-white/90 p-4 lg:hidden">{nav}</div>}
        <main className="mx-auto max-w-6xl p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
