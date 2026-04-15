import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth.js";
import { siteOwnerMiddleware } from "../middleware/site-owner.js";
import * as sitesService from "../services/sites.service.js";
import * as sectionsService from "../services/sections.service.js";

export async function siteRoutes(app: FastifyInstance) {
  // Create a new site (with default sections)
  app.post<{
    Body: {
      slug?: string;
      businessName: string;
      businessType: string;
      tagline?: string;
      phone?: string;
      email?: string;
      address?: string;
      template?: string;
      colors?: Record<string, string>;
      fonts?: Record<string, string>;
    };
  }>("/api/sites", { preHandler: [authMiddleware] }, async (request, reply) => {
    const { businessName, businessType } = request.body || {};

    if (!businessName?.trim() || !businessType?.trim()) {
      return reply.status(400).send({ error: "Business name and type are required" });
    }

    // Check if user already has a site
    const existing = await sitesService.getSiteByOwner(request.user.id);
    if (existing) {
      return reply.status(409).send({ error: "You already have a site. Delete it first to create a new one." });
    }

    const site = await sitesService.createSite({
      ownerId: request.user.id,
      ...request.body,
    });

    // Create default sections for this business type
    await sectionsService.createDefaultSections(site.id, businessType);

    return reply.status(201).send(site);
  });

  // Get current user's site
  app.get("/api/sites/mine", { preHandler: [authMiddleware] }, async (request, reply) => {
    const site = await sitesService.getSiteByOwner(request.user.id);
    if (!site) return reply.status(404).send({ error: "No site found" });
    return site;
  });

  // Update site
  app.put<{ Params: { siteId: string }; Body: Partial<Record<string, any>> }>(
    "/api/sites/:siteId",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return sitesService.updateSite(parseInt(request.params.siteId), request.body);
    }
  );

  // Publish/unpublish
  app.put<{ Params: { siteId: string }; Body: { isPublished: boolean } }>(
    "/api/sites/:siteId/publish",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return sitesService.updateSite(parseInt(request.params.siteId), { is_published: request.body.isPublished } as any);
    }
  );

  // Delete site
  app.delete<{ Params: { siteId: string } }>(
    "/api/sites/:siteId",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request, reply) => {
      await sitesService.deleteSite(parseInt(request.params.siteId));
      return { success: true };
    }
  );
}
