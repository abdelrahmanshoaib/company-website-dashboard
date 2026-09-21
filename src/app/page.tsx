import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import {
  HeroSection,
  SectionHeading,
  ServiceCard,
  TeacherCard,
  FAQAccordion,
  CTASection,
} from "@/components/sections";
import { getSite, getPublicServices, getPublicTeachers, getPublicFaqs } from "@/lib/site";
import { pick } from "@/lib/lang";
import { home } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { lang, settings } = await getSite();
  const name = pick(lang, settings.academyName);
  return {
    title: lang === "ar" ? `${name} | أكاديمية القرآن والعربية أونلاين` : `${name} | Online Quran & Arabic Academy`,
    description: pick(lang, {
      en: "Personalized online Quran classes, Arabic language programs, and Islamic Studies for children, adults, converts, and Muslim families in the UK and Canada.",
      ar: "دروس قرآن أونلاين وبرامج عربية ودراسات إسلامية للأطفال والكبار والمسلمين الجدد والعائلات في بريطانيا وكندا.",
    }),
  };
}

const SERVICE_CTA: Record<string, { en: string; ar: string }> = {
  "quran-classes": { en: "Explore Quran Classes", ar: "اكتشف دروس القرآن" },
  tajweed: { en: "Explore Tajweed Courses", ar: "اكتشف دورات التجويد" },
  hifz: { en: "Explore Hifz Program", ar: "اكتشف برنامج الحفظ" },
  arabic: { en: "Learn Arabic", ar: "تعلم العربية" },
  "islamic-studies": { en: "Explore Islamic Studies", ar: "اكتشف الدراسات الإسلامية" },
  tafsir: { en: "Explore Tafsir", ar: "اكتشف التفسير" },
};

export default async function HomePage() {
  const { lang, settings } = await getSite();
  const [services, teachers, faqs] = await Promise.all([
    getPublicServices(),
    getPublicTeachers(),
    getPublicFaqs(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: settings.academyName.en,
    description: "Online Quran, Arabic & Islamic Studies Academy serving the UK and Canada.",
    areaServed: ["United Kingdom", "Canada"],
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroSection
        lang={lang}
        eyebrow={pick(lang, home.heroEyebrow)}
        title={pick(lang, home.heroTitle)}
        body={pick(lang, home.heroBody)}
        primaryHref="/book-assessment"
        primaryLabel={t(lang, "common.book_assessment")}
        secondaryHref="/programs/quran-classes"
        secondaryLabel={t(lang, "common.explore_programs")}
      />

      {/* Trust */}
      <section className="mt-16">
        <SectionHeading
          eyebrow={pick(lang, home.trustEyebrow)}
          title={pick(lang, home.trustTitle)}
          body={pick(lang, home.trustBody)}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {home.trustCards.map((c) => (
            <article key={c.icon} className="glass glass-card p-6 text-center">
              <span className="text-4xl" aria-hidden>{c.icon}</span>
              <h3 className="font-display mt-3 text-xl font-bold">{pick(lang, c.title)}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{pick(lang, c.body)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="mt-20">
        <SectionHeading
          eyebrow={pick(lang, home.programsEyebrow)}
          title={pick(lang, home.programsTitle)}
          body={pick(lang, home.programsBody)}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} lang={lang} service={{ ...s, cta: SERVICE_CTA[s.slug] }} />
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="mt-20">
        <SectionHeading eyebrow={lang === "ar" ? "لمن؟" : "WHO WE SERVE"} title={pick(lang, home.audienceTitle)} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {home.audiences.map((a) => (
            <Link key={a.slug} href={a.slug === "families" ? "/book-assessment" : `/programs/${a.slug}`} className="glass glass-card block p-6">
              <span className="text-3xl" aria-hidden>{a.icon}</span>
              <h3 className="font-display mt-3 text-lg font-bold">{pick(lang, a.title)}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{pick(lang, a.body)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="glass mt-20 rounded-3xl p-8 text-center md:p-14">
        <SectionHeading eyebrow={lang === "ar" ? "منهجنا" : "OUR APPROACH"} title={pick(lang, home.approachTitle)} body={pick(lang, home.approachBody)} />
        <Link href="/approach" className="btn-primary mt-8">{t(lang, "common.learn_more")}</Link>
      </section>

      {/* Steps */}
      <section className="mt-20">
        <SectionHeading eyebrow={lang === "ar" ? "ابدأ" : "GET STARTED"} title={pick(lang, home.stepsTitle)} />
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {home.steps.map((s, i) => (
            <li key={i} className="glass glass-card p-6">
              <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-violet)] font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 font-bold">{pick(lang, s.title)}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{pick(lang, s.body)}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link href="/book-assessment" className="btn-primary">{t(lang, "common.book_assessment")}</Link>
        </div>
      </section>

      {/* Teachers */}
      <section className="mt-20">
        <SectionHeading eyebrow={lang === "ar" ? "فريقنا" : "TEACHERS"} title={pick(lang, home.teachersTitle)} body={pick(lang, home.teachersBody)} />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {teachers.slice(0, 2).map((x) => (
            <TeacherCard key={x.id} lang={lang} teacher={x} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/teachers" className="btn-ghost">{t(lang, "common.learn_more")}</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-20 max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={pick(lang, home.faqTitle)} />
        <div className="mt-8">
          <FAQAccordion lang={lang} items={faqs.slice(0, 6)} />
        </div>
        <div className="mt-6 text-center">
          <Link href="/faq" className="btn-ghost">{t(lang, "common.read_more")}</Link>
        </div>
      </section>

      <div className="mt-20">
        <CTASection lang={lang} title={pick(lang, home.ctaTitle)} body={pick(lang, home.ctaBody)} />
      </div>
    </SiteShell>
  );
}
