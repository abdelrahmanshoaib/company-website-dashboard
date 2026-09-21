import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Breadcrumbs, EmptyState } from "@/components/sections";
import { getLang, pick } from "@/lib/lang";
import { getPublishedPosts } from "@/lib/site";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: lang === "ar" ? "المدونة ومصادر التعلم" : "Blog & Learning Resources" };
}

export default async function BlogPage() {
  const lang = await getLang();
  const posts = await getPublishedPosts();
  const cats = [...new Set(posts.map((p) => p.category))];
  return (
    <SiteShell>
      <Breadcrumbs lang={lang} trail={[{ href: "/", label: t(lang, "nav.home") }, { label: t(lang, "nav.blog") }]} />
      <h1 className="font-display text-3xl font-bold md:text-5xl">{t(lang, "nav.blog")}</h1>
      {posts.length === 0 ? (
        <div className="mt-8"><EmptyState lang={lang} /></div>
      ) : (
        cats.map((c) => (
          <section key={c} className="mt-10">
            <h2 className="font-display text-xl font-bold">{c}</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              {posts.filter((p) => p.category === c).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="glass glass-card block p-6">
                  <p className="text-xs font-bold text-[var(--color-violet)]">{p.category} · {p.publishedAt?.slice(0, 10)}</p>
                  <h3 className="font-display mt-2 text-xl font-bold">{pick(lang, p.title)}</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{pick(lang, p.excerpt)}</p>
                  <span className="mt-3 inline-block font-bold text-[var(--color-primary)]">{t(lang, "common.read_more")} →</span>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </SiteShell>
  );
}
