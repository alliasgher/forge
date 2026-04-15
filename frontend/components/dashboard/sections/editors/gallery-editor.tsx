"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SortableItemList } from "../sortable-item-list";

interface Props {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

const GALLERY_FIELDS = [
  { key: "url", label: "Image URL", type: "text" as const, placeholder: "Paste image URL or select from media" },
  { key: "caption", label: "Caption", type: "text" as const, placeholder: "Optional caption" },
  { key: "alt", label: "Alt Text", type: "text" as const, placeholder: "Describe the image" },
];

export function GalleryEditor({ content, onChange }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <h3 className="mb-4 font-heading text-sm font-semibold">Gallery Images</h3>
        <SortableItemList
          items={content.images || []}
          fields={GALLERY_FIELDS}
          onChange={(images) => onChange({ ...content, images })}
          itemLabel="Image"
          renderPreview={(item) => (
            <div className="flex items-center gap-3">
              {item.url && (
                <img src={item.url} alt={item.alt || ""} className="h-10 w-10 rounded object-cover" />
              )}
              <p className="text-sm truncate">{item.caption || item.url || "No image"}</p>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
