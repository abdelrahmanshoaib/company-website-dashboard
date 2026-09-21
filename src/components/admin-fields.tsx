"use client";

import { useState } from "react";

// EN/AR tabbed input for bilingual CMS fields.
export function BiField({
  label,
  value,
  onChange,
  textarea,
  rows,
}: {
  label: string;
  value: { en: string; ar: string };
  onChange: (v: { en: string; ar: string }) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const [tab, setTab] = useState<"en" | "ar">("en");
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="label !mb-0">{label}</label>
        <div className="flex overflow-hidden rounded-full border text-xs font-bold" role="group" aria-label={`${label} language`}>
          {(["en", "ar"] as const).map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setTab(l)}
              aria-pressed={tab === l}
              className={`px-3 py-1 ${tab === l ? "bg-[var(--color-primary)] text-white" : "bg-white"}`}
            >
              {l === "en" ? "EN" : "AR"}
            </button>
          ))}
        </div>
      </div>
      {tab === "en" ? (
        textarea ? (
          <textarea className="input" rows={rows ?? 4} value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        ) : (
          <input className="input" value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        )
      ) : textarea ? (
        <textarea className="input" dir="rtl" rows={rows ?? 4} value={value.ar} onChange={(e) => onChange({ ...value, ar: e.target.value })} />
      ) : (
        <input className="input" dir="rtl" value={value.ar} onChange={(e) => onChange({ ...value, ar: e.target.value })} />
      )}
    </div>
  );
}

export function BiListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { en: string; ar: string }[];
  onChange: (v: { en: string; ar: string }[]) => void;
}) {
  const [draft, setDraft] = useState({ en: "", ar: "" });
  return (
    <div>
      <span className="label">{label}</span>
      <ul className="mb-2 space-y-1">
        {value.map((x, i) => (
          <li key={i} className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm">
            <span className="flex-1">{x.en} <span className="text-gray-400">/ {x.ar}</span></span>
            <button type="button" className="text-red-600" onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input className="input" placeholder="EN" value={draft.en} onChange={(e) => setDraft({ ...draft, en: e.target.value })} />
        <input className="input" dir="rtl" placeholder="AR" value={draft.ar} onChange={(e) => setDraft({ ...draft, ar: e.target.value })} />
        <button
          type="button"
          className="shrink-0 rounded-lg bg-gray-100 px-3 font-bold"
          onClick={() => {
            if (!draft.en.trim()) return;
            onChange([...value, { en: draft.en.trim(), ar: draft.ar.trim() }]);
            setDraft({ en: "", ar: "" });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function AdminNotice({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p className="rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-800" role="status">{msg}</p>
  );
}

export function AdminError({ msg, retry }: { msg: string; retry?: () => void }) {
  if (!msg) return null;
  return (
    <div className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-800" role="alert">
      {msg}
      {retry && <button onClick={retry} className="ms-3 underline">Retry</button>}
    </div>
  );
}
