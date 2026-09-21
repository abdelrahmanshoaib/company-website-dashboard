import LegalView, { legalMetadata } from "@/components/LegalView";

export async function generateMetadata() {
  return legalMetadata("terms");
}

export default function TermsPage() {
  return <LegalView slug="terms" />;
}
