import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { config } from "./config.js";
import { migrate } from "./db/migrate.js";
import { healthRoutes } from "./routes/health.js";
import { authRoutes } from "./routes/auth.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: [
    config.frontendUrl,
    /\.vercel\.app$/,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

await app.register(multipart, {
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Routes
await app.register(healthRoutes);
await app.register(authRoutes);

try {
  await migrate();
  await app.listen({ port: config.port, host: "0.0.0.0" });
  console.log(`Server running on port ${config.port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
