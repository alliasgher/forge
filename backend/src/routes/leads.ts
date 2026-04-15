import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth.js";
import { siteOwnerMiddleware } from "../middleware/site-owner.js";
import * as leadsService from "../services/leads.service.js";

export async function leadRoutes(app: FastifyInstance) {
  app.get<{ Params: { siteId: string }; Querystring: { page?: string; limit?: string } }>(
    "/api/sites/:siteId/leads",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      const page = parseInt(request.query.page || "1");
      const limit = parseInt(request.query.limit || "20");
      return leadsService.getLeads(parseInt(request.params.siteId), page, limit);
    }
  );

  app.get<{ Params: { siteId: string; leadId: string } }>(
    "/api/sites/:siteId/leads/:leadId",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request, reply) => {
      const lead = await leadsService.getLead(parseInt(request.params.leadId));
      if (!lead) return reply.status(404).send({ error: "Lead not found" });
      return lead;
    }
  );

  app.put<{ Params: { siteId: string; leadId: string }; Body: { isRead: boolean } }>(
    "/api/sites/:siteId/leads/:leadId/read",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return leadsService.markRead(parseInt(request.params.leadId), request.body.isRead);
    }
  );

  app.delete<{ Params: { siteId: string; leadId: string } }>(
    "/api/sites/:siteId/leads/:leadId",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      await leadsService.deleteLead(parseInt(request.params.leadId));
      return { success: true };
    }
  );
}
