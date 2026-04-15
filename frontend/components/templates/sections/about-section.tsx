"use client";

import type { Site } from "@/lib/types";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function AboutSection({ content, site, variant }: Props) {
  const { title, body, image, imagePosition } = content;
  const c = site.colors;
  const isDark = variant === "bold";
  const bg = isDark ? "#0D0A12" : site.colors.background;
  const textColor = isDark ? "#F5F0E8" : c.text;

  return (
    <section
      id="about"
      className="px-6 py-20 md:py-28"
      style={{ backgroundColor: bg }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`grid items-center gap-12 md:grid-cols-2 ${
            imagePosition === "left" ? "md:[grid-template-columns:1fr_1.1fr]" : "md:[grid-template-columns:1.1fr_1fr]"
          }`}
        >
          {/* Image side */}
          {image ? (
            <div className={`relative ${imagePosition === "left" ? "md:order-first" : "md:order-last"}`}>
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                style={{ backgroundColor: c.primary }}
              />
              <img
                src={image}
                alt={title}
                className="relative w-full rounded-2xl shadow-2xl object-cover"
                style={{ maxHeight: "480px" }}
              />
            </div>
          ) : (
            <div
              className={`rounded-2xl p-10 flex items-center justify-center ${imagePosition === "left" ? "md:order-first" : "md:order-last"}`}
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${c.primary}30, ${c.secondary}20)`
                  : `linear-gradient(135deg, ${c.primary}10, ${c.secondary}10)`,
                minHeight: "320px",
              }}
            >
              <div className="text-center">
                <div className="text-8xl opacity-20 mb-4">
                  {site.business_type === "gym" ? "🏋️" : site.business_type === "cleaning" ? "✨" : "🌟"}
                </div>
                <p className="text-sm font-semibold opacity-40" style={{ color: textColor }}>
                  {site.business_name}
                </p>
              </div>
            </div>
          )}

          {/* Text side */}
          <div className={imagePosition === "left" ? "md:order-last" : "md:order-first"}>
            <div
              className="mb-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: c.secondary }}
            >
              About Us
            </div>
            <h2
              className="text-3xl font-bold leading-tight md:text-4xl"
              style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}
            >
              {title}
            </h2>
            <div
              className="mt-3 h-1 w-12 rounded-full"
              style={{ backgroundColor: c.secondary }}
            />
            <p
              className="mt-6 text-base leading-relaxed whitespace-pre-line"
              style={{ color: isDark ? "rgba(255,255,255,0.65)" : `${c.text}80` }}
            >
              {body}
            </p>

            {/* Feature list */}
            <div className="mt-8 space-y-3">
              {[
                "Experienced & Professional Team",
                "Quality You Can Trust",
                "Customer Satisfaction Guaranteed",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: c.secondary }}
                  >
                    ✓
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: isDark ? "rgba(255,255,255,0.7)" : `${c.text}80` }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
