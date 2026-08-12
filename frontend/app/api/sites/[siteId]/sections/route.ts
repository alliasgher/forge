import { NextResponse } from "next/server";
import * as sectionsService from "@/lib/server/services/sections";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string }> };

export const GET = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  return NextResponse.json(await sectionsService.getSections(id));
});
