import { cookies } from "next/headers";
import type { Lang } from "./academy";

export const LANG_COOKIE = "academy_lang";

export async function getLang(): Promise<Lang> {
  try {
    const jar = await cookies();
    const v = jar.get(LANG_COOKIE)?.value;
    return v === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export function pick<T>(lang: Lang, v: { en: T; ar: T }): T {
  return lang === "ar" ? v.ar : v.en;
}
