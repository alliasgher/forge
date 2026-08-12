import { NextResponse } from "next/server";
import * as sectionsService from "@/lib/server/services/sections";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ siteId: string; sectionId: string }> };

export const PUT = handler(async (request: Request, ctx: Ctx) => {
  const { siteId, sectionId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);

  const section = await sectionsService.getSection(parseInt(sectionId, 10));
  if (!section || section.site_id !== id) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  const { visible } = (await request.json().catch(() => ({}))) as { visible?: boolean };
  return NextResponse.json(await sectionsService.updateSection(section.id, { visible }));
});
