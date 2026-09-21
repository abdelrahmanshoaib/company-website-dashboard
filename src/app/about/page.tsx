import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { getSite } from "@/lib/site";
import { about } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: pick(lang, about.title), description: pick(lang, about.body).slice(0, 160) };
}

export default async function AboutPage() {
  const lang = await getLang();
  const { settings } = await getSite();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: t(lang, "nav.about") }]} />
      <h1 className="font-display max-w-3xl text-3xl font-bold md:text-5xl">{pick(lang, about.title)}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--color-muted)]">{pick(lang, about.body)}</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {about.points.map((p, i) => (
          <section key={i} className="glass glass-card p-6">
            <h2 className="font-display text-xl font-bold">{pick(lang, p.title)}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{pick(lang, p.body)}</p>
          </section>
        ))}
      </div>
      <section className="glass mt-10 rounded-3xl p-7">
        <h2 className="font-display text-xl font-bold">{lang === "ar" ? "التواصل والحوكمة" : "Contact & governance"}</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {lang === "ar"
            ? `للأسئلة حول الأكاديمية ومنهجها راسلنا على ${settings.contactEmail}. تُدار الأكاديمية باسم ${pick(lang, settings.academyName)} — وهو اسم قابل للتعديل من لوحة الإدارة.`
            : `For questions about the academy and its curriculum, reach us at ${settings.contactEmail}. The academy operates as ${pick(lang, settings.academyName)} — a configurable name editable from the admin dashboard.`}
        </p>
      </section>
      <div className="mt-10">
        <CTASection
          lang={lang}
          title={lang === "ar" ? "تعرّف علينا عن قرب" : "Get to know us"}
          body={lang === "ar" ? "احجز جلسة تقييم مجانية وتحدث مع فريقنا مباشرة." : "Book a free assessment and speak with our team directly."}
        />
      </div>
    </SiteShell>
  );
}
