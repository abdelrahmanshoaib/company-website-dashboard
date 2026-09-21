"use client";

import type { Lang } from "@/lib/academy";

/** Tiny client-safe bilingual picker (server version lives in lib/lang.ts). */
export function pick<T>(lang: Lang, v: { en: T; ar: T }): T {
  return lang === "ar" ? v.ar : v.en;
}
