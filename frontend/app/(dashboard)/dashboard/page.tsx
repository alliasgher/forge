"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Palette, ExternalLink, Globe, Lock, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { useSiteStore } from "@/lib/stores/site-store";
import { api } from "@/lib/api-client";
import { toast } from "sonner";

export default function DashboardHome() {
  const { site, sections, loading, noSite, error, fetchSections, setSite } = useSiteStore();
  const router = useRouter();
  const [leadCount, setLeadCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (site) {
      fetchSections();
      // Fetch real counts
      api.fetch<any>(`/api/sites/${site.id}/leads?limit=1`)
        .then((d) => setLeadCount(d.total || 0))
        .catch(() => {});
      api.fetch<any>(`/api/sites/${site.id}/analytics`)
        .then((d) => setViewCount(d.total_views || 0))
        .catch(() => {});
    }
  }, [site, fetchSections]);

  // Only redirect if we've confirmed there's no site (404), not on fetch errors
  useEffect(() => {
    if (!loading && noSite) router.push("/dashboard/new");
  }, [loading, noSite, router]);

  async function handlePublish() {
    if (!site) return;
    setPublishing(true);
    try {
      const updated = await api.fetch<any>(`/api/sites/${site.id}/publish`, {
        method: "PUT",
        body: JSON.stringify({ isPublished: !site.is_published }),
      });
      setSite(updated);
      toast.success(updated.is_published ? "🎉 Site is now live!" : "Site set to draft");
    } catch { toast.error("Failed to update"); }
    finally { setPublishing(false); }
  }

  function copyUrl() {
    if (!site) return;
    const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/${site.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("URL copied!");
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-muted-foreground text-sm">Failed to load your site. Please refresh.</p>
        <button onClick={() => window.location.reload()} className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light">
          Retry
        </button>
      </div>
    );
  }

  if (!site) return null;

  const daysLeft = site.expires_at
    ? Math.max(0, Math.ceil((new Date(site.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="space-y-6">
      {/* Expiry / upgrade banner */}
      {daysLeft !== null && (
        <div className={`rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          daysLeft <= 2 ? "border-red-500/30 bg-red-500/5" : "border-mint/20 bg-mint/5"
        }`}>
          <div>
            <p className={`text-sm font-bold ${daysLeft <= 2 ? "text-red-400" : "text-mint-dark dark:text-mint"}`}>
              {daysLeft === 0 ? "⚠️ Your demo site expires today!" : `⏰ ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left on your demo`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Want a permanent site, custom design, or complex features? I can build it for you.
            </p>
          </div>
          <a
            href="https://alliasgher.vercel.app/#contact"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-light transition-colors dark:bg-mint dark:text-deep"
          >
            Contact Ali →
          </a>
        </div>
      )}

      {/* Header + publish */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-2xl font-bold">{site.business_name}</h1>
          <p className="text-sm text-muted-foreground">{site.tagline || "Your business website"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={site.is_published ? "default" : "secondary"} className="gap-1">
            {site.is_published ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {site.is_published ? "Live" : "Draft"}
          </Badge>
          <Button variant="outline" size="sm" onClick={copyUrl} className="gap-1.5">
            {copied ? <Check className="h-3.5 w-3.5 text-mint" /> : <Copy className="h-3.5 w-3.5" />}
            Copy URL
          </Button>
          <Button size="sm" onClick={handlePublish} disabled={publishing}
            className={site.is_published ? "" : "bg-mint hover:bg-mint-dark text-white"}
            variant={site.is_published ? "outline" : "default"}>
            {publishing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> :
              site.is_published ? "Unpublish" : "Publish Site"}
          </Button>
        </div>
      </div>

      <OverviewCards site={site} sections={sections} leadCount={leadCount} viewCount={viewCount} />

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/dashboard/pages">
          <Card className="border-border bg-card hover:border-mint/30 transition-all hover:shadow-sm cursor-pointer group">
            <CardContent className="flex items-center gap-3 pt-5">
              <div className="rounded-xl bg-navy/10 p-2.5 dark:bg-mint/10 group-hover:scale-110 transition-transform">
                <FileText className="h-5 w-5 text-navy dark:text-mint" />
              </div>
              <div>
                <p className="text-sm font-semibold">Edit Content</p>
                <p className="text-xs text-muted-foreground">{sections.length} sections</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/appearance">
          <Card className="border-border bg-card hover:border-mint/30 transition-all hover:shadow-sm cursor-pointer group">
            <CardContent className="flex items-center gap-3 pt-5">
              <div className="rounded-xl bg-mint/10 p-2.5 group-hover:scale-110 transition-transform">
                <Palette className="h-5 w-5 text-mint" />
              </div>
              <div>
                <p className="text-sm font-semibold">Appearance</p>
                <p className="text-xs text-muted-foreground capitalize">{site.template} template</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <a href={`/site/${site.slug}`} target="_blank" rel="noreferrer">
          <Card className="border-border bg-card hover:border-mint/30 transition-all hover:shadow-sm cursor-pointer group">
            <CardContent className="flex items-center gap-3 pt-5">
              <div className="rounded-xl bg-coral/10 p-2.5 group-hover:scale-110 transition-transform">
                <ExternalLink className="h-5 w-5 text-coral" />
              </div>
              <div>
                <p className="text-sm font-semibold">View Site</p>
                <p className="text-xs text-muted-foreground truncate">/site/{site.slug}</p>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}
