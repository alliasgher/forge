import { NextResponse } from "next/server";
import * as leadsService from "@/lib/server/services/leads";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string }> };

export const GET = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);

  const params = new URL(request.url).searchParams;
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(params.get("limit") || "20", 10) || 20));
  const unreadOnly = params.get("unread") === "true";

  return NextResponse.json(await leadsService.getLeads(id, page, limit, unreadOnly));
});
