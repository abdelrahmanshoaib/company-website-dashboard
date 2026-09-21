"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StatusBadge, LoadingState, EmptyState } from "@/components/sections";
import { AdminError } from "@/components/admin-fields";

type R = {
  id: string; fullName: string; email: string; phone: string; country: string;
  category: string; ageRange: string; preferredLanguage: string; program: string;
  level: string; goals: string; days: string; timeRange: string; timeZone: string;
  notes: string; status: string; assignee: string; createdAt: string;
};

type N = { id: string; author: string; body: string; createdAt: string };

const STATUSES = ["all", "new", "under_review", "contacted", "assessment_scheduled", "enrolled", "closed", "archived"];

function Crm() {
  const params = useSearchParams();
  const [status, setStatus] = useState(params.get("status") ?? "all");
  const [q, setQ] = useState("");
  const [list, setList] = useState<R[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState<R | null>(null);
  const [notes, setNotes] = useState<N[]>([]);
  const [noteDraft, setNoteDraft] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setErr("");
    const res = await fetch(`/api/admin/requests?status=${status}&q=${encodeURIComponent(q)}`);
    if (!res.ok) setErr(res.status === 403 ? "Your role cannot manage requests." : "Failed to load.");
    else setList(await res.json());
    setLoading(false);
  }, [status, q]);

  useEffect(() => { load(); }, [load]);

  async function open(r: R) {
    setSelected(r);
    const res = await fetch(`/api/admin/requests/${r.id}/notes`);
    if (res.ok) setNotes(await res.json());
  }

  async function update(patch: Partial<R>) {
    if (!selected) return;
    const res = await fetch("/api/admin/requests", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id, ...patch }),
    });
    if (res.ok) {
      const updated = await res.json();
      setSelected(updated);
      load();
    }
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !noteDraft.trim()) return;
    const res = await fetch(`/api/admin/requests/${selected.id}/notes`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: noteDraft }),
    });
    if (res.ok) {
      const created = await res.json();
      setNotes((n) => [...n, created]);
      setNoteDraft("");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Assessment Requests</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <select className="input !w-auto" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
        </select>
        <input className="input !w-64" placeholder="Search name/email…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <AdminError msg={err} retry={load} />
      {loading ? <div className="mt-4"><LoadingState lang="en" /></div> : list.length === 0 ? (
        <div className="mt-4"><EmptyState lang="en" /></div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Program</th>
                <th className="p-3 text-left">Country</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Received</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="cursor-pointer border-t hover:bg-purple-50/50" onClick={() => open(r)}>
                  <td className="p-3 font-semibold">{r.fullName}<br /><span className="font-normal text-gray-500">{r.email}</span></td>
                  <td className="p-3">{r.program}</td>
                  <td className="p-3">{r.country}</td>
                  <td className="p-3"><StatusBadge value={r.status} /></td>
                  <td className="p-3 text-gray-500">{r.createdAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="glass mt-4 rounded-3xl p-6" role="dialog" aria-label="Request details">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">{selected.fullName}</h2>
            <button className="rounded-lg border px-3 py-1" onClick={() => setSelected(null)}>✕</button>
          </div>
          <dl className="mt-4 grid gap-2 text-sm md:grid-cols-2">
            {[["Email", selected.email], ["Phone", selected.phone || "—"], ["Country", selected.country],
              ["Category", selected.category], ["Age", selected.ageRange], ["Language", selected.preferredLanguage],
              ["Program", selected.program], ["Level", selected.level], ["Days", selected.days || "—"],
              ["Time", `${selected.timeRange || "—"} (${selected.timeZone})`]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white px-3 py-2"><dt className="text-xs text-gray-500">{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-3 rounded-xl bg-white px-3 py-2 text-sm"><p className="text-xs text-gray-500">Goals</p><p>{selected.goals}</p></div>
          {selected.notes && <div className="mt-2 rounded-xl bg-white px-3 py-2 text-sm"><p className="text-xs text-gray-500">Extra notes</p><p>{selected.notes}</p></div>}

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <label className="label">Status</label>
              <select className="input" value={selected.status} onChange={(e) => update({ status: e.target.value })}>
                {STATUSES.filter((s) => s !== "all").map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Assignee</label>
              <input className="input" value={selected.assignee} onChange={(e) => setSelected({ ...selected, assignee: e.target.value })} onBlur={(e) => update({ assignee: e.target.value })} placeholder="staff name/email" />
            </div>
          </div>

          <h3 className="mt-5 font-bold">Internal notes</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {notes.map((n) => (
              <li key={n.id} className="rounded-xl bg-white px-3 py-2">
                <p>{n.body}</p>
                <p className="mt-1 text-xs text-gray-500">{n.author} · {n.createdAt.slice(0, 16).replace("T", " ")}</p>
              </li>
            ))}
            {notes.length === 0 && <li className="text-sm text-gray-500">No notes yet.</li>}
          </ul>
          <form onSubmit={addNote} className="mt-2 flex gap-2">
            <input className="input" value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} placeholder="Add an internal note…" />
            <button className="btn-primary shrink-0 !py-2 text-sm">Add</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function RequestsAdmin() {
  return (
    <Suspense>
      <Crm />
    </Suspense>
  );
}
