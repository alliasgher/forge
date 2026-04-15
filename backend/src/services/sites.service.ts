import { pool } from "../db/client.js";
import { ensureUniqueSlug } from "../lib/slug.js";
import type { Site } from "../types/index.js";

interface CreateSiteInput {
  ownerId: number;
  slug?: string;
  businessName: string;
  businessType: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  template?: string;
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
}

export async function createSite(input: CreateSiteInput & { ownerEmail?: string }): Promise<Site> {
  const slug = await ensureUniqueSlug(input.slug || input.businessName);

  // All user-created sites expire in 7 days — portfolio demo model
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const result = await pool.query<Site>(
    `INSERT INTO sites (owner_id, slug, business_name, business_type, tagline, phone, email, address, template, colors, fonts, is_published, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING *`,
    [
      input.ownerId,
      slug,
      input.businessName.trim(),
      input.businessType,
      input.tagline?.trim() || null,
      input.phone?.trim() || null,
      input.email?.trim() || null,
      input.address?.trim() || null,
      input.template || "modern",
      JSON.stringify(input.colors || { primary: "#1E3A5F", secondary: "#00C9A7", accent: "#FF6B4A", background: "#FFFFFF", text: "#0D1B2A" }),
      JSON.stringify(input.fonts || { heading: "Sora", body: "Figtree" }),
      true, // auto-publish guest sites
      expiresAt,
    ]
  );

  return result.rows[0];
}

export async function getSiteByOwner(ownerId: number): Promise<Site | null> {
  const result = await pool.query<Site>(
    "SELECT * FROM sites WHERE owner_id = $1 ORDER BY created_at DESC LIMIT 1",
    [ownerId]
  );
  return result.rows[0] || null;
}

export async function getSiteById(siteId: number): Promise<Site | null> {
  const result = await pool.query<Site>("SELECT * FROM sites WHERE id = $1", [siteId]);
  return result.rows[0] || null;
}

export async function getSiteBySlug(slug: string): Promise<Site | null> {
  const result = await pool.query<Site>("SELECT * FROM sites WHERE slug = $1", [slug]);
  return result.rows[0] || null;
}

export async function updateSite(siteId: number, updates: Partial<Site>): Promise<Site> {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const allowed = ["business_name", "business_type", "tagline", "phone", "email", "address", "hours", "template", "colors", "fonts", "logo_url", "is_published", "slug"];

  for (const [key, value] of Object.entries(updates)) {
    const dbKey = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    if (allowed.includes(dbKey)) {
      fields.push(`${dbKey} = $${idx}`);
      values.push(typeof value === "object" && value !== null ? JSON.stringify(value) : value);
      idx++;
    }
  }

  if (fields.length === 0) {
    const site = await getSiteById(siteId);
    if (!site) throw new Error("Site not found");
    return site;
  }

  fields.push(`updated_at = NOW()`);
  values.push(siteId);

  const result = await pool.query<Site>(
    `UPDATE sites SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
    values
  );

  if (result.rows.length === 0) throw new Error("Site not found");
  return result.rows[0];
}

export async function deleteSite(siteId: number): Promise<void> {
  await pool.query("DELETE FROM sites WHERE id = $1 AND is_demo = false", [siteId]);
}
