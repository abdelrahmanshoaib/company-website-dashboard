"use client";

import { useState } from "react";
import type { Lang } from "@/lib/academy";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/lang-client";

const CATEGORIES = ["child", "adult", "convert", "family"];
const AGES = ["under-7", "7-12", "13-17", "18-30", "31-50", "50+"];
const LEVELS = ["complete-beginner", "reads-slowly", "reads-fluently", "advanced"];

export default function AssessmentForm({
  lang,
  programs,
  timeZones,
  presetProgram,
}: {
  lang: Lang;
  programs: { slug: string; name: { en: string; ar: string } }[];
  timeZones: string[];
  presetProgram?: string;
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    category: "adult",
    ageRange: "18-30",
    preferredLanguage: lang === "ar" ? "Arabic" : "English",
    program: presetProgram ?? programs[0]?.slug ?? "quran-classes",
    level: "complete-beginner",
    goals: "",
    days: "",
    timeRange: "",
    timeZone: timeZones[0] ?? "Europe/London",
    notes: "",
    consent: false,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!form.fullName.trim()) errs.push("fullName");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.push("email");
    if (!form.country.trim()) errs.push("country");
    if (!form.goals.trim()) errs.push("goals");
    if (!form.consent) errs.push("consent");
    setErrors(errs);
    if (errs.length) return;
    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.duplicate ? t(lang, "assessment.duplicate") : data.error || t(lang, "common.error"));
      } else {
        setDone(true);
      }
    } catch {
      setServerError(t(lang, "common.error"));
    }
    setSending(false);
  }

  if (done) {
    return (
      <div className="glass rounded-3xl p-10 text-center" role="status">
        <p className="text-4xl" aria-hidden>✅</p>
        <h2 className="font-display mt-4 text-2xl font-bold">{t(lang, "assessment.success_title")}</h2>
        <p className="mt-3 text-[var(--color-muted)]">{t(lang, "assessment.success_body")}</p>
      </div>
    );
  }

  const err = (k: string) => (errors.includes(k) ? <p className="mt-1 text-xs text-red-600">{k === "email" ? t(lang, "form.invalid_email") : t(lang, "form.required")}</p> : null);
  const L = (en: string, ar: string) => pick(lang, { en, ar });
  const field = "glass rounded-2xl p-6";

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className={field}>
        <h2 className="font-bold">{L("Personal details", "البيانات الشخصية")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="af-name">{L("Full name *", "الاسم الكامل *")}</label>
            <input id="af-name" className="input" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
            {err("fullName")}
          </div>
          <div>
            <label className="label" htmlFor="af-email">{L("Email *", "البريد الإلكتروني *")}</label>
            <input id="af-email" className="input" type="email" dir="ltr" value={form.email} onChange={(e) => set("email", e.target.value)} />
            {err("email")}
          </div>
          <div>
            <label className="label" htmlFor="af-phone">{L("Phone (optional)", "الهاتف (اختياري)")}</label>
            <input id="af-phone" className="input" dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="af-country">{L("Country *", "الدولة *")}</label>
            <input id="af-country" className="input" value={form.country} onChange={(e) => set("country", e.target.value)} placeholder={L("e.g. United Kingdom", "مثال: بريطانيا")} />
            {err("country")}
          </div>
        </div>
      </div>

      <div className={field}>
        <h2 className="font-bold">{L("Learning profile", "الملف التعليمي")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="af-cat">{L("Student category", "فئة الطالب")}</label>
            <select id="af-cat" className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="af-age">{L("Age range", "الفئة العمرية")}</label>
            <select id="af-age" className="input" value={form.ageRange} onChange={(e) => set("ageRange", e.target.value)}>
              {AGES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="af-prog">{L("Selected program", "البرنامج المختار")}</label>
            <select id="af-prog" className="input" value={form.program} onChange={(e) => set("program", e.target.value)}>
              {programs.map((p) => <option key={p.slug} value={p.slug}>{pick(lang, p.name)}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="af-level">{L("Current level", "المستوى الحالي")}</label>
            <select id="af-level" className="input" value={form.level} onChange={(e) => set("level", e.target.value)}>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="af-goals">{L("Learning goals *", "الأهداف التعليمية *")}</label>
            <textarea id="af-goals" className="input" rows={3} value={form.goals} onChange={(e) => set("goals", e.target.value)} />
            {err("goals")}
          </div>
        </div>
      </div>

      <div className={field}>
        <h2 className="font-bold">{L("Scheduling", "المواعيد")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label className="label" htmlFor="af-days">{L("Preferred days", "الأيام المفضلة")}</label>
            <input id="af-days" className="input" value={form.days} onChange={(e) => set("days", e.target.value)} placeholder={L("e.g. Mon & Wed", "مثال: الاثنين والأربعاء")} />
          </div>
          <div>
            <label className="label" htmlFor="af-time">{L("Preferred time range", "الفترة الزمنية المفضلة")}</label>
            <input id="af-time" className="input" value={form.timeRange} onChange={(e) => set("timeRange", e.target.value)} placeholder={L("e.g. evenings", "مثال: المساء")} />
          </div>
          <div>
            <label className="label" htmlFor="af-tz">{L("Time zone", "المنطقة الزمنية")}</label>
            <select id="af-tz" className="input" value={form.timeZone} onChange={(e) => set("timeZone", e.target.value)}>
              {timeZones.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="label" htmlFor="af-notes">{L("Additional notes", "ملاحظات إضافية")}</label>
            <textarea id="af-notes" className="input" rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" className="mt-1" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} />
          <span>{L("I agree to the academy contacting me about my request and handling my data per the Privacy Policy. *", "أوافق على تواصل الأكاديمية معي بشأن طلبي ومعالجة بياناتي وفق سياسة الخصوصية. *")}</span>
        </label>
        {err("consent")}
        {serverError && <p className="mt-3 text-sm text-red-700" role="alert">{serverError}</p>}
        <button type="submit" disabled={sending} className="btn-primary mt-5 w-full md:w-auto">
          {sending ? t(lang, "form.sending") : t(lang, "form.submit")}
        </button>
      </div>
    </form>
  );
}
