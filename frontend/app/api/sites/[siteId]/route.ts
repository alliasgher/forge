import { NextResponse } from "next/server";
import * as sitesService from "@/lib/server/services/sites";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string }> };

export const PUT = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  return NextResponse.json(await sitesService.updateSite(id, body));
});

export const DELETE = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  await sitesService.deleteSite(id);
  return NextResponse.json({ success: true });
});
