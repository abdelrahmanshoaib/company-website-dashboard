"use client";

import { useEffect, useState } from "react";
import { BiField, AdminNotice, AdminError } from "@/components/admin-fields";
import { StatusBadge, LoadingState } from "@/components/sections";

type T = {
  id: string; name: string; qualifications: string; experience: string; photo: string;
  subjects: string[]; languages: string[]; published: boolean; placeholder: boolean; order: number;
  bio: { en: string; ar: string }; availability: { en: string; ar: string };
};

const blank = (): T => ({
  id: "", name: "", qualifications: "", experience: "", photo: "",
  subjects: [], languages: [], published: false, placeholder: false, order: 99,
  bio: { en: "", ar: "" }, availability: { en: "", ar: "" },
});

export default function TeachersAdmin() {
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<T | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true); setErr("");
    const res = await fetch("/api/admin/teachers");
    if (!res.ok) setErr(res.status === 403 ? "Your role cannot manage teachers." : "Failed to load.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setErr(""); setMsg("");
    const res = await fetch("/api/admin/teachers", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Save failed.");
    else { setMsg("Saved successfully."); setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this profile?")) return;
    await fetch(`/api/admin/teachers?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Teachers</h1>
        <button className="btn-primary !py-2 text-sm" onClick={() => { setEditing(blank()); setMsg(""); }}>+ Add teacher</button>
      </div>
      <p className="mt-1 text-xs text-[var(--color-muted)]">Only verified, academy-provided information. Sample placeholders are badged on the site until replaced.</p>
      <AdminNotice msg={msg} />
      <AdminError msg={err} retry={load} />

      {editing && (
        <form onSubmit={save} className="glass mt-4 space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Full name</label>
              <input className="input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required />
            </div>
            <div>
              <label className="label">Photo URL (or upload in Media Library)</label>
              <input className="input" dir="ltr" value={editing.photo} onChange={(e) => setEditing({ ...editing, photo: e.target.value })} />
            </div>
            <div>
              <label className="label">Subjects (comma separated)</label>
              <input className="input" value={editing.subjects.join(", ")} onChange={(e) => setEditing({ ...editing, subjects: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
            <div>
              <label className="label">Languages (comma separated)</label>
              <input className="input" value={editing.languages.join(", ")} onChange={(e) => setEditing({ ...editing, languages: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
            <div>
              <label className="label">Qualifications</label>
              <input className="input" value={editing.qualifications} onChange={(e) => setEditing({ ...editing, qualifications: e.target.value })} />
            </div>
            <div>
              <label className="label">Experience</label>
              <input className="input" value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: e.target.value })} />
            </div>
          </div>
          <BiField label="Biography" textarea rows={4} value={editing.bio} onChange={(v) => setEditing({ ...editing, bio: v })} />
          <BiField label="Availability" value={editing.availability} onChange={(v) => setEditing({ ...editing, availability: v })} />
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <label className="flex items-center gap-2"><input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={editing.placeholder} onChange={(e) => setEditing({ ...editing, placeholder: e.target.checked })} /> Mark as sample placeholder</label>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary !py-2 text-sm">Save</button>
            <button type="button" className="btn-ghost !py-2 text-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-2">
        {list.map((x) => (
          <div key={x.id} className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{x.name} <span className="text-xs font-normal text-gray-400">{x.subjects.join(", ")}</span></p>
              <StatusBadge value={x.published ? "published" : "draft"} />
              {x.placeholder && <span className="ms-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-800">sample</span>}
            </div>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-bold" onClick={() => setEditing(x)}>Edit</button>
            <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700" onClick={() => remove(x.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
