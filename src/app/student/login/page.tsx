import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: t(lang, "student.title"), robots: { index: false } };
}

export default async function StudentLoginPage() {
  const lang = await getLang();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: t(lang, "student.title") }]} />
      <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center md:p-12">
        <p className="text-4xl" aria-hidden>🎓</p>
        <h1 className="font-display mt-4 text-3xl font-bold">{t(lang, "student.title")}</h1>
        <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{t(lang, "student.body")}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/book-assessment" className="btn-primary">{t(lang, "common.book_assessment")}</Link>
          <Link href="/contact" className="btn-ghost">{t(lang, "common.contact_team")}</Link>
        </div>
        <p className="mt-6 text-xs text-[var(--color-muted)]">
          {pick(lang, {
            en: "Integration-ready: the full student portal (timetables, homework, invoices) connects here once provisioned.",
            ar: "جاهز للربط: تُربط هنا بوابة الطلاب الكاملة (الجداول والواجبات والفواتير) فور تجهيزها.",
          })}
        </p>
      </div>
    </SiteShell>
  );
}
