import { NextResponse } from "next/server";
import * as authService from "@/lib/server/services/auth";
import { handler } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

export const POST = handler(async (request: Request) => {
  const { name, email, password } = (await request.json().catch(() => ({}))) as {
    name?: string; email?: string; password?: string;
  };

  if (!name?.trim() || !email?.trim() || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  try {
    const result = await authService.signup(name, email, password);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Email already registered") {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    throw err;
  }
});
