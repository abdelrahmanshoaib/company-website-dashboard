// Central domain types for the academy platform.
// All user-facing content is bilingual (en/ar).

export type Lang = "en" | "ar";
export type Status = "draft" | "published" | "archived";
export type Role = "super_admin" | "content_manager" | "admissions" | "academic_manager";

export interface Bilingual {
  en: string;
  ar: string;
}

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  token: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
}

export interface PageDoc {
  id: string;
  slug: string;
  title: Bilingual;
  metaTitle: Bilingual;
  metaDescription: Bilingual;
  content: Bilingual; // structured plain-text sections separated by blank lines
  status: Status;
  updatedAt: string;
  updatedBy: string;
}

export interface ServiceDoc {
  id: string;
  slug: string;
  name: Bilingual;
  short: Bilingual;
  content: Bilingual;
  outcomes: Bilingual[]; // learning outcomes list
  audience: Bilingual[];
  curriculum: Bilingual[];
  icon: string;
  order: number;
  featured: boolean;
  active: boolean;
  status: Status;
  metaTitle: Bilingual;
  metaDescription: Bilingual;
  updatedAt: string;
}

export interface TeacherDoc {
  id: string;
  name: string;
  bio: Bilingual;
  subjects: string[];
  languages: string[];
  qualifications: string;
  experience: string;
  photo: string;
  availability: Bilingual;
  published: boolean;
  placeholder: boolean; // true = clearly-marked sample, replace in admin
  order: number;
}

export interface FaqDoc {
  id: string;
  category: string;
  question: Bilingual;
  answer: Bilingual;
  order: number;
  published: boolean;
}

export interface PostDoc {
  id: string;
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  content: Bilingual;
  category: string;
  tags: string[];
  author: string;
  status: Status;
  publishedAt: string | null;
  metaTitle: Bilingual;
  metaDescription: Bilingual;
  updatedAt: string;
}

export interface MediaDoc {
  id: string;
  fileName: string;
  url: string;
  alt: string;
  mime: string;
  size: number;
  category: string;
  createdAt: string;
}

export type RequestStatus =
  | "new"
  | "under_review"
  | "contacted"
  | "assessment_scheduled"
  | "enrolled"
  | "closed"
  | "archived";

export interface AssessmentRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  ageRange: string;
  preferredLanguage: string;
  program: string;
  level: string;
  goals: string;
  days: string;
  timeRange: string;
  timeZone: string;
  notes: string;
  consent: boolean;
  status: RequestStatus;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

export interface InternalNote {
  id: string;
  requestId: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface SiteSettings {
  academyName: Bilingual;
  tagline: Bilingual;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  social: { x: string; facebook: string; instagram: string; youtube: string };
  defaultLang: Lang;
  footerNote: Bilingual;
  timeZones: string[];
  colors: { primary: string; violet: string; lavender: string; coral: string; gold: string };
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: string;
  entity: string;
  entityId: string;
  createdAt: string;
}

export interface AcademyDb {
  users: DbUser[];
  sessions: Session[];
  pages: PageDoc[];
  services: ServiceDoc[];
  teachers: TeacherDoc[];
  faqs: FaqDoc[];
  posts: PostDoc[];
  media: MediaDoc[];
  requests: AssessmentRequest[];
  notes: InternalNote[];
  settings: SiteSettings;
  activity: ActivityLog[];
  passwordResets: { token: string; userId: string; expiresAt: string }[];
}
