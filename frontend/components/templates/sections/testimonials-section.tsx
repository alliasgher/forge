"use client";

import type { Site } from "@/lib/types";
import { StarRating } from "../shared/star-rating";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function TestimonialsSection({ content, site, variant }: Props) {
  const items = content.items || [];
  const c = site.colors;
  const isDark = variant === "bold";
  const { ref, visible } = useScrollReveal();

  if (items.length === 0) return null;

  const bg = isDark
    ? `linear-gradient(135deg, ${c.primary}20, #0D0A12)`
    : `linear-gradient(135deg, ${c.primary}08, ${c.secondary}08)`;

  return (
    <section
      className="px-6 py-20 md:py-28 overflow-hidden"
      style={{ background: bg }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className="mb-14 text-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)" }}
        >
          <div
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: c.secondary }}
          >
            Testimonials
          </div>
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}
          >
            What Our Clients Say
          </h2>
          <div
            className="mx-auto mt-3 h-1 w-12 rounded-full"
            style={{ backgroundColor: c.secondary }}
          />
        </div>

        {/* Large featured quote if only 1 */}
        {items.length === 1 ? (
          <div
            className="mx-auto max-w-3xl rounded-3xl p-10 text-center"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : c.background,
              border: `1px solid ${c.primary}15`,
            }}
          >
            <div className="mb-4 text-5xl opacity-20" style={{ color: c.secondary }}>"</div>
            <StarRating rating={items[0].rating || 5} color={c.secondary} />
            <p
              className="mt-4 text-lg leading-relaxed italic"
              style={{ color: isDark ? "rgba(255,255,255,0.75)" : `${c.text}80` }}
            >
              "{items[0].text}"
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              {items[0].photo && (
                <img src={items[0].photo} alt={items[0].name} className="h-12 w-12 rounded-full object-cover" />
              )}
              <div>
                <p className="font-semibold" style={{ color: isDark ? "#fff" : c.primary }}>{items[0].name}</p>
                {items[0].role && <p className="text-xs opacity-50" style={{ color: isDark ? "#fff" : c.text }}>{items[0].role}</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${items.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {items.map((item: any, idx: number) => (
              <div
                key={item.id}
                className="relative rounded-2xl p-7 transition-all hover:shadow-lg"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.04)" : c.background,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : c.primary + "12"}`,
                }}
              >
                {/* Quote mark */}
                <div
                  className="absolute top-5 right-6 text-4xl font-serif leading-none opacity-10"
                  style={{ color: c.secondary }}
                >
                  "
                </div>
                <StarRating rating={item.rating || 5} color={c.secondary} />
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: isDark ? "rgba(255,255,255,0.65)" : `${c.text}75` }}
                >
                  "{item.text}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : `${c.primary}10` }}>
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: c.primary }}
                    >
                      {item.name?.[0] || "?"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: isDark ? "#fff" : c.primary }}>
                      {item.name}
                    </p>
                    {item.role && (
                      <p className="text-xs opacity-50" style={{ color: isDark ? "#fff" : c.text }}>
                        {item.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
