import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth.js";
import { siteOwnerMiddleware } from "../middleware/site-owner.js";
import * as mediaService from "../services/media.service.js";

export async function mediaRoutes(app: FastifyInstance) {
  // Upload media
  app.post<{ Params: { siteId: string } }>(
    "/api/sites/:siteId/media",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request, reply) => {
      const file = await request.file();
      if (!file) return reply.status(400).send({ error: "No file provided" });

      const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
      if (!allowed.includes(file.mimetype)) {
        return reply.status(400).send({ error: "Only image files are allowed" });
      }

      try {
        const media = await mediaService.upload(parseInt(request.params.siteId), file);
        return reply.status(201).send(media);
      } catch (err: any) {
        if (err.message?.includes("No image storage configured")) {
          return reply.status(503).send({ error: "Image storage not configured on this server. Set CLOUDINARY_URL or R2 credentials." });
        }
        throw err;
      }
    }
  );

  // List media
  app.get<{ Params: { siteId: string } }>(
    "/api/sites/:siteId/media",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      return mediaService.listMedia(parseInt(request.params.siteId));
    }
  );

  // Delete media
  app.delete<{ Params: { siteId: string; mediaId: string } }>(
    "/api/sites/:siteId/media/:mediaId",
    { preHandler: [authMiddleware, siteOwnerMiddleware] },
    async (request) => {
      await mediaService.deleteMedia(parseInt(request.params.mediaId), parseInt(request.params.siteId));
      return { success: true };
    }
  );
}
