import Link from "next/link";
import {
  Zap, Palette, BarChart3, MessageSquare, Globe, Shield,
  ArrowRight, Hammer,
} from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Launch in Minutes", desc: "Pick a template, fill in your content, and your site is live. No coding required." },
  { icon: Palette, title: "Fully Customizable", desc: "Change templates, colors, fonts, and content anytime from your dashboard." },
  { icon: BarChart3, title: "Built-in Analytics", desc: "Track page views, devices, and referrers with a live dashboard." },
  { icon: MessageSquare, title: "Lead Capture", desc: "Every contact form submission lands in your inbox. Never miss a lead." },
  { icon: Globe, title: "SEO Optimized", desc: "Server-rendered pages that load fast and rank well on search engines." },
  { icon: Shield, title: "Secure & Reliable", desc: "JWT authentication, encrypted data, and enterprise-grade hosting." },
];

const DEMOS = [
  { name: "Luxe Perfumes", type: "Retail Brand", slug: "demo-perfume", gradient: "from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/30" },
  { name: "Iron Forge Fitness", type: "Gym", slug: "demo-gym", gradient: "from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30" },
  { name: "Sparkle Pro Cleaning", type: "Cleaning Service", slug: "demo-cleaning", gradient: "from-cyan-100 to-green-100 dark:from-cyan-900/30 dark:to-green-900/30" },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />
          <div className="absolute -top-12 right-1/4 h-56 w-56 rounded-full bg-navy/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-mint/20 bg-mint/10 px-3.5 py-1 text-xs font-medium text-mint-dark dark:text-mint">
            <Zap className="mr-1.5 h-3 w-3" />
            Free &amp; Open Source
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-deep dark:text-white sm:text-5xl lg:text-6xl">
            Build your business website
            <br />
            <span className="bg-gradient-to-r from-navy to-mint bg-clip-text text-transparent dark:from-mint dark:to-white">
              in minutes
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Pick a template, fill in your content, and launch a professional website for your
            gym, salon, restaurant, brand, or any business. No coding required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light transition-colors dark:bg-mint dark:text-deep dark:hover:bg-mint-dark"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#demos"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              View Demo Sites
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-heading text-3xl font-bold text-deep dark:text-white">
            Everything your business needs
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            A complete platform to build and manage your online presence.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-lg bg-mint/10 p-2">
                  <f.icon className="h-5 w-5 text-mint" />
                </div>
                <h3 className="font-heading text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo sites */}
      <section id="demos" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-heading text-3xl font-bold text-deep dark:text-white">
            See it in action
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Three demo sites, all powered by the same engine.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {DEMOS.map((demo) => (
              <Link
                key={demo.slug}
                href={`/site/${demo.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-mint/30 hover:shadow-lg"
              >
                <div className={`h-40 bg-gradient-to-br ${demo.gradient} flex items-center justify-center`}>
                  <Hammer className="h-10 w-10 text-muted-foreground/30 group-hover:text-mint/50 transition-colors" />
                </div>
                <div className="p-5">
                  <p className="font-heading font-semibold group-hover:text-mint transition-colors">{demo.name}</p>
                  <p className="text-xs text-muted-foreground">{demo.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-deep dark:text-white">
            Ready to build your site?
          </h2>
          <p className="mt-3 text-muted-foreground">
            It takes less than 5 minutes to set up. Free forever.
          </p>
          <Link
            href="/explore"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-mint px-8 py-3.5 text-sm font-semibold text-deep hover:bg-mint-dark transition-colors"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
