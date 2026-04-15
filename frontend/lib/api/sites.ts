import { api } from "@/lib/api-client";
import type { Site, SiteColors, SiteFonts } from "@/lib/types";

export function createSite(data: {
  businessName: string;
  businessType: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  template?: string;
  colors?: SiteColors;
  fonts?: SiteFonts;
}): Promise<Site> {
  return api.fetch("/api/sites", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getMySite(): Promise<Site> {
  return api.fetch("/api/sites/mine");
}

export function updateSite(siteId: number, data: Partial<Record<string, any>>): Promise<Site> {
  return api.fetch(`/api/sites/${siteId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteSite(siteId: number): Promise<{ success: boolean }> {
  return api.fetch(`/api/sites/${siteId}`, { method: "DELETE" });
}
