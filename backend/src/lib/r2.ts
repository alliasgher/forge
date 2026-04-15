import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../config.js";

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

export async function uploadToR2(key: string, body: Buffer, contentType: string): Promise<string> {
  if (!s3) {
    // Dev fallback: return a placeholder URL
    console.warn("R2 not configured — returning placeholder URL");
    return `https://placehold.co/600x400?text=${encodeURIComponent(key.split("/").pop() || "image")}`;
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return `${config.r2PublicUrl}/${key}`;
}

export async function deleteFromR2(key: string): Promise<void> {
  if (!s3) return;

  await s3.send(
    new DeleteObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
    })
  );
}
