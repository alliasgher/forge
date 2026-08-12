import { NextResponse } from "next/server";
import { pool } from "@/lib/server/db";
import { handler } from "@/lib/server/auth-guard";

export const dynamic = "force-dynamic";

export const GET = handler(async () => {
  const result = await pool.query(
    "SELECT * FROM sites WHERE is_demo = true AND is_published = true ORDER BY created_at ASC"
  );
  return NextResponse.json(result.rows);
});
