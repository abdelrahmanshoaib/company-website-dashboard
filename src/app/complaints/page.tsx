import LegalView, { legalMetadata } from "@/components/LegalView";

export async function generateMetadata() {
  return legalMetadata("complaints");
}

export default function ComplaintsPage() {
  return <LegalView slug="complaints" />;
}
