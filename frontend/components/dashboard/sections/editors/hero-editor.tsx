"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function HeroEditor({ content, onChange }: Props) {
  function update(key: string, value: string) {
    onChange({ ...content, [key]: value });
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label>Heading</Label>
          <Input value={content.heading || ""} onChange={(e) => update("heading", e.target.value)} placeholder="Welcome to Our Business" className="bg-background" />
        </div>
        <div className="space-y-2">
          <Label>Subheading</Label>
          <Textarea value={content.subheading || ""} onChange={(e) => update("subheading", e.target.value)} placeholder="We provide exceptional services..." className="bg-background" rows={2} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>CTA Button Text</Label>
            <Input value={content.ctaText || ""} onChange={(e) => update("ctaText", e.target.value)} placeholder="Get in Touch" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label>CTA Link</Label>
            <Input value={content.ctaLink || ""} onChange={(e) => update("ctaLink", e.target.value)} placeholder="#contact" className="bg-background" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Background Image URL</Label>
          <Input value={content.backgroundImage || ""} onChange={(e) => update("backgroundImage", e.target.value)} placeholder="Select from Media Manager or paste URL" className="bg-background" />
        </div>
      </CardContent>
    </Card>
  );
}
