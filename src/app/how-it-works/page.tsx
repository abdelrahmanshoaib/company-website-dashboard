import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection, Paragraphs } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { howItWorks } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: pick(lang, howItWorks.title) };
}

export default async function HowItWorksPage() {
  const lang = await getLang();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: pick(lang, howItWorks.title) }]} />
      <h1 className="font-display text-3xl font-bold md:text-5xl">{pick(lang, howItWorks.title)}</h1>
      <ol className="mt-10 space-y-4">
        {howItWorks.steps.map((s, i) => (
          <li key={i} className="glass glass-card flex gap-4 p-6">
            <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-violet)] font-bold text-white">{i + 1}</span>
            <div>
              <h2 className="font-bold">{pick(lang, s.title)}</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{pick(lang, s.body)}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="glass mt-8 rounded-3xl p-7">
        <Paragraphs text={pick(lang, howItWorks.notes)} />
      </div>
      <div className="mt-10">
        <CTASection
          lang={lang}
          title={pick(lang, howItWorks.title)}
          body={pick(lang, howItWorks.notes)}
        />
      </div>
    </SiteShell>
  );
}
