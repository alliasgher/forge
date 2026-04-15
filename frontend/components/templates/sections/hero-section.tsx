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

  // Particle canvas for bold variant
  useEffect(() => {
    if (variant !== "bold" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    function animate() {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201,168,76,${p.alpha})`;
        ctx!.fill();
      });
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [variant]);

  if (variant === "bold") {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16 text-center"
        style={{
          background: backgroundImage
            ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage}) center/cover no-repeat`
            : `radial-gradient(ellipse 120% 120% at 50% -20%, ${c.primary}80 0%, #050208 60%)`,
          color: "#fff",
        }}
      >
        {/* Animated particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.6 }}
        />

        {/* Ambient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${c.secondary}25 0%, transparent 70%)`,
            animation: "drift 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${c.primary}20 0%, transparent 70%)`,
            animation: "drift 20s ease-in-out infinite reverse",
          }}
        />

        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(transparent 50%, rgba(0,0,0,0.03) 50%)",
            backgroundSize: "100% 4px",
            opacity: 0.2,
          }}
        />

        <div className="relative z-10 max-w-5xl">
          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.2em]"
            style={{
              borderColor: `${c.secondary}60`,
              color: c.secondary,
              animation: "border-glow 3s ease-in-out infinite",
              backgroundColor: `${c.secondary}08`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: c.secondary, animation: "pulse-glow 2s ease-in-out infinite" }}
            />
            {site.tagline || "Premium Experience"}
          </div>

          {/* Animated heading */}
          <h1
            className="font-bold leading-none tracking-tight"
            style={{
              fontFamily: `${site.fonts.heading}, serif`,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              background: `linear-gradient(135deg, #ffffff 0%, ${c.secondary} 40%, #ffffff 60%, ${c.secondary} 100%)`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "text-shimmer 4s linear infinite",
            }}
          >
            {heading}
          </h1>

          {subheading && (
            <p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ color: "rgba(255,255,255,0.55)", animation: "fade-up 0.8s ease 0.4s both" }}
            >
              {subheading}
            </p>
          )}

          <div
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            style={{ animation: "fade-up 0.8s ease 0.6s both" }}
          >
            {ctaText && (
              <a
                href={ctaLink || "#services"}
                className="group relative overflow-hidden rounded-xl px-10 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${c.secondary}, ${c.accent || "#E8C4A0"})`,
                  boxShadow: `0 0 40px ${c.secondary}60`,
                }}
              >
                <span className="relative z-10">{ctaText}</span>
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                  style={{ background: "linear-gradient(135deg, white, transparent)" }}
                />
              </a>
            )}
            <a
              href="#about"
              className="flex items-center gap-2 rounded-xl border px-8 py-4 text-sm font-medium text-white/60 transition-all hover:text-white hover:border-white/40 hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              Explore ↓
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(5,2,8,0.8), transparent)" }}
        />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div
            className="h-10 w-5 rounded-full border-2 border-white/50 flex items-start justify-center p-1"
          >
            <div
              className="h-2 w-1 rounded-full bg-white"
              style={{ animation: "float 1.5s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (variant === "classic") {
    return (
      <section
        className="relative overflow-hidden pt-24 pb-16 px-6"
        style={{ backgroundColor: c.background }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${c.primary}08 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${c.primary}08, transparent)`,
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Text */}
            <div style={{ animation: "fade-up 0.7s ease both" }}>
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ backgroundColor: `${c.primary}12`, color: c.primary }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: c.secondary }}
                />
                {site.tagline}
              </div>
              <h1
                className="font-bold leading-tight"
                style={{
                  fontFamily: `${site.fonts.heading}, serif`,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  color: c.primary,
                }}
              >
                {heading}
              </h1>
              {subheading && (
                <p
                  className="mt-5 text-lg leading-relaxed"
                  style={{ color: `${c.text}75` }}
                >
                  {subheading}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-4">
                {ctaText && (
                  <a
                    href={ctaLink || "#contact"}
                    className="rounded-xl px-7 py-4 text-sm font-bold text-white shadow-xl transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-2xl"
                    style={{
                      backgroundColor: c.primary,
                      boxShadow: `0 8px 25px ${c.primary}40`,
                    }}
                  >
                    {ctaText}
                  </a>
                )}
                <a
                  href="#about"
                  className="rounded-xl border-2 px-7 py-4 text-sm font-bold transition-all hover:bg-gray-50"
                  style={{ borderColor: `${c.primary}25`, color: c.primary }}
                >
                  Learn More
                </a>
              </div>
              <div className="mt-10 flex items-center gap-8">
                {[["500+", "Happy Clients"], ["8+", "Years Experience"], ["4.9★", "Average Rating"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold" style={{ color: c.primary }}>{num}</p>
                    <p className="text-xs" style={{ color: `${c.text}55` }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative" style={{ animation: "fade-in 0.8s ease 0.3s both" }}>
              {backgroundImage ? (
                <>
                  <div
                    className="absolute -inset-4 rounded-3xl blur-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${c.primary}30, ${c.secondary}20)`,
                      animation: "pulse-glow 4s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="absolute -inset-1 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${c.primary}40, ${c.secondary}30)`,
                    }}
                  />
                  <img
                    src={backgroundImage}
                    alt={heading}
                    className="relative rounded-2xl shadow-2xl"
                    style={{ width: "100%", maxHeight: "520px", objectFit: "cover" }}
                  />
                  {/* Floating accent */}
                  <div
                    className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                      animation: "float 4s ease-in-out infinite",
                    }}
                  >
                    <p className="text-xs font-bold text-white/70">Trusted by</p>
                    <p className="text-2xl font-bold text-white">500+ Clients</p>
                  </div>
                </>
              ) : (
                <div
                  className="flex items-center justify-center rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${c.primary}15, ${c.secondary}15)`,
                    height: "420px",
                    border: `2px solid ${c.primary}15`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-8xl mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>
                      {site.business_type === "gym" ? "💪" : site.business_type === "cleaning" ? "✨" : "⭐"}
                    </div>
                    <p className="font-bold" style={{ color: c.primary, fontFamily: `${site.fonts.heading}, serif` }}>
                      {site.business_name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Modern
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16"
      style={{ backgroundColor: c.background }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${c.primary}08 1px, transparent 1px), linear-gradient(90deg, ${c.primary}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          mask: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${c.primary}15 0%, transparent 70%)`,
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${c.secondary}15 0%, transparent 70%)`,
          animation: "drift 12s ease-in-out infinite reverse",
        }}
      />

      {backgroundImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.06,
          }}
        />
      )}

      <div className="relative z-10 max-w-4xl text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-widest"
          style={{
            borderColor: `${c.primary}25`,
            color: c.primary,
            backgroundColor: `${c.primary}08`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: c.secondary, animation: "pulse-glow 2s ease-in-out infinite" }}
          />
          {site.tagline || site.business_name}
        </div>

        <h1
          className="font-bold leading-tight tracking-tight"
          style={{
            fontFamily: `${site.fonts.heading}, serif`,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            color: c.primary,
            animation: "fade-up 0.8s ease both",
          }}
        >
          {heading}
        </h1>

        {subheading && (
          <p
            className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed"
            style={{
              color: `${c.text}70`,
              animation: "fade-up 0.8s ease 0.2s both",
            }}
          >
            {subheading}
          </p>
        )}

        <div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animation: "fade-up 0.8s ease 0.4s both" }}
        >
          {ctaText && (
            <a
              href={ctaLink || "#contact"}
              className="group relative overflow-hidden rounded-2xl px-10 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: c.primary,
                boxShadow: `0 8px 32px ${c.primary}50`,
              }}
            >
              <span className="relative z-10">{ctaText}</span>
              <div
                className="absolute inset-0 translate-x-[-100%] bg-white/10 transition-transform duration-500 group-hover:translate-x-[100%]"
                style={{ transform: "skewX(-20deg)" }}
              />
            </a>
          )}
          <a
            href="#services"
            className="rounded-2xl border-2 px-10 py-4 text-sm font-bold transition-all hover:bg-gray-50 hover:shadow-lg"
            style={{ borderColor: `${c.primary}20`, color: c.primary }}
          >
            Explore Services
          </a>
        </div>

        {/* Stats row */}
        <div
          className="mt-16 grid grid-cols-3 gap-8 border-t pt-12"
          style={{
            borderColor: `${c.primary}12`,
            animation: "fade-up 0.8s ease 0.6s both",
          }}
        >
          {[["500+", "Happy Clients"], ["8+ yrs", "Experience"], ["4.9 ★", "Rating"]].map(([num, label]) => (
            <div key={label} className="text-center">
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: `${site.fonts.heading}, serif`, color: c.primary }}
              >
                {num}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: `${c.text}50` }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
