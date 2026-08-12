import { NextResponse } from "next/server";
import * as authService from "@/lib/server/services/auth";
import { handler, requireUser } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

export const GET = handler(async (request: Request) => {
  const user = requireUser(request);
  return NextResponse.json(await authService.getProfile(user.id));
});
