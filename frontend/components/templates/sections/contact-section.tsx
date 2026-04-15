"use client";

import type { Site } from "@/lib/types";
import { ContactForm } from "../shared/contact-form";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface Props { content: Record<string, any>; site: Site; variant: string; slug: string }

export function ContactSection({ content, site, variant, slug }: Props) {
  const c = site.colors;
  const { ref, visible } = useScrollReveal();
  const anim = { opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(50px)", transition: "all 0.8s ease" };

  /* ── BOLD: dark full-bleed with glowing form ── */
  if (variant === "bold") {
    return (
      <section id="contact" style={{ backgroundColor: "#0D0A18" }}>
        <div ref={ref} className="mx-auto max-w-5xl px-6 py-24" style={anim}>
          <div className="mb-12 text-center">
            <div className="mb-2 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: c.secondary }}>Get in Touch</div>
            <h2 className="text-4xl font-bold md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, serif`, color: "#fff" }}>{content.heading}</h2>
            {content.subheading && <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.5)" }}>{content.subheading}</p>}
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Info */}
            <div className="space-y-5">
              {[{ icon: "📞", label: "Phone", val: site.phone, show: content.showPhone }, { icon: "✉️", label: "Email", val: site.email, show: true }, { icon: "📍", label: "Address", val: site.address, show: content.showAddress }].filter(x => x.show && x.val).map(({ icon, label, val }) => (
                <div key={label} className="flex gap-4 items-start rounded-2xl p-5" style={{ background: `${c.secondary}08`, border: `1px solid ${c.secondary}15` }}>
                  <span className="text-2xl">{icon}</span>
                  <div><p className="text-xs font-bold uppercase tracking-wider" style={{ color: c.secondary }}>{label}</p><p className="mt-1 text-sm text-white/80">{val}</p></div>
                </div>
              ))}
              {/* Visit hours */}
              <div className="rounded-2xl p-5" style={{ background: `${c.secondary}08`, border: `1px solid ${c.secondary}15` }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.secondary }}>Atelier Hours</p>
                {[["Mon – Fri", "10am – 8pm"], ["Saturday", "11am – 6pm"], ["Sunday", "By appointment"]].map(([d, t]) => (
                  <div key={d} className="flex justify-between text-sm mb-1.5">
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{d}</span>
                    <span className="text-white/80">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Form */}
            <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c.secondary}20` }}>
              <ContactForm slug={slug} primaryColor={c.secondary} fields={content.fields} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── MODERN: vibrant CTA + form ── */
  if (variant === "modern") {
    return (
      <section id="contact">
        {/* Big CTA banner */}
        <div style={{ background: `linear-gradient(135deg, ${c.primary} 0%, ${c.secondary} 100%)` }}>
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <h2 className="text-3xl font-black text-white md:text-5xl" style={{ fontFamily: `${site.fonts.heading}, sans-serif` }}>
              {content.heading}
            </h2>
            {content.subheading && <p className="mt-4 text-xl text-white/75">{content.subheading}</p>}
          </div>
        </div>
        {/* Form section */}
        <div ref={ref} className="mx-auto max-w-5xl px-6 py-16" style={{ backgroundColor: c.background, ...anim }}>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-black mb-6" style={{ color: c.primary }}>Contact Us</h3>
              <div className="space-y-4">
                {[{ icon: "📞", label: "Call Us", val: site.phone, show: content.showPhone }, { icon: "✉️", label: "Email", val: site.email, show: true }, { icon: "📍", label: "Location", val: site.address, show: content.showAddress }].filter(x => x.show && x.val).map(({ icon, label, val }) => (
                  <div key={label} className="flex gap-3 items-center">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-base shrink-0" style={{ backgroundColor: `${c.primary}12` }}>{icon}</div>
                    <div><p className="text-xs font-bold uppercase" style={{ color: `${c.text}50` }}>{label}</p><p className="text-sm font-medium" style={{ color: c.primary }}>{val}</p></div>
                  </div>
                ))}
              </div>
              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["✓ Background Checked", "✓ Licensed & Insured", "✓ 100% Satisfaction", "✓ Eco-Friendly Products"].map(badge => (
                  <div key={badge} className="rounded-lg px-3 py-2 text-xs font-semibold" style={{ backgroundColor: `${c.secondary}15`, color: c.primary }}>{badge}</div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-lg" style={{ border: `1px solid ${c.primary}10` }}>
              <ContactForm slug={slug} primaryColor={c.primary} fields={content.fields} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── CLASSIC: clean two-column ── */
  return (
    <section id="contact" style={{ backgroundColor: c.background }}>
      <div ref={ref} className="mx-auto max-w-5xl px-6 py-20" style={anim}>
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: c.secondary }}>Contact</div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: `${site.fonts.heading}, serif`, color: c.primary }}>{content.heading}</h2>
          {content.subheading && <p className="mt-2 text-base" style={{ color: `${c.text}65` }}>{content.subheading}</p>}
          <div className="mx-auto mt-3 h-1 w-10 rounded-full" style={{ backgroundColor: c.secondary }} />
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="space-y-5 mb-6">
              {[{ icon: "📞", label: "Phone", val: site.phone, show: content.showPhone }, { icon: "✉️", label: "Email", val: site.email, show: true }, { icon: "📍", label: "Address", val: site.address, show: content.showAddress }].filter(x => x.show && x.val).map(({ icon, label, val }) => (
                <div key={label} className="flex gap-4">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: `${c.primary}12` }}>{icon}</div>
                  <div><p className="text-xs font-semibold uppercase tracking-wide" style={{ color: `${c.text}50` }}>{label}</p><p className="text-sm font-medium mt-0.5" style={{ color: c.primary }}>{val}</p></div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: `${c.primary}08`, border: `1px solid ${c.primary}12` }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.primary }}>Why Choose Us</p>
              {["5,000+ satisfied clients", "Background-checked cleaners", "100% satisfaction guarantee", "Eco-friendly products"].map(f => (
                <div key={f} className="flex items-center gap-2 mb-2">
                  <span style={{ color: c.secondary }}>✓</span>
                  <span className="text-sm" style={{ color: `${c.text}75` }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-md" style={{ border: `1px solid ${c.primary}10` }}>
            <ContactForm slug={slug} primaryColor={c.primary} fields={content.fields} />
          </div>
        </div>
      </div>
    </section>
  );
}
