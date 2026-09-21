# Company Website + Dashboard

موقع تعريفي للشركة (عربي RTL) مع داشبورد كاملة للتعديل — مبني بـ Next.js 16 App Router.

## التشغيل

```bash
npm install
npm run dev
```

افتح `http://localhost:3000` ثم ادخل الداشبورد من `/dashboard`.

حساب الدخول التجريبي:
- البريد: `admin@company.com`
- كلمة المرور: `admin123`

## المميزات
- صفحات عامة: الرئيسية، من نحن، خدماتنا، تواصل معنا
- داشبورد محمية بـ `proxy.ts`:
  - `/dashboard` إحصائيات وتقارير
  - `/dashboard/content` إدارة المحتوى والصفحات (إضافة/تعديل/حذف)
  - `/dashboard/users` إدارة المستخدمين والطلبات
  - `/dashboard/settings` الإعدادات
- APIs: `/api/content`, `/api/users`, `/api/stats`, `/api/login`
