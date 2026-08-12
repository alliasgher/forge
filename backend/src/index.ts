import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { config } from "./config.js";
import { migrate } from "./db/migrate.js";
import { healthRoutes } from "./routes/health.js";
import { authRoutes } from "./routes/auth.js";
import { siteRoutes } from "./routes/sites.js";
import { sectionRoutes } from "./routes/sections.js";
import { mediaRoutes } from "./routes/media.js";
import { publicRoutes } from "./routes/public.js";
import { leadRoutes } from "./routes/leads.js";
import { analyticsRoutes } from "./routes/analytics.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: [
    config.frontendUrl,
    /\.vercel\.app$/,
    // Next dev picks the next free port when 3000 is taken, so accept any
    // localhost origin outside production rather than silently failing CORS.
    ...(process.env.NODE_ENV === "production" ? [] : [/^http:\/\/(localhost|127\.0\.0\.1):\d+$/]),
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

await app.register(multipart, {
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Routes
await app.register(healthRoutes);
await app.register(authRoutes);
await app.register(siteRoutes);
await app.register(sectionRoutes);
await app.register(mediaRoutes);
await app.register(leadRoutes);
await app.register(analyticsRoutes);
await app.register(publicRoutes);

try {
  await migrate();
  await app.listen({ port: config.port, host: "0.0.0.0" });
  console.log(`Server running on port ${config.port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
