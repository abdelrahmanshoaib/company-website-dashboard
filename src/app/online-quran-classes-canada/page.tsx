import SeoLandingView, { seoMetadata } from "@/components/SeoLandingView";

export async function generateMetadata() {
  return seoMetadata("canada", "/online-quran-classes-canada");
}

export default function CanadaPage() {
  return <SeoLandingView pageKey="canada" />;
}
