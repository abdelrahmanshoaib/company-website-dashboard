"use client";

import { useEffect, useState } from "react";
import { BiField, BiListField, AdminNotice, AdminError } from "@/components/admin-fields";
import { StatusBadge, LoadingState } from "@/components/sections";

type Svc = {
  id: string; slug: string; icon: string; order: number; featured: boolean; active: boolean; status: string;
  name: { en: string; ar: string }; short: { en: string; ar: string }; content: { en: string; ar: string };
  outcomes: { en: string; ar: string }[]; audience: { en: string; ar: string }[]; curriculum: { en: string; ar: string }[];
  metaTitle: { en: string; ar: string }; metaDescription: { en: string; ar: string };
};

const B = { en: "", ar: "" };
const blank = (): Svc => ({
  id: "", slug: "", icon: "📖", order: 99, featured: true, active: true, status: "draft",
  name: { ...B }, short: { ...B }, content: { ...B },
  outcomes: [], audience: [], curriculum: [], metaTitle: { ...B }, metaDescription: { ...B },
});

export default function ServicesAdmin() {
  const [list, setList] = useState<Svc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Svc | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true); setErr("");
    const res = await fetch("/api/admin/services");
    if (!res.ok) setErr("Failed to load services.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setErr(""); setMsg("");
    const res = await fetch("/api/admin/services", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Save failed.");
    else { setMsg("Saved successfully."); setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Services</h1>
        <button className="btn-primary !py-2 text-sm" onClick={() => { setEditing(blank()); setMsg(""); }}>+ New service</button>
      </div>
      <AdminNotice msg={msg} />
      <AdminError msg={err} retry={load} />

      {editing && (
        <form onSubmit={save} className="glass mt-4 space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="label">Slug</label>
              <input className="input" dir="ltr" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} required />
            </div>
            <div>
              <label className="label">Icon (emoji)</label>
              <input className="input" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} />
            </div>
            <div>
              <label className="label">Order</label>
              <input className="input" type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} />
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <BiField label="Service name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
          <BiField label="Short description (card)" textarea rows={2} value={editing.short} onChange={(v) => setEditing({ ...editing, short: v })} />
          <BiField label="Full content" textarea rows={5} value={editing.content} onChange={(v) => setEditing({ ...editing, content: v })} />
          <div className="grid gap-4 md:grid-cols-3">
            <BiListField label="Learning outcomes" value={editing.outcomes} onChange={(v) => setEditing({ ...editing, outcomes: v })} />
            <BiListField label="Target audience" value={editing.audience} onChange={(v) => setEditing({ ...editing, audience: v })} />
            <BiListField label="Curriculum topics" value={editing.curriculum} onChange={(v) => setEditing({ ...editing, curriculum: v })} />
          </div>
          <BiField label="Meta title (SEO)" value={editing.metaTitle} onChange={(v) => setEditing({ ...editing, metaTitle: v })} />
          <BiField label="Meta description (SEO)" textarea rows={2} value={editing.metaDescription} onChange={(v) => setEditing({ ...editing, metaDescription: v })} />
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <label className="flex items-center gap-2"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured on homepage</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} /> Active</label>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary !py-2 text-sm">Save</button>
            <button type="button" className="btn-ghost !py-2 text-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-2">
        {list.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-3">
            <span className="text-2xl">{s.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{s.name.en} <span className="text-xs font-normal text-gray-400">/{s.slug} · #{s.order}</span></p>
              <StatusBadge value={s.status} />
            </div>
            <a href={`/programs/${s.slug}`} target="_blank" className="text-sm font-bold text-[var(--color-primary)]">Preview</a>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-bold" onClick={() => setEditing(s)}>Edit</button>
            <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700" onClick={() => remove(s.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
