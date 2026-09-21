"use client";

import { useEffect, useState } from "react";

type User = { id: string; name: string; email: string; role: string; status: string };

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", role: "viewer", status: "pending" });

  async function load() {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", role: "viewer", status: "pending" });
    load();
  }

  async function remove(id: string) {
    await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">إدارة المستخدمين والطلبات</h1>
      <form onSubmit={save} className="mt-6 grid gap-3 rounded-xl border bg-white p-6 md:grid-cols-4">
        <input className="rounded border px-3 py-2" placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="rounded border px-3 py-2" placeholder="البريد" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <select className="rounded border px-3 py-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="admin">admin</option>
          <option value="editor">editor</option>
          <option value="viewer">viewer</option>
        </select>
        <button className="rounded bg-blue-700 px-4 py-2 text-white">إضافة مستخدم</button>
      </form>

      <div className="mt-6 overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">البريد</th>
              <th className="p-3 text-right">الدور</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.status}</td>
                <td className="p-3"><button onClick={() => remove(u.id)} className="text-red-600">حذف</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
