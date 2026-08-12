import type { Media } from "@/lib/types";

export async function uploadMedia(siteId: number, file: File): Promise<Media> {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("forge_access_token");
  const res = await fetch(`/api/sites/${siteId}/media`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Upload failed");
  }

  return res.json();
}

export async function listMedia(siteId: number): Promise<Media[]> {
  const { api } = await import("@/lib/api-client");
  return api.fetch(`/api/sites/${siteId}/media`);
}

export async function deleteMedia(siteId: number, mediaId: number): Promise<void> {
  const { api } = await import("@/lib/api-client");
  await api.fetch(`/api/sites/${siteId}/media/${mediaId}`, { method: "DELETE" });
}
