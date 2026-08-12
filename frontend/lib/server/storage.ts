import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

// ── Cloudinary reads CLOUDINARY_URL from the environment itself ──
if (config.cloudinaryUrl) cloudinary.config({ secure: true });

export const storageProvider = config.r2AccountId
  ? "r2"
  : config.cloudinaryUrl
  ? "cloudinary"
  : "none";

// The S3 client is heavy and pure dead weight when R2 is unconfigured, so it is
// imported lazily — an unused dependency must not sit in the cold-start path.
async function r2Client() {
  const { S3Client } = await import("@aws-sdk/client-s3");
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  });
}

export async function uploadToStorage(key: string, body: Buffer, contentType: string): Promise<string> {
  // ── R2 ──
  if (config.r2AccountId) {
    const { PutObjectCommand } = await import("@aws-sdk/client-s3");
    const s3 = await r2Client();
    await s3.send(new PutObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    }));
    return `${config.r2PublicUrl}/${key}`;
  }

  // ── Cloudinary ──
  if (config.cloudinaryUrl) {
    const folder = key.split("/").slice(0, -1).join("/");
    const publicId = key.split("/").pop()?.replace(/\.[^.]+$/, "") || key;
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, public_id: publicId, resource_type: "image" },
        (err, res) => (err || !res ? reject(err) : resolve(res as { secure_url: string }))
      ).end(body);
    });
    return result.secure_url;
  }

  throw new Error("No image storage configured. Please set R2 or Cloudinary credentials.");
}

export async function deleteFromStorage(key: string, url?: string): Promise<void> {
  // ── R2 ──
  if (config.r2AccountId) {
    const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
    const s3 = await r2Client();
    await s3.send(new DeleteObjectCommand({ Bucket: config.r2BucketName, Key: key }));
    return;
  }

  // ── Cloudinary ──
  if (config.cloudinaryUrl) {
    // Upload passes { folder, public_id } derived from `key`, so the asset's real
    // public_id is the key without its extension. Deriving it from the URL instead
    // picks up the "v<version>/" segment, which never matches — destroy() then
    // silently no-ops and orphans the file.
    const publicId =
      key?.replace(/\.[^.]+$/, "") ||
      url?.split("/upload/")[1]?.replace(/^v\d+\//, "").replace(/\.[^.]+$/, "");
    if (publicId) await cloudinary.uploader.destroy(publicId);
  }
}
