"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2, Phone, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSiteStore } from "@/lib/stores/site-store";
import { getLeads, markRead, deleteLead } from "@/lib/api/leads";
import { toast } from "sonner";
import type { Lead } from "@/lib/types";

export function LeadTable() {
  const site = useSiteStore((s) => s.site);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);

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
      if (selected?.id === updated.id) setSelected(updated);
    } catch { toast.error("Failed to update"); }
  }

  async function handleDelete(id: number) {
    if (!site) return;
    try {
      await deleteLead(site.id, id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setTotal((t) => t - 1);
      if (selected?.id === id) setSelected(null);
      toast.success("Lead deleted");
    } catch { toast.error("Failed to delete"); }
  }

  function handleRowClick(lead: Lead) {
    setSelected(lead);
    if (!lead.is_read && site) {
      markRead(site.id, lead.id, true).then((updated) => {
        setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      }).catch(() => {});
    }
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
    <>
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
              <TableRow
                key={lead.id}
                className={`border-border cursor-pointer hover:bg-muted/50 transition-colors ${!lead.is_read ? "bg-mint/5" : ""}`}
                onClick={() => handleRowClick(lead)}
              >
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
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
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

      {/* Lead detail modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between pr-6">
              <span>Lead from {selected?.name}</span>
              <Badge variant={selected?.is_read ? "secondary" : "default"} className="text-[10px]">
                {selected?.is_read ? "Read" : "New"}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Name</p>
                  <p className="text-sm font-medium">{selected.name}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Date</p>
                  <p className="text-sm">{new Date(selected.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-sm text-mint hover:text-mint-dark transition-colors break-all">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-sm text-mint hover:text-mint-dark transition-colors flex items-center gap-1">
                      <Phone className="h-3 w-3" />{selected.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Message</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a href={`mailto:${selected.email}?subject=Re: Your enquiry`}
                  className="flex-1 rounded-lg bg-navy py-2.5 text-center text-sm font-semibold text-white hover:bg-navy-light transition-colors">
                  Reply via Email
                </a>
                <Button variant="outline" onClick={() => handleToggleRead(selected)} className="gap-2">
                  {selected.is_read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  {selected.is_read ? "Mark unread" : "Mark read"}
                </Button>
                <Button variant="outline" className="text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => handleDelete(selected.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
