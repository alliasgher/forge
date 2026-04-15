"use client";

import {
  UtensilsCrossed,
  Dumbbell,
  Scissors,
  Sparkles,
  Briefcase,
  ShoppingBag,
  Building2,
} from "lucide-react";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { BUSINESS_TYPES } from "@/lib/constants";

const ICONS: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Dumbbell,
  Scissors,
  Sparkles,
  Briefcase,
  ShoppingBag,
  Building2,
};

export function StepBusinessType() {
  const { businessType, setBusinessType, setStep } = useOnboardingStore();

  function handleSelect(type: string) {
    setBusinessType(type);
    setStep(2);
  }

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-deep dark:text-white">
        What type of business?
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        We&apos;ll customize your content to match.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {BUSINESS_TYPES.map((bt) => {
          const Icon = ICONS[bt.icon];
          const selected = businessType === bt.value;
          return (
            <button
              key={bt.value}
              onClick={() => handleSelect(bt.value)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-5 transition-all hover:border-mint/40 hover:shadow-sm ${
                selected
                  ? "border-mint bg-mint/5 shadow-sm"
                  : "border-border bg-card"
              }`}
            >
              {Icon && <Icon className={`h-6 w-6 ${selected ? "text-mint" : "text-muted-foreground"}`} />}
              <span className="text-sm font-medium">{bt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
