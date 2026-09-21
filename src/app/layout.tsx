import type { Metadata } from "next";
import { Playfair_Display, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { getLang } from "@/lib/lang";
import { readDb } from "@/lib/db";

const display = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const arabic = IBM_Plex_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"], weight: ["400", "500", "600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const db = await readDb();
  const name = db.settings.academyName.en;
  return {
    title: { default: `${name} | Online Quran & Arabic Academy`, template: `%s | ${name}` },
    description:
      "Personalized online Quran classes, Arabic language programs, and Islamic Studies for children, adults, converts, and Muslim families in the UK and Canada.",
    metadataBase: new URL("https://example.com"),
    alternates: { canonical: "/" },
    openGraph: {
      title: `${name} | Online Quran & Arabic Academy`,
      description: "Learn the Quran. Understand Arabic. Build lasting confidence.",
      type: "website",
      locale: "en_GB",
      alternateLocale: ["ar"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${display.variable} ${body.variable} ${arabic.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
