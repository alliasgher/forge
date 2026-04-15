"use client";

import { useState, useEffect } from "react";
import type { Site } from "@/lib/types";

export function SiteHeader({ site }: { site: Site }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = site.template === "bold";
  const navItems = ["About", "Services", "Gallery", "Contact"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? isDark ? "rgba(13,10,18,0.95)" : "rgba(255,255,255,0.95)"
          : isDark ? "transparent" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          {site.logo_url && (
            <img src={site.logo_url} alt="" className="h-8 w-auto" />
          )}
          <span
            className="text-lg font-bold"
            style={{
              fontFamily: `${site.fonts.heading}, serif`,
              color: isDark ? "#fff" : site.colors.primary,
            }}
          >
            {site.business_name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:opacity-100"
              style={{
                color: isDark
                  ? "rgba(255,255,255,0.75)"
                  : "rgba(0,0,0,0.6)",
                fontFamily: `${site.fonts.body}, sans-serif`,
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              backgroundColor: site.colors.primary,
              fontFamily: `${site.fonts.body}, sans-serif`,
            }}
          >
            Get in Touch
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1 p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 w-5 transition-all"
              style={{ backgroundColor: isDark ? "#fff" : site.colors.primary }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: isDark ? "#0D0A12" : site.colors.background,
            borderTop: `1px solid ${site.colors.primary}20`,
          }}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium"
                style={{
                  color: isDark ? "rgba(255,255,255,0.8)" : site.colors.text,
                  fontFamily: `${site.fonts.body}, sans-serif`,
                }}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white"
              style={{ backgroundColor: site.colors.primary }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
