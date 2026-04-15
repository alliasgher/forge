"use client";

import { useRouter } from "next/navigation";
import { CheckCircle, ExternalLink, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";

export function StepDone() {
  const router = useRouter();
  const reset = useOnboardingStore((s) => s.reset);
  const businessName = useOnboardingStore((s) => s.businessName);

  function goToDashboard() {
    reset();
    router.push("/dashboard");
  }

  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mint/10">
        <CheckCircle className="h-8 w-8 text-mint" />
      </div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-deep dark:text-white">
        Your site is ready!
      </h2>
      <p className="mb-8 text-muted-foreground">
        <strong>{businessName}</strong> has been created with default content.
        <br />
        Head to your dashboard to customize everything.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button onClick={goToDashboard} className="bg-navy hover:bg-navy-light text-white gap-2">
          <LayoutDashboard className="h-4 w-4" />
          Go to Dashboard
        </Button>
        <a
          href={`/site/${encodeURIComponent(businessName.toLowerCase().replace(/\s+/g, "-"))}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Preview Site
        </a>
      </div>
    </div>
  );
}
