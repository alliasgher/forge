"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { WizardShell } from "@/components/dashboard/onboarding/wizard-shell";
import { useAuthStore } from "@/lib/stores/auth-store";
import Link from "next/link";
import { Hammer } from "lucide-react";

export default function ExplorePage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrated = useAuthStore((s) => s.hydrated);
  const router = useRouter();

  // If logged in, redirect to the dashboard wizard
  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/dashboard/new");
    }
  }, [hydrated, isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-navy dark:text-mint">
            <Hammer className="h-5 w-5 text-mint" />
            Forge
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
            <Link href="/signup" className="rounded-lg bg-navy px-4 py-1.5 text-sm font-semibold text-white hover:bg-navy-light transition-colors">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Pass guestMode so color-picker shows signup instead of creating */}
        <WizardShell guestMode />
      </div>
    </div>
  );
}
