import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth.js";
import { siteOwnerMiddleware } from "../middleware/site-owner.js";
import * as analyticsService from "../services/analytics.service.js";

export async function analyticsRoutes(app: FastifyInstance) {
  app.get<{ Params: { siteId: string }; Querystring: { days?: string } }>(
    "/api/sites/:siteId/analytics",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      const days = parseInt(request.query.days || "30");
      return analyticsService.getAnalytics(parseInt(request.params.siteId), Number.isNaN(days) ? 30 : days);
    }
  );
}
