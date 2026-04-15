"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { TEMPLATES } from "@/lib/constants";

export function StepTemplateSelect() {
  const { template, setTemplate, setStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-deep dark:text-white">
        Pick a template
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        You can change this anytime from your dashboard.
      </p>
      <div className="grid gap-4">
        {TEMPLATES.map((t) => {
          const selected = template === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setTemplate(t.value as "modern" | "classic" | "bold")}
              className={`flex items-center gap-4 rounded-xl border p-5 text-left transition-all hover:border-mint/40 ${
                selected
                  ? "border-mint bg-mint/5 shadow-sm"
                  : "border-border bg-card"
              }`}
            >
              {/* Template preview placeholder */}
              <div className={`h-16 w-24 shrink-0 rounded-lg ${
                t.value === "modern" ? "bg-gradient-to-br from-white to-slate-100 border border-border" :
                t.value === "classic" ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200" :
                "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700"
              }`} />
              <div>
                <p className={`font-heading font-semibold ${selected ? "text-mint" : "text-deep dark:text-white"}`}>
                  {t.label}
                </p>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => setStep(2)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => setStep(4)} className="bg-navy hover:bg-navy-light text-white">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
