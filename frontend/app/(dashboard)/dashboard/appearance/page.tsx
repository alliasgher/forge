"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteStore } from "@/lib/stores/site-store";
import { updateSite } from "@/lib/api/sites";
import { TEMPLATES, COLOR_PRESETS } from "@/lib/constants";
import { toast } from "sonner";

export default function AppearancePage() {
  const { site, setSite } = useSiteStore();
  const [saving, setSaving] = useState(false);
  const [template, setTemplate] = useState(site?.template || "modern");
  const [colors, setColors] = useState(site?.colors || COLOR_PRESETS[0]);

  async function handleSave() {
    if (!site) return;
    setSaving(true);
    try {
      const updated = await updateSite(site.id, { template, colors });
      setSite(updated);
      toast.success("Appearance updated");
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  }

  if (!site) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Appearance</h1>
          <p className="mt-1 text-sm text-muted-foreground">Customize your site's look and feel.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-navy hover:bg-navy-light text-white gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </Button>
      </div>

      {/* Template selector */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <h3 className="mb-4 font-heading text-sm font-semibold">Template</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTemplate(t.value as any)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  template === t.value ? "border-mint bg-mint/5" : "border-border hover:border-mint/30"
                }`}
              >
                <div className={`mb-3 h-20 rounded-lg ${
                  t.value === "modern" ? "bg-gradient-to-br from-white to-slate-100 border border-border" :
                  t.value === "classic" ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200" :
                  "bg-gradient-to-br from-slate-900 to-slate-800"
                }`} />
                <p className="font-heading text-sm font-semibold">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color palette */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <h3 className="mb-4 font-heading text-sm font-semibold">Color Palette</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {COLOR_PRESETS.map((preset) => {
              const selected = colors.primary === preset.primary && colors.secondary === preset.secondary;
              return (
                <button
                  key={preset.name}
                  onClick={() => setColors(preset as any)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                    selected ? "border-mint bg-mint/5" : "border-border hover:border-mint/30"
                  }`}
                >
                  <div className="flex gap-1">
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: preset.primary }} />
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: preset.secondary }} />
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: preset.accent }} />
                  </div>
                  <span className="text-xs font-medium">{preset.name}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
