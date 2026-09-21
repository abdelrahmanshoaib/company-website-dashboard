"use client";

import { useEffect, useState } from "react";
import { BiField, AdminNotice, AdminError } from "@/components/admin-fields";
import { LoadingState } from "@/components/sections";

type Settings = {
  academyName: { en: string; ar: string };
  tagline: { en: string; ar: string };
  footerNote: { en: string; ar: string };
  contactEmail: string; contactPhone: string; whatsapp: string;
  social: { x: string; facebook: string; instagram: string; youtube: string };
  defaultLang: string; timeZones: string[];
  colors: { primary: string; violet: string; lavender: string; coral: string; gold: string };
};

export default function SettingsAdmin() {
  const [s, setS] = useState<Settings | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings").then(async (r) => {
      if (!r.ok) setErr(r.status === 403 ? "Only super admins can edit settings." : "Failed to load.");
      else setS(await r.json());
    });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!s) return;
    setErr(""); setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Save failed.");
    else { setS(data); setMsg("Saved successfully."); }
  }

  if (err && !s) return <AdminError msg={err} />;
  if (!s) return <LoadingState lang="en" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Site Settings</h1>
      <AdminNotice msg={msg} />
      <AdminError msg={err} />
      <form onSubmit={save} className="glass mt-4 space-y-4 rounded-3xl p-6">
        <BiField label="Academy name" value={s.academyName} onChange={(v) => setS({ ...s, academyName: v })} />
        <BiField label="Tagline" value={s.tagline} onChange={(v) => setS({ ...s, tagline: v })} />
        <BiField label="Footer note" value={s.footerNote} onChange={(v) => setS({ ...s, footerNote: v })} />
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="label">Contact email</label>
            <input className="input" dir="ltr" value={s.contactEmail} onChange={(e) => setS({ ...s, contactEmail: e.target.value })} />
          </div>
          <div>
            <label className="label">Contact phone</label>
            <input className="input" dir="ltr" value={s.contactPhone} onChange={(e) => setS({ ...s, contactPhone: e.target.value })} />
          </div>
          <div>
            <label className="label">WhatsApp</label>
            <input className="input" dir="ltr" value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value })} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {(["x", "facebook", "instagram", "youtube"] as const).map((k) => (
            <div key={k}>
              <label className="label">{k}</label>
              <input className="input" dir="ltr" value={s.social[k]} onChange={(e) => setS({ ...s, social: { ...s.social, [k]: e.target.value } })} />
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Default language</label>
            <select className="input" value={s.defaultLang} onChange={(e) => setS({ ...s, defaultLang: e.target.value })}>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <div>
            <label className="label">Time zones (comma separated)</label>
            <input className="input" dir="ltr" value={s.timeZones.join(", ")} onChange={(e) => setS({ ...s, timeZones: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} />
          </div>
        </div>
        <div>
          <span className="label">Theme colors</span>
          <div className="grid gap-3 md:grid-cols-5">
            {(Object.keys(s.colors) as (keyof Settings["colors"])[]).map((k) => (
              <label key={k} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm">
                <input type="color" value={s.colors[k]} onChange={(e) => setS({ ...s, colors: { ...s.colors, [k]: e.target.value } })} />
                {k}
              </label>
            ))}
          </div>
        </div>
        <button className="btn-primary !py-2 text-sm">Save settings</button>
      </form>
    </div>
  );
}
