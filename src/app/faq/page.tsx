import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection, FAQAccordion } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { getPublicFaqs } from "@/lib/site";
import { home } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: pick(lang, home.faqTitle) };
}

export default async function FaqPage() {
  const lang = await getLang();
  const faqs = await getPublicFaqs();
  const cats = [...new Set(faqs.map((f) => f.category))];
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: "FAQ" }]} />
      <h1 className="font-display text-3xl font-bold md:text-5xl">{pick(lang, home.faqTitle)}</h1>
      {cats.map((c) => (
        <section key={c} className="mx-auto mt-10 max-w-3xl">
          <h2 className="font-display mb-4 text-xl font-bold">{c}</h2>
          <FAQAccordion lang={lang} items={faqs.filter((f) => f.category === c)} />
        </section>
      ))}
      <div className="mt-10">
        <CTASection lang={lang} title={pick(lang, home.ctaTitle)} body={pick(lang, home.ctaBody)} />
      </div>
    </SiteShell>
  );
}
