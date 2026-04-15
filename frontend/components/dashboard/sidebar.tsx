"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Palette,
  MessageSquare,
  BarChart3,
  Settings,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { useSiteStore } from "@/lib/stores/site-store";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/pages", label: "Pages & Sections", icon: FileText },
  { href: "/dashboard/media", label: "Media", icon: ImageIcon },
  { href: "/dashboard/appearance", label: "Appearance", icon: Palette },
  { href: "/dashboard/leads", label: "Leads", icon: MessageSquare },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const site = useSiteStore((s) => s.site);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo href="/dashboard" size="sm" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
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
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {site && (
        <div className="border-t border-border p-3">
          <a
            href={`/site/${site.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View live site
          </a>
        </div>
      )}
    </div>
  );
}
