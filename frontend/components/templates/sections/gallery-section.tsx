"use client";

import type { Site } from "@/lib/types";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { ImageMarquee } from "../shared/image-marquee";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function GallerySection({ content, site, variant }: Props) {
  const images = content.images || [];
  const c = site.colors;
  const isDark = variant === "bold";
  const { ref, visible } = useScrollReveal();

  if (images.length === 0) return null;

  const urls = images.map((img: any) => img.url).filter(Boolean);

  return (
    <section
      id="gallery"
      className="py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: isDark ? "#0D0A18" : c.background }}
    >
      {/* Header */}
      <div
        ref={ref}
        className="mb-12 px-6 text-center transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)" }}
      >
        <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>Our Work</div>
        <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}>
          Gallery
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full" style={{ backgroundColor: c.secondary }} />
      </div>

      {/* Marquee rows */}
      <div className="space-y-4">
        <ImageMarquee images={urls} speed={28} height={220} />
        {urls.length > 3 && <ImageMarquee images={[...urls].reverse()} speed={35} reverse height={200} />}
      </div>

      {/* Grid below marquee if we have more */}
      {urls.length > 4 && (
        <div className="mx-auto mt-8 max-w-6xl px-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.slice(0, 4).map((img: any) => (
            <div key={img.id} className="group overflow-hidden rounded-2xl aspect-square">
              <img src={img.url} alt={img.caption || ""} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
