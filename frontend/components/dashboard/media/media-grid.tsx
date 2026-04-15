"use client";

import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Media } from "@/lib/types";

interface MediaGridProps {
  items: Media[];
  onDelete: (id: number) => void;
}

export function MediaGrid({ items, onDelete }: MediaGridProps) {
  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-muted-foreground">No images uploaded yet.</p>
        <p className="text-xs text-muted-foreground mt-1">Upload images above to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-lg border border-border bg-card"
        >
          <div className="aspect-square">
            <img
              src={item.url}
              alt={item.filename}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex w-full items-center justify-between p-2">
              <p className="text-xs text-white truncate flex-1 mr-2">{item.filename}</p>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-white hover:text-mint hover:bg-white/10"
                  onClick={() => copyUrl(item.url)}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-white hover:text-destructive hover:bg-white/10"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
