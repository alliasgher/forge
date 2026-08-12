import { NextResponse } from "next/server";
import * as authService from "@/lib/server/services/auth";
import { handler } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

export const POST = handler(async (request: Request) => {
  const { refreshToken } = (await request.json().catch(() => ({}))) as { refreshToken?: string };

  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token is required" }, { status: 400 });
  }

  try {
    return NextResponse.json(await authService.refreshTokens(refreshToken));
  } catch {
    return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 });
  }
});
