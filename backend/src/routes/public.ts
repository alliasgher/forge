import { FastifyInstance } from "fastify";
import * as sitesService from "../services/sites.service.js";
import * as sectionsService from "../services/sections.service.js";

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

  // Get demo sites
  app.get("/api/public/demos", async () => {
    const { pool } = await import("../db/client.js");
    const result = await pool.query("SELECT * FROM sites WHERE is_demo = true ORDER BY created_at ASC");
    return result.rows;
  });
}
