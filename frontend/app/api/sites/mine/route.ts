import { NextResponse } from "next/server";
import * as sitesService from "@/lib/server/services/sites";
import { handler, requireUser } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

export const GET = handler(async (request: Request) => {
  const user = requireUser(request);
  const site = await sitesService.getSiteByOwner(user.id);
  if (!site) return NextResponse.json({ error: "No site found" }, { status: 404 });
  return NextResponse.json(site);
});
