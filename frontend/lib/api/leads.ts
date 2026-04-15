import { api } from "@/lib/api-client";
import type { Lead } from "@/lib/types";

export function getLeads(siteId: number, page = 1): Promise<{ leads: Lead[]; total: number }> {
  return api.fetch(`/api/sites/${siteId}/leads?page=${page}`);
}

export function markRead(siteId: number, leadId: number, isRead: boolean): Promise<Lead> {
  return api.fetch(`/api/sites/${siteId}/leads/${leadId}/read`, {
    method: "PUT",
    body: JSON.stringify({ isRead }),
  });
}

export function deleteLead(siteId: number, leadId: number): Promise<void> {
  return api.fetch(`/api/sites/${siteId}/leads/${leadId}`, { method: "DELETE" });
}
