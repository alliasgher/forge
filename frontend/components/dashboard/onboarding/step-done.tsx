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

  // Auto-redirect to dashboard after 4 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      reset();
      router.push("/dashboard");
    }, 4000);
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
      <p className="mb-1 text-muted-foreground">
        Your site is ready. Redirecting to your dashboard in a moment…
      </p>
      <p className="mb-6 text-xs text-muted-foreground">
        Guest sites are active for <span className="font-semibold text-foreground">7 days</span>. Want it live permanently?
      </p>

      {/* CTA */}
      <div className="mb-8 rounded-2xl border border-mint/20 bg-mint/5 px-6 py-5 text-left">
        <p className="text-sm font-semibold text-deep dark:text-white mb-1">
          Want a permanent, custom or complex website?
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          I can build you a fully custom site with advanced features, custom domain, and no expiry.
        </p>
        <a
          href="https://alliasgher.vercel.app/#contact"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy-light transition-colors dark:bg-mint dark:text-deep"
        >
          Contact Ali for a Custom Site →
        </a>
      </div>

      <Button onClick={goToDashboard} className="bg-navy hover:bg-navy-light text-white gap-2 px-8 py-5 text-base">
        <LayoutDashboard className="h-5 w-5" />
        Open My Dashboard
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
