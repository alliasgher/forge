"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function ContactEditor({ content, onChange }: Props) {
  function update(key: string, value: any) {
    onChange({ ...content, [key]: value });
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label>Heading</Label>
          <Input value={content.heading || ""} onChange={(e) => update("heading", e.target.value)} placeholder="Get in Touch" className="bg-background" />
        </div>
        <div className="space-y-2">
          <Label>Subheading</Label>
          <Input value={content.subheading || ""} onChange={(e) => update("subheading", e.target.value)} placeholder="We'd love to hear from you." className="bg-background" />
        </div>
        <div className="space-y-2">
          <Label>Recipient Email</Label>
          <Input value={content.recipientEmail || ""} onChange={(e) => update("recipientEmail", e.target.value)} placeholder="hello@yourbusiness.com" className="bg-background" />
          <p className="text-xs text-muted-foreground">Contact form submissions will be saved in your Leads tab.</p>
        </div>
        <div className="space-y-3">
          <Label>Display Options</Label>
          <div className="space-y-2">
            {[
              { key: "showPhone", label: "Show phone number" },
              { key: "showAddress", label: "Show address" },
              { key: "showMap", label: "Show map" },
            ].map((opt) => (
              <div key={opt.key} className="flex items-center justify-between">
                <span className="text-sm">{opt.label}</span>
                <Switch
                  checked={content[opt.key] ?? false}
                  onCheckedChange={(checked) => update(opt.key, checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
