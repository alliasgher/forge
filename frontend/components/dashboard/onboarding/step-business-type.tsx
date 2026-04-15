"use client";

import { UtensilsCrossed, Dumbbell, Scissors, Sparkles, Briefcase, ShoppingBag, Building2 } from "lucide-react";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { BUSINESS_TYPES } from "@/lib/constants";

const ICONS: Record<string, React.ElementType> = { UtensilsCrossed, Dumbbell, Scissors, Sparkles, Briefcase, ShoppingBag, Building2 };

// Demo preview images per business type
const DEMO_PREVIEWS: Record<string, string> = {
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=70",
  retail: "https://images.unsplash.com/photo-1542736536-f9aea26ad27e?w=400&q=70",
  cleaning: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=70",
  salon: "https://images.unsplash.com/photo-1560066984-138daaa4e4e1?w=400&q=70",
  agency: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70",
  other: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70",
};

export function StepBusinessType() {
  const { businessType, setBusinessType, setStep } = useOnboardingStore();

  function handleSelect(type: string) {
    setBusinessType(type);
    setStep(2);
  }

  return (
    <div>
      <h2 className="mb-1 text-center font-heading text-2xl font-bold text-deep dark:text-white">
        What type of business?
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        We&apos;ll fill in the right sections and content for your industry.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {BUSINESS_TYPES.map((bt) => {
          const Icon = ICONS[bt.icon];
          const selected = businessType === bt.value;
          const preview = DEMO_PREVIEWS[bt.value];
          return (
            <button
              key={bt.value}
              onClick={() => handleSelect(bt.value)}
              className={`group relative overflow-hidden rounded-xl border transition-all hover:shadow-md ${
                selected ? "border-mint shadow-md" : "border-border bg-card hover:border-mint/40"
              }`}
            >
              {/* Background image */}
              {preview && (
                <div className="absolute inset-0">
                  <img src={preview} alt="" className="h-full w-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/40" />
                </div>
              )}
              <div className="relative flex flex-col items-center gap-2 p-5">
                {Icon && (
                  <div className={`rounded-xl p-2.5 ${selected ? "bg-mint/15" : "bg-muted"}`}>
                    <Icon className={`h-5 w-5 ${selected ? "text-mint" : "text-muted-foreground"}`} />
                  </div>
                )}
                <span className="text-sm font-semibold">{bt.label}</span>
                {selected && <span className="text-[10px] text-mint font-medium">Selected ✓</span>}
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Click to select and continue to the next step →
      </p>
    </div>
  );
}
