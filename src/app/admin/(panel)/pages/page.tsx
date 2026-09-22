"use client";

import { useEffect, useState } from "react";
import { BiField, AdminNotice, AdminError } from "@/components/admin-fields";
import { StatusBadge, LoadingState } from "@/components/sections";

type Page = {
  id: string; slug: string;
  title: { en: string; ar: string };
  metaTitle: { en: string; ar: string };
  metaDescription: { en: string; ar: string };
  content: { en: string; ar: string };
  status: string;
};

const blank = (): Page => ({
  id: "", slug: "", title: { en: "", ar: "" }, metaTitle: { en: "", ar: "" },
  metaDescription: { en: "", ar: "" }, content: { en: "", ar: "" }, status: "draft",
});

export default function PagesAdmin() {
  const [list, setList] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Page | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/pages");
    if (!res.ok) setErr("Failed to load pages.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setErr(""); setMsg("");
    const method = editing.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/pages", {
      method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Save failed.");
    else { setMsg("Saved successfully."); setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this page?")) return;
    await fetch(`/api/admin/pages?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Pages</h1>
        <button className="btn-primary !py-2 text-sm" onClick={() => { setEditing(blank()); setMsg(""); }}>+ New page</button>
      </div>
      <AdminNotice msg={msg} />
      <AdminError msg={err} retry={load} />

      {editing && (
        <form onSubmit={save} className="glass mt-4 space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Slug</label>
              <input className="input" dir="ltr" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} required />
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
          <BiField label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <BiField label="Content (blank line = new paragraph)" textarea rows={8} value={editing.content} onChange={(v) => setEditing({ ...editing, content: v })} />
          <p className="rounded-xl bg-purple-50 px-4 py-2 text-xs text-[var(--color-muted)]">
            To embed ad/HTML code with its own styling, wrap it in fenced blocks: <code dir="ltr">```embed</code> …your HTML + <code dir="ltr">&lt;style&gt;</code>… <code dir="ltr">```</code>. Scripts are stripped for security.
          </p>
          <BiField label="Meta title (SEO)" value={editing.metaTitle} onChange={(v) => setEditing({ ...editing, metaTitle: v })} />
          <BiField label="Meta description (SEO)" textarea rows={2} value={editing.metaDescription} onChange={(v) => setEditing({ ...editing, metaDescription: v })} />
          <div className="flex gap-2">
            <button className="btn-primary !py-2 text-sm">Save</button>
            <button type="button" className="btn-ghost !py-2 text-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-2">
        {list.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{p.title.en} <span className="text-xs font-normal text-gray-400">/{p.slug}</span></p>
              <StatusBadge value={p.status} />
            </div>
            <a href={`/p/${p.slug}`} target="_blank" className="text-sm font-bold text-[var(--color-primary)]">Preview</a>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-bold" onClick={() => setEditing(p)}>Edit</button>
            <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700" onClick={() => remove(p.id)}>Delete</button>
          </div>
        ))}
        {list.length === 0 && <p className="rounded-2xl border bg-white/70 p-8 text-center text-sm">No pages yet.</p>}
      </div>
    </div>
  );
}
