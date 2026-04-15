import { api } from "@/lib/api-client";
import type { Section } from "@/lib/types";

export function getSections(siteId: number): Promise<Section[]> {
  return api.fetch(`/api/sites/${siteId}/sections`);
}

export function getSection(siteId: number, sectionId: number): Promise<Section> {
  return api.fetch(`/api/sites/${siteId}/sections/${sectionId}`);
}

export function updateSection(
  siteId: number,
  sectionId: number,
  data: { title?: string; content?: Record<string, any>; visible?: boolean }
): Promise<Section> {
  return api.fetch(`/api/sites/${siteId}/sections/${sectionId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function toggleVisibility(siteId: number, sectionId: number, visible: boolean): Promise<Section> {
  return api.fetch(`/api/sites/${siteId}/sections/${sectionId}/visibility`, {
    method: "PUT",
    body: JSON.stringify({ visible }),
  });
}

export function reorderSections(siteId: number, order: Array<{ id: number; sort_order: number }>): Promise<Section[]> {
  return api.fetch(`/api/sites/${siteId}/sections/reorder`, {
    method: "PUT",
    body: JSON.stringify({ order }),
  });
}
