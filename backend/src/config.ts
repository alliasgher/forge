export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  baseUrl: process.env.BASE_URL || "http://localhost:3001",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "dev-access-secret-change-me",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret-change-me",
  r2AccountId: process.env.R2_ACCOUNT_ID || "",
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID || "",
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  r2BucketName: process.env.R2_BUCKET_NAME || "forge-media",
  r2PublicUrl: process.env.R2_PUBLIC_URL || "",
  cloudinaryUrl: process.env.CLOUDINARY_URL || "",
};

if (!config.databaseUrl) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}
