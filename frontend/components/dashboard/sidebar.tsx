"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, FileText, ImageIcon, Palette,
  MessageSquare, BarChart3, Settings, ExternalLink, Globe, Lock,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { useSiteStore } from "@/lib/stores/site-store";
import { api } from "@/lib/api-client";

export function Sidebar() {
  const pathname = usePathname();
  const site = useSiteStore((s) => s.site);
  const [unreadLeads, setUnreadLeads] = useState(0);

  useEffect(() => {
    if (!site) return;
    api.fetch<any>(`/api/sites/${site.id}/leads?unread=true&limit=1`)
      .then((d) => setUnreadLeads(d.total || 0))
      .catch(() => {});
  }, [site]);

  const NAV_ITEMS = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/pages", label: "Pages & Sections", icon: FileText },
    { href: "/dashboard/media", label: "Media", icon: ImageIcon },
    { href: "/dashboard/appearance", label: "Appearance", icon: Palette },
    { href: "/dashboard/leads", label: "Leads", icon: MessageSquare, badge: unreadLeads },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo href="/dashboard" size="sm" />
      </div>

      {/* Site status pill */}
      {site && (
        <div className="px-4 py-3 border-b border-border">
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
            site.is_published ? "bg-mint/10 text-mint" : "bg-muted text-muted-foreground"
          }`}>
            {site.is_published ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            <span className="truncate">{site.business_name}</span>
            <span className="ml-auto shrink-0">{site.is_published ? "Live" : "Draft"}</span>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-0.5 px-3 py-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-navy/10 text-navy font-medium dark:bg-mint/10 dark:text-mint"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {site && (
        <div className="border-t border-border p-3 space-y-1">
          <a href={`/site/${site.slug}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink className="h-3.5 w-3.5" />
            View live site
          </a>
        </div>
      )}
    </div>
  );
}
