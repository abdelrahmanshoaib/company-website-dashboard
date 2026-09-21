import Link from "next/link";

function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-700">
          شركتنا
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-blue-700">الرئيسية</Link>
          <Link href="/about" className="hover:text-blue-700">من نحن</Link>
          <Link href="/services" className="hover:text-blue-700">خدماتنا</Link>
          <Link href="/contact" className="hover:text-blue-700">تواصل معنا</Link>
          <Link href="/dashboard" className="rounded bg-blue-700 px-3 py-1.5 text-white hover:bg-blue-800">
            الداشبورد
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <section className="rounded-2xl bg-gradient-to-l from-blue-700 to-indigo-600 p-10 text-white">
          <h1 className="text-4xl font-bold">نبني مواقع عصرية تنمو بشركتك</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">
            موقع تعريفي سريع مع داشبورد كاملة: عدّل الصفحات والمحتوى، أدر المستخدمين والطلبات، وتابع الإحصائيات لحظة بلحظة.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/services" className="rounded-lg bg-white px-5 py-2.5 font-semibold text-blue-700">
              اكتشف خدماتنا
            </Link>
            <Link href="/dashboard" className="rounded-lg border border-white/40 px-5 py-2.5 font-semibold">
              ادخل الداشبورد
            </Link>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { t: "إدارة المحتوى والصفحات", d: "تعديل العناوين والنصوص والأقسام بدون مبرمج من لوحة التحكم." },
            { t: "إدارة المستخدمين والطلبات", d: "إضافة المستخدمين، تغيير الأدوار والحالة، ومتابعة الطلبات." },
            { t: "إحصائيات وتقارير", d: "زيارات، مستخدمين نشطين، طلبات، ونسبة تحويل في مكان واحد." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-bold">{f.t}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.d}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © 2026 شركتنا — جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
