import "server-only";
import * as sitesService from "./sites";
import * as sectionsService from "./sections";
import type { DbSite, DbSection } from "../types";

export type PublicSiteResult =
  | { kind: "ok"; site: DbSite; sections: DbSection[] }
  | { kind: "not_found" }
  | { kind: "expired"; businessName: string };

/**
 * Single source of truth for "can the public see this site, and what does it
 * contain" — used by both the API route and the /site/[slug] server component,
 * so the page renders straight from the database instead of HTTP-calling itself.
 */
export async function getPublicSite(slug: string): Promise<PublicSiteResult> {
  const site = await sitesService.getSiteBySlug(slug);
  if (!site) return { kind: "not_found" };

  // Unpublished (draft) sites are not visible to the public
  if (!site.is_published) return { kind: "not_found" };

  if (site.expires_at && new Date(site.expires_at) < new Date()) {
    return { kind: "expired", businessName: site.business_name };
  }

  const sections = await sectionsService.getSections(site.id);
  return {
    kind: "ok",
    site,
    sections: sections.filter((s) => s.visible).sort((a, b) => a.sort_order - b.sort_order),
  };
}
