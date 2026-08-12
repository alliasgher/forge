import { pool } from "./db";

export async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name          VARCHAR(100) NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sites (
      id             SERIAL PRIMARY KEY,
      owner_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      slug           VARCHAR(100) UNIQUE NOT NULL,
      business_name  VARCHAR(200) NOT NULL,
      business_type  VARCHAR(50) NOT NULL,
      tagline        VARCHAR(300),
      phone          VARCHAR(30),
      email          VARCHAR(255),
      address        TEXT,
      hours          JSONB DEFAULT '{}',
      template       VARCHAR(50) NOT NULL DEFAULT 'modern',
      colors         JSONB NOT NULL DEFAULT '{"primary":"#1E3A5F","secondary":"#00C9A7","accent":"#FF6B4A","background":"#FFFFFF","text":"#0D1B2A"}',
      fonts          JSONB NOT NULL DEFAULT '{"heading":"Sora","body":"Figtree"}',
      logo_url       TEXT,
      is_published   BOOLEAN NOT NULL DEFAULT false,
      is_demo        BOOLEAN NOT NULL DEFAULT false,
      expires_at     TIMESTAMPTZ DEFAULT NULL,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS site_sections (
      id          SERIAL PRIMARY KEY,
      site_id     INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
      type        VARCHAR(30) NOT NULL,
      title       VARCHAR(200),
      content     JSONB NOT NULL DEFAULT '{}',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      visible     BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS media (
      id          SERIAL PRIMARY KEY,
      site_id     INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
      url         TEXT NOT NULL,
      r2_key      TEXT NOT NULL,
      filename    VARCHAR(255) NOT NULL,
      size        INTEGER NOT NULL,
      mime_type   VARCHAR(100) NOT NULL,
      width       INTEGER,
      height      INTEGER,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS leads (
      id          SERIAL PRIMARY KEY,
      site_id     INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
      name        VARCHAR(200) NOT NULL,
      email       VARCHAR(255) NOT NULL,
      phone       VARCHAR(30),
      message     TEXT NOT NULL,
      is_read     BOOLEAN NOT NULL DEFAULT false,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS page_views (
      id          SERIAL PRIMARY KEY,
      site_id     INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
      path        VARCHAR(500) NOT NULL DEFAULT '/',
      referrer    TEXT,
      device_type VARCHAR(20),
      browser     VARCHAR(50),
      os          VARCHAR(50),
      country     VARCHAR(2),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id          SERIAL PRIMARY KEY,
      user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash  VARCHAR(255) NOT NULL,
      expires_at  TIMESTAMPTZ NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_sites_owner_id ON sites(owner_id);
    CREATE INDEX IF NOT EXISTS idx_sites_slug ON sites(slug);
    CREATE INDEX IF NOT EXISTS idx_sections_site_id ON site_sections(site_id);
    CREATE INDEX IF NOT EXISTS idx_sections_site_sort ON site_sections(site_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_media_site_id ON media(site_id);
    CREATE INDEX IF NOT EXISTS idx_leads_site_id ON leads(site_id);
    CREATE INDEX IF NOT EXISTS idx_leads_site_created ON leads(site_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_views_site_id ON page_views(site_id);
    CREATE INDEX IF NOT EXISTS idx_views_site_created ON page_views(site_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id);
  `);

  console.log("Database migration completed");
}

// Allow `npm run db:migrate` to run this directly.
migrate()
  .then(() => pool.end())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
