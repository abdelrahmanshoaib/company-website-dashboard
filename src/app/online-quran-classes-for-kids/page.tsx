import SeoLandingView, { seoMetadata } from "@/components/SeoLandingView";

export async function generateMetadata() {
  return seoMetadata("kids", "/online-quran-classes-for-kids");
}

export default function KidsPage() {
  return <SeoLandingView pageKey="kids" />;
}
