import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection, Eyebrow } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { seoPages } from "@/lib/content";
import { t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function seoMetadata(key: string, canonical: string) {
  const page = seoPages[key];
  if (!page) return { title: "Page" };
  const lang = await getLang();
  return {
    title: pick(lang, page.title),
    description: pick(lang, page.intro).slice(0, 160),
    alternates: { canonical },
  };
}

export default async function SeoLandingView({ pageKey }: { pageKey: string }) {
  const page = seoPages[pageKey];
  if (!page) notFound();
  const lang = await getLang();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: pick(lang, page.title) }]} />
      <header className="glass-dark rounded-3xl px-6 py-12 md:px-12">
        <Eyebrow><span className="text-[var(--color-gold)]">{t(lang, "nav.programs")}</span></Eyebrow>
        <h1 className="font-display mt-3 max-w-3xl text-3xl font-bold md:text-5xl">{pick(lang, page.title)}</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">{pick(lang, page.intro)}</p>
        <Link href="/book-assessment" className="btn-primary mt-8 !bg-white !text-[var(--color-primary)]">
          {t(lang, "common.book_assessment")}
        </Link>
      </header>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {page.sections.map((s, i) => (
          <section key={i} className="glass glass-card p-6">
            <h2 className="font-bold">{pick(lang, s.h)}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{pick(lang, s.p)}</p>
          </section>
        ))}
      </div>
      <nav className="mt-10 flex flex-wrap gap-3 text-sm" aria-label="Related">
        {[
          { href: "/programs/quran-classes", en: "Quran Classes", ar: "دروس القرآن" },
          { href: "/programs/children", en: "Children", ar: "الأطفال" },
          { href: "/programs/adults", en: "Adults", ar: "الكبار" },
          { href: "/how-it-works", en: "How It Works", ar: "كيف نعمل" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="glass rounded-full px-4 py-2 font-semibold hover:underline">
            {pick(lang, l)}
          </Link>
        ))}
      </nav>
      <div className="mt-10">
        <CTASection lang={lang} title={pick(lang, page.title)} body={pick(lang, page.intro)} />
      </div>
    </SiteShell>
  );
}
