import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, Paragraphs } from "@/components/sections";
import { getPageBySlug } from "@/lib/site";
import { getLang, pick } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function legalMetadata(slug: string) {
  const lang = await getLang();
  const page = await getPageBySlug(slug);
  if (!page) return { title: slug };
  return { title: pick(lang, page.metaTitle), description: pick(lang, page.metaDescription) };
}

export default async function LegalView({ slug }: { slug: string }) {
  const lang = await getLang();
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: pick(lang, page.title) }]} />
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold md:text-5xl">{pick(lang, page.title)}</h1>
        <div className="glass mt-8 rounded-3xl p-7 md:p-10">
          <Paragraphs text={pick(lang, page.content)} />
        </div>
      </article>
    </SiteShell>
  );
}

export { t };
