import Link from "next/link";

const services = [
  { t: "تصميم وتطوير مواقع", d: "مواقع Next.js سريعة ومتجاوبة مع SEO." },
  { t: "داشبورد إدارة", d: "لوحة تحكم عربية لإدارة المحتوى والمستخدمين." },
  { t: "تحسين ومتابعة", d: "إحصائيات زيارات وتحسين مستمر للأداء." },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="text-sm text-blue-700">→ عودة للرئيسية</Link>
      <h1 className="mt-4 text-3xl font-bold">خدماتنا</h1>
      <div className="mt-6 grid gap-4">
        {services.map((s) => (
          <div key={s.t} className="rounded-xl border bg-white p-6">
            <h3 className="font-bold">{s.t}</h3>
            <p className="mt-1 text-sm text-gray-600">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
