"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Image, Info, Layers, Grid3x3, MessageSquareQuote, Mail,
  ChevronUp, ChevronDown, HelpCircle, CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiteStore } from "@/lib/stores/site-store";
import { getSections, toggleVisibility, reorderSections } from "@/lib/api/sections";
import { toast } from "sonner";
import type { Section } from "@/lib/types";

function getSectionPreview(section: Section): string {
  const c = section.content;
  switch (section.type) {
    case "hero": return c.heading || "No heading yet";
    case "about": return c.title || c.body?.slice(0, 50) || "No content yet";
    case "services": return `${c.items?.length || 0} item${c.items?.length !== 1 ? "s" : ""}`;
    case "gallery": return `${c.images?.length || 0} image${c.images?.length !== 1 ? "s" : ""}`;
    case "testimonials": return `${c.items?.length || 0} review${c.items?.length !== 1 ? "s" : ""}`;
    case "contact": return c.heading || "Contact form";
    case "faq": return `${c.items?.length || 0} question${c.items?.length !== 1 ? "s" : ""}`;
    case "pricing": return `${c.plans?.length || 0} plan${c.plans?.length !== 1 ? "s" : ""}`;
    default: return "";
  }
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  hero: Image,
  about: Info,
  services: Layers,
  gallery: Grid3x3,
  testimonials: MessageSquareQuote,
  contact: Mail,
  faq: HelpCircle,
  pricing: CreditCard,
};

export function SectionList() {
  const { site, sections, setSections } = useSiteStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site) return;
    getSections(site.id)
      .then((data) => { setSections(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [site, setSections]);

  async function handleToggle(section: Section) {
    if (!site) return;
    try {
      const updated = await toggleVisibility(site.id, section.id, !section.visible);
      setSections(sections.map((s) => (s.id === updated.id ? updated : s)));
    } catch {
      toast.error("Failed to update visibility");
    }
  }

  async function handleMove(sectionId: number, direction: "up" | "down") {
    if (!site) return;
    const idx = sections.findIndex((s) => s.id === sectionId);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sections.length) return;

    const newSections = [...sections];
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];

    const order = newSections.map((s, i) => ({ id: s.id, sort_order: i }));
    setSections(newSections.map((s, i) => ({ ...s, sort_order: i })));

    try {
      await reorderSections(site.id, order);
    } catch {
      toast.error("Failed to reorder");
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sections.map((section, idx) => {
        const Icon = SECTION_ICONS[section.type] || Layers;
        return (
          <Card key={section.id} className="border-border bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex flex-col gap-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  disabled={idx === 0}
                  onClick={() => handleMove(section.id, "up")}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  disabled={idx === sections.length - 1}
                  onClick={() => handleMove(section.id, "down")}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="rounded-lg bg-muted p-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/dashboard/pages/${section.id}`}
                  className="text-sm font-medium hover:text-mint transition-colors"
                >
                  {section.title || section.type}
                </Link>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {section.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">
                    {getSectionPreview(section)}
                  </span>
                </div>
              </div>

              <Switch
                checked={section.visible}
                onCheckedChange={() => handleToggle(section)}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
