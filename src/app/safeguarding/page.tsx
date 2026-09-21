import LegalView, { legalMetadata } from "@/components/LegalView";

export async function generateMetadata() {
  return legalMetadata("safeguarding");
}

export default function SafeguardingPage() {
  return <LegalView slug="safeguarding" />;
}
