"use client";

import { useEffect, useState } from "react";
import { AdminNotice, AdminError } from "@/components/admin-fields";
import { LoadingState } from "@/components/sections";

type M = { id: string; url: string; alt: string; mime: string; size: number; category: string };

export default function MediaAdmin() {
  const [list, setList] = useState<M[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true); setErr("");
    const res = await fetch("/api/admin/media");
    if (!res.ok) setErr("Failed to load media.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) { setErr("Choose an image first."); return; }
    setUploading(true); setErr(""); setMsg("");
    const res = await fetch("/api/admin/media", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Upload failed.");
    else { setMsg("Uploaded successfully."); e.currentTarget.reset(); load(); }
    setUploading(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Media Library</h1>
      <AdminNotice msg={msg} />
      <AdminError msg={err} retry={load} />

      <form onSubmit={upload} className="glass mt-4 flex flex-wrap items-end gap-3 rounded-3xl p-5">
        <div>
          <label className="label" htmlFor="up-file">Image (max 5 MB)</label>
          <input id="up-file" type="file" name="file" accept="image/*" className="text-sm" />
        </div>
        <div>
          <label className="label" htmlFor="up-alt">Alt text</label>
          <input id="up-alt" name="alt" className="input" placeholder="Describe the image" />
        </div>
        <div>
          <label className="label" htmlFor="up-cat">Category</label>
          <input id="up-cat" name="category" className="input" defaultValue="general" />
        </div>
        <button className="btn-primary !py-2 text-sm" disabled={uploading}>{uploading ? "Uploading…" : "Upload"}</button>
      </form>

      {list.length === 0 ? (
        <p className="mt-4 rounded-2xl border bg-white/70 p-8 text-center text-sm">No images yet.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((m) => (
            <figure key={m.id} className="overflow-hidden rounded-2xl border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.alt} className="h-36 w-full object-cover" loading="lazy" />
              <figcaption className="p-3 text-xs">
                <p className="truncate font-bold">{m.alt}</p>
                <p className="text-gray-500">{m.category} · {Math.round(m.size / 1024)} KB</p>
                <div className="mt-2 flex gap-2">
                  <button className="rounded bg-gray-100 px-2 py-1 font-bold" onClick={() => navigator.clipboard.writeText(m.url)}>Copy URL</button>
                  <button className="rounded bg-red-50 px-2 py-1 font-bold text-red-700" onClick={() => remove(m.id)}>Delete</button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
