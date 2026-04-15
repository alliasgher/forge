"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SortableItemList } from "../sortable-item-list";

interface Props { content: Record<string, any>; onChange: (c: Record<string, any>) => void }

const FAQ_FIELDS = [
  { key: "question", label: "Question", type: "text" as const, placeholder: "What is your...?" },
  { key: "answer", label: "Answer", type: "textarea" as const, placeholder: "Answer goes here..." },
];

export function FaqEditor({ content, onChange }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label>Section Heading</Label>
          <Input value={content.heading || ""} onChange={(e) => onChange({ ...content, heading: e.target.value })} placeholder="Frequently Asked Questions" className="bg-background" />
        </div>
        <div>
          <Label className="mb-3 block">Questions & Answers</Label>
          <SortableItemList
            items={content.items || []}
            fields={FAQ_FIELDS}
            onChange={(items) => onChange({ ...content, items })}
            itemLabel="Question"
            renderPreview={(item) => (
              <p className="text-sm font-medium truncate">{item.question || "Untitled question"}</p>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
