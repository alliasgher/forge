import "server-only";
import { pool } from "../db";
import type { DbLead as Lead } from "../types";

export async function createLead(siteId: number, name: string, email: string, phone: string | null, message: string): Promise<Lead> {
  const result = await pool.query<Lead>(
    `INSERT INTO leads (site_id, name, email, phone, message) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [siteId, name, email, phone, message]
  );
  return result.rows[0];
}

export async function getLeads(siteId: number, page = 1, limit = 20, unreadOnly = false): Promise<{ leads: Lead[]; total: number }> {
  const offset = (page - 1) * limit;
  const unreadFilter = unreadOnly ? " AND is_read = false" : "";
  const [leadsResult, countResult] = await Promise.all([
    pool.query<Lead>(`SELECT * FROM leads WHERE site_id = $1${unreadFilter} ORDER BY created_at DESC LIMIT $2 OFFSET $3`, [siteId, limit, offset]),
    pool.query<{ count: string }>(`SELECT COUNT(*) as count FROM leads WHERE site_id = $1${unreadFilter}`, [siteId]),
  ]);
  return { leads: leadsResult.rows, total: parseInt(countResult.rows[0].count) };
}

// All single-lead operations are scoped by site_id so a site owner can only
// ever reach leads that belong to their own site.
export async function getLead(leadId: number, siteId: number): Promise<Lead | null> {
  const result = await pool.query<Lead>("SELECT * FROM leads WHERE id = $1 AND site_id = $2", [leadId, siteId]);
  return result.rows[0] || null;
}

export async function markRead(leadId: number, siteId: number, isRead: boolean): Promise<Lead> {
  const result = await pool.query<Lead>(
    "UPDATE leads SET is_read = $1 WHERE id = $2 AND site_id = $3 RETURNING *",
    [isRead, leadId, siteId]
  );
  if (result.rows.length === 0) throw new Error("Lead not found");
  return result.rows[0];
}

export async function deleteLead(leadId: number, siteId: number): Promise<void> {
  await pool.query("DELETE FROM leads WHERE id = $1 AND site_id = $2", [leadId, siteId]);
}
