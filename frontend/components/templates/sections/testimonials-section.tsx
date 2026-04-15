"use client";

import type { Site } from "@/lib/types";
import { StarRating } from "../shared/star-rating";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function TestimonialsSection({ content, site, variant }: Props) {
  const items = content.items || [];
  const c = site.colors;
  const { ref, visible } = useScrollReveal();
  const anim = { opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(50px)", transition: "all 0.8s ease" };

  if (items.length === 0) return null;

  /* ── BOLD: single large quote on dark bg ── */
  if (variant === "bold") {
    return (
      <section style={{ background: `linear-gradient(135deg, ${c.primary}30, #0D0A18 60%)` }}>
        <div ref={ref} className="mx-auto max-w-6xl px-6 py-24" style={anim}>
          <div className="mb-12 text-center">
            <div className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: c.secondary }}>What They Say</div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item: any) => (
              <div key={item.id} className="relative overflow-hidden rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c.secondary}20`, backdropFilter: "blur(10px)" }}>
                <div className="absolute top-4 right-6 text-5xl font-serif leading-none opacity-15" style={{ color: c.secondary }}>"</div>
                <StarRating rating={item.rating || 5} color={c.secondary} />
                <p className="mt-4 text-sm leading-loose italic" style={{ color: "rgba(255,255,255,0.65)" }}>"{item.text}"</p>
                <div className="mt-6 flex items-center gap-3 border-t pt-5" style={{ borderColor: `${c.secondary}15` }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-black" style={{ background: `linear-gradient(135deg, ${c.secondary}, ${c.accent || "#E8C4A0"})` }}>
                    {item.name?.[0] || "?"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    {item.role && <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── MODERN: large cards with transformation photo ── */
  if (variant === "modern") {
    return (
      <section style={{ backgroundColor: `${c.primary}06` }}>
        <div ref={ref} className="mx-auto max-w-6xl px-6 py-20" style={anim}>
          <div className="mb-12 text-center">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>Success Stories</div>
            <h2 className="text-3xl font-black md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>Real People, Real Results</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item: any, i: number) => (
              <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-2" style={{ backgroundColor: [c.primary, c.secondary, "#FF6B35"][i % 3] }} />
                <div className="p-7">
                  <StarRating rating={item.rating || 5} color={c.secondary} />
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: `${c.text}75` }}>"{item.text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full text-white font-bold text-sm" style={{ backgroundColor: c.primary }}>{item.name?.[0]}</div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: c.primary }}>{item.name}</p>
                      {item.role && <p className="text-xs" style={{ color: `${c.text}50` }}>{item.role}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── CLASSIC: banner with photo + quote ── */
  return (
    <section style={{ backgroundColor: c.background }}>
      <div ref={ref} className="mx-auto max-w-5xl px-6 py-20" style={anim}>
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>Happy Clients</div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, serif`, color: c.primary }}>What Clients Say</h2>
          <div className="mx-auto mt-3 h-1 w-10 rounded-full" style={{ backgroundColor: c.secondary }} />
        </div>
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm" style={{ border: `1px solid ${c.primary}10` }}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})` }}>
                {item.name?.[0] || "?"}
              </div>
              <div>
                <div className="mb-2"><StarRating rating={item.rating || 5} color={c.secondary} /></div>
                <p className="text-sm leading-relaxed" style={{ color: `${c.text}75` }}>"{item.text}"</p>
                <div className="mt-3 flex items-center gap-2">
                  <p className="text-sm font-bold" style={{ color: c.primary }}>{item.name}</p>
                  {item.role && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${c.secondary}15`, color: c.primary }}>{item.role}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
