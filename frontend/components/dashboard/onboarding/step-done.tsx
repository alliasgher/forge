"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";

export function StepDone() {
  const router = useRouter();
  const reset = useOnboardingStore((s) => s.reset);
  const businessName = useOnboardingStore((s) => s.businessName);

  // Auto-redirect to dashboard after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      reset();
      router.push("/dashboard");
    }, 3000);
    return () => clearTimeout(t);
  }, [reset, router]);

  function goToDashboard() {
    reset();
    router.push("/dashboard");
  }

  return (
    <div className="text-center py-4">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-mint/10">
        <CheckCircle className="h-10 w-10 text-mint" />
      </div>
      <h2 className="mb-2 font-heading text-2xl font-bold">
        🎉 {businessName} is live!
      </h2>
      <p className="mb-2 text-muted-foreground">
        Your site is ready. Redirecting to your dashboard in 3 seconds…
      </p>
      <p className="mb-8 text-xs text-muted-foreground">
        You&apos;re signed in as a guest — your site is saved and you can keep editing.
      </p>
      <Button onClick={goToDashboard} className="bg-navy hover:bg-navy-light text-white gap-2 text-base px-8 py-5">
        <LayoutDashboard className="h-5 w-5" />
        Open Dashboard
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
