"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { COLOR_PRESETS } from "@/lib/constants";
import { createSite } from "@/lib/api/sites";
import { toast } from "sonner";

export function StepColorPicker() {
  const store = useOnboardingStore();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  function selectPreset(preset: typeof COLOR_PRESETS[0]) {
    store.setColors({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent,
      background: preset.background,
      text: preset.text,
    });
  }

  async function handleCreate() {
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

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-deep dark:text-white">
        Choose your colors
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Pick a palette or customize later from your dashboard.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {COLOR_PRESETS.map((preset) => {
          const selected =
            store.colors.primary === preset.primary &&
            store.colors.secondary === preset.secondary;
          return (
            <button
              key={preset.name}
              onClick={() => selectPreset(preset)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:border-mint/40 ${
                selected ? "border-mint bg-mint/5 shadow-sm" : "border-border bg-card"
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
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => store.setStep(3)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={handleCreate}
          disabled={creating}
          className="bg-mint hover:bg-mint-dark text-white"
        >
          {creating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create My Site"
          )}
        </Button>
      </div>
    </div>
  );
}
