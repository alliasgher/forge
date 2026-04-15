"use client";

import { LeadTable } from "@/components/dashboard/leads/lead-table";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">Contact form submissions from your site visitors.</p>
      </div>
      <LeadTable />
    </div>
  );
}
