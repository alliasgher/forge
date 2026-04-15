"use client";

import type { Site } from "@/lib/types";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function ServicesSection({ content, site, variant }: Props) {
  const items = content.items || [];
  const c = site.colors;
  const { ref, visible } = useScrollReveal();
  const anim = { opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(50px)", transition: "all 0.8s ease" };

  /* ── BOLD: dark grid with gold price highlight ── */
  if (variant === "bold") {
    return (
      <section id="services" style={{ background: `linear-gradient(180deg, #0D0A18 0%, ${c.primary}20 50%, #0D0A18 100%)` }}>
        <div ref={ref} className="mx-auto max-w-6xl px-6 py-24" style={anim}>
          <div className="mb-14 text-center">
            <div className="mb-2 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: c.secondary }}>The Collection</div>
            <h2 className="text-4xl font-bold md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, serif`, color: "#fff" }}>Our Fragrances</h2>
          </div>
          <div className="grid gap-px" style={{ backgroundColor: `${c.secondary}15`, border: `1px solid ${c.secondary}15`, borderRadius: 24 }}>
            {items.map((item: any, i: number) => (
              <div key={item.id} className="group flex items-center gap-6 px-8 py-6 transition-all hover:bg-white/3" style={{ backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                <div className="text-3xl shrink-0 w-12 text-center">{["🌹", "🌿", "🌸", "🔥"][i % 4]}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white" style={{ fontFamily: `${site.fonts.heading}, serif` }}>{item.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{item.description}</p>
                </div>
                {item.price && (
                  <div className="shrink-0 rounded-full px-5 py-2 text-sm font-bold" style={{ border: `1px solid ${c.secondary}50`, color: c.secondary }}>{item.price}</div>
                )}
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-white/30">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── MODERN: bold card grid with colored tops ── */
  if (variant === "modern") {
    return (
      <section id="services" style={{ backgroundColor: c.background }}>
        <div ref={ref} className="mx-auto max-w-6xl px-6 py-20" style={anim}>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>What We Offer</div>
              <h2 className="text-3xl font-black md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>Our Classes</h2>
            </div>
            <a href="#contact" className="hidden md:block rounded-xl px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: c.primary }}>Start Free Trial</a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item: any, i: number) => {
              const colors = [c.primary, c.secondary, "#FF6B35", "#7B2D8B"];
              const icons = ["⚡", "💪", "🧘", "🏆"];
              return (
                <div key={item.id} className="group overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl" style={{ border: `1px solid ${c.primary}10`, backgroundColor: "#fff" }}>
                  <div className="h-2" style={{ backgroundColor: colors[i % 4] }} />
                  <div className="p-6">
                    <div className="mb-4 text-3xl">{icons[i % 4]}</div>
                    <h3 className="text-base font-black mb-2" style={{ color: c.primary }}>{item.name}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: `${c.text}70` }}>{item.description}</p>
                    {item.price && <div className="text-sm font-bold" style={{ color: colors[i % 4] }}>{item.price}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* ── CLASSIC: alternating left/right with pricing ── */
  return (
    <section id="services" style={{ backgroundColor: `${c.primary}05` }}>
      <div ref={ref} className="mx-auto max-w-5xl px-6 py-20" style={anim}>
        <div className="mb-12 text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>Pricing & Services</div>
          <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: `${site.fonts.heading}, serif`, color: c.primary }}>What We Offer</h2>
          <div className="mx-auto mt-3 h-1 w-10 rounded-full" style={{ backgroundColor: c.secondary }} />
        </div>
        <div className="space-y-4">
          {items.map((item: any, i: number) => (
            <div key={item.id} className="group flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-lg" style={{ border: `1px solid ${c.primary}10` }}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white" style={{ backgroundColor: i === 0 ? c.primary : i === 1 ? c.secondary : `${c.primary}80` }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm md:text-base" style={{ color: c.primary }}>{item.name}</h3>
                <p className="text-xs md:text-sm mt-0.5 leading-relaxed" style={{ color: `${c.text}65` }}>{item.description}</p>
              </div>
              {item.price && (
                <div className="shrink-0 rounded-lg px-4 py-2 text-sm font-bold" style={{ backgroundColor: `${c.secondary}15`, color: c.primary }}>{item.price}</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})` }}>
          <p className="text-white font-bold text-lg">Not sure what you need?</p>
          <p className="text-white/70 text-sm mt-1 mb-4">Get a free custom quote in under 60 seconds.</p>
          <a href="#contact" className="inline-block rounded-xl bg-white px-7 py-3 text-sm font-bold" style={{ color: c.primary }}>Get Free Quote</a>
        </div>
      </div>
    </section>
  );
}
