# Noor Academy — Premium Online Quran & Arabic Academy (Bilingual EN/AR)

Complete bilingual website + CMS admin dashboard for an online Quran, Arabic language & Islamic Studies academy serving the UK and Canada.

> The academy name, logo text, and contact details are **configurable placeholders** — edit them in **Admin → Site Settings**. No accreditation, staff credentials, statistics, or testimonials are claimed unless entered by the administrator.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- File-based JSON database (`data/academy.db.json`, auto-seeded on first run) with a normalized schema: users, sessions, pages, services, teachers, faqs, posts, media, requests, notes, settings, activity
- Secure admin auth: scrypt password hashing, random session tokens (httpOnly cookies), role-based permissions enforced **server-side** in every API route + `proxy.ts` route guard
- Bilingual EN/AR with RTL/LTR, persisted language cookie, per-page SEO metadata, sitemap + robots, JSON-LD

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (default language: English, switch to عربي from the header).

## Admin

- URL: `/admin` (login: `/admin/login`)
- Default super-admin: `admin@academy.local` / `Admin123!` — **change immediately** via Admin → Users & Roles
- Sections: Overview, Pages, Services, Teachers, FAQs, Blog, Media Library, Assessment Requests (CRM), Site Settings, Users & Roles, Activity Log
- Roles: `super_admin`, `content_manager`, `admissions`, `academic_manager` (permissions enforced by the backend)

## Public pages (29)

Home, About, 6 service pages, Children/Adults/Converts programs, How It Works, Teachers, Learning Approach, FAQ, Contact, Book a Free Assessment, Blog + articles, Privacy, Terms, Safeguarding, Accessibility, Student Login (integration-ready notice + working links), generic CMS pages (`/p/[slug]`), 4 SEO landing pages (`/online-quran-classes-uk`, `-canada`, `-for-kids`, `-for-adults`).

## Deploying (Vercel)

Works out of the box. Note: serverless filesystems are read-only, so the JSON
database runs **ephemerally** (resets on redeploy/scale). For persistent data,
set `ACADEMY_DB_DIR` to a writable volume, or migrate to Postgres/Supabase.

Health check: `/api/health`.

## Notes

- Teacher profiles ship as **clearly-marked samples** — replace in Admin → Teachers.
- 6 of 8 blog topics ship as **drafts** pending academic review; 2 are published.
- Assessment form validates, prevents duplicates (24h), stores securely; staff email/SMS notification is **integration-ready** (see note in `src/app/api/assessments/route.ts`).
- Legal pages are starter templates — have them reviewed for UK/Canadian jurisdictions.
- `metadataBase` / sitemap use `https://example.com` — replace with the production domain.
