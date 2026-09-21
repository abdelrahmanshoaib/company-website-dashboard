import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="text-sm text-blue-700">→ عودة للرئيسية</Link>
      <h1 className="mt-4 text-3xl font-bold">تواصل معنا</h1>
      <form className="mt-6 space-y-4 rounded-xl border bg-white p-6" action="mailto:info@company.com">
        <input className="w-full rounded border px-3 py-2" placeholder="الاسم" required />
        <input className="w-full rounded border px-3 py-2" placeholder="البريد الإلكتروني" type="email" required />
        <textarea className="w-full rounded border px-3 py-2" placeholder="رسالتك" rows={4} required />
        <button className="rounded bg-blue-700 px-5 py-2 text-white">إرسال</button>
      </form>
    </div>
  );
}
