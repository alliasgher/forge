import { nanoid } from "nanoid";
import path from "path";
import { pool } from "../db/client.js";
import { uploadToR2, deleteFromR2 } from "../lib/r2.js";
import type { Media } from "../types/index.js";

interface UploadedFile {
  filename: string;
  mimetype: string;
  toBuffer: () => Promise<Buffer>;
}

export async function upload(siteId: number, file: UploadedFile): Promise<Media> {
  const ext = path.extname(file.filename);
  const key = `sites/${siteId}/${nanoid()}${ext}`;
  const buffer = await file.toBuffer();

  const url = await uploadToR2(key, buffer, file.mimetype);

  const result = await pool.query<Media>(
    `INSERT INTO media (site_id, url, r2_key, filename, size, mime_type)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [siteId, url, key, file.filename, buffer.length, file.mimetype]
  );

  return result.rows[0];
}

export async function listMedia(siteId: number): Promise<Media[]> {
  const result = await pool.query<Media>(
    "SELECT * FROM media WHERE site_id = $1 ORDER BY created_at DESC",
    [siteId]
  );
  return result.rows;
}

export async function deleteMedia(mediaId: number, siteId: number): Promise<void> {
  const result = await pool.query<Media>(
    "SELECT r2_key FROM media WHERE id = $1 AND site_id = $2",
    [mediaId, siteId]
  );
  if (result.rows.length === 0) return;

  await deleteFromR2(result.rows[0].r2_key);
  await pool.query("DELETE FROM media WHERE id = $1", [mediaId]);
}
