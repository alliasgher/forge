"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function AboutEditor({ content, onChange }: Props) {
  function update(key: string, value: string) {
    onChange({ ...content, [key]: value });
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={content.title || ""} onChange={(e) => update("title", e.target.value)} placeholder="About Us" className="bg-background" />
        </div>
        <div className="space-y-2">
          <Label>Body</Label>
          <Textarea value={content.body || ""} onChange={(e) => update("body", e.target.value)} placeholder="Tell your story..." className="bg-background" rows={5} />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input value={content.image || ""} onChange={(e) => update("image", e.target.value)} placeholder="Select from Media Manager or paste URL" className="bg-background" />
        </div>
        <div className="space-y-2">
          <Label>Image Position</Label>
          <div className="flex gap-2">
            {["left", "right"].map((pos) => (
              <button
                key={pos}
                onClick={() => update("imagePosition", pos)}
                className={`rounded-lg border px-4 py-2 text-sm capitalize transition-colors ${
                  content.imagePosition === pos
                    ? "border-mint bg-mint/5 text-mint"
                    : "border-border hover:border-mint/30"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
