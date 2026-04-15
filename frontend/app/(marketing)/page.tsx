"use client";

import Link from "next/link";
import { useState } from "react";
import { Zap, Palette, BarChart3, MessageSquare, Globe, ArrowRight, Play, CheckCircle } from "lucide-react";

const DEMOS = [
  {
    name: "Aura Luxe Perfumery",
    type: "Luxury Retail Brand",
    slug: "demo-perfume",
    template: "Bold",
    image: "https://images.unsplash.com/photo-1542736536-f9aea26ad27e?w=800&q=80",
    accent: "#C9A84C",
    tagline: "Handcrafted fragrances for every mood",
    color: "#2C1654",
  },
  {
    name: "Iron Forge Fitness",
    type: "Gym & Fitness",
    slug: "demo-gym",
    template: "Modern",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    accent: "#E74C3C",
    tagline: "Transform your body, transform your life",
    color: "#C0392B",
  },
  {
    name: "Sparkle Pro Cleaning",
    type: "Cleaning Service",
    slug: "demo-cleaning",
    template: "Classic",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "#0EA5E9",
    tagline: "Spotless homes, happy families",
    color: "#0369A1",
  },
];

const STEPS = [
  { step: "01", title: "Pick your business type", desc: "Restaurant, gym, salon, agency, retail — we tailor the default content for you." },
  { step: "02", title: "Fill in your details", desc: "Business name, tagline, contact info. Takes 60 seconds." },
  { step: "03", title: "Choose a template & colors", desc: "3 professionally designed templates. See a live preview of your site as you choose." },
  { step: "04", title: "Go live", desc: "Create your free account and your site is published instantly." },
];

const FEATURES = [
  { icon: Palette, title: "3 Distinct Templates", desc: "Bold luxury, modern clean, or classic professional — each with fully different layouts." },
  { icon: BarChart3, title: "Live Analytics", desc: "Page views, device breakdown, referrer tracking — all in a real-time dashboard." },
  { icon: MessageSquare, title: "Lead Inbox", desc: "Contact form submissions go straight to your dashboard. Never miss an enquiry." },
  { icon: Globe, title: "SEO Ready", desc: "Server-rendered pages that load fast and rank well on Google from day one." },
  { icon: Zap, title: "Instant Publish", desc: "Make a change, hit save, and it's live within seconds. No rebuild needed." },
  { icon: CheckCircle, title: "No Code Required", desc: "Built for business owners, not developers. If you can type, you can build a site." },
];

