import type { Metadata } from "next";
import AudienceView, { audienceMeta } from "@/components/AudienceView";
import { getLang, pick } from "@/lib/lang";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const m = audienceMeta("converts")!;
  return { title: pick(lang, m.title), description: pick(lang, m.intro) };
}

export default async function ConvertsPage() {
  const lang = await getLang();
  return <AudienceView lang={lang} slug="converts" />;
}
