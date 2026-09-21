import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="text-sm text-blue-700">→ عودة للرئيسية</Link>
      <h1 className="mt-4 text-3xl font-bold">من نحن</h1>
      <p className="mt-4 text-gray-600">
        نحن فريق متخصص في بناء المواقع التعريفية والمتاجر الإلكترونية. مهمتنا تبسيط إدارة المحتوى لأصحاب الشركات عبر داشبورد عربية سهلة.
      </p>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border">
        <h2 className="font-bold">رؤيتنا</h2>
        <p className="mt-2 text-sm text-gray-600">أن يكون لكل شركة موقع سريع وقابل للتعديل بالكامل بدون تعقيد تقني.</p>
      </div>
    </div>
  );
}
