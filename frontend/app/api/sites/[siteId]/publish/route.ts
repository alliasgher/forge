import { NextResponse } from "next/server";
import * as sitesService from "@/lib/server/services/sites";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string }> };

export const PUT = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  const { isPublished } = (await request.json().catch(() => ({}))) as { isPublished?: boolean };
  return NextResponse.json(await sitesService.updateSite(id, { is_published: isPublished }));
});
