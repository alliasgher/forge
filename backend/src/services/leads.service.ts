import { pool } from "../db/client.js";
import type { Lead } from "../types/index.js";

export async function createLead(siteId: number, name: string, email: string, phone: string | null, message: string): Promise<Lead> {
  const result = await pool.query<Lead>(
    `INSERT INTO leads (site_id, name, email, phone, message) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [siteId, name, email, phone, message]
  );
  return result.rows[0];
}

export async function getLeads(siteId: number, page = 1, limit = 20): Promise<{ leads: Lead[]; total: number }> {
  const offset = (page - 1) * limit;
  const [leadsResult, countResult] = await Promise.all([
    pool.query<Lead>("SELECT * FROM leads WHERE site_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3", [siteId, limit, offset]),
    pool.query<{ count: string }>("SELECT COUNT(*) as count FROM leads WHERE site_id = $1", [siteId]),
  ]);
  return { leads: leadsResult.rows, total: parseInt(countResult.rows[0].count) };
}

export async function getLead(leadId: number): Promise<Lead | null> {
  const result = await pool.query<Lead>("SELECT * FROM leads WHERE id = $1", [leadId]);
  return result.rows[0] || null;
}

export async function markRead(leadId: number, isRead: boolean): Promise<Lead> {
  const result = await pool.query<Lead>("UPDATE leads SET is_read = $1 WHERE id = $2 RETURNING *", [isRead, leadId]);
  if (result.rows.length === 0) throw new Error("Lead not found");
  return result.rows[0];
}

export async function deleteLead(leadId: number): Promise<void> {
  await pool.query("DELETE FROM leads WHERE id = $1", [leadId]);
}
