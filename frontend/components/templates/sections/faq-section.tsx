"use client";

import { useState } from "react";
import type { Site } from "@/lib/types";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function FaqSection({ content, site, variant }: Props) {
  const items = content.items || [];
  const c = site.colors;
  const isDark = variant === "bold";
  const { ref, visible } = useScrollReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section id="faq" style={{ backgroundColor: isDark ? "#0D0A18" : c.background }}>
      <div
        ref={ref}
        className="mx-auto max-w-3xl px-6 py-20 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)" }}
      >
        <div className="mb-12 text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>FAQ</div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}>
            {content.heading || "Frequently Asked Questions"}
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item: any, i: number) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl transition-all"
              style={{
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : c.primary + "15"}`,
                backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
              }}
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-sm font-semibold pr-4" style={{ color: isDark ? "#fff" : c.primary }}>
                  {item.question}
                </span>
                <span
                  className="shrink-0 text-xl font-light transition-transform duration-200"
                  style={{
                    color: c.secondary,
                    transform: openIdx === i ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <div className="border-t px-6 py-4" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : c.primary + "10" }}>
                  <p className="text-sm leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.6)" : `${c.text}75` }}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
