"use client";

import type { Site } from "@/lib/types";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function PricingSection({ content, site, variant }: Props) {
  const plans = content.plans || [];
  const c = site.colors;
  const isDark = variant === "bold";
  const { ref, visible } = useScrollReveal();

  if (plans.length === 0) return null;

  return (
    <section id="pricing" style={{ background: isDark ? `linear-gradient(180deg, #0D0A18, ${c.primary}15, #0D0A18)` : `linear-gradient(180deg, ${c.background}, ${c.primary}05, ${c.background})` }}>
      <div
        ref={ref}
        className="mx-auto max-w-5xl px-6 py-20 md:py-28 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)" }}
      >
        <div className="mb-14 text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>Pricing</div>
          <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: `${site.fonts.heading}, serif`, color: isDark ? "#fff" : c.primary }}>
            {content.heading || "Simple, Transparent Pricing"}
          </h2>
          {content.subheading && <p className="mt-3 text-base" style={{ color: isDark ? "rgba(255,255,255,0.55)" : `${c.text}70` }}>{content.subheading}</p>}
        </div>
        <div className={`grid gap-6 ${plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {plans.map((plan: any, i: number) => {
            const featured = plan.featured || i === 1;
            return (
              <div
                key={plan.id}
                className={`relative overflow-hidden rounded-3xl p-7 transition-all hover:-translate-y-1 ${featured ? "shadow-2xl" : ""}`}
                style={{
                  border: featured ? `2px solid ${c.secondary}` : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : c.primary + "15"}`,
                  backgroundColor: featured
                    ? isDark ? c.primary : c.primary
                    : isDark ? "rgba(255,255,255,0.04)" : "#fff",
                  color: featured ? "#fff" : undefined,
                }}
              >
                {featured && (
                  <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase" style={{ backgroundColor: c.secondary, color: "#000" }}>
                    Popular
                  </div>
                )}
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: featured ? "rgba(255,255,255,0.7)" : c.secondary }}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black" style={{ fontFamily: `${site.fonts.heading}, serif` }}>{plan.price}</span>
                  {plan.period && <span className="text-sm mb-1 opacity-60">/{plan.period}</span>}
                </div>
                {plan.description && <p className="text-sm mb-6 opacity-60">{plan.description}</p>}
                <div className="space-y-2.5 mb-7">
                  {(plan.features || []).map((f: string, fi: number) => (
                    <div key={fi} className="flex items-center gap-2 text-sm">
                      <span style={{ color: featured ? c.secondary : c.secondary }}>✓</span>
                      <span style={{ color: featured ? "rgba(255,255,255,0.85)" : `${c.text}80` }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact"
                  className="block w-full rounded-xl py-3 text-center text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    backgroundColor: featured ? c.secondary : `${c.primary}15`,
                    color: featured ? "#000" : c.primary,
                  }}>
                  {plan.cta || "Get Started"}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
