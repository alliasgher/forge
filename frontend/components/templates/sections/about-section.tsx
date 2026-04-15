"use client";

import type { Site } from "@/lib/types";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string }

export function AboutSection({ content, site, variant }: Props) {
  const { title, body, image, imagePosition } = content;
  const c = site.colors;
  const { ref, visible } = useScrollReveal();
  const anim = { opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(50px)", transition: "all 0.8s ease" };

  /* ── BOLD: luxury split with dark glass card ── */
  if (variant === "bold") {
    return (
      <section id="about" style={{ backgroundColor: "#0D0A18" }}>
        <div className="grid min-h-[85vh] md:grid-cols-2">
          {/* Left: image full height */}
          <div className="relative overflow-hidden" style={{ minHeight: 400 }}>
            {image ? (
              <img src={image} alt={title} className="h-full w-full object-cover" style={{ minHeight: 400 }} />
            ) : (
              <div className="h-full w-full" style={{ background: `linear-gradient(160deg, ${c.primary}60, #0D0A18)` }} />
            )}
            {/* Gold overlay gradient */}
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, #0D0A18)` }} />
          </div>

          {/* Right: content */}
          <div ref={ref} className="flex items-center px-10 py-20 md:px-16" style={anim}>
            <div className="max-w-lg">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: c.secondary }}>Our Story</div>
              <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, serif`, color: "#fff" }}>{title}</h2>
              <div className="mb-6 h-px w-16" style={{ backgroundColor: c.secondary }} />
              <p className="mb-8 text-base leading-loose" style={{ color: "rgba(255,255,255,0.58)" }}>{body}</p>
              {/* Luxury detail items */}
              <div className="grid grid-cols-2 gap-4">
                {[["Rare Ingredients", "Sourced globally"], ["Hand-Blended", "Small batches"], ["Lasting", "12–18 hours"], ["Cruelty Free", "Always"]].map(([k, v]) => (
                  <div key={k} className="rounded-xl p-4" style={{ border: `1px solid ${c.secondary}25`, background: `${c.secondary}06` }}>
                    <p className="text-xs font-bold" style={{ color: c.secondary }}>{k}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── MODERN: big stats strip + text/image grid ── */
  if (variant === "modern") {
    return (
      <section id="about" style={{ backgroundColor: c.background }}>
        {/* Stats strip */}
        <div ref={ref} style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, ...anim }}>
          <div className="mx-auto grid max-w-5xl grid-cols-4 gap-0 divide-x divide-white/20">
            {[["10K+", "Members"], ["30+", "Classes/wk"], ["15", "Expert Coaches"], ["4.9★", "Rating"]].map(([n, l]) => (
              <div key={l} className="px-8 py-8 text-center">
                <p className="text-3xl font-black text-white" style={{ fontFamily: `${site.fonts.heading}, sans-serif` }}>{n}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-2">
          <div style={{ animation: "fade-up 0.7s ease 0.2s both" }}>
            <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>About Us</div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, sans-serif`, color: c.primary }}>{title}</h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: `${c.text}80` }}>{body}</p>
            <div className="mt-8 space-y-3">
              {["State-of-the-art 45,000 sq ft facility", "Expert coaches certified at the highest level", "Open 365 days, 5am–midnight"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: c.secondary }}>✓</div>
                  <span className="text-sm" style={{ color: `${c.text}85` }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative" style={{ animation: "fade-in 0.9s ease 0.4s both" }}>
            {image ? (
              <>
                <div className="absolute -inset-3 rounded-3xl" style={{ background: `linear-gradient(135deg, ${c.primary}20, ${c.secondary}15)`, animation: "pulse-glow 5s ease-in-out infinite" }} />
                <img src={image} alt={title} className="relative rounded-3xl shadow-2xl w-full object-cover" style={{ maxHeight: 500 }} />
              </>
            ) : (
              <div className="flex items-center justify-center rounded-3xl h-80" style={{ background: `linear-gradient(135deg, ${c.primary}15, ${c.secondary}15)` }}>
                <span className="text-9xl" style={{ animation: "float 3s ease-in-out infinite" }}>💪</span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* ── CLASSIC: horizontal process steps ── */
  return (
    <section id="about" style={{ backgroundColor: c.background }}>
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-20 md:py-28" style={anim}>
        {/* Top: text + image */}
        <div className="grid items-center gap-12 md:grid-cols-2 mb-16">
          <div className={imagePosition === "left" ? "md:order-last" : ""}>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>About Us</div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: `${site.fonts.heading}, serif`, color: c.primary }}>{title}</h2>
            <div className="mt-3 h-1 w-10 rounded-full" style={{ backgroundColor: c.secondary }} />
            <p className="mt-5 text-base leading-relaxed" style={{ color: `${c.text}75` }}>{body}</p>
          </div>
          <div className={imagePosition === "left" ? "md:order-first" : ""}>
            {image ? (
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl blur-xl" style={{ background: `linear-gradient(135deg, ${c.primary}20, ${c.secondary}15)` }} />
                <img src={image} alt={title} className="relative w-full rounded-2xl shadow-xl object-cover" style={{ maxHeight: 400 }} />
              </div>
            ) : null}
          </div>
        </div>

        {/* Process steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["📞", "Book Online", "Schedule your clean in 60 seconds — pick your date, time, and service."],
            ["🧹", "We Clean", "Our vetted, insured team arrives on time and gets to work."],
            ["✨", "Relax & Enjoy", "Come home to a spotless, fresh-smelling space. Guaranteed."],
          ].map(([icon, step, desc], i) => (
            <div key={step} className="rounded-2xl p-6 text-center transition-all hover:shadow-lg" style={{ border: `1px solid ${c.primary}15`, backgroundColor: "#fff" }}>
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl" style={{ backgroundColor: `${c.primary}12` }}>{icon}</div>
              <div className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: c.secondary }}>Step {i + 1}</div>
              <h3 className="text-base font-bold mb-2" style={{ color: c.primary }}>{step}</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${c.text}70` }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
