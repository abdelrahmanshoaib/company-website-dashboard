"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function Form() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Sign in failed.");
      setBusy(false);
    } else {
      router.push(next);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md">
      <div className="glass rounded-3xl p-8">
        <h1 className="font-display text-2xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">Default: admin@academy.local / Admin123! — change it after first login.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="al-email">Email</label>
            <input id="al-email" className="input" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="al-pass">Password</label>
            <input id="al-pass" className="input" type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
          <button className="btn-primary w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
          Have a reset token? <a href="/admin/reset" className="font-bold text-[var(--color-primary)]">Set a new password</a>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}
