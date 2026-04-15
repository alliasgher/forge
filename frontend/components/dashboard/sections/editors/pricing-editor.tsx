"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SortableItemList } from "../sortable-item-list";

interface Props { content: Record<string, any>; onChange: (c: Record<string, any>) => void }

const PLAN_FIELDS = [
  { key: "name", label: "Plan Name", type: "text" as const, placeholder: "Basic, Pro, Enterprise..." },
  { key: "price", label: "Price", type: "text" as const, placeholder: "$49" },
  { key: "period", label: "Period", type: "text" as const, placeholder: "month" },
  { key: "description", label: "Description", type: "text" as const, placeholder: "Perfect for small businesses" },
  { key: "features", label: "Features (one per line)", type: "textarea" as const, placeholder: "Feature 1\nFeature 2\nFeature 3" },
  { key: "cta", label: "Button Text", type: "text" as const, placeholder: "Get Started" },
];

export function PricingEditor({ content, onChange }: Props) {
  // Normalize features from textarea string to array when saving
  function handleChange(items: any[]) {
    const normalized = items.map((item) => ({
      ...item,
      features: typeof item.features === "string"
        ? item.features.split("\n").map((f: string) => f.trim()).filter(Boolean)
        : item.features || [],
    }));
    onChange({ ...content, plans: normalized });
  }

  // Display items with features as string for editing
  const displayItems = (content.plans || []).map((plan: any) => ({
    ...plan,
    features: Array.isArray(plan.features) ? plan.features.join("\n") : plan.features || "",
  }));

  return (
    <Card className="border-border bg-card">
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label>Section Heading</Label>
            <Input value={content.heading || ""} onChange={(e) => onChange({ ...content, heading: e.target.value })} placeholder="Simple, Transparent Pricing" className="bg-background" />
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Subheading</Label>
            <Input value={content.subheading || ""} onChange={(e) => onChange({ ...content, subheading: e.target.value })} placeholder="No hidden fees. Cancel anytime." className="bg-background" />
          </div>
        </div>
        <div>
          <Label className="mb-3 block">Pricing Plans</Label>
          <SortableItemList
            items={displayItems}
            fields={PLAN_FIELDS}
            onChange={handleChange}
            itemLabel="Plan"
            renderPreview={(item) => (
              <div>
                <p className="text-sm font-medium">{item.name || "Untitled plan"}</p>
                {item.price && <p className="text-xs text-muted-foreground">{item.price}{item.period ? `/${item.period}` : ""}</p>}
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
