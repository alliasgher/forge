import "server-only";

export const config = {
  databaseUrl: process.env.DATABASE_URL || "",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "dev-access-secret-change-me",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret-change-me",
  r2AccountId: process.env.R2_ACCOUNT_ID || "",
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID || "",
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  r2BucketName: process.env.R2_BUCKET_NAME || "forge-media",
  r2PublicUrl: process.env.R2_PUBLIC_URL || "",
  cloudinaryUrl: process.env.CLOUDINARY_URL || "",
};

// The old Fastify server exited at boot when DATABASE_URL was missing. A route
// handler cannot do that, so fail on first use with the same clear message.
export function requireDatabaseUrl() {
  if (!config.databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  return config.databaseUrl;
}
