import { NextResponse } from "next/server";
import * as analyticsService from "@/lib/server/services/analytics";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string }> };

export const GET = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  const days = parseInt(new URL(request.url).searchParams.get("days") || "30", 10);
  return NextResponse.json(await analyticsService.getAnalytics(id, Number.isNaN(days) ? 30 : days));
});
