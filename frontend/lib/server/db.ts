import "server-only";
import pg from "pg";
import { requireDatabaseUrl } from "./config";

/**
 * The pool is created on first query, never at import time.
 *
 * `next build` imports every route module to collect page data, so throwing at
 * module scope turns a missing DATABASE_URL into a failed build rather than a
 * failed request. Builds legitimately run without database credentials (preview
 * deployments, CI); only serving a request actually needs them.
 *
 * In dev the pool hangs off globalThis so HMR doesn't leak one per reload.
 */
const globalForPg = globalThis as unknown as { forgePool?: pg.Pool };

function getPool(): pg.Pool {
  if (globalForPg.forgePool) return globalForPg.forgePool;

  // Each serverless instance keeps its own pool, and instances scale out under
  // load — so the pool stays small and DATABASE_URL should point at Neon's
  // pooled endpoint (-pooler host) to avoid exhausting Postgres connections.
  const created = new pg.Pool({
    connectionString: requireDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 10_000,
  });

  globalForPg.forgePool = created;
  return created;
}

export const pool = {
  query: ((text: unknown, params?: unknown) =>
    getPool().query(text as string, params as unknown[])) as pg.Pool["query"],
};
