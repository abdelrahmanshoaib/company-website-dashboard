import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { readDb } from "@/lib/db";
import { getLang, pick } from "@/lib/lang";

export async function generateStaticParams() {
  const db = await readDb();
  return db.services
    .filter((s) => s.status === "published" && s.active)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const db = await readDb();
  const svc = db.services.find((s) => s.slug === slug);
  if (!svc) return { title: "Program" };
  return {
    title: pick(lang, svc.metaTitle),
    description: pick(lang, svc.metaDescription),
    alternates: { canonical: `/programs/${slug}` },
  };
}

export default async function ServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const db = await readDb();
  const service = db.services.find((s) => s.slug === slug && s.status === "published" && s.active);
  if (!service) notFound();
  const related = db.services
    .filter((s) => s.slug !== slug && s.status === "published" && s.active)
    .slice(0, 3)
    .map((s) => ({ slug: s.slug, name: s.name }));
  const faqs = db.faqs.filter((f) => f.published).slice(0, 4);
  return <ServicePageView lang={lang} service={service} related={related} faqs={faqs} />;
}
