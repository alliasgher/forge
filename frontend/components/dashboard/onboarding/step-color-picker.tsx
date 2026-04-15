"use client";

import { ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { COLOR_PRESETS } from "@/lib/constants";
import { createSite } from "@/lib/api/sites";
import { toast } from "sonner";

interface StepColorPickerProps {
  guestMode?: boolean;
}

export function StepColorPicker({ guestMode = false }: StepColorPickerProps) {
  const store = useOnboardingStore();
  const user = useAuthStore((s) => s.user);
  const [creating, setCreating] = useState(false);
  const [showSignupGate, setShowSignupGate] = useState(false);

  function selectPreset(preset: typeof COLOR_PRESETS[0]) {
    store.setColors({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent,
      background: preset.background,
      text: preset.text,
    });
  }

  // Map business type to demo slug for preview
  const previewSlug = {
    gym: "demo-gym",
    retail: "demo-perfume",
    cleaning: "demo-cleaning",
    restaurant: "demo-cleaning",
    salon: "demo-perfume",
    agency: "demo-gym",
    other: "demo-gym",
  }[store.businessType] || "demo-gym";

  async function handleCreate() {
    if (guestMode) {
      setShowSignupGate(true);
      return;
    }

    if (!store.businessName.trim()) {
      toast.error("Please go back and enter a business name");
      return;
    }

    setCreating(true);
    try {
      await createSite({
        businessName: store.businessName,
        businessType: store.businessType,
        tagline: store.tagline || undefined,
        phone: store.phone || undefined,
        email: store.email || user?.email || undefined,
        address: store.address || undefined,
        template: store.template,
        colors: store.colors,
        fonts: store.fonts,
      });
      store.setStep(5);
    } catch (err: any) {
      toast.error(err.message || "Failed to create site");
    } finally {
      setCreating(false);
    }
  }

  if (showSignupGate) {
    return (
      <div className="text-center space-y-6 py-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint/10">
          <span className="text-3xl">🚀</span>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold">
            {store.businessName ? `${store.businessName} is ready to launch!` : "Your site is ready!"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Create a free account to go live. No credit card, no commitment.
          </p>
        </div>
        {/* Preview link */}
        <a href={`/site/${previewSlug}`} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-mint hover:text-mint-dark transition-colors">
          <ExternalLink className="h-3.5 w-3.5" />
          Preview a similar site first
        </a>
        <div className="flex flex-col items-center gap-3">
          <Link href="/signup" className="w-full max-w-sm rounded-xl bg-navy py-3.5 text-center text-sm font-bold text-white hover:bg-navy-light transition-colors">
            Create Free Account →
          </Link>
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Already have an account? Log in
          </Link>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowSignupGate(false)} className="text-muted-foreground">
          ← Back to colors
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-deep dark:text-white">
        Choose your colors
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Pick a palette — you can customize further in your dashboard.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {COLOR_PRESETS.map((preset) => {
          const selected = store.colors.primary === preset.primary && store.colors.secondary === preset.secondary;
          return (
            <button
              key={preset.name}
              onClick={() => selectPreset(preset)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:border-mint/40 ${
                selected ? "border-mint bg-mint/5 shadow-sm" : "border-border bg-background dark:bg-muted/30"
              }`}
            >
              <div className="flex gap-1">
                <div className="h-7 w-7 rounded-full ring-1 ring-black/10 dark:ring-white/15" style={{ backgroundColor: preset.primary }} />
                <div className="h-7 w-7 rounded-full ring-1 ring-black/10 dark:ring-white/15" style={{ backgroundColor: preset.secondary }} />
                <div className="h-7 w-7 rounded-full ring-1 ring-black/10 dark:ring-white/15" style={{ backgroundColor: preset.accent }} />
              </div>
              <span className="text-xs font-medium text-foreground">{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Live preview link */}
      <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4 text-center">
        <p className="text-xs text-muted-foreground mb-2">See what a finished site looks like</p>
        <a href={`/site/${previewSlug}`} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-mint hover:text-mint-dark transition-colors">
          <ExternalLink className="h-3.5 w-3.5" />
          Open preview in new tab
        </a>
      </div>

      <div className="flex justify-between pt-5">
        <Button variant="outline" onClick={() => store.setStep(3)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleCreate} disabled={creating} className="bg-mint hover:bg-mint-dark text-white px-8">
          {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : guestMode ? "See My Site →" : "Create My Site"}
        </Button>
      </div>
    </div>
  );
}
