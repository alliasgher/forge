"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { COLOR_PRESETS } from "@/lib/constants";
import { createSite } from "@/lib/api/sites";
import { signup } from "@/lib/api/auth";
import { toast } from "sonner";

interface StepColorPickerProps {
  guestMode?: boolean;
}

function generateGuestCredentials() {
  const id = Math.random().toString(36).slice(2, 10);
  return {
    email: `guest-${id}@forge.demo`,
    password: Math.random().toString(36).slice(2, 18),
    name: "Guest",
  };
}

export function StepColorPicker({ guestMode = false }: StepColorPickerProps) {
  const store = useOnboardingStore();
  const { user, setAuth } = useAuthStore();
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
      let currentUser = user;

      // Guest mode: auto-create an account silently
      if (guestMode && !currentUser) {
        const creds = generateGuestCredentials();
        const authResult = await signup(
          creds.name,
          creds.email,
          creds.password
        );
        setAuth(authResult.user, authResult.accessToken, authResult.refreshToken);
        currentUser = authResult.user;
        toast.success("Guest account created — you can upgrade later");
      }

      await createSite({
        businessName: store.businessName,
        businessType: store.businessType,
        tagline: store.tagline || undefined,
        phone: store.phone || undefined,
        email: store.email || currentUser?.email || undefined,
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
                {[preset.primary, preset.secondary, preset.accent].map((c, i) => (
                  <div key={i} className="h-7 w-7 rounded-full ring-1 ring-black/10 dark:ring-white/15" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-xs font-medium text-foreground">{preset.name}</span>
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
          className="bg-mint hover:bg-mint-dark text-white px-8"
        >
          {creating ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating your site...</>
          ) : (
            guestMode ? "Create My Site — Free →" : "Create My Site"
          )}
        </Button>
      </div>

      {guestMode && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          No signup form. Your site is created instantly with a guest account.
        </p>
      )}
    </div>
  );
}
