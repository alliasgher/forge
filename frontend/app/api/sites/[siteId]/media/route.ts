import { NextResponse } from "next/server";
import * as mediaService from "@/lib/server/services/media";
import { handler, requireSiteOwner } from "@/lib/server/auth-guard";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/constants";

export const dynamic = "force-dynamic";

// Shared with the upload dropzone so the advertised limit and the enforced one
// cannot drift apart.
const MAX_BYTES = MAX_UPLOAD_BYTES;
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
    return NextResponse.json({ error: `Image must be ${MAX_UPLOAD_LABEL} or smaller` }, { status: 413 });
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
