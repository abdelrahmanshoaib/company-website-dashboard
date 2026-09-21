"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) router.push(next);
    else setError("بيانات الدخول غير صحيحة. جرّب admin@company.com / admin123");
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-8 shadow">
      <h1 className="text-2xl font-bold">تسجيل الدخول للداشبورد</h1>
      <p className="mt-1 text-sm text-gray-500">الحساب التجريبي: admin@company.com / admin123</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input className="w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد" />
        <input className="w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="كلمة المرور" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded bg-blue-700 py-2 text-white">دخول</button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
