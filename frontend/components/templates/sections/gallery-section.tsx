"use client";

import type { Site } from "@/lib/types";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function GallerySection({ content, site, variant }: Props) {
  const images = content.images || [];
  const columns = content.columns || 3;
  const c = site.colors;
  const isDark = variant === "bold";

  if (images.length === 0) return null;

  return (
    <section
      id="gallery"
      className="px-6 py-20 md:py-28"
      style={{ backgroundColor: isDark ? "#0D0A12" : c.background }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <div
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: c.secondary }}
          >
            Our Work
          </div>
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}
          >
            Gallery
          </h2>
          <div
            className="mx-auto mt-3 h-1 w-12 rounded-full"
            style={{ backgroundColor: c.secondary }}
          />
        </div>

        <div
          className={`grid gap-4 ${
            columns === 2 ? "grid-cols-2" : columns === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          {images.map((img: any, idx: number) => (
            <div
              key={img.id}
              className={`group relative overflow-hidden rounded-xl ${
                idx === 0 && images.length > 3 ? "row-span-2" : ""
              }`}
              style={{ aspectRatio: idx === 0 && images.length > 3 ? "auto" : "1/1" }}
            >
              <img
                src={img.url}
                alt={img.alt || img.caption || ""}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ minHeight: "200px" }}
              />
              {/* Overlay on hover */}
              <div
                className="absolute inset-0 flex items-end opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to top, ${c.primary}CC, transparent)`,
                }}
              >
                {img.caption && (
                  <p className="p-4 text-sm font-medium text-white">{img.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
