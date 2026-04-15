"use client";

import { WizardShell } from "@/components/dashboard/onboarding/wizard-shell";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import Link from "next/link";
import { Hammer } from "lucide-react";

export default function ExplorePage() {
  const step = useOnboardingStore((s) => s.step);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrated = useAuthStore((s) => s.hydrated);

  // If already logged in, just show the wizard normally
  if (hydrated && isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-navy dark:text-mint">
              <Hammer className="h-5 w-5 text-mint" />
              Forge
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-12">
          <WizardShell />
        </div>
      </div>
    );
  }

  // Guest mode — show wizard but gate final creation step
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-navy dark:text-mint">
            <Hammer className="h-5 w-5 text-mint" />
            Forge
          </Link>
          {step >= 4 && (
            <Link href="/signup" className="rounded-lg bg-navy px-4 py-1.5 text-xs font-semibold text-white hover:bg-navy-light transition-colors">
              Sign up to create
            </Link>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <GuestWizard />
      </div>
    </div>
  );
}

function GuestWizard() {
  const step = useOnboardingStore((s) => s.step);
  const businessName = useOnboardingStore((s) => s.businessName);

  // On step 4 (color picker), intercept and show signup prompt instead of creating
  if (step === 4) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint/10">
          <Hammer className="h-8 w-8 text-mint" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold">
            {businessName ? `Almost ready, ${businessName}!` : "Almost ready!"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Create a free account to launch your site. No credit card required.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Link href="/signup" className="w-full max-w-sm rounded-lg bg-navy py-3 text-center text-sm font-semibold text-white hover:bg-navy-light transition-colors">
            Create Free Account
          </Link>
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Already have an account? Log in
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Your configuration is saved — continue after signing up.
        </p>
      </div>
    );
  }

  return <WizardShell />;
}
