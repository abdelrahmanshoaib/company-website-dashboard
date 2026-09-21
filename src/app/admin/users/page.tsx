"use client";

import { useEffect, useState } from "react";
import { AdminNotice, AdminError } from "@/components/admin-fields";
import { LoadingState } from "@/components/sections";

type U = { id: string; name: string; email: string; role: string; active: boolean };

const ROLES = ["super_admin", "content_manager", "admissions", "academic_manager"];

export default function UsersAdmin() {
  const [list, setList] = useState<U[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "content_manager" });
  const [resetToken, setResetToken] = useState("");

  async function load() {
    setLoading(true); setErr("");
    const res = await fetch("/api/admin/users");
    if (!res.ok) setErr(res.status === 403 ? "Only super admins can manage users." : "Failed to load.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setMsg("");
    const res = await fetch("/api/admin/users", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Create failed.");
    else { setMsg(`User ${data.email} created.`); setForm({ name: "", email: "", password: "", role: "content_manager" }); load(); }
  }

  async function update(id: string, patch: Record<string, unknown>) {
    const res = await fetch("/api/admin/users", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Update failed.");
    else { setMsg("Updated."); load(); }
  }

  async function issueReset(id: string) {
    setResetToken("");
    const res = await fetch("/api/admin/users", {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Failed.");
    else setResetToken(data.resetToken);
  }

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Users & Roles</h1>
      <AdminNotice msg={msg} />
      <AdminError msg={err} retry={load} />
      {resetToken && (
        <p className="mt-3 rounded-2xl bg-yellow-50 p-4 text-sm break-all" role="status">
          Single-use reset token (expires in 1 hour) — deliver securely: <code dir="ltr">{resetToken}</code>
        </p>
      )}

      <form onSubmit={create} className="glass mt-4 grid gap-3 rounded-3xl p-5 md:grid-cols-5">
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="input" placeholder="Email" type="email" dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="input" placeholder="Password (8+ chars)" type="password" dir="ltr" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <button className="btn-primary !py-2 text-sm">Add user</button>
      </form>

      <div className="mt-4 space-y-2">
        {list.map((u) => (
          <div key={u.id} className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-sm">
            <div className="min-w-0 flex-1">
              <p className="font-bold">{u.name} <span className="font-normal text-gray-500">{u.email}</span></p>
              <p className="text-xs text-gray-500">{u.role} · {u.active ? "active" : "deactivated"}</p>
            </div>
            <select className="rounded-lg border px-2 py-1.5" value={u.role} onChange={(e) => update(u.id, { role: e.target.value })}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 font-bold" onClick={() => update(u.id, { active: !u.active })}>
              {u.active ? "Deactivate" : "Activate"}
            </button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 font-bold" onClick={() => {
              const pw = prompt("New password (8+ chars) for " + u.email);
              if (pw) update(u.id, { password: pw });
            }}>Set password</button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 font-bold" onClick={() => issueReset(u.id)}>Reset token</button>
          </div>
        ))}
      </div>

      <section className="glass mt-6 rounded-3xl p-5 text-sm">
        <h2 className="font-bold">Role permissions</h2>
        <ul className="mt-2 list-disc ps-5 text-[var(--color-muted)]">
          <li>Super Admin — everything, including settings and users.</li>
          <li>Content Manager — pages, services, FAQs, blog, media.</li>
          <li>Admissions / Support — assessment requests (read + update).</li>
          <li>Academic Manager — teachers + read requests.</li>
        </ul>
      </section>
    </div>
  );
}
