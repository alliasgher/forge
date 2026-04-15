"use client";

import { SectionList } from "@/components/dashboard/sections/section-list";

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Pages & Sections</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Reorder, show/hide, and edit your site sections.
        </p>
      </div>
      <SectionList />
    </div>
  );
}
