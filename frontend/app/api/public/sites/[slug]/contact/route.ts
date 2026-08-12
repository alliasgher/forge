import { NextResponse } from "next/server";
import * as sitesService from "@/lib/server/services/sites";
import * as leadsService from "@/lib/server/services/leads";
import { handler } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export const POST = handler(async (request: Request, ctx: Ctx) => {
  const { slug } = await ctx.params;
  const site = await sitesService.getSiteBySlug(slug);
  if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

  const body = (await request.json().catch(() => ({}))) as {
    name?: string; email?: string; phone?: string; message?: string;
  };

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  await leadsService.createLead(
    site.id,
    body.name.trim(),
    body.email.trim(),
    body.phone?.trim() || null,
    body.message.trim()
  );

  return NextResponse.json({ success: true });
});
