"use client";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { StepBusinessType } from "./step-business-type";
import { StepBusinessDetails } from "./step-business-details";
import { StepTemplateSelect } from "./step-template-select";
import { StepColorPicker } from "./step-color-picker";
import { StepDone } from "./step-done";
import { WizardPreview } from "./wizard-preview";

const STEPS = [
  { label: "Type" },
  { label: "Details" },
  { label: "Template" },
  { label: "Colors" },
  { label: "Done" },
];

interface WizardShellProps {
  guestMode?: boolean;
}

export function WizardShell({ guestMode = false }: WizardShellProps) {
  const step = useOnboardingStore((s) => s.step);
  const businessName = useOnboardingStore((s) => s.businessName);

  // Show preview alongside steps 3, 4 (template + colors)
  const showPreview = step >= 3 && step <= 4 && !!businessName;

  const renderStep = () => {
    switch (step) {
      case 1: return <StepBusinessType />;
      case 2: return <StepBusinessDetails />;
      case 3: return <StepTemplateSelect />;
      case 4: return <StepColorPicker guestMode={guestMode} />;
      case 5: return <StepDone />;
      default: return null;
    }
  };

  return (
    <div>
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
              <div className={`h-px w-8 ${i + 1 < step ? "bg-mint" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Side-by-side layout for steps with preview */}
      {showPreview ? (
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div>{renderStep()}</div>
          <div className="hidden lg:block sticky top-24">
            <WizardPreview />
          </div>
          {/* Mobile preview below */}
          <div className="lg:hidden">
            <WizardPreview />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-xl">{renderStep()}</div>
      )}
    </div>
  );
}
