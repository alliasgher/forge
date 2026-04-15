"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewsChart } from "@/components/dashboard/analytics/views-chart";
import { useSiteStore } from "@/lib/stores/site-store";
import { getAnalytics } from "@/lib/api/analytics";
import type { AnalyticsSummary } from "@/lib/types";

export default function AnalyticsPage() {
  const site = useSiteStore((s) => s.site);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site) return;
    getAnalytics(site.id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [site]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track visitors to your site.</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="flex items-center gap-3 pt-5">
          <div className="rounded-lg bg-mint/10 p-2">
            <Eye className="h-5 w-5 text-mint" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Page Views</p>
            <p className="text-2xl font-heading font-bold">{data?.total_views ?? 0}</p>
          </div>
        </CardContent>
      </Card>

      <ViewsChart data={data?.views_over_time || []} />

      {data && data.devices.length > 0 && (
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <h3 className="mb-3 font-heading text-sm font-semibold">Devices</h3>
            <div className="space-y-2">
              {data.devices.map((d) => (
                <div key={d.device_type} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{d.device_type}</span>
                  <span className="text-sm font-medium">{d.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data && data.referrers.length > 0 && (
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <h3 className="mb-3 font-heading text-sm font-semibold">Top Referrers</h3>
            <div className="space-y-2">
              {data.referrers.map((r) => (
                <div key={r.referrer} className="flex items-center justify-between">
                  <span className="text-sm truncate">{r.referrer}</span>
                  <span className="text-sm font-medium">{r.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
