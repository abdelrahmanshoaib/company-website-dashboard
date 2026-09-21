import SeoLandingView, { seoMetadata } from "@/components/SeoLandingView";

export async function generateMetadata() {
  return seoMetadata("uk", "/online-quran-classes-uk");
}

export default function UkPage() {
  return <SeoLandingView pageKey="uk" />;
}
