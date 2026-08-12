import "server-only";
import pg from "pg";
import { requireDatabaseUrl } from "./config";

// Each serverless instance keeps its own pool, and instances scale out under
// load — so the pool stays small and DATABASE_URL should point at Neon's
// pooled endpoint (-pooler host) to avoid exhausting Postgres connections.
// In dev, hang the pool off globalThis so HMR doesn't leak a pool per reload.
const globalForPg = globalThis as unknown as { forgePool?: pg.Pool };

export const pool =
  globalForPg.forgePool ??
  new pg.Pool({
    connectionString: requireDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") globalForPg.forgePool = pool;
