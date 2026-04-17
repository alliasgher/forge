"use client";

import { usePathname } from "next/navigation";
import { Menu, ExternalLink, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserMenu } from "@/components/dashboard/user-menu";
import { useSiteStore } from "@/lib/stores/site-store";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/new": "Create Your Site",
  "/dashboard/pages": "Pages & Sections",
  "/dashboard/media": "Media Manager",
  "/dashboard/appearance": "Appearance",
  "/dashboard/leads": "Leads",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const site = useSiteStore((s) => s.site);

  const title = PAGE_TITLES[pathname] || "Dashboard";

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6 pt-safe pl-safe pr-safe">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-heading text-base font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {site && (
          <>
            {/* Status badge */}
            <div className={`hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              site.is_published ? "bg-mint/10 text-mint" : "bg-muted text-muted-foreground"
            }`}>
              {site.is_published ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {site.is_published ? "Live" : "Draft"}
            </div>
            {/* Preview button */}
            <a
              href={`/site/${site.slug}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-mint/30 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview
            </a>
          </>
        )}
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
