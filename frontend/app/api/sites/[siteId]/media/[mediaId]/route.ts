import { NextResponse } from "next/server";
import * as mediaService from "@/lib/server/services/media";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string; mediaId: string }> };

export const DELETE = handler(async (request: Request, ctx: Ctx) => {
  const { siteId, mediaId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  await mediaService.deleteMedia(parseInt(mediaId, 10), id);
  return NextResponse.json({ success: true });
});
