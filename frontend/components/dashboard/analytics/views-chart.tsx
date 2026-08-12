"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface Props { data: { date: string; views: number }[]; days?: number }

export function ViewsChart({ data, days = 30 }: Props) {
  const filled = fillDates(data, days);

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <h3 className="mb-4 font-heading text-sm font-semibold">Page Views ({days} days)</h3>
        {filled.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">No views yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={filled}>
              <defs>
                <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C9A7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00C9A7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tickFormatter={formatTick} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#00C9A7" strokeWidth={2} fill="url(#viewGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

// The API buckets views by UTC day ("YYYY-MM-DD"), so the axis is built in UTC
// too — mixing the two shifts every point by a day for non-UTC viewers.
function utcKey(d: Date) {
  return d.toISOString().split("T")[0];
}

function formatTick(key: string) {
  const dt = new Date(`${key}T00:00:00Z`);
  return `${dt.getUTCMonth() + 1}/${dt.getUTCDate()}`;
}

function fillDates(data: { date: string; views: number }[], days: number) {
  if (data.length === 0) return [];
  const map = new Map(data.map((d) => [d.date.split("T")[0], d.views]));
  const cursor = new Date();
  cursor.setUTCDate(cursor.getUTCDate() - (days - 1));
  const result: { date: string; views: number }[] = [];
  for (let i = 0; i < days; i++) {
    const key = utcKey(cursor);
    result.push({ date: key, views: map.get(key) || 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return result;
}
