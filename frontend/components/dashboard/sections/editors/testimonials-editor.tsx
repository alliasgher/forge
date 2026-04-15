"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SortableItemList } from "../sortable-item-list";

interface Props {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

const TESTIMONIAL_FIELDS = [
  { key: "name", label: "Name", type: "text" as const, placeholder: "Customer name" },
  { key: "text", label: "Testimonial", type: "textarea" as const, placeholder: "What they said..." },
  { key: "rating", label: "Rating (1-5)", type: "number" as const, placeholder: "5" },
  { key: "role", label: "Role / Title", type: "text" as const, placeholder: "Customer since 2024" },
];

export function TestimonialsEditor({ content, onChange }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <h3 className="mb-4 font-heading text-sm font-semibold">Testimonials</h3>
        <SortableItemList
          items={content.items || []}
          fields={TESTIMONIAL_FIELDS}
          onChange={(items) => onChange({ ...content, items })}
          itemLabel="Testimonial"
          renderPreview={(item) => (
            <div>
              <p className="text-sm font-medium">{item.name || "Anonymous"}</p>
              <p className="text-xs text-muted-foreground truncate">{item.text || "No text"}</p>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
