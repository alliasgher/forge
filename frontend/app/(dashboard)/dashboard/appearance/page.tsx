"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteStore } from "@/lib/stores/site-store";
import { updateSite } from "@/lib/api/sites";
import { TEMPLATES, COLOR_PRESETS, FONT_OPTIONS } from "@/lib/constants";
import { HeroSection } from "@/components/templates/sections/hero-section";
import { SectionWrapper } from "@/components/templates/shared/section-wrapper";
import { toast } from "sonner";
import type { Site, SiteColors, SiteFonts } from "@/lib/types";

// Presets carry display-only extras (name, headingVar, bodyVar) that must not
// be persisted into the site's colors/fonts JSON.
function toColors(preset: typeof COLOR_PRESETS[number]): SiteColors {
  const { primary, secondary, accent, background, text } = preset;
  return { primary, secondary, accent, background, text };
}

function toFonts(pair: typeof FONT_OPTIONS[number]): SiteFonts {
  return { heading: pair.heading, body: pair.body };
}

export default function AppearancePage() {
  const { site, setSite } = useSiteStore();
  const [saving, setSaving] = useState(false);
  const [template, setTemplate] = useState<"modern" | "classic" | "bold">(site?.template as any || "modern");
  const [colors, setColors] = useState<SiteColors>(site?.colors || toColors(COLOR_PRESETS[0]));
  const [fonts, setFonts] = useState<SiteFonts>(site?.fonts || toFonts(FONT_OPTIONS[0]));

  // The site loads asynchronously — without this the controls keep their
  // fallback defaults and saving would overwrite the real appearance.
  useEffect(() => {
    if (!site) return;
    setTemplate(site.template || "modern");
    if (site.colors) setColors(site.colors);
    if (site.fonts) setFonts(site.fonts);
  }, [site]);

  async function handleSave() {
    if (!site) return;
    setSaving(true);
    try {
      const updated = await updateSite(site.id, { template, colors, fonts });
      setSite(updated);
      toast.success("Appearance saved — your live site is updated");
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  }

  if (!site) return null;

  // Build mock site for live preview
  const previewSite: Site = { ...site, template, colors, fonts };
  const heroContent = {
    heading: site.business_name,
    subheading: site.tagline || "Your tagline goes here",
    ctaText: "Get Started",
    ctaLink: "#",
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] items-start">
      {/* Left: controls */}
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-heading text-2xl font-bold">Appearance</h1>
            <p className="mt-1 text-sm text-muted-foreground hidden sm:block">Preview updates live on the right.</p>
          </div>
          <Button onClick={handleSave} disabled={saving} size="sm" className="bg-navy hover:bg-navy-light text-white gap-2 shrink-0">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden sm:inline">Save & Publish Changes</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>

        {/* Template */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <h3 className="mb-4 font-heading text-sm font-semibold">Template Style</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {TEMPLATES.map((t) => {
                const sel = template === t.value;
                const previewBg = { modern: "bg-white border border-slate-200", classic: "bg-blue-50 border border-blue-100", bold: "bg-slate-950 border border-slate-700" }[t.value];
                return (
                  <button key={t.value} onClick={() => setTemplate(t.value as any)}
                    className={`rounded-xl border p-3 text-left transition-all ${sel ? "border-mint bg-mint/5 shadow-sm" : "border-border hover:border-mint/30"}`}>
                    <div className={`mb-2 h-16 rounded-lg ${previewBg}`} />
                    <p className={`font-semibold text-xs ${sel ? "text-mint" : ""}`}>{t.label}</p>
                    <p className="text-[10px] text-muted-foreground">{t.description}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <h3 className="mb-4 font-heading text-sm font-semibold">Color Palette</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {COLOR_PRESETS.map((preset) => {
                const sel = colors.primary === preset.primary && colors.secondary === preset.secondary;
                return (
                  <button key={preset.name} onClick={() => setColors(toColors(preset))}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${sel ? "border-mint bg-mint/5 shadow-sm" : "border-border bg-background dark:bg-muted/30 hover:border-mint/30"}`}>
                    <div className="flex gap-1">
                      {[preset.primary, preset.secondary, preset.accent].map((c, i) => (
                        <div key={i} className="h-6 w-6 rounded-full ring-1 ring-black/10 dark:ring-white/15" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-foreground">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Font pairing */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <h3 className="mb-4 font-heading text-sm font-semibold">Typography</h3>
            <div className="space-y-2">
              {FONT_OPTIONS.map((pair) => {
                const sel = fonts.heading === pair.heading && fonts.body === pair.body;
                return (
                  <button key={pair.heading} onClick={() => setFonts(toFonts(pair))}
                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${sel ? "border-mint bg-mint/5" : "border-border hover:border-mint/30"}`}>
                    <div>
                      <p className="text-base font-semibold" style={{ fontFamily: (pair as any).headingVar || `${pair.heading}, serif` }}>
                        {pair.heading}
                      </p>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: (pair as any).bodyVar || `${pair.body}, sans-serif` }}>
                        {pair.body} — body text
                      </p>
                    </div>
                    {sel && <span className="text-xs text-mint font-medium">Active</span>}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: live preview */}
      <div className="hidden lg:block lg:sticky lg:top-16">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-mint animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live Preview</span>
          </div>
          <a href={`/site/${site.slug}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-1 text-xs text-mint hover:text-mint-dark transition-colors">
            <ExternalLink className="h-3 w-3" /> Open site
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-xl" style={{ height: 460 }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-3 py-2">
            <div className="flex gap-1"><div className="h-2.5 w-2.5 rounded-full bg-red-400" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><div className="h-2.5 w-2.5 rounded-full bg-green-400" /></div>
            <div className="mx-auto flex-1 max-w-[160px] rounded bg-background px-2 py-0.5 text-[9px] text-muted-foreground text-center">/site/{site.slug}</div>
          </div>
          {/* Scaled hero */}
          <div style={{ height: 420, overflow: "hidden" }}>
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%", height: "200%", pointerEvents: "none" }}>
              <SectionWrapper colors={colors} fonts={fonts}>
                <HeroSection content={heroContent} site={previewSite} variant={template} />
              </SectionWrapper>
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">Updates as you make changes ↑</p>
      </div>
    </div>
  );
}
