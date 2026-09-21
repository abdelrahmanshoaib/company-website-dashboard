import type { AcademyDb } from "./academy";
import { seedServices } from "./seed-services";
import { seedFaqs } from "./seed-faqs";
import { seedPosts } from "./seed-posts";
import { seedPages } from "./seed-legal";

// Precomputed scrypt hash for the default super-admin password "Admin123!".
// Change the password from Admin → Users immediately after first login.
const ADMIN_HASH =
  "scrypt:a9f3c71e5b2d48aa91c4e6d0f3b57c2e:0dc352fa571ca8d6e1fcaec611143efdb1ad750d5e13d371bdf626e25e2f826ae050362bfdb37ae270e0592e8abd9d8272fd15495b3874ebf49c825b720ce06e";

const now = new Date().toISOString();

export function seedDatabase(): AcademyDb {
  return {
    users: [
      {
        id: "user_admin",
        name: "Super Admin",
        email: "admin@academy.local",
        passwordHash: ADMIN_HASH,
        role: "super_admin",
        active: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    sessions: [],
    pages: seedPages,
    services: seedServices,
    teachers: [
      {
        id: "t_sample_1",
        name: "Sample Teacher — replace in Admin",
        bio: {
          en: "SAMPLE PROFILE. Replace this with a verified teacher biography entered by the academy administration.",
          ar: "ملف تجريبي. استبدله بسيرة معلم موثقة تُدخلها إدارة الأكاديمية.",
        },
        subjects: ["Quran Reading"],
        languages: ["English", "Arabic"],
        qualifications: "To be completed by the academy",
        experience: "To be completed by the academy",
        photo: "",
        availability: { en: "To be announced", ar: "يُعلن لاحقًا" },
        published: true,
        placeholder: true,
        order: 1,
      },
      {
        id: "t_sample_2",
        name: "Sample Teacher 2 — replace in Admin",
        bio: {
          en: "SAMPLE PROFILE. Replace this with a verified teacher biography entered by the academy administration.",
          ar: "ملف تجريبي. استبدله بسيرة معلم موثقة تُدخلها إدارة الأكاديمية.",
        },
        subjects: ["Arabic Language"],
        languages: ["English", "Arabic"],
        qualifications: "To be completed by the academy",
        experience: "To be completed by the academy",
        photo: "",
        availability: { en: "To be announced", ar: "يُعلن لاحقًا" },
        published: true,
        placeholder: true,
        order: 2,
      },
    ],
    faqs: seedFaqs,
    posts: seedPosts,
    media: [],
    requests: [],
    notes: [],
    settings: {
      // CONFIGURABLE PLACEHOLDER — edit in Admin → Site Settings.
      academyName: { en: "Noor Academy", ar: "أكاديمية نور" },
      tagline: {
        en: "Online Quran, Arabic & Islamic Studies",
        ar: "القرآن واللغة العربية والدراسات الإسلامية أونلاين",
      },
      contactEmail: "contact@example.com",
      contactPhone: "+44 0000 000000",
      whatsapp: "",
      social: { x: "", facebook: "", instagram: "", youtube: "" },
      defaultLang: "en",
      footerNote: {
        en: "Structured online learning for the UK and Canada.",
        ar: "تعليم منظم أونلاين لبريطانيا وكندا.",
      },
      timeZones: ["Europe/London", "America/Toronto", "America/Vancouver"],
      colors: {
        primary: "#56308F",
        violet: "#7045B5",
        lavender: "#DCCBFA",
        coral: "#FF8062",
        gold: "#D9B56D",
      },
    },
    activity: [],
    passwordResets: [],
  };
}
