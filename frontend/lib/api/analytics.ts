import { api } from "@/lib/api-client";
import type { AnalyticsSummary } from "@/lib/types";

export function getAnalytics(siteId: number, days = 30): Promise<AnalyticsSummary> {
  return api.fetch(`/api/sites/${siteId}/analytics?days=${days}`);
}
