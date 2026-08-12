import type { Site, Section } from "@/lib/types";

export class SiteExpiredError extends Error {
  businessName: string;
  constructor(businessName: string) {
    super("expired");
    this.businessName = businessName;
  }
}

export async function getPublicSite(slug: string): Promise<{ site: Site; sections: Section[] }> {
  const res = await fetch(`/api/public/sites/${slug}`, { cache: "no-store" });
  if (res.status === 410) {
    const body = await res.json().catch(() => ({}));
    throw new SiteExpiredError(body.business_name || "This site");
  }
  if (!res.ok) {
    if (res.status === 404) throw new Error("Site not found");
    throw new Error("Failed to load site");
  }
  return res.json();
}

export async function getDemoSites(): Promise<Site[]> {
  const res = await fetch(`/api/public/demos`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load demos");
  return res.json();
}
