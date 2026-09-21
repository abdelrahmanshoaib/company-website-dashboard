import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection, TeacherCard, EmptyState } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { getPublicTeachers } from "@/lib/site";
import { home } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: pick(lang, home.teachersTitle), description: pick(lang, home.teachersBody) };
}

export default async function TeachersPage() {
  const lang = await getLang();
  const teachers = await getPublicTeachers();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: t(lang, "nav.teachers") }]} />
      <h1 className="font-display text-3xl font-bold md:text-5xl">{pick(lang, home.teachersTitle)}</h1>
      <p className="mt-4 max-w-3xl text-[var(--color-muted)]">{pick(lang, home.teachersBody)}</p>
      {teachers.length === 0 ? (
        <div className="mt-8"><EmptyState lang={lang} /></div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {teachers.map((x) => (
            <TeacherCard key={x.id} lang={lang} teacher={x} />
          ))}
        </div>
      )}
      <div className="mt-10">
        <CTASection lang={lang} title={pick(lang, home.ctaTitle)} body={pick(lang, home.ctaBody)} />
      </div>
    </SiteShell>
  );
}
