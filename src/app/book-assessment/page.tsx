import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import AssessmentForm from "@/components/AssessmentForm";
import { Breadcrumbs } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { getNavServices, getSite } from "@/lib/site";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: lang === "ar" ? "احجز جلسة تقييم مجانية" : "Book a Free Assessment",
    description: lang === "ar"
      ? "شاركنا أهدافك ومواعيدك وسنوصي بالبرنامج المناسب."
      : "Share your goals and availability and we will recommend the right program.",
  };
}

export default async function BookAssessmentPage() {
  const lang = await getLang();
  const [{ settings }, services] = await Promise.all([getSite(), getNavServices()]);
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: t(lang, "nav.book") }]} />
      <h1 className="font-display max-w-3xl text-3xl font-bold md:text-5xl">{t(lang, "nav.book")}</h1>
      <p className="mt-4 max-w-3xl text-[var(--color-muted)]">
        {pick(lang, {
          en: "Tell us about your goals and schedule. Submitting this form sends a request — nothing is booked until our team confirms it with you.",
          ar: "أخبرنا بأهدافك ومواعيدك. إرسال هذا النموذج يرسل طلبًا — ولا يُعد أي موعد محجوزًا حتى يؤكده فريقنا معك.",
        })}
      </p>
      <div className="mx-auto mt-8 max-w-3xl">
        <AssessmentForm lang={lang} programs={services} timeZones={settings.timeZones} />
      </div>
    </SiteShell>
  );
}
