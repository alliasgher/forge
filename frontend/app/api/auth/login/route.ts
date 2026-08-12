import { NextResponse } from "next/server";
import * as authService from "@/lib/server/services/auth";
import { handler } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

export const POST = handler(async (request: Request) => {
  const { email, password } = (await request.json().catch(() => ({}))) as {
    email?: string; password?: string;
  };

  if (!email?.trim() || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    return NextResponse.json(await authService.login(email, password));
  } catch (err) {
    if (err instanceof Error && err.message === "Invalid email or password") {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    throw err;
  }
});
