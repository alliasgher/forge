"use client";

import { use } from "react";
import { SectionEditor } from "@/components/dashboard/sections/section-editor";

export default function SectionEditorPage({ params }: { params: Promise<{ sectionId: string }> }) {
  const { sectionId } = use(params);
  return <SectionEditor sectionId={parseInt(sectionId)} />;
}
