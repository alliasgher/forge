import { NextResponse } from "next/server";
import * as mediaService from "@/lib/server/services/media";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

// Vercel caps serverless request bodies at 4.5MB, so that — not the old 5MB
// Fastify limit — is the real ceiling here.
const MAX_BYTES = 4.5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

type Ctx = { params: Promise<{ siteId: string }> };

export const GET = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);
  return NextResponse.json(await mediaService.listMedia(id));
});

export const POST = handler(async (request: Request, ctx: Ctx) => {
  const { siteId } = await ctx.params;
  const { siteId: id } = await requireSiteOwner(request, siteId);

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 4.5MB or smaller" }, { status: 413 });
  }

  try {
    const media = await mediaService.upload(id, {
      filename: file.name,
      mimetype: file.type,
      toBuffer: async () => Buffer.from(await file.arrayBuffer()),
    });
    return NextResponse.json(media, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message.includes("No image storage configured")) {
      return NextResponse.json(
        { error: "Image storage not configured on this server. Set CLOUDINARY_URL or R2 credentials." },
        { status: 503 }
      );
    }
    throw err;
  }
});
