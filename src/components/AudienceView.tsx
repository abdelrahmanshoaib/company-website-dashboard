import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection, Eyebrow } from "@/components/sections";
import { pick } from "@/lib/lang";
import type { Lang } from "@/lib/academy";
import { audiences } from "@/lib/content";
import { t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function audienceMeta(slug: string) {
  const a = audiences[slug];
  if (!a) return null;
  return { title: a.title, intro: a.intro };
}

export default function AudienceView({ lang, slug }: { lang: Lang; slug: string }) {
  const a = audiences[slug];
  if (!a) notFound();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: pick(lang, a.title) }]} />
      <header className="glass-dark rounded-3xl px-6 py-12 md:px-12">
        <Eyebrow><span className="text-[var(--color-gold)]">{t(lang, "nav.programs")}</span></Eyebrow>
        <h1 className="font-display mt-3 text-3xl font-bold md:text-5xl">{pick(lang, a.title)}</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">{pick(lang, a.intro)}</p>
        <Link href="/book-assessment" className="btn-primary mt-8 !bg-white !text-[var(--color-primary)]">
          {pick(lang, a.cta)}
        </Link>
      </header>
      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {a.bullets.map((b, i) => (
          <li key={i} className="glass glass-card flex gap-3 p-6">
            <span aria-hidden>✓</span>
            <span>{pick(lang, b)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <CTASection
          lang={lang}
          title={pick(lang, a.title)}
          body={pick(lang, a.intro)}
        />
      </div>
    </SiteShell>
  );
}
