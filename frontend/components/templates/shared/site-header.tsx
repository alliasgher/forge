import type { Site } from "@/lib/types";

export function SiteHeader({ site }: { site: Site }) {
  return (
    <header
      className="border-b px-6 py-4"
      style={{ borderColor: `${site.colors.primary}20`, backgroundColor: site.colors.background }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2">
          {site.logo_url && (
            <img src={site.logo_url} alt="" className="h-8 w-auto" />
          )}
          <span
            className="text-lg font-bold"
            style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: site.colors.primary }}
          >
            {site.business_name}
          </span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex" style={{ color: site.colors.text }}>
          <a href="#about" className="opacity-70 hover:opacity-100 transition-opacity">About</a>
          <a href="#services" className="opacity-70 hover:opacity-100 transition-opacity">Services</a>
          <a href="#gallery" className="opacity-70 hover:opacity-100 transition-opacity">Gallery</a>
          <a href="#contact" className="opacity-70 hover:opacity-100 transition-opacity">Contact</a>
        </nav>
      </div>
    </header>
  );
}
