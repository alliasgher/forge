"use client";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { StepBusinessType } from "./step-business-type";
import { StepBusinessDetails } from "./step-business-details";
import { StepTemplateSelect } from "./step-template-select";
import { StepColorPicker } from "./step-color-picker";
import { StepDone } from "./step-done";

const STEPS = [
  { label: "Type", component: StepBusinessType },
  { label: "Details", component: StepBusinessDetails },
  { label: "Template", component: StepTemplateSelect },
  { label: "Colors", component: StepColorPicker },
  { label: "Done", component: StepDone },
];

export function WizardShell() {
  const step = useOnboardingStore((s) => s.step);
  const StepComponent = STEPS[step - 1]?.component;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                i + 1 === step
                  ? "bg-navy text-white dark:bg-mint dark:text-deep"
                  : i + 1 < step
                  ? "bg-mint/20 text-mint"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1 < step ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-8 ${
                  i + 1 < step ? "bg-mint" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {StepComponent && <StepComponent />}
    </div>
  );
}
