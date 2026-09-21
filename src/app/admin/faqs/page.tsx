"use client";

import { useEffect, useState } from "react";
import { BiField, AdminNotice, AdminError } from "@/components/admin-fields";
import { StatusBadge, LoadingState } from "@/components/sections";

type F = {
  id: string; category: string; order: number; published: boolean;
  question: { en: string; ar: string }; answer: { en: string; ar: string };
};

const CATS = ["General", "Quran Classes", "Children", "Arabic", "Islamic Studies", "Assessments", "Scheduling", "Technical"];

export default function FaqsAdmin() {
  const [list, setList] = useState<F[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<F | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true); setErr("");
    const res = await fetch("/api/admin/faqs");
    if (!res.ok) setErr("Failed to load FAQs.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setErr(""); setMsg("");
    const res = await fetch("/api/admin/faqs", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Save failed.");
    else { setMsg("Saved successfully."); setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">FAQs</h1>
        <button className="btn-primary !py-2 text-sm" onClick={() => { setEditing({ id: "", category: "General", order: 99, published: false, question: { en: "", ar: "" }, answer: { en: "", ar: "" } }); setMsg(""); }}>+ New FAQ</button>
      </div>
      <AdminNotice msg={msg} />
      <AdminError msg={err} retry={load} />

      {editing && (
        <form onSubmit={save} className="glass mt-4 space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="label">Category</label>
              <select className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Order</label>
              <input className="input" type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published
            </label>
          </div>
          <BiField label="Question" value={editing.question} onChange={(v) => setEditing({ ...editing, question: v })} />
          <BiField label="Answer" textarea rows={4} value={editing.answer} onChange={(v) => setEditing({ ...editing, answer: v })} />
          <div className="flex gap-2">
            <button className="btn-primary !py-2 text-sm">Save</button>
            <button type="button" className="btn-ghost !py-2 text-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-2">
        {list.map((f) => (
          <div key={f.id} className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{f.question.en}</p>
              <p className="text-xs text-gray-500">{f.category} · #{f.order}</p>
            </div>
            <StatusBadge value={f.published ? "published" : "draft"} />
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-bold" onClick={() => setEditing(f)}>Edit</button>
            <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700" onClick={() => remove(f.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
