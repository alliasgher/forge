import { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../db/client.js";

export async function siteOwnerMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const { siteId } = request.params as { siteId: string };
  if (!siteId) return reply.status(400).send({ error: "Missing siteId" });

  const result = await pool.query(
    "SELECT owner_id FROM sites WHERE id = $1",
    [siteId]
  );
  if (result.rows.length === 0) {
    return reply.status(404).send({ error: "Site not found" });
  }
  if (result.rows[0].owner_id !== request.user.id) {
    return reply.status(403).send({ error: "Not authorized" });
  }
}
