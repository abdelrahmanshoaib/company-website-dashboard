import SeoLandingView, { seoMetadata } from "@/components/SeoLandingView";

export async function generateMetadata() {
  return seoMetadata("adults", "/online-quran-classes-for-adults");
}

export default function AdultsSeoPage() {
  return <SeoLandingView pageKey="adults" />;
}
