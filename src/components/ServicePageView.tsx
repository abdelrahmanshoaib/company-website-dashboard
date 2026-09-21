import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection, Eyebrow, FAQAccordion } from "@/components/sections";
import { pick } from "@/lib/lang";
import type { Lang, ServiceDoc } from "@/lib/academy";
import { t } from "@/lib/i18n";

export default function ServicePageView({
  lang,
  service,
  related,
  faqs,
}: {
  lang: Lang;
  service: ServiceDoc;
  related: { slug: string; name: { en: string; ar: string } }[];
  faqs: { question: { en: string; ar: string }; answer: { en: string; ar: string } }[];
}) {
  const L = (en: string, ar: string) => pick(lang, { en, ar });
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: pick(lang, service.name) }]} />

      <header className="glass-dark rounded-3xl px-6 py-12 md:px-12">
        <Eyebrow><span className="text-[var(--color-gold)]">{L("OUR PROGRAMS", "برامجنا")}</span></Eyebrow>
        <h1 className="font-display mt-3 max-w-3xl text-3xl font-bold md:text-5xl">{pick(lang, service.name)}</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">{pick(lang, service.content)}</p>
        <Link href="/book-assessment" className="btn-primary mt-8 !bg-white !text-[var(--color-primary)]">
          {t(lang, "common.book_assessment")}
        </Link>
      </header>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="glass rounded-3xl p-7">
          <h2 className="font-display text-xl font-bold">{L("What you will learn", "ماذا ستتعلم")}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {service.outcomes.map((o, i) => (
              <li key={i} className="flex gap-2"><span aria-hidden>✓</span><span>{pick(lang, o)}</span></li>
            ))}
          </ul>
        </section>
        <section className="glass rounded-3xl p-7">
          <h2 className="font-display text-xl font-bold">{L("Who it is for", "لمن هذا البرنامج")}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {service.audience.map((o, i) => (
              <li key={i} className="flex gap-2"><span aria-hidden>•</span><span>{pick(lang, o)}</span></li>
            ))}
          </ul>
        </section>
        <section className="glass rounded-3xl p-7">
          <h2 className="font-display text-xl font-bold">{L("Curriculum topics", "موضوعات المنهج")}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {service.curriculum.map((o, i) => (
              <li key={i} className="flex gap-2"><span aria-hidden>📚</span><span>{pick(lang, o)}</span></li>
            ))}
          </ul>
        </section>
      </div>

      <section className="glass mt-6 rounded-3xl p-7">
        <h2 className="font-display text-xl font-bold">{L("Delivery format", "صيغة التقديم")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          {L(
            "Live one-to-one online sessions with a teacher, plus practice assignments and periodic progress reviews. Schedules are arranged across UK and Canadian time zones.",
            "جلسات مباشرة فردية أونلاين مع المعلم، مع واجبات تدريبية ومراجعات دورية للتقدم. تُرتب المواعيد عبر المناطق الزمنية البريطانية والكندية."
          )}
        </p>
      </section>

      {faqs.length > 0 && (
        <section className="mx-auto mt-12 max-w-3xl">
          <h2 className="font-display text-center text-2xl font-bold">{L("Common questions", "أسئلة شائعة")}</h2>
          <div className="mt-6"><FAQAccordion lang={lang} items={faqs} /></div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">{L("Related programs", "برامج ذات صلة")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/programs/${r.slug}`} className="glass glass-card block p-5 font-bold hover:underline">
                {pick(lang, r.name)}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <CTASection
          lang={lang}
          title={L("Ready to start learning?", "مستعد لبدء التعلم؟")}
          body={L("Book a free assessment and we will recommend the right starting level for you.", "احجز جلسة تقييم مجانية وسنوصي بمستوى البداية المناسب لك.")}
        />
      </div>
    </SiteShell>
  );
}
