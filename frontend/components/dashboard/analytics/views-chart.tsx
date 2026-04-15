"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface Props { data: { date: string; views: number }[] }

export function ViewsChart({ data }: Props) {
  const filled = fillDates(data);

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <h3 className="mb-4 font-heading text-sm font-semibold">Page Views (30 days)</h3>
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
              <XAxis dataKey="date" tickFormatter={(d) => { const dt = new Date(d); return `${dt.getMonth()+1}/${dt.getDate()}`; }} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
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

function fillDates(data: { date: string; views: number }[]) {
  if (data.length === 0) return [];
  const map = new Map(data.map((d) => [d.date.split("T")[0], d.views]));
  const end = new Date(); const start = new Date(); start.setDate(start.getDate() - 29);
  const result: { date: string; views: number }[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().split("T")[0];
    result.push({ date: key, views: map.get(key) || 0 });
  }
  return result;
}
