import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { approach } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: pick(lang, approach.title), description: pick(lang, approach.body).slice(0, 160) };
}

export default async function ApproachPage() {
  const lang = await getLang();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: pick(lang, approach.title) }]} />
      <h1 className="font-display max-w-3xl text-3xl font-bold md:text-5xl">{pick(lang, approach.title)}</h1>
      <p className="mt-5 max-w-3xl text-lg text-[var(--color-muted)]">{pick(lang, approach.body)}</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approach.sections.map((s, i) => (
          <section key={i} className="glass glass-card p-6">
            <h2 className="font-bold">{pick(lang, s.title)}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{pick(lang, s.body)}</p>
          </section>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/how-it-works" className="btn-ghost">{lang === "ar" ? "كيف تعمل الأكاديمية" : "See how it works"}</Link>
      </div>
      <div className="mt-10">
        <CTASection
          lang={lang}
          title={pick(lang, approach.title)}
          body={pick(lang, approach.body)}
        />
      </div>
    </SiteShell>
  );
}
