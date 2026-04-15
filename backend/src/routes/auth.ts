import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth.js";
import * as authService from "../services/auth.service.js";

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: { name: string; email: string; password: string } }>(
    "/api/auth/signup",
    async (request, reply) => {
      const { name, email, password } = request.body || {};

      if (!name?.trim() || !email?.trim() || !password) {
        return reply.status(400).send({ error: "Name, email, and password are required" });
      }
      if (password.length < 8) {
        return reply.status(400).send({ error: "Password must be at least 8 characters" });
      }

      try {
        const result = await authService.signup(name, email, password);
        return reply.status(201).send(result);
      } catch (err: any) {
        if (err.message === "Email already registered") {
          return reply.status(409).send({ error: err.message });
        }
        throw err;
      }
    }
  );

  app.post<{ Body: { email: string; password: string } }>(
    "/api/auth/login",
    async (request, reply) => {
      const { email, password } = request.body || {};

      if (!email?.trim() || !password) {
        return reply.status(400).send({ error: "Email and password are required" });
      }

      try {
        const result = await authService.login(email, password);
        return result;
      } catch (err: any) {
        if (err.message === "Invalid email or password") {
          return reply.status(401).send({ error: err.message });
        }
        throw err;
      }
    }
  );

  app.post<{ Body: { refreshToken: string } }>(
    "/api/auth/refresh",
    async (request, reply) => {
      const { refreshToken } = request.body || {};

      if (!refreshToken) {
        return reply.status(400).send({ error: "Refresh token is required" });
      }

      try {
        const result = await authService.refreshTokens(refreshToken);
        return result;
      } catch (err: any) {
        return reply.status(401).send({ error: "Invalid or expired refresh token" });
      }
    }
  );

  app.get(
    "/api/auth/me",
    { preHandler: [authMiddleware] },
    async (request) => {
      return authService.getProfile(request.user.id);
    }
  );
}
