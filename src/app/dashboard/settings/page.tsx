export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">الإعدادات</h1>
      <div className="mt-6 max-w-xl space-y-4 rounded-xl border bg-white p-6">
        <div>
          <label className="text-sm font-medium">اسم الموقع</label>
          <input className="mt-1 w-full rounded border px-3 py-2" defaultValue="شركتنا" />
        </div>
        <div>
          <label className="text-sm font-medium">وصف الموقع</label>
          <input className="mt-1 w-full rounded border px-3 py-2" defaultValue="موقع تعريفي مع داشبورد كاملة" />
        </div>
        <button className="rounded bg-blue-700 px-5 py-2 text-white">حفظ الإعدادات</button>
        <p className="text-xs text-gray-500">* الإعدادات تجريبية في النسخة الأولى وتحفظ لاحقاً في قاعدة بيانات.</p>
      </div>
    </div>
  );
}
