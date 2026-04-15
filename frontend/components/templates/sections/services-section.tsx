import type { Site } from "@/lib/types";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function ServicesSection({ content, site, variant }: Props) {
  const items = content.items || [];
  const c = site.colors;

  return (
    <section id="services" className="px-6 py-16 md:py-24" style={{ backgroundColor: `${c.primary}05` }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
          {content.title || "Our Services"}
        </h2>
        <div className={`grid gap-6 ${items.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}>
          {items.map((item: any) => (
            <div
              key={item.id}
              className="rounded-xl border p-6 transition-shadow hover:shadow-md"
              style={{ borderColor: `${c.primary}15`, backgroundColor: c.background }}
            >
              {item.image && <img src={item.image} alt={item.name} className="mb-4 h-32 w-full rounded-lg object-cover" />}
              <h3 className="font-semibold" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
                {item.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed opacity-60">{item.description}</p>
              {item.price && (
                <p className="mt-3 text-sm font-semibold" style={{ color: c.secondary }}>{item.price}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
