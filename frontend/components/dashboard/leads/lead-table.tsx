"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiteStore } from "@/lib/stores/site-store";
import { getLeads, markRead, deleteLead } from "@/lib/api/leads";
import { toast } from "sonner";
import type { Lead } from "@/lib/types";

export function LeadTable() {
  const site = useSiteStore((s) => s.site);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site) return;
    getLeads(site.id)
      .then((data) => { setLeads(data.leads); setTotal(data.total); })
      .finally(() => setLoading(false));
  }, [site]);

  async function handleToggleRead(lead: Lead) {
    if (!site) return;
    try {
      const updated = await markRead(site.id, lead.id, !lead.is_read);
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    } catch { toast.error("Failed to update"); }
  }

  async function handleDelete(id: number) {
    if (!site) return;
    try {
      await deleteLead(site.id, id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setTotal((t) => t - 1);
      toast.success("Lead deleted");
    } catch { toast.error("Failed to delete"); }
  }

  if (loading) {
    return <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>;
  }

  if (leads.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Mail className="mx-auto mb-3 h-8 w-8 opacity-40" />
        <p className="text-sm">No leads yet.</p>
        <p className="mt-1 text-xs">When someone fills out your contact form, they&apos;ll appear here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="text-xs">Name</TableHead>
            <TableHead className="text-xs">Email</TableHead>
            <TableHead className="text-xs hidden md:table-cell">Message</TableHead>
            <TableHead className="text-xs">Date</TableHead>
            <TableHead className="text-xs w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className={`border-border ${!lead.is_read ? "bg-mint/5" : ""}`}>
              <TableCell>
                <Badge variant={lead.is_read ? "secondary" : "default"} className="text-[10px]">
                  {lead.is_read ? "Read" : "New"}
                </Badge>
              </TableCell>
              <TableCell className="text-sm font-medium">{lead.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{lead.email}</TableCell>
              <TableCell className="text-sm text-muted-foreground hidden md:table-cell max-w-[200px] truncate">{lead.message}</TableCell>
              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(lead.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleToggleRead(lead)}>
                    {lead.is_read ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={() => handleDelete(lead.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {total > leads.length && (
        <p className="border-t border-border px-4 py-2 text-center text-xs text-muted-foreground">
          Showing {leads.length} of {total} leads
        </p>
      )}
    </div>
  );
}
