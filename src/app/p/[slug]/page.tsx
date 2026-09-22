import SiteShell from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/sections";
import { RichContent } from "@/components/RichContent";
import { getPageBySlug } from "@/lib/site";
import { getLang, pick } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Page" };
  return { title: pick(lang, page.metaTitle), description: pick(lang, page.metaDescription) };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: pick(lang, page.title) }]} />
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold md:text-5xl">{pick(lang, page.title)}</h1>
        <div className="glass mt-8 rounded-3xl p-7 md:p-10">
          <RichContent text={pick(lang, page.content)} />
        </div>
      </article>
    </SiteShell>
  );
}
