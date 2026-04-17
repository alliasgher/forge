"use client";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { HeroSection } from "@/components/templates/sections/hero-section";
import { SectionWrapper } from "@/components/templates/shared/section-wrapper";
import type { Site } from "@/lib/types";

export function WizardPreview() {
  const store = useOnboardingStore();

  if (!store.businessName && !store.businessType) return null;

  // Construct a mock site from wizard state
  const mockSite: Site = {
    id: 0,
    owner_id: 0,
    slug: "preview",
    business_name: store.businessName || "Your Business",
    business_type: store.businessType || "other",
    tagline: store.tagline || "Your tagline goes here",
    phone: store.phone || null,
    email: store.email || null,
    address: store.address || null,
    hours: {},
    template: store.template || "modern",
    colors: store.colors,
    fonts: store.fonts,
    logo_url: null,
    is_published: false,
    is_demo: false,
    expires_at: null,
    created_at: "",
    updated_at: "",
  };

  const heroContent = {
    heading: store.businessName || "Your Business Name",
    subheading: store.tagline || "Your tagline will appear here. Pick a template and colors below.",
    ctaText: "Get Started",
    ctaLink: "#",
  };

  return (
    <div className="relative">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-mint animate-pulse" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live Preview</span>
      </div>

      {/* Scaled-down site preview */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border shadow-xl h-[280px] sm:h-[360px] lg:h-[400px]"
      >
        {/* Scale wrapper */}
        <div
          style={{
            transform: "scale(0.5)",
            transformOrigin: "top left",
            width: "200%",
            height: "200%",
            pointerEvents: "none",
          }}
        >
          <SectionWrapper colors={store.colors} fonts={store.fonts}>
            {/* Mock header */}
            <div
              className="flex items-center justify-between px-8 py-4"
              style={{
                backgroundColor: store.template === "bold" ? "#0D0A18" : store.colors.background,
                borderBottom: `1px solid ${store.colors.primary}20`,
              }}
            >
              <span
                className="font-bold text-lg"
                style={{
                  color: store.template === "bold" ? "#fff" : store.colors.primary,
                  fontFamily: `${store.fonts.heading}, serif`,
                }}
              >
                {store.businessName || "Your Business"}
              </span>
              <div className="flex gap-6 text-sm opacity-60" style={{ color: store.template === "bold" ? "#fff" : store.colors.text }}>
                <span>About</span>
                <span>Services</span>
                <span>Contact</span>
              </div>
            </div>

            {/* Hero preview */}
            <HeroSection
              content={heroContent}
              site={mockSite}
              variant={store.template}
            />
          </SectionWrapper>
        </div>

        {/* Browser chrome overlay */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 bg-muted/80 px-3 py-1.5 backdrop-blur-sm border-b border-border">
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <div className="h-2 w-2 rounded-full bg-yellow-400" />
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <div className="mx-auto flex-1 max-w-[180px] rounded bg-background px-2 py-0.5 text-[9px] text-muted-foreground text-center truncate">
            forge.app/{(store.businessName || "your-business").toLowerCase().replace(/\s+/g, "-")}
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Updates live as you make choices ↑
      </p>
    </div>
  );
}
