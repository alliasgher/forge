import { NextResponse } from "next/server";
import * as sectionsService from "@/lib/server/services/sections";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string }> };

// Static segment, so this wins over ../[sectionId] — same as find-my-way did.
export const PUT = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  const { order } = (await request.json().catch(() => ({}))) as {
    order?: Array<{ id: number; sort_order: number }>;
  };
  return NextResponse.json(await sectionsService.reorderSections(id, order || []));
});
