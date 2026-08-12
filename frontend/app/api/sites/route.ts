import { NextResponse } from "next/server";
import * as sitesService from "@/lib/server/services/sites";
import * as sectionsService from "@/lib/server/services/sections";
import { handler, requireUser } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

export const POST = handler(async (request: Request) => {
  const user = requireUser(request);
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const businessName = body.businessName as string | undefined;
  const businessType = body.businessType as string | undefined;

  if (!businessName?.trim() || !businessType?.trim()) {
    return NextResponse.json({ error: "Business name and type are required" }, { status: 400 });
  }

  const existing = await sitesService.getSiteByOwner(user.id);
  if (existing) {
    return NextResponse.json(
      { error: "You already have a site. Delete it first to create a new one." },
      { status: 409 }
    );
  }

  const site = await sitesService.createSite({
    ...(body as object),
    ownerId: user.id,
    ownerEmail: user.email,
    businessName,
    businessType,
  });

  await sectionsService.createDefaultSections(site.id, businessType);

  return NextResponse.json(site, { status: 201 });
});
