"use client";

import type { Site } from "@/lib/types";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string }

const SERVICE_ICONS = ["⚡", "🎯", "💎", "🚀", "✨", "🏆", "🔥", "⭐"];

export function ServicesSection({ content, site, variant }: Props) {
  const items = content.items || [];
  const c = site.colors;
  const isDark = variant === "bold";
  const { ref, visible } = useScrollReveal();
  const bg = isDark
    ? `linear-gradient(180deg, #0D0A12 0%, ${c.primary}15 50%, #0D0A12 100%)`
    : `linear-gradient(180deg, ${c.background} 0%, ${c.primary}06 50%, ${c.background} 100%)`;

  return (
    <section
      id="services"
      className="px-6 py-20 md:py-28"
      style={{ background: bg }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={ref}
          className="mb-14 text-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)" }}
        >
          <div
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: c.secondary }}
          >
            What We Offer
          </div>
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}
          >
            Our Services
          </h2>
          <div
            className="mx-auto mt-3 h-1 w-12 rounded-full"
            style={{ backgroundColor: c.secondary }}
          />
        </div>

        {/* Grid */}
        <div
          className={`grid gap-6 ${
            items.length === 2
              ? "md:grid-cols-2"
              : items.length === 3
              ? "md:grid-cols-3"
              : items.length >= 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          }`}
        >
          {items.map((item: any, idx: number) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.04)" : c.background,
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : c.primary + "15"}`,
                animation: `fade-up 0.6s ease ${idx * 0.1}s both`,
              }}
            >
              {/* Top accent */}
              <div
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: c.secondary }}
              />

              {/* Icon */}
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: `${c.primary}15` }}
              >
                {item.image ? (
                  <img src={item.image} alt="" className="h-8 w-8 rounded-lg object-cover" />
                ) : (
                  <span>{SERVICE_ICONS[idx % SERVICE_ICONS.length]}</span>
                )}
              </div>

              <h3
                className="text-base font-bold"
                style={{
                  fontFamily: `${site.fonts.heading}, serif`,
                  color: isDark ? "#fff" : c.primary,
                }}
              >
                {item.name}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: isDark ? "rgba(255,255,255,0.50)" : `${c.text}70` }}
              >
                {item.description}
              </p>
              {item.price && (
                <div
                  className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: `${c.secondary}20`, color: c.secondary }}
                >
                  {item.price}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
