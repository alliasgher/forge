import { pool } from "../db/client.js";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function ensureUniqueSlug(base: string): Promise<string> {
  let slug = slugify(base);
  if (!slug) slug = "my-site";

  const existing = await pool.query("SELECT id FROM sites WHERE slug = $1", [slug]);
  if (existing.rows.length === 0) return slug;

  // Append random suffix
  for (let i = 0; i < 10; i++) {
    const candidate = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    const check = await pool.query("SELECT id FROM sites WHERE slug = $1", [candidate]);
    if (check.rows.length === 0) return candidate;
  }

  return `${slug}-${Date.now()}`;
}
