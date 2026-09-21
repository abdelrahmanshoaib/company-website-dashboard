"use client";

import { useEffect, useState } from "react";

type Page = { slug: string; title: string; description: string; content: string };

export default function ContentManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [form, setForm] = useState<Page>({ slug: "", title: "", description: "", content: "" });

  async function load() {
    const res = await fetch("/api/content");
    setPages(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ slug: "", title: "", description: "", content: "" });
    load();
  }

  async function remove(slug: string) {
    await fetch(`/api/content?slug=${slug}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">إدارة المحتوى والصفحات</h1>
      <form onSubmit={save} className="mt-6 grid gap-3 rounded-xl border bg-white p-6">
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded border px-3 py-2" placeholder="المعرف slug مثل: home" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          <input className="rounded border px-3 py-2" placeholder="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <input className="rounded border px-3 py-2" placeholder="الوصف المختصر" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <textarea className="rounded border px-3 py-2" placeholder="المحتوى" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <button className="w-fit rounded bg-blue-700 px-5 py-2 text-white">حفظ / إضافة الصفحة</button>
      </form>

      <div className="mt-6 grid gap-4">
        {pages.map((p) => (
          <div key={p.slug} className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{p.title} <span className="text-xs text-gray-400">/{p.slug}</span></h3>
              <div className="flex gap-2">
                <button onClick={() => setForm(p)} className="rounded bg-gray-100 px-3 py-1 text-sm">تعديل</button>
                <button onClick={() => remove(p.slug)} className="rounded bg-red-50 px-3 py-1 text-sm text-red-700">حذف</button>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-600">{p.description}</p>
            <p className="mt-2 text-sm">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
