import LegalView, { legalMetadata } from "@/components/LegalView";

export async function generateMetadata() {
  return legalMetadata("accessibility");
}

export default function AccessibilityPage() {
  return <LegalView slug="accessibility" />;
}
