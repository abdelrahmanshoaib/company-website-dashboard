import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-l bg-white p-6">
        <h2 className="text-lg font-bold text-blue-700">لوحة التحكم</h2>
        <nav className="mt-6 space-y-2 text-sm">
          <Link className="block rounded px-3 py-2 hover:bg-gray-100" href="/dashboard">📊 الإحصائيات</Link>
          <Link className="block rounded px-3 py-2 hover:bg-gray-100" href="/dashboard/content">📝 المحتوى والصفحات</Link>
          <Link className="block rounded px-3 py-2 hover:bg-gray-100" href="/dashboard/users">👥 المستخدمون والطلبات</Link>
          <Link className="block rounded px-3 py-2 hover:bg-gray-100" href="/dashboard/settings">⚙️ الإعدادات</Link>
          <Link className="block rounded px-3 py-2 hover:bg-gray-100" href="/">🌐 عرض الموقع</Link>
          <form action="/api/logout" method="post">
            <button className="mt-4 w-full rounded bg-red-50 px-3 py-2 text-red-700">تسجيل الخروج</button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
