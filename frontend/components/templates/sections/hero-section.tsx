"use client";

import { useEffect, useRef } from "react";
import type { Site } from "@/lib/types";

interface Props {
  content: Record<string, any>;
  site: Site;
  variant: string;
}

export function HeroSection({ content, site, variant }: Props) {
  const { heading, subheading, ctaText, ctaLink, backgroundImage } = content;
  const c = site.colors;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (variant !== "bold" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,0.35)`;
        ctx.fill();
      });
      // draw connecting lines
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(201,168,76,${0.08 * (1 - d / 100)})`;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [variant]);

  /* ── BOLD (dark luxury) ── */
  if (variant === "bold") {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16 text-center"
        style={{
          background: backgroundImage
            ? `linear-gradient(rgba(13,10,25,0.75), rgba(13,10,25,0.75)), url(${backgroundImage}) center/cover no-repeat`
            : `radial-gradient(ellipse 140% 120% at 50% -10%, ${c.primary} 0%, #1a0a2e 35%, #0D0A18 70%)`,
          color: "#fff",
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-[15%] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${c.secondary}35 0%, transparent 70%)`, animation: "drift 14s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-[15%] w-64 h-64 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${c.primary}40 0%, transparent 70%)`, animation: "drift 18s ease-in-out infinite reverse" }} />

        <div className="relative z-10 max-w-5xl">
          {/* Pill badge */}
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ borderColor: `${c.secondary}55`, color: c.secondary, backgroundColor: `${c.secondary}10`, animation: "border-glow 4s ease-in-out infinite" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.secondary, boxShadow: `0 0 8px ${c.secondary}` }} />
            {site.tagline || "Premium Fragrance House"}
          </div>

          {/* Heading — always white, secondary color as underline accent */}
          <h1
            className="mb-6 font-bold leading-[1.1] tracking-tight text-white"
            style={{
              fontFamily: `${site.fonts.heading}, serif`,
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              textShadow: `0 0 60px ${c.secondary}40`,
            }}
          >
            {heading}
          </h1>
          {/* Accent line under heading */}
          <div
            className="mb-6 h-1 w-24 rounded-full mx-auto"
            style={{
              background: `linear-gradient(90deg, ${c.secondary}, transparent)`,
              animation: "shimmer 3s linear infinite",
            }}
          />

          {subheading && (
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {subheading}
            </p>
          )}

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {ctaText && (
              <a href={ctaLink || "#services"}
                className="group relative overflow-hidden rounded-xl px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${c.secondary}, ${c.accent || "#E8C4A0"})`, color: "#1a0a0a", boxShadow: `0 0 40px ${c.secondary}50` }}
              >
                {ctaText}
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            )}
            <a href="#about"
              className="rounded-xl border px-8 py-4 text-sm font-medium text-white/60 transition-all hover:border-white/40 hover:text-white hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              Discover More ↓
            </a>
          </div>
        </div>

        {/* Scroll mouse */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="h-10 w-5 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-white" style={{ animation: "float 1.5s ease-in-out infinite" }} />
          </div>
          <span className="text-[10px] tracking-widest text-white/40 uppercase">Scroll</span>
        </div>
      </section>
    );
  }

  /* ── CLASSIC ── */
  if (variant === "classic") {
    return (
      <section className="relative overflow-hidden pt-24 pb-20 px-6" style={{ backgroundColor: c.background }}>
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(${c.primary}10 1.5px, transparent 1.5px)`, backgroundSize: "28px 28px" }} />
        <div className="absolute right-0 top-0 h-full w-2/5 pointer-events-none" style={{ background: `linear-gradient(to left, ${c.secondary}10, transparent)` }} />

        <div className="relative mx-auto max-w-6xl grid items-center gap-14 md:grid-cols-2">
          <div style={{ animation: "fade-up 0.7s ease both" }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: `${c.primary}12`, color: c.primary }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.secondary }} />
              {site.tagline}
            </div>
            <h1 className="font-bold leading-tight"
              style={{ fontFamily: `${site.fonts.heading}, serif`, fontSize: "clamp(2.8rem, 5vw, 5rem)", color: c.primary }}>
              {heading}
            </h1>
            {subheading && <p className="mt-5 text-lg leading-relaxed" style={{ color: `${c.text}75` }}>{subheading}</p>}
            <div className="mt-9 flex flex-wrap gap-4">
              {ctaText && (
                <a href={ctaLink || "#contact"}
                  className="rounded-xl px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{ backgroundColor: c.primary, boxShadow: `0 8px 28px ${c.primary}45` }}>
                  {ctaText}
                </a>
              )}
              <a href="#services" className="rounded-xl border-2 px-8 py-4 text-sm font-bold transition-all hover:bg-gray-50"
                style={{ borderColor: `${c.primary}25`, color: c.primary }}>Our Services →</a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: `${c.primary}12` }}>
              {[["500+", "Clients"], ["8+ yrs", "Experience"], ["4.9★", "Rating"]].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold" style={{ fontFamily: `${site.fonts.heading}, serif`, color: c.primary }}>{n}</p>
                  <p className="text-xs mt-0.5" style={{ color: `${c.text}55` }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image stack */}
          <div className="relative" style={{ animation: "fade-in 0.9s ease 0.3s both" }}>
            {backgroundImage ? (
              <>
                <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: `linear-gradient(135deg, ${c.primary}25, ${c.secondary}20)`, animation: "pulse-glow 5s ease-in-out infinite" }} />
                <img src={backgroundImage} alt={heading} className="relative rounded-3xl shadow-2xl w-full object-cover" style={{ maxHeight: 520 }} />
                <div className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-3.5 shadow-xl" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, animation: "float 4s ease-in-out infinite" }}>
                  <p className="text-[11px] font-semibold text-white/70">Trusted by</p>
                  <p className="text-2xl font-bold text-white">500+ Clients</p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center rounded-3xl" style={{ height: 420, background: `linear-gradient(135deg, ${c.primary}12, ${c.secondary}12)`, border: `2px solid ${c.primary}12` }}>
                <div className="text-center">
                  <div className="text-9xl" style={{ animation: "float 3s ease-in-out infinite" }}>✨</div>
                  <p className="mt-4 font-bold" style={{ color: c.primary }}>{site.business_name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* ── MODERN ── */
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16" style={{ backgroundColor: c.background }}>
      {/* Animated grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${c.primary}08 1px, transparent 1px), linear-gradient(90deg, ${c.primary}08 1px, transparent 1px)`, backgroundSize: "56px 56px", mask: "radial-gradient(ellipse at center, black 20%, transparent 75%)" }} />
      {/* Orbs */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${c.primary}18 0%, transparent 70%)`, animation: "drift 16s ease-in-out infinite" }} />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${c.secondary}15 0%, transparent 70%)`, animation: "drift 12s ease-in-out infinite reverse" }} />

      {backgroundImage && <div className="absolute inset-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07 }} />}

      <div className="relative z-10 max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
          style={{ borderColor: `${c.primary}22`, color: c.primary, backgroundColor: `${c.primary}08` }}>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.secondary, animation: "pulse-glow 2s ease-in-out infinite" }} />
          {site.tagline || site.business_name}
        </div>

        <h1 className="font-bold leading-tight tracking-tight" style={{ fontFamily: `${site.fonts.heading}, serif`, fontSize: "clamp(3rem, 7vw, 6.5rem)", color: c.primary, animation: "fade-up 0.8s ease both" }}>
          {heading}
        </h1>

        {subheading && (
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed" style={{ color: `${c.text}70`, animation: "fade-up 0.8s ease 0.2s both" }}>
            {subheading}
          </p>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" style={{ animation: "fade-up 0.8s ease 0.4s both" }}>
          {ctaText && (
            <a href={ctaLink || "#contact"}
              className="group relative overflow-hidden rounded-2xl px-10 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: c.primary, boxShadow: `0 8px 32px ${c.primary}50` }}>
              <span className="relative z-10">{ctaText}</span>
              <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-full" style={{ transform: "skewX(-20deg)" }} />
            </a>
          )}
          <a href="#services" className="rounded-2xl border-2 px-10 py-4 text-sm font-bold transition-all hover:shadow-lg"
            style={{ borderColor: `${c.primary}22`, color: c.primary }}>
            Explore Services
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 border-t pt-10" style={{ borderColor: `${c.primary}10`, animation: "fade-up 0.8s ease 0.6s both" }}>
          {[["500+", "Happy Clients"], ["8+ yrs", "Experience"], ["4.9★", "Rating"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, serif`, color: c.primary }}>{n}</p>
              <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: `${c.text}50` }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
