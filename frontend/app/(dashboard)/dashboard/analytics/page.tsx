"use client";

import { useEffect, useState } from "react";
import { Eye, Users, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewsChart } from "@/components/dashboard/analytics/views-chart";
import { useSiteStore } from "@/lib/stores/site-store";
import { getAnalytics } from "@/lib/api/analytics";
import type { AnalyticsSummary } from "@/lib/types";

const DATE_RANGES = [
  { label: "7 days", value: 7 },
  { label: "30 days", value: 30 },
  { label: "90 days", value: 90 },
];

export default function AnalyticsPage() {
  const site = useSiteStore((s) => s.site);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (!site) return;
    setLoading(true);
    getAnalytics(site.id, days)
      .then(setData)
      .finally(() => setLoading(false));
  }, [site, days]);

  const statCards = [
    { label: "Total Views", value: data?.total_views ?? "—", icon: Eye, color: "text-mint", bg: "bg-mint/10" },
    { label: "Top Device", value: data?.devices[0]?.device_type ?? "—", icon: Users, color: "text-navy dark:text-mint", bg: "bg-navy/10 dark:bg-mint/10" },
    { label: "Top Referrer", value: data?.referrers[0]?.referrer ?? "—", icon: TrendingUp, color: "text-coral", bg: "bg-coral/10" },
    { label: "Countries", value: "—", icon: Globe, color: "text-text-secondary", bg: "bg-muted" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track visitors to your site.</p>
        </div>
        {/* Date range selector */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
          {DATE_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setDays(r.value)}
              className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                days === r.value ? "bg-navy text-white dark:bg-mint dark:text-deep" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
      )}

      <ViewsChart data={data?.views_over_time || []} />

      {data && data.devices.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <h3 className="mb-4 font-heading text-sm font-semibold">Device Breakdown</h3>
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
