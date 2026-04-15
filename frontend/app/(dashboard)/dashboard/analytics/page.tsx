"use client";

import { useEffect, useState } from "react";
import { Eye, Users, TrendingUp, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewsChart } from "@/components/dashboard/analytics/views-chart";
import { useSiteStore } from "@/lib/stores/site-store";
import { getAnalytics } from "@/lib/api/analytics";
import type { AnalyticsSummary } from "@/lib/types";

export default function AnalyticsPage() {
  const site = useSiteStore((s) => s.site);
  const siteLoading = useSiteStore((s) => s.loading);
  const [state, setState] = useState<{ loading: boolean; data: AnalyticsSummary | null }>({ loading: false, data: null });
  const { loading, data } = state;

  const refresh = (silent = false) => {
    if (!site) return;
    if (!silent) setState({ loading: true, data: null });
    getAnalytics(site.id, 7)
      .then((d) => setState({ loading: false, data: d }))
      .catch(() => setState((s) => ({ ...s, loading: false })));
  };

  useEffect(() => {
    if (siteLoading || !site) return;
    refresh(false);
    const interval = setInterval(() => refresh(true), 30_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site, siteLoading]);

  if (siteLoading || (loading && !data)) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-36" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const statCards = [
    { label: "Total Views",   value: data?.total_views ?? 0,                icon: Eye,        color: "text-mint",                        bg: "bg-mint/10" },
    { label: "Top Device",    value: data?.devices[0]?.device_type ?? "—",  icon: Users,      color: "text-navy dark:text-mint",           bg: "bg-navy/10 dark:bg-mint/10" },
    { label: "Top Referrer",  value: data?.referrers[0]?.referrer ?? "—",   icon: TrendingUp, color: "text-coral",                         bg: "bg-coral/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Last 7 days · auto-refreshes every 30s</p>
        </div>
        <button
          onClick={() => refresh(false)}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
        {statCards.map((s) => (
          <Card key={s.label} className="border-border bg-card">
            <CardContent className="flex items-start gap-3 pt-5">
              <div className={`rounded-xl p-2.5 ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-heading font-bold truncate">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={`transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
        <ViewsChart data={data?.views_over_time || []} />
      </div>

      {data && (data.devices.length > 0 || data.referrers.length > 0) && (
        <div className={`grid gap-4 md:grid-cols-2 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
          {data.devices.length > 0 && (
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="mb-4 font-heading text-sm font-semibold">Devices</h3>
                <div className="space-y-3">
                  {data.devices.map((d) => {
                    const pct = data.total_views > 0 ? Math.round((d.views / data.total_views) * 100) : 0;
                    return (
                      <div key={d.device_type}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="capitalize text-muted-foreground">{d.device_type}</span>
                          <span className="font-medium">{d.views} ({pct}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-mint transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
          {data.referrers.length > 0 && (
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="mb-4 font-heading text-sm font-semibold">Top Referrers</h3>
                <div className="space-y-3">
                  {data.referrers.slice(0, 5).map((r) => {
                    const pct = data.total_views > 0 ? Math.round((r.views / data.total_views) * 100) : 0;
                    return (
                      <div key={r.referrer}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-muted-foreground truncate max-w-[140px]">{r.referrer}</span>
                          <span className="font-medium shrink-0 ml-2">{r.views} ({pct}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-navy dark:bg-mint transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
