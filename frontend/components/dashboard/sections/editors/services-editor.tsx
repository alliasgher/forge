"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SortableItemList } from "../sortable-item-list";

interface Props {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

const SERVICE_FIELDS = [
  { key: "name", label: "Name", type: "text" as const, placeholder: "Service name" },
  { key: "description", label: "Description", type: "textarea" as const, placeholder: "What this service includes..." },
  { key: "price", label: "Price", type: "text" as const, placeholder: "$99 or 'From $50/hr'" },
];

export function ServicesEditor({ content, onChange }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <h3 className="mb-4 font-heading text-sm font-semibold">Services / Products</h3>
        <SortableItemList
          items={content.items || []}
          fields={SERVICE_FIELDS}
          onChange={(items) => onChange({ ...content, items })}
          itemLabel="Service"
          renderPreview={(item) => (
            <div>
              <p className="text-sm font-medium">{item.name || "Untitled service"}</p>
              {item.price && <p className="text-xs text-muted-foreground">{item.price}</p>}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
