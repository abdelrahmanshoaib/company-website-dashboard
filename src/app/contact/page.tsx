import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { getSite } from "@/lib/site";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: lang === "ar" ? "تواصل معنا" : "Contact Us" };
}

export default async function ContactPage() {
  const lang = await getLang();
  const { settings } = await getSite();
  const L = (en: string, ar: string) => pick(lang, { en, ar });
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: t(lang, "nav.contact") }]} />
      <h1 className="font-display text-3xl font-bold md:text-5xl">{t(lang, "nav.contact")}</h1>
      <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
        {L("Questions about programs, scheduling, or enrollment? Reach out — a real person replies.", "أسئلة عن البرامج أو المواعيد أو التسجيل؟ راسلنا — سيرد عليك شخص حقيقي.")}
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="glass glass-card p-7">
          <h2 className="font-bold">{L("Direct contact", "تواصل مباشر")}</h2>
          <p className="mt-3 text-sm" dir="ltr">{settings.contactEmail}</p>
          <p className="mt-1 text-sm" dir="ltr">{settings.contactPhone}</p>
          {settings.whatsapp && <p className="mt-1 text-sm" dir="ltr">WhatsApp: {settings.whatsapp}</p>}
        </section>
        <section className="glass glass-card p-7">
          <h2 className="font-bold">{L("Prefer a guided start?", "تفضل بداية موجهة؟")}</h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {L("The free assessment form collects everything we need to recommend your program.", "يجمع نموذج التقييم المجاني كل ما نحتاجه لترشيح برنامجك.")}
          </p>
          <Link href="/book-assessment" className="btn-primary mt-5">{t(lang, "common.book_assessment")}</Link>
        </section>
      </div>
    </SiteShell>
  );
}
