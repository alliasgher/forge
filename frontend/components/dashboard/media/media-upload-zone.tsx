"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { uploadMedia } from "@/lib/api/media";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_LABEL } from "@/lib/constants";
import { useSiteStore } from "@/lib/stores/site-store";
import { toast } from "sonner";
import type { Media } from "@/lib/types";

interface MediaUploadZoneProps {
  onUploaded: (media: Media) => void;
}

export function MediaUploadZone({ onUploaded }: MediaUploadZoneProps) {
  const site = useSiteStore((s) => s.site);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!site || files.length === 0) return;
      setUploading(true);

      for (const file of files) {
        try {
          const media = await uploadMedia(site.id, file);
          onUploaded(media);
          toast.success(`Uploaded ${file.name}`);
        } catch (err: any) {
          toast.error(err.message || `Failed to upload ${file.name}`);
        }
      }

      setUploading(false);
    },
    [site, onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"] },
    maxSize: MAX_UPLOAD_BYTES,
    disabled: uploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
        isDragActive
          ? "border-mint bg-mint/5"
          : uploading
          ? "border-border bg-muted cursor-not-allowed"
          : "border-border hover:border-mint/40 hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <>
          <Loader2 className="mb-2 h-8 w-8 animate-spin text-mint" />
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </>
      ) : (
        <>
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">
            {isDragActive ? "Drop images here" : "Drag & drop images, or click to browse"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WebP, GIF, SVG — max {MAX_UPLOAD_LABEL}</p>
        </>
      )}
    </div>
  );
}
