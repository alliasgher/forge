import { pool } from "../db/client.js";
import { UAParser } from "ua-parser-js";

export async function recordPageView(siteId: number, path: string, referrer: string | null, userAgent: string) {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const browser = parser.getBrowser();
  const os = parser.getOS();

  await pool.query(
    `INSERT INTO page_views (site_id, path, referrer, device_type, browser, os)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [siteId, path, referrer, device.type || "desktop", browser.name || null, os.name || null]
  );
}

export async function getAnalytics(siteId: number, days = 30) {
  // Guard against NaN / absurd values being interpolated into the interval literal
  const windowDays = Number.isFinite(days) ? Math.min(365, Math.max(1, Math.floor(days))) : 30;

  const [totalResult, timeResult, deviceResult, pageResult, referrerResult] = await Promise.all([
    pool.query<{ count: string }>("SELECT COUNT(*) as count FROM page_views WHERE site_id = $1", [siteId]),
    // TO_CHAR keeps the day as a plain 'YYYY-MM-DD' string. DATE() returns a `date`
    // that node-postgres parses into a Date at *local* midnight, which shifts the
    // bucket by a day for any server not running in UTC.
    pool.query<{ date: string; views: string }>(
      `SELECT TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') as date, COUNT(*) as views FROM page_views
       WHERE site_id = $1 AND created_at > NOW() - INTERVAL '${windowDays} days'
       GROUP BY 1 ORDER BY 1`, [siteId]
    ),
    pool.query<{ device_type: string; views: string }>(
      `SELECT device_type, COUNT(*) as views FROM page_views WHERE site_id = $1 AND device_type IS NOT NULL
       GROUP BY device_type ORDER BY views DESC`, [siteId]
    ),
    pool.query<{ path: string; views: string }>(
      `SELECT path, COUNT(*) as views FROM page_views WHERE site_id = $1
       GROUP BY path ORDER BY views DESC LIMIT 10`, [siteId]
    ),
    pool.query<{ referrer: string; views: string }>(
      `SELECT COALESCE(referrer, 'Direct') as referrer, COUNT(*) as views FROM page_views WHERE site_id = $1
       GROUP BY referrer ORDER BY views DESC LIMIT 10`, [siteId]
    ),
  ]);

  return {
    total_views: parseInt(totalResult.rows[0].count),
    views_over_time: timeResult.rows.map((r) => ({ date: r.date, views: parseInt(r.views) })),
    devices: deviceResult.rows.map((r) => ({ device_type: r.device_type, views: parseInt(r.views) })),
    top_pages: pageResult.rows.map((r) => ({ path: r.path, views: parseInt(r.views) })),
    referrers: referrerResult.rows.map((r) => ({ referrer: r.referrer, views: parseInt(r.views) })),
  };
}
