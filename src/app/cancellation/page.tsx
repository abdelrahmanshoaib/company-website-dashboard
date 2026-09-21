import LegalView, { legalMetadata } from "@/components/LegalView";

export async function generateMetadata() {
  return legalMetadata("cancellation");
}

export default function CancellationPage() {
  return <LegalView slug="cancellation" />;
}
