import { FastifyInstance } from "fastify";
import * as sitesService from "../services/sites.service.js";
import * as sectionsService from "../services/sections.service.js";
import * as leadsService from "../services/leads.service.js";
import * as analyticsService from "../services/analytics.service.js";

export async function publicRoutes(app: FastifyInstance) {
  // Get public site data by slug
  app.get<{ Params: { slug: string } }>(
    "/api/public/sites/:slug",
    async (request, reply) => {
      const site = await sitesService.getSiteBySlug(request.params.slug);
      if (!site) return reply.status(404).send({ error: "Site not found" });

      const sections = await sectionsService.getSections(site.id);
      const visibleSections = sections
        .filter((s) => s.visible)
        .sort((a, b) => a.sort_order - b.sort_order);

      return { site, sections: visibleSections };
    }
  );

  // Submit contact form
  app.post<{ Params: { slug: string }; Body: { name: string; email: string; phone?: string; message: string } }>(
    "/api/public/sites/:slug/contact",
    async (request, reply) => {
      const site = await sitesService.getSiteBySlug(request.params.slug);
      if (!site) return reply.status(404).send({ error: "Site not found" });

      const { name, email, message } = request.body || {};
      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return reply.status(400).send({ error: "Name, email, and message are required" });
      }

      await leadsService.createLead(site.id, name.trim(), email.trim(), request.body.phone?.trim() || null, message.trim());
      return { success: true };
    }
  );

  // Record page view
  app.post<{ Params: { slug: string }; Body: { path?: string; referrer?: string; userAgent?: string } }>(
    "/api/public/sites/:slug/view",
    async (request, reply) => {
      const site = await sitesService.getSiteBySlug(request.params.slug);
      if (!site) return reply.status(404).send({ error: "Site not found" });

      const ua = request.body?.userAgent || request.headers["user-agent"] || "";
      analyticsService.recordPageView(site.id, request.body?.path || "/", request.body?.referrer || null, ua)
        .catch((err) => request.log.error({ err }, "Failed to record page view"));

      return { success: true };
    }
  );

  // Get demo sites
  app.get("/api/public/demos", async () => {
    const { pool } = await import("../db/client.js");
    const result = await pool.query("SELECT * FROM sites WHERE is_demo = true ORDER BY created_at ASC");
    return result.rows;
  });
}
