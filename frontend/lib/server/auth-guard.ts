import "server-only";
import { NextResponse } from "next/server";
import { pool } from "./db";
import { verifyAccessToken } from "./jwt";

export interface AuthUser {
  id: number;
  email: string;
}

/** Thrown by the guards; `toResponse()` renders the same body Fastify used to send. */
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
  toResponse() {
    return NextResponse.json({ error: this.message }, { status: this.status });
  }
}

export function requireUser(request: Request): AuthUser {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new HttpError(401, "Missing or invalid authorization header");
  }
  try {
    const payload = verifyAccessToken(authHeader.slice(7));
    return { id: payload.userId, email: payload.email };
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }
}

/** Authenticates, then confirms the caller owns the site. Returns both. */
export async function requireSiteOwner(request: Request, siteIdParam: string) {
  const user = requireUser(request);
  const siteId = parseInt(siteIdParam, 10);
  if (Number.isNaN(siteId)) throw new HttpError(400, "Missing siteId");

  const result = await pool.query("SELECT owner_id FROM sites WHERE id = $1", [siteId]);
  if (result.rows.length === 0) throw new HttpError(404, "Site not found");
  if (result.rows[0].owner_id !== user.id) throw new HttpError(403, "Not authorized");

  return { user, siteId };
}

/**
 * Wraps a handler so guard failures become responses and anything unexpected
 * becomes a 500 instead of an unhandled rejection — Fastify did both for us.
 */
export function handler<T extends unknown[]>(
  fn: (request: Request, ...args: T) => Promise<Response>
) {
  return async (request: Request, ...args: T): Promise<Response> => {
    try {
      return await fn(request, ...args);
    } catch (err) {
      if (err instanceof HttpError) return err.toResponse();
      console.error("Unhandled API error:", err);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
}

/** Route handlers touch the database, so nothing here may be statically cached. */
export const dynamic = "force-dynamic";
