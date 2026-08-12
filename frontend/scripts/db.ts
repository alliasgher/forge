import { config as loadEnv } from "dotenv";
import pg from "pg";

// Next reads .env.local automatically; plain tsx scripts do not, so load it
// here (falling back to .env) before touching process.env.
loadEnv({ path: ".env.local" });
loadEnv();

// Standalone pool for CLI scripts. It deliberately does NOT reuse
// lib/server/db, because that module imports "server-only", which throws
// outside Next's react-server condition.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

export const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 5,
});
