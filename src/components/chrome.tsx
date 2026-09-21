"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Lang } from "@/lib/academy";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/lang-client";

export type NavService = { slug: string; name: { en: string; ar: string } };

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function switchTo(next: Lang) {
    if (next === lang || busy) return;
    setBusy(true);
    await fetch("/api/lang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: next }),
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="flex items-center overflow-hidden rounded-full border border-white/40 bg-white/60 text-sm font-bold" role="group" aria-label="Language">
      {(["en", "ar"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-pressed={lang === l}
          className={`px-3 py-1.5 transition ${lang === l ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-primary)] hover:bg-white"}`}
        >
          {l === "en" ? "EN" : "عربي"}
        </button>
      ))}
    </div>
  );
}

export function GlassNavbar({
  lang,
  academyName,
  services,
}: {
  lang: Lang;
  academyName: string;
  services: NavService[];
}) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: t(lang, "nav.home") },
    { href: "/about", label: t(lang, "nav.about") },
    { href: "/teachers", label: t(lang, "nav.teachers") },
    { href: "/approach", label: t(lang, "nav.approach") },
    { href: "/blog", label: t(lang, "nav.blog") },
    { href: "/contact", label: t(lang, "nav.contact") },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={academyName}>
          <span className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-violet)] text-xl text-white">
            ن
          </span>
          <span className="font-display text-lg font-bold">{academyName}</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex" aria-label="Primary">
          <Link href="/" className={`rounded-lg px-3 py-2 hover:bg-white ${isActive("/") && pathname === "/" ? "text-[var(--color-primary)]" : ""}`}>
            {t(lang, "nav.home")}
          </Link>
          <Link href="/about" className={`rounded-lg px-3 py-2 hover:bg-white ${isActive("/about") ? "text-[var(--color-primary)]" : ""}`}>
            {t(lang, "nav.about")}
          </Link>
          <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button
              className="rounded-lg px-3 py-2 hover:bg-white"
              aria-expanded={drop}
              aria-haspopup="true"
              onClick={() => setDrop((v) => !v)}
            >
              {t(lang, "nav.programs")} ▾
            </button>
            {drop && (
              <div className="glass absolute start-0 top-full mt-1 w-72 rounded-2xl p-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/programs/${s.slug}`}
                    className="block rounded-xl px-3 py-2 hover:bg-white"
                    onClick={() => setDrop(false)}
                  >
                    {pick(lang, s.name)}
                  </Link>
                ))}
                <div className="my-1 border-t" />
                {[
                  { href: "/programs/children", en: "Programs for Children", ar: "برامج الأطفال" },
                  { href: "/programs/adults", en: "Programs for Adults", ar: "برامج الكبار" },
                  { href: "/programs/converts", en: "Programs for Converts", ar: "برامج المسلمين الجدد" },
                  { href: "/programs/families", en: "Programs for Families", ar: "برامج العائلات" },
                ].map((a) => (
                  <Link key={a.href} href={a.href} className="block rounded-xl px-3 py-2 hover:bg-white" onClick={() => setDrop(false)}>
                    {pick(lang, a)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.slice(2).map((l) => (
            <Link key={l.href} href={l.href} className={`rounded-lg px-3 py-2 hover:bg-white ${isActive(l.href) ? "text-[var(--color-primary)]" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher lang={lang} />
          <Link href="/book-assessment" className="btn-primary !px-4 !py-2 text-sm">
            {t(lang, "nav.book")}
          </Link>
        </div>

        <button className="rounded-lg border px-3 py-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? t(lang, "nav.close") : t(lang, "nav.menu")}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="space-y-1 border-t border-white/50 px-4 py-4 lg:hidden" aria-label="Mobile">
          {[{ href: "/", label: t(lang, "nav.home") }, ...links].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 font-semibold hover:bg-white">
              {l.label}
            </Link>
          ))}
          <p className="px-3 pt-2 text-xs font-bold uppercase opacity-60">{t(lang, "nav.programs")}</p>
          {services.map((s) => (
            <Link key={s.slug} href={`/programs/${s.slug}`} onClick={() => setOpen(false)} className="block rounded-xl px-6 py-2 text-sm hover:bg-white">
              {pick(lang, s.name)}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-3 pt-3">
            <LanguageSwitcher lang={lang} />
            <Link href="/book-assessment" onClick={() => setOpen(false)} className="btn-primary flex-1 !py-2 text-sm">
              {t(lang, "nav.book")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer({
  lang,
  academyName,
  tagline,
  email,
  services,
}: {
  lang: Lang;
  academyName: string;
  tagline: string;
  email: string;
  services: NavService[];
}) {
  return (
    <footer className="glass-dark mt-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold">{academyName}</p>
          <p className="mt-2 text-sm opacity-80">{tagline}</p>
          <p className="mt-3 text-sm opacity-80" dir="ltr">{email}</p>
        </div>
        <nav aria-label={t(lang, "footer.programs")}>
          <p className="font-bold">{t(lang, "footer.programs")}</p>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/programs/${s.slug}`} className="hover:underline">{pick(lang, s.name)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t(lang, "footer.academy")}>
          <p className="font-bold">{t(lang, "footer.academy")}</p>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li><Link href="/about" className="hover:underline">{t(lang, "nav.about")}</Link></li>
            <li><Link href="/teachers" className="hover:underline">{t(lang, "nav.teachers")}</Link></li>
            <li><Link href="/approach" className="hover:underline">{t(lang, "nav.approach")}</Link></li>
            <li><Link href="/how-it-works" className="hover:underline">{lang === "ar" ? "كيف نعمل" : "How It Works"}</Link></li>
            <li><Link href="/blog" className="hover:underline">{t(lang, "nav.blog")}</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </nav>
        <nav aria-label={t(lang, "footer.legal")}>
          <p className="font-bold">{t(lang, "footer.legal")}</p>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/safeguarding" className="hover:underline">Safeguarding</Link></li>
            <li><Link href="/cancellation" className="hover:underline">{lang === "ar" ? "سياسة الإلغاء" : "Cancellation Policy"}</Link></li>
            <li><Link href="/complaints" className="hover:underline">{lang === "ar" ? "الشكاوى" : "Complaints"}</Link></li>
            <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>
            <li><Link href="/contact" className="hover:underline">{t(lang, "nav.contact")}</Link></li>
            <li><Link href="/book-assessment" className="hover:underline">{t(lang, "nav.book")}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {academyName} — {t(lang, "footer.rights")}
      </div>
    </footer>
  );
}
