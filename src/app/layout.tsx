import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "شركتنا | موقع تعريفي",
  description: "موقع تعريفي للشركة مع داشبورد كاملة للتعديل وإدارة المحتوى",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html dir="rtl" lang="ar">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
