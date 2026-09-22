"use client";

import { useEffect, useState } from "react";
import { BiField, AdminNotice, AdminError } from "@/components/admin-fields";
import { StatusBadge, LoadingState } from "@/components/sections";

type P = {
  id: string; slug: string; category: string; author: string; status: string; tags: string[];
  title: { en: string; ar: string }; excerpt: { en: string; ar: string }; content: { en: string; ar: string };
  metaTitle: { en: string; ar: string }; metaDescription: { en: string; ar: string };
};

const B = { en: "", ar: "" };

export default function BlogAdmin() {
  const [list, setList] = useState<P[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<P | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true); setErr("");
    const res = await fetch("/api/admin/posts");
    if (!res.ok) setErr("Failed to load articles.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setErr(""); setMsg("");
    const res = await fetch("/api/admin/posts", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Save failed.");
    else { setMsg("Saved successfully."); setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this article?")) return;
    await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Blog</h1>
        <button className="btn-primary !py-2 text-sm" onClick={() => { setEditing({ id: "", slug: "", category: "Guides", author: "", status: "draft", tags: [], title: { ...B }, excerpt: { ...B }, content: { ...B }, metaTitle: { ...B }, metaDescription: { ...B } }); setMsg(""); }}>+ New article</button>
      </div>
      <AdminNotice msg={msg} />
      <AdminError msg={err} retry={load} />

      {editing && (
        <form onSubmit={save} className="glass mt-4 space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="label">Slug</label>
              <input className="input" dir="ltr" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} required disabled={!!editing.id} />
            </div>
            <div>
              <label className="label">Category</label>
              <input className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
            </div>
            <div>
              <label className="label">Tags (comma separated)</label>
              <input className="input" value={editing.tags.join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
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
          <BiField label="Excerpt" textarea rows={2} value={editing.excerpt} onChange={(v) => setEditing({ ...editing, excerpt: v })} />
          <BiField label="Content (blank line = new paragraph)" textarea rows={10} value={editing.content} onChange={(v) => setEditing({ ...editing, content: v })} />
          <p className="rounded-xl bg-purple-50 px-4 py-2 text-xs text-[var(--color-muted)]">
            To embed ad/HTML code with its own styling, wrap it in fenced blocks: <code dir="ltr">```embed</code> …your HTML + <code dir="ltr">&lt;style&gt;</code>… <code dir="ltr">```</code>. Scripts are stripped for security — use sandboxed iframes for JS widgets.
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
              <p className="truncate font-bold">{p.title.en}</p>
              <p className="text-xs text-gray-500">{p.category} · /{p.slug}</p>
            </div>
            <StatusBadge value={p.status} />
            <a href={`/blog/${p.slug}`} target="_blank" className="text-sm font-bold text-[var(--color-primary)]">Preview</a>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-bold" onClick={() => setEditing(p)}>Edit</button>
            <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700" onClick={() => remove(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
