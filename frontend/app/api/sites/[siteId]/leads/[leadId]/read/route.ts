import { NextResponse } from "next/server";
import * as leadsService from "@/lib/server/services/leads";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string; leadId: string }> };

export const PUT = handler(async (request: Request, ctx: Ctx) => {
  const { siteId, leadId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  const { isRead } = (await request.json().catch(() => ({}))) as { isRead?: boolean };

  try {
    return NextResponse.json(await leadsService.markRead(parseInt(leadId, 10), id, !!isRead));
  } catch {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
});