export default function LandingPage() {
  const [activeDemo, setActiveDemo] = useState(0);
  const demo = DEMOS[activeDemo];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-mint/8 blur-3xl" />
          <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-navy/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/8 px-4 py-1.5 text-xs font-semibold text-mint-dark dark:text-mint">
                <Zap className="h-3 w-3" /> No signup required to try
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-deep dark:text-white sm:text-5xl xl:text-6xl">
                Your business deserves
                <br />
                <span className="bg-gradient-to-r from-navy via-navy-light to-mint bg-clip-text text-transparent dark:from-mint dark:to-white">
                  a great website.
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-lg">
                Pick a template, fill in your content, and launch a professional website for your gym, salon, brand, or any business. Live preview as you build.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/explore"
                  className="group inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-navy-light transition-all hover:shadow-xl hover:-translate-y-0.5 dark:bg-mint dark:text-deep">
                  Try It Free — No Signup
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="#demos"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Play className="h-4 w-4" /> See live demos
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                {["No credit card", "No code needed", "Live in 5 min"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-mint" /> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: browser mockup of demo site */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-navy/10 to-mint/10 blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-auto flex-1 max-w-56 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground text-center">
                    forge.app/site/demo-gym
                  </div>
                </div>
                <div className="relative h-72 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                    alt="Demo site preview"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="font-bold text-2xl">Iron Forge Fitness</p>
                    <p className="text-sm text-white/70 mt-1">Transform your body, transform your life</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-card border border-border px-4 py-3 shadow-xl">
                <p className="text-xs text-muted-foreground">Built with</p>
                <p className="font-bold text-sm text-navy dark:text-mint">Forge Builder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-mint mb-2">How It Works</p>
            <h2 className="font-heading text-3xl font-bold text-deep dark:text-white">Launch in 4 steps</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 font-mono text-3xl font-black text-mint/30">{s.step}</div>
                <h3 className="font-heading text-sm font-bold mb-2">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/explore"
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-8 py-3.5 text-sm font-bold text-white hover:bg-navy-light transition-all hover:shadow-lg dark:bg-mint dark:text-deep">
              Start Building Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEMO SITES — interactive browser mockups ── */}
      <section id="demos" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-mint mb-2">Live Examples</p>
            <h2 className="font-heading text-3xl font-bold text-deep dark:text-white">
              Real sites built with Forge
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Three completely different businesses, three completely different templates — all built from the same platform.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Selector */}
            <div className="space-y-3">
              {DEMOS.map((d, i) => (
                <button key={d.slug} onClick={() => setActiveDemo(i)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    i === activeDemo ? "border-mint bg-mint/5 shadow-sm" : "border-border bg-card hover:border-mint/30"
                  }`}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0">
                      <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${i === activeDemo ? "text-mint" : ""}`}>{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.type}</p>
                    </div>
                  </div>
                  {i === activeDemo && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] rounded-full px-2 py-0.5 font-medium" style={{ backgroundColor: `${d.accent}20`, color: d.accent }}>
                        {d.template} Template
                      </span>
                      <Link href={`/site/${d.slug}`} target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-mint hover:text-mint-dark flex items-center gap-1">
                        Open ↗
                      </Link>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Browser mockup */}
            <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
              {/* Chrome */}
              <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 rounded-md bg-background px-3 py-1.5 text-xs text-muted-foreground flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-mint" />
                  forge.app/site/{demo.slug}
                </div>
                <Link href={`/site/${demo.slug}`} target="_blank"
                  className="text-xs font-medium text-mint hover:text-mint-dark transition-colors">
                  Open full site ↗
                </Link>
              </div>

              {/* Site preview */}
              <div className="relative h-[420px] overflow-hidden">
                <img
                  key={demo.slug}
                  src={demo.image}
                  alt={demo.name}
                  className="h-full w-full object-cover object-top transition-all duration-500"
                />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${demo.color}ee 0%, ${demo.color}88 30%, transparent 70%)` }}
                />
                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <div className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-3"
                    style={{ backgroundColor: `${demo.accent}25`, color: demo.accent, border: `1px solid ${demo.accent}40` }}>
                    {demo.type}
                  </div>
                  <h3 className="font-bold text-white text-3xl md:text-4xl" style={{ fontFamily: "serif" }}>{demo.name}</h3>
                  <p className="mt-2 text-white/70 text-base">{demo.tagline}</p>
                  <Link href={`/site/${demo.slug}`} target="_blank"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                    style={{ backgroundColor: demo.accent }}>
                    View Full Site <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-mint mb-2">Features</p>
            <h2 className="font-heading text-3xl font-bold text-deep dark:text-white">
              Everything included, nothing to install
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-mint/30 hover:shadow-md">
                <div className="mb-3 inline-flex rounded-xl bg-mint/10 p-2.5">
                  <f.icon className="h-5 w-5 text-mint" />
                </div>
                <h3 className="font-heading text-sm font-bold">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border border-mint/20 bg-gradient-to-br from-navy/5 to-mint/5 p-12">
            <h2 className="font-heading text-3xl font-bold text-deep dark:text-white md:text-4xl">
              See your business website
              <br />
              come to life in minutes.
            </h2>
            <p className="mt-4 text-muted-foreground">
              No signup. No credit card. Just pick a template and see your name in a live preview.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/explore"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-navy-light transition-all hover:shadow-2xl hover:-translate-y-0.5 dark:bg-mint dark:text-deep">
                Try the Live Builder <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#demos"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                or browse demos first →
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Takes 2 minutes · No account needed to preview · Free forever
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
