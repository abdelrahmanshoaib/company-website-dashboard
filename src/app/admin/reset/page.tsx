"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(""); setMsg("");
    const res = await fetch("/api/admin/reset", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token.trim(), password }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Reset failed.");
    else { setMsg("Password updated. You can now sign in."); setToken(""); setPassword(""); }
    setBusy(false);
  }

  return (
    <div className="mx-auto mt-16 max-w-md">
      <div className="glass rounded-3xl p-8">
        <h1 className="font-display text-2xl font-bold">Reset Password</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Paste the single-use token issued by your super-admin (Admin → Users → Reset token).
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="rt-token">Reset token</label>
            <input id="rt-token" className="input" dir="ltr" value={token} onChange={(e) => setToken(e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="rt-pass">New password (8+ characters)</label>
            <input id="rt-pass" className="input" type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>
          {err && <p className="text-sm text-red-700" role="alert">{err}</p>}
          {msg && <p className="text-sm text-green-800" role="status">{msg}</p>}
          <button className="btn-primary w-full" disabled={busy}>{busy ? "Working…" : "Set new password"}</button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link href="/admin/login" className="font-bold text-[var(--color-primary)]">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
