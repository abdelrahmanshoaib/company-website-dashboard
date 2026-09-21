import { GlassNavbar, Footer } from "./chrome";
import { getSite, getNavServices } from "@/lib/site";
import { pick } from "@/lib/lang";

export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const { lang, settings } = await getSite();
  const services = await getNavServices();
  return (
    <>
      <GlassNavbar lang={lang} academyName={pick(lang, settings.academyName)} services={services} />
      <main className="mx-auto w-full max-w-7xl px-4 pt-8">{children}</main>
      <Footer
        lang={lang}
        academyName={pick(lang, settings.academyName)}
        tagline={pick(lang, settings.tagline)}
        email={settings.contactEmail}
        services={services}
      />
    </>
  );
}
