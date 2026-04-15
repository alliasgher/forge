"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiteStore } from "@/lib/stores/site-store";
import { getSection, updateSection } from "@/lib/api/sections";
import { HeroEditor } from "./editors/hero-editor";
import { AboutEditor } from "./editors/about-editor";
import { ServicesEditor } from "./editors/services-editor";
import { GalleryEditor } from "./editors/gallery-editor";
import { TestimonialsEditor } from "./editors/testimonials-editor";
import { ContactEditor } from "./editors/contact-editor";
import { toast } from "sonner";
import type { Section } from "@/lib/types";
import Link from "next/link";

const EDITORS: Record<string, React.ComponentType<{ content: Record<string, any>; onChange: (content: Record<string, any>) => void }>> = {
  hero: HeroEditor,
  about: AboutEditor,
  services: ServicesEditor,
  gallery: GalleryEditor,
  testimonials: TestimonialsEditor,
  contact: ContactEditor,
};

interface SectionEditorProps {
  sectionId: number;
}

export function SectionEditor({ sectionId }: SectionEditorProps) {
  const { site } = useSiteStore();
  const [section, setSection] = useState<Section | null>(null);
  const [content, setContent] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site) return;
    getSection(site.id, sectionId)
      .then((s) => {
        setSection(s);
        setContent(s.content);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Section not found");
        setLoading(false);
      });
  }, [site, sectionId]);

  async function handleSave() {
    if (!site || !section) return;
    setSaving(true);
    try {
      const updated = await updateSection(site.id, section.id, { content });
      setSection(updated);
      toast.success("Section saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  if (!section) {
    return <p className="text-muted-foreground">Section not found.</p>;
  }

  const Editor = EDITORS[section.type];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/pages" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h2 className="font-heading text-lg font-semibold">
            Edit: {section.title || section.type}
          </h2>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-navy hover:bg-navy-light text-white gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </Button>
      </div>

      {Editor ? (
        <Editor content={content} onChange={setContent} />
      ) : (
        <p className="text-muted-foreground">No editor available for this section type.</p>
      )}
    </div>
  );
}
