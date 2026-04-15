import type { Site } from "@/lib/types";

interface Props {
  content: Record<string, any>;
  site: Site;
  variant: "modern" | "classic" | "bold";
}

export function HeroSection({ content, site, variant }: Props) {
  const { heading, subheading, ctaText, ctaLink, backgroundImage } = content;
  const c = site.colors;

  if (variant === "bold") {
    return (
      <section
        className="relative flex min-h-[80vh] items-center justify-center px-6 text-center"
        style={{
          background: backgroundImage
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage}) center/cover`
            : `linear-gradient(135deg, ${c.primary}, ${c.text})`,
          color: "#fff",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight md:text-7xl" style={{ fontFamily: `${site.fonts.heading}, sans-serif` }}>
            {heading}
          </h1>
          {subheading && <p className="mt-4 text-lg opacity-80 md:text-xl">{subheading}</p>}
          {ctaText && (
            <a href={ctaLink || "#contact"} className="mt-8 inline-block rounded-lg px-8 py-4 text-sm font-semibold transition-opacity hover:opacity-90" style={{ backgroundColor: c.secondary, color: c.text }}>
              {ctaText}
            </a>
          )}
        </div>
      </section>
    );
  }

  if (variant === "classic") {
    return (
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
              {heading}
            </h1>
            {subheading && <p className="mt-4 text-lg opacity-70">{subheading}</p>}
            {ctaText && (
              <a href={ctaLink || "#contact"} className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white" style={{ backgroundColor: c.primary }}>
                {ctaText}
              </a>
            )}
          </div>
          {backgroundImage && (
            <div className="flex-1">
              <img src={backgroundImage} alt="" className="rounded-xl shadow-lg" />
            </div>
          )}
        </div>
      </section>
    );
  }

  // Modern (default)
  return (
    <section
      className="relative flex min-h-[70vh] items-center justify-center px-6 text-center"
      style={{
        background: backgroundImage
          ? `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${backgroundImage}) center/cover`
          : undefined,
      }}
    >
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
          {heading}
        </h1>
        {subheading && <p className="mt-4 text-lg opacity-60">{subheading}</p>}
        {ctaText && (
          <a href={ctaLink || "#contact"} className="mt-8 inline-block rounded-full px-8 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg" style={{ backgroundColor: c.primary }}>
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
