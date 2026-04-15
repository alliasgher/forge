"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MediaUploadZone } from "@/components/dashboard/media/media-upload-zone";
import { MediaGrid } from "@/components/dashboard/media/media-grid";
import { listMedia, deleteMedia } from "@/lib/api/media";
import { useSiteStore } from "@/lib/stores/site-store";
import { toast } from "sonner";
import type { Media } from "@/lib/types";

export default function MediaPage() {
  const site = useSiteStore((s) => s.site);
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site) return;
    listMedia(site.id)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [site]);

  function handleUploaded(media: Media) {
    setItems((prev) => [media, ...prev]);
  }

  async function handleDelete(id: number) {
    if (!site) return;
    try {
      await deleteMedia(site.id, id);
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Media Manager</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload and manage images for your site.
        </p>
      </div>

      <MediaUploadZone onUploaded={handleUploaded} />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : (
        <MediaGrid items={items} onDelete={handleDelete} />
      )}
    </div>
  );
}
