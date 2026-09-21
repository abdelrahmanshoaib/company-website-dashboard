"use client";

import { useEffect, useState } from "react";
import { LoadingState, EmptyState } from "@/components/sections";
import { AdminError } from "@/components/admin-fields";

type L = { id: string; actor: string; action: string; entity: string; entityId: string; createdAt: string };

export default function ActivityAdmin() {
  const [list, setList] = useState<L[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true); setErr("");
    const res = await fetch("/api/admin/activity");
    if (!res.ok) setErr("Failed to load.");
    else setList(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  if (loading) return <LoadingState lang="en" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Activity Log</h1>
      <AdminError msg={err} retry={load} />
      {list.length === 0 ? (
        <div className="mt-4"><EmptyState lang="en" /></div>
      ) : (
        <ul className="mt-4 space-y-2 text-sm">
          {list.map((a) => (
            <li key={a.id} className="rounded-2xl border bg-white px-4 py-2.5">
              <span className="font-bold">{a.actor}</span> · {a.action} · <span className="text-gray-500">{a.entity}/{a.entityId}</span>
              <span className="block text-xs text-gray-400">{a.createdAt.slice(0, 16).replace("T", " ")}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
