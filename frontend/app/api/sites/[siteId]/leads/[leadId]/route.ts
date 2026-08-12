import { NextResponse } from "next/server";
import * as leadsService from "@/lib/server/services/leads";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string; leadId: string }> };

export const GET = handler(async (request: Request, ctx: Ctx) => {
  const { siteId, leadId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  const lead = await leadsService.getLead(parseInt(leadId, 10), id);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  return NextResponse.json(lead);
});

export const DELETE = handler(async (request: Request, ctx: Ctx) => {
  const { siteId, leadId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  await leadsService.deleteLead(parseInt(leadId, 10), id);
  return NextResponse.json({ success: true });
});
