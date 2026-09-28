import { v2 as cloudinary } from "cloudinary";

const MAX_LOGO_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"]);

export async function uploadTenantLogo(file: File, tenantId: string): Promise<string> {
  if (!process.env.CLOUDINARY_URL) {
    throw Object.assign(new Error("Logo upload is not configured (CLOUDINARY_URL missing)."), { status: 500 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw Object.assign(new Error("Logo must be a PNG, JPEG, WEBP, or SVG image."), { status: 422 });
  }
  if (file.size > MAX_LOGO_BYTES) {
    throw Object.assign(new Error("Logo must be smaller than 5MB."), { status: 422 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "tenant-logos",
        public_id: tenantId,
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}
