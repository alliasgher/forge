import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth.js";
import { siteOwnerMiddleware } from "../middleware/site-owner.js";
import * as sectionsService from "../services/sections.service.js";

export async function sectionRoutes(app: FastifyInstance) {
  // List all sections for a site
  app.get<{ Params: { siteId: string } }>(
    "/api/sites/:siteId/sections",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return sectionsService.getSections(parseInt(request.params.siteId));
    }
  );

  // Get a single section
  app.get<{ Params: { siteId: string; sectionId: string } }>(
    "/api/sites/:siteId/sections/:sectionId",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request, reply) => {
      const section = await sectionsService.getSection(parseInt(request.params.sectionId));
      if (!section || section.site_id !== parseInt(request.params.siteId)) {
        return reply.status(404).send({ error: "Section not found" });
      }
      return section;
    }
  );

  // Update a section
  app.put<{
    Params: { siteId: string; sectionId: string };
    Body: { title?: string; content?: Record<string, any>; visible?: boolean };
  }>(
    "/api/sites/:siteId/sections/:sectionId",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return sectionsService.updateSection(parseInt(request.params.sectionId), request.body);
    }
  );

  // Toggle visibility
  app.put<{
    Params: { siteId: string; sectionId: string };
    Body: { visible: boolean };
  }>(
    "/api/sites/:siteId/sections/:sectionId/visibility",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return sectionsService.updateSection(parseInt(request.params.sectionId), {
        visible: request.body.visible,
      });
    }
  );

  // Reorder sections
  app.put<{
    Params: { siteId: string };
    Body: { order: Array<{ id: number; sort_order: number }> };
  }>(
    "/api/sites/:siteId/sections/reorder",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return sectionsService.reorderSections(
        parseInt(request.params.siteId),
        request.body.order
      );
    }
  );
}
