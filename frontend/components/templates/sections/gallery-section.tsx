import type { Site } from "@/lib/types";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function GallerySection({ content, site }: Props) {
  const images = content.images || [];
  const columns = content.columns || 3;
  const c = site.colors;

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>
          Gallery
        </h2>
        <div className={`grid gap-4 ${columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {images.map((img: any) => (
            <div key={img.id} className="group overflow-hidden rounded-xl">
              <img
                src={img.url}
                alt={img.alt || img.caption || ""}
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {img.caption && (
                <p className="mt-2 text-center text-xs opacity-50">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
