import { getStats } from "@/lib/data";

export default async function DashboardPage() {
  const stats = getStats();
  const cards = [
    { label: "إجمالي الزيارات", value: stats.visits.toLocaleString("ar-EG") },
    { label: "زيارات هذا الشهر", value: stats.visitsThisMonth.toLocaleString("ar-EG") },
    { label: "إجمالي المستخدمين", value: stats.totalUsers },
    { label: "المستخدمون النشطون", value: stats.activeUsers },
    { label: "الطلبات", value: stats.orders },
    { label: "نسبة التحويل", value: stats.conversion },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">الإحصائيات والتقارير</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-2 text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h2 className="font-bold">الزيارات حسب الشهر</h2>
        <div className="mt-4 space-y-2">
          {stats.chart.map((r) => (
            <div key={r.month} className="flex items-center gap-3">
              <span className="w-16 text-sm">{r.month}</span>
              <div className="h-3 flex-1 rounded bg-gray-100">
                <div className="h-3 rounded bg-blue-600" style={{ width: `${(r.visits / 2200) * 100}%` }} />
              </div>
              <span className="text-sm">{r.visits}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
