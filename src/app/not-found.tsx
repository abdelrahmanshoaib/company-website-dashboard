import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getLang } from "@/lib/lang";

export default async function NotFound() {
  const lang = await getLang();
  return (
    <SiteShell>
      <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-10 text-center">
        <p className="text-5xl" aria-hidden>🔍</p>
        <h1 className="font-display mt-4 text-3xl font-bold">404</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          {lang === "ar" ? "الصفحة غير موجودة." : "This page could not be found."}
        </p>
        <Link href="/" className="btn-primary mt-6">
          {lang === "ar" ? "عودة للرئيسية" : "Back to home"}
        </Link>
      </div>
    </SiteShell>
  );
}
