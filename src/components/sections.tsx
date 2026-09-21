"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lang } from "@/lib/academy";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/lang-client";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-extrabold tracking-[0.2em] text-[var(--color-violet)] uppercase">{children}</p>
  );
}

export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-[var(--color-muted)]">{body}</p>}
    </div>
  );
}

export function HeroSection({
  lang,
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  lang: Lang;
  eyebrow: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  void lang;
  return (
    <section className="glass-dark relative overflow-hidden rounded-3xl px-6 py-16 md:px-14 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--color-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -start-16 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--color-coral)" }}
      />
      <div className="relative max-w-3xl">
        <Eyebrow><span className="text-[var(--color-gold)]">{eyebrow}</span></Eyebrow>
        <h1 className="font-display mt-4 text-4xl leading-tight font-bold md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg opacity-90">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={primaryHref} className="btn-primary !bg-white !text-[var(--color-primary)]">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="rounded-[0.9rem] border border-white/50 px-6 py-3 font-bold hover:bg-white/10">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export type CardService = {
  slug: string;
  icon: string;
  name: { en: string; ar: string };
  short: { en: string; ar: string };
  cta?: { en: string; ar: string };
};

export function ServiceCard({ lang, service }: { lang: Lang; service: CardService }) {
  return (
    <article className="glass glass-card flex flex-col p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-lavender)] to-white text-2xl" aria-hidden>
        {service.icon}
      </span>
      <h3 className="font-display mt-4 text-xl font-bold">{pick(lang, service.name)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{pick(lang, service.short)}</p>
      <Link href={`/programs/${service.slug}`} className="mt-4 font-bold text-[var(--color-primary)] hover:underline">
        {service.cta ? pick(lang, service.cta) : t(lang, "common.learn_more")} →
      </Link>
    </article>
  );
}

export type CardTeacher = {
  id: string;
  name: string;
  bio: { en: string; ar: string };
  subjects: string[];
  languages: string[];
  availability: { en: string; ar: string };
  placeholder?: boolean;
};

export function TeacherCard({ lang, teacher }: { lang: Lang; teacher: CardTeacher }) {
  return (
    <article className="glass glass-card p-6">
      <div className="flex items-center gap-4">
        <span className="font-display flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-violet)] text-xl font-bold text-white" aria-hidden>
          {teacher.name.charAt(0)}
        </span>
        <div>
          <h3 className="font-bold">{teacher.name}</h3>
          <p className="text-xs text-[var(--color-muted)]">{teacher.subjects.join(" · ")}</p>
        </div>
      </div>
      {teacher.placeholder && (
        <p className="mt-3 inline-block rounded-full bg-[var(--color-gold)]/25 px-3 py-1 text-xs font-bold text-[#7a5b17]">
          {lang === "ar" ? "ملف تجريبي — يُستكمل من الإدارة" : "Sample profile — to be completed by admin"}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{pick(lang, teacher.bio)}</p>
      <p className="mt-3 text-xs">🌐 {teacher.languages.join(" · ")}</p>
      <p className="mt-1 text-xs">🕒 {pick(lang, teacher.availability)}</p>
    </article>
  );
}

export function FAQAccordion({ lang, items }: { lang: Lang; items: { question: { en: string; ar: string }; answer: { en: string; ar: string } }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (items.length === 0) return <EmptyState lang={lang} />;
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <div key={i} className="glass overflow-hidden rounded-2xl">
          <button
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start font-bold"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{pick(lang, f.question)}</span>
            <span aria-hidden>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--color-muted)]">{pick(lang, f.answer)}</p>}
        </div>
      ))}
    </div>
  );
}

export function CTASection({ lang, title, body }: { lang: Lang; title: string; body: string }) {
  return (
    <section className="glass-dark rounded-3xl px-6 py-14 text-center md:py-20">
      <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl opacity-90">{body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/book-assessment" className="btn-primary !bg-white !text-[var(--color-primary)]">
          {t(lang, "common.book_assessment")}
        </Link>
        <Link href="/contact" className="rounded-[0.9rem] border border-white/50 px-6 py-3 font-bold hover:bg-white/10">
          {t(lang, "common.contact_team")}
        </Link>
      </div>
    </section>
  );
}

export function Breadcrumbs({ lang, trail }: { lang: Lang; trail: { href?: string; label: string }[] }) {
  void lang;
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--color-muted)]">
      <ol className="flex flex-wrap gap-2">
        {trail.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {s.href ? <Link href={s.href} className="hover:underline">{s.label}</Link> : <span aria-current="page">{s.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LoadingState({ lang }: { lang: Lang }) {
  return <p className="rounded-2xl border bg-white/70 p-8 text-center" role="status">{t(lang, "common.loading")}</p>;
}

export function EmptyState({ lang }: { lang: Lang }) {
  return <p className="rounded-2xl border bg-white/70 p-8 text-center text-[var(--color-muted)]">{t(lang, "common.empty")}</p>;
}

export function ErrorState({ lang, retry }: { lang: Lang; retry?: () => void }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center" role="alert">
      <p className="text-red-800">{t(lang, "common.error")}</p>
      {retry && <button onClick={retry} className="btn-ghost mt-4 !py-2 text-sm">↻ Retry</button>}
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const colors: Record<string, string> = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-200 text-gray-700",
    new: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
  };
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${colors[value] ?? "bg-gray-100 text-gray-700"}`}>{value.replace(/_/g, " ")}</span>;
}

/** Render plain-text sections (blank-line separated) as paragraphs. */
export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((p, i) => (
        <p key={i} className="mt-4 leading-loose text-[var(--color-ink)]/90">{p}</p>
      ))}
    </>
  );
}
