import { NextResponse } from "next/server";
import { getPublicSite } from "@/lib/server/services/public";
import { handler } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export const GET = handler(async (_request: Request, ctx: Ctx) => {
  const { slug } = await ctx.params;
  const result = await getPublicSite(slug);

  if (result.kind === "not_found") {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }
  if (result.kind === "expired") {
    return NextResponse.json(
      { error: "expired", business_name: result.businessName },
      { status: 410 }
    );
  }
  return NextResponse.json({ site: result.site, sections: result.sections });
});
