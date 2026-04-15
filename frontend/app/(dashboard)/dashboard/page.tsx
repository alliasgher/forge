"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Palette, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { useSiteStore } from "@/lib/stores/site-store";

export default function DashboardHome() {
  const { site, sections, loading, fetchSections } = useSiteStore();
  const router = useRouter();

  useEffect(() => {
    if (site) fetchSections();
  }, [site, fetchSections]);

  // No site yet — redirect to onboarding
  useEffect(() => {
    if (!loading && site === null) {
      router.push("/dashboard/new");
    }
  }, [loading, site, router]);

  if (loading || !site) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">{site.business_name}</h1>
        <p className="text-sm text-muted-foreground">{site.tagline || "Your business website"}</p>
      </div>

      <OverviewCards site={site} sections={sections} />

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/dashboard/pages">
          <Card className="border-border bg-card hover:border-mint/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-3 pt-5">
              <div className="rounded-lg bg-navy/10 p-2 dark:bg-mint/10">
                <FileText className="h-5 w-5 text-navy dark:text-mint" />
              </div>
              <div>
                <p className="text-sm font-medium">Edit Content</p>
                <p className="text-xs text-muted-foreground">Manage your sections</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/appearance">
          <Card className="border-border bg-card hover:border-mint/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-3 pt-5">
              <div className="rounded-lg bg-mint/10 p-2">
                <Palette className="h-5 w-5 text-mint" />
              </div>
              <div>
                <p className="text-sm font-medium">Customize Look</p>
                <p className="text-xs text-muted-foreground">Template, colors, fonts</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <a href={`/site/${site.slug}`} target="_blank" rel="noreferrer">
          <Card className="border-border bg-card hover:border-mint/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-3 pt-5">
              <div className="rounded-lg bg-coral/10 p-2">
                <ExternalLink className="h-5 w-5 text-coral" />
              </div>
              <div>
                <p className="text-sm font-medium">View Live Site</p>
                <p className="text-xs text-muted-foreground">forge.app/site/{site.slug}</p>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}
