import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, CTASection } from "@/components/sections";
import { RichContent } from "@/components/RichContent";
import { readDb } from "@/lib/db";
import { getLang, pick } from "@/lib/lang";
import { home } from "@/lib/content";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const db = await readDb();
  const post = db.posts.find((p) => p.slug === slug && p.status === "published");
  if (!post) return { title: "Article" };
  return {
    title: pick(lang, post.metaTitle),
    description: pick(lang, post.metaDescription),
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const db = await readDb();
  const post = db.posts.find((p) => p.slug === slug && p.status === "published");
  if (!post) notFound();
  return (
    <SiteShell>
      <Breadcrumbs
        lang={lang}
        trail={[
          { href: "/", label: t(lang, "nav.home") },
          { href: "/blog", label: t(lang, "nav.blog") },
          { label: pick(lang, post.title) },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-bold text-[var(--color-violet)]">{post.category} · {post.author} · {post.publishedAt?.slice(0, 10)}</p>
        <h1 className="font-display mt-3 text-3xl font-bold md:text-5xl">{pick(lang, post.title)}</h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">{pick(lang, post.excerpt)}</p>
        <div className="glass mt-8 rounded-3xl p-7 md:p-10">
          <RichContent text={pick(lang, post.content)} />
        </div>
        {post.tags.length > 0 && (
          <p className="mt-6 text-sm text-[var(--color-muted)]">#{post.tags.join("  #")}</p>
        )}
        <div className="mt-8">
          <Link href="/blog" className="btn-ghost">← {t(lang, "nav.blog")}</Link>
        </div>
      </article>
      <div className="mt-10">
        <CTASection lang={lang} title={pick(lang, home.ctaTitle)} body={pick(lang, home.ctaBody)} />
      </div>
    </SiteShell>
  );
}
