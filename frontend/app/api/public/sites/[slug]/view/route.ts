import { NextResponse } from "next/server";
import * as sitesService from "@/lib/server/services/sites";
import * as analyticsService from "@/lib/server/services/analytics";
import { handler } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export const POST = handler(async (request: Request, ctx: Ctx) => {
  const { slug } = await ctx.params;
  const site = await sitesService.getSiteBySlug(slug);
  if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

  const body = (await request.json().catch(() => ({}))) as {
    path?: string; referrer?: string; userAgent?: string;
  };
  const ua = body.userAgent || request.headers.get("user-agent") || "";

  // Awaited on purpose. The Fastify version fired this off without waiting, but
  // a serverless instance can be frozen the moment it responds — an un-awaited
  // insert would be dropped and views would silently undercount.
  try {
    await analyticsService.recordPageView(site.id, body.path || "/", body.referrer || null, ua);
  } catch (err) {
    // Tracking must never break the page it is tracking.
    console.error("Failed to record page view:", err);
  }

  return NextResponse.json({ success: true });
});
