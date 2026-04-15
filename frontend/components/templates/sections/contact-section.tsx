"use client";

import type { Site } from "@/lib/types";
import { ContactForm } from "../shared/contact-form";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string; slug: string }

export function ContactSection({ content, site, variant, slug }: Props) {
  const c = site.colors;
  const isDark = variant === "bold";
  const bg = isDark ? "#0D0A18" : c.background;
  const textColor = isDark ? "#F5F0E8" : c.text;
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="contact"
      className="px-6 py-20 md:py-28"
      style={{ backgroundColor: bg }}
    >
      <div
        ref={ref}
        className="mx-auto max-w-6xl transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)" }}
      >
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: Info */}
          <div>
            <div
              className="mb-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: c.secondary }}
            >
              Contact Us
            </div>
            <h2
              className="text-3xl font-bold leading-tight md:text-4xl"
              style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}
            >
              {content.heading || "Get in Touch"}
            </h2>
            <div
              className="mt-3 h-1 w-12 rounded-full"
              style={{ backgroundColor: c.secondary }}
            />
            {content.subheading && (
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: isDark ? "rgba(255,255,255,0.6)" : `${c.text}70` }}
              >
                {content.subheading}
              </p>
            )}

            <div className="mt-8 space-y-5">
              {content.showPhone && site.phone && (
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base"
                    style={{ backgroundColor: `${c.primary}15`, color: c.primary }}
                  >
                    📞
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-50" style={{ color: textColor }}>
                      Phone
                    </p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: isDark ? "#fff" : c.primary }}>
                      {site.phone}
                    </p>
                  </div>
                </div>
              )}
              {site.email && (
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base"
                    style={{ backgroundColor: `${c.primary}15`, color: c.primary }}
                  >
                    ✉️
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-50" style={{ color: textColor }}>
                      Email
                    </p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: isDark ? "#fff" : c.primary }}>
                      {site.email}
                    </p>
                  </div>
                </div>
              )}
              {content.showAddress && site.address && (
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base"
                    style={{ backgroundColor: `${c.primary}15`, color: c.primary }}
                  >
                    📍
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-50" style={{ color: textColor }}>
                      Address
                    </p>
                    <p className="text-sm font-medium mt-0.5 leading-relaxed" style={{ color: isDark ? "#fff" : c.primary }}>
                      {site.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="rounded-2xl p-7 md:p-8"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#fff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : c.primary + "15"}`,
              boxShadow: isDark ? "none" : "0 4px 30px rgba(0,0,0,0.06)",
            }}
          >
            <ContactForm slug={slug} primaryColor={c.primary} fields={content.fields} />
          </div>
        </div>
      </div>
    </section>
  );
}
