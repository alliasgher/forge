import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// ── R2 (primary) ──────────────────────────────────────────────
const s3 = config.r2AccountId
  ? new S3Client({
      region: "auto",
      endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.r2AccessKeyId,
        secretAccessKey: config.r2SecretAccessKey,
      },
    })
  : null;

// ── Cloudinary (fallback when R2 not configured) ──────────────
if (config.cloudinaryUrl) {
  cloudinary.config({ secure: true });
  // cloudinary-node reads CLOUDINARY_URL env var automatically
}

export const storageProvider = s3 ? "r2" : config.cloudinaryUrl ? "cloudinary" : "none";

export async function uploadToStorage(key: string, body: Buffer, contentType: string): Promise<string> {
  // ── R2 ──
  if (s3) {
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
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, public_id: publicId, resource_type: "image" },
        (err, result) => err ? reject(err) : resolve(result)
      ).end(body);
    });
    return result.secure_url as string;
  }

  // ── No storage configured ──
  throw new Error("No image storage configured. Please set R2 or Cloudinary credentials.");
}

export async function deleteFromStorage(key: string, url?: string): Promise<void> {
  // ── R2 ──
  if (s3) {
    await s3.send(new DeleteObjectCommand({ Bucket: config.r2BucketName, Key: key }));
    return;
  }
  // ── Cloudinary ──
  if (config.cloudinaryUrl) {
    // Upload passes { folder, public_id } derived from `key`, so the asset's
    // real public_id is just the key without its extension. Deriving it from the
    // URL instead picks up the "v<version>/" segment, which never matches — the
    // destroy call then silently no-ops and orphans the file.
    const publicId =
      key?.replace(/\.[^.]+$/, "") ||
      url?.split("/upload/")[1]?.replace(/^v\d+\//, "").replace(/\.[^.]+$/, "");
    if (publicId) await cloudinary.uploader.destroy(publicId);
  }
}

// Keep old names as aliases for backward compat
export const uploadToR2 = uploadToStorage;
export const deleteFromR2 = deleteFromStorage;
