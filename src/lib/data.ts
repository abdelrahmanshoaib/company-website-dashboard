export type SitePage = {
  slug: string;
  title: string;
  description: string;
  content: string;
  updatedAt: string;
};

export type SiteUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "blocked";
  createdAt: string;
};

// In-memory store (يُستبدل بقاعدة بيانات لاحقاً)
let pages: SitePage[] = [
  {
    slug: "home",
    title: "أهلاً بك في شركتنا",
    description: "نبني حلول ويب عصرية للشركات",
    content: "نحن شركة متخصصة في تطوير المواقع والمتاجر الإلكترونية مع داشبورد سهلة للإدارة.",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "about",
    title: "من نحن",
    description: "تعرف على فريقنا ورؤيتنا",
    content: "فريق صغير شغوف بالتقنية، نركز على الجودة وسرعة التسليم ودعم العملاء.",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "services",
    title: "خدماتنا",
    description: "تصميم، تطوير، تسويق",
    content: "تصميم مواقع، تطوير متاجر، تحسين محركات البحث، وإدارة المحتوى.",
    updatedAt: new Date().toISOString(),
  },
];

let users: SiteUser[] = [
  { id: "1", name: "مدير الموقع", email: "admin@company.com", role: "admin", status: "active", createdAt: new Date().toISOString() },
  { id: "2", name: "محرر المحتوى", email: "editor@company.com", role: "editor", status: "active", createdAt: new Date().toISOString() },
  { id: "3", name: "عميل تجريبي", email: "client@example.com", role: "viewer", status: "pending", createdAt: new Date().toISOString() },
];

export function getPages() {
  return pages;
}

export function upsertPage(page: SitePage) {
  const idx = pages.findIndex((p) => p.slug === page.slug);
  if (idx >= 0) pages[idx] = { ...page, updatedAt: new Date().toISOString() };
  else pages.push({ ...page, updatedAt: new Date().toISOString() });
  return page;
}

export function deletePage(slug: string) {
  pages = pages.filter((p) => p.slug !== slug);
}

export function getUsers() {
  return users;
}

export function addUser(user: Omit<SiteUser, "id" | "createdAt">) {
  const created: SiteUser = {
    ...user,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  users.push(created);
  return created;
}

export function deleteUser(id: string) {
  users = users.filter((u) => u.id !== id);
}

export function getStats() {
  return {
    totalPages: pages.length,
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    visits: 12840,
    visitsThisMonth: 2140,
    orders: 356,
    conversion: "4.8%",
    chart: [
      { month: "يناير", visits: 900 },
      { month: "فبراير", visits: 1200 },
      { month: "مارس", visits: 1500 },
      { month: "أبريل", visits: 1800 },
      { month: "مايو", visits: 2100 },
      { month: "يونيو", visits: 2140 },
    ],
  };
}
