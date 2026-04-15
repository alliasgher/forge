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
  const { site, sections, loading, fetchSections, setSite } = useSiteStore();
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

  useEffect(() => {
    if (!loading && site === null) router.push("/dashboard/new");
  }, [loading, site, router]);

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

  if (loading || !site) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
