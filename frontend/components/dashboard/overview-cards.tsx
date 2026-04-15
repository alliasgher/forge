"use client";

import { FileText, MessageSquare, Eye, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Site, Section } from "@/lib/types";

interface OverviewCardsProps {
  site: Site;
  sections: Section[];
  leadCount?: number;
  viewCount?: number;
}

export function OverviewCards({ site, sections, leadCount = 0, viewCount = 0 }: OverviewCardsProps) {
  const stats = [
    {
      label: "Sections",
      value: sections.filter((s) => s.visible).length.toString(),
      sub: `${sections.length} total`,
      icon: FileText,
      color: "text-navy dark:text-mint",
      bg: "bg-navy/10 dark:bg-mint/10",
    },
    {
      label: "Leads",
      value: leadCount.toString(),
      icon: MessageSquare,
      color: "text-mint",
      bg: "bg-mint/10",
    },
    {
      label: "Page Views",
      value: viewCount.toString(),
      icon: Eye,
      color: "text-navy-light",
      bg: "bg-navy/10",
    },
    {
      label: "Status",
      value: site.is_published ? "Live" : "Draft",
      sub: site.slug,
      icon: Globe,
      color: site.is_published ? "text-mint" : "text-muted-foreground",
      bg: site.is_published ? "bg-mint/10" : "bg-muted",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="flex items-start gap-3 pt-5">
            <div className={`rounded-lg p-2 ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-heading font-bold">{stat.value}</p>
              {stat.sub && <p className="text-xs text-muted-foreground">{stat.sub}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
