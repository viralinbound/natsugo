import "server-only";
import { put } from "@vercel/blob";
import type { SupabaseClient } from "@supabase/supabase-js";

export const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const maxImageBytes = 4 * 1024 * 1024;

export const storageProvider = () => (process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "supabase");

// Images go to Vercel Blob when a Blob store is connected; otherwise Supabase Storage (bucket "media").
// `sb` is the signed-in admin's client; storage RLS only lets admins upload to "media".
export async function uploadImage(file: File, folder: string, sb: SupabaseClient) {
  if (!allowedImageTypes.includes(file.type)) throw new Error("Only JPG, PNG, WebP or AVIF images are allowed.");
  if (file.size > maxImageBytes) throw new Error("Image must be 4 MB or smaller.");

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const safeFolder = folder.replace(/[^a-z0-9-]/gi, "").slice(0, 30) || "misc";
  const pathname = `${safeFolder}/${Date.now()}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(pathname, file, { access: "public", addRandomSuffix: true, contentType: file.type });
    return blob.url;
  }

  const { error } = await sb.storage.from("media").upload(pathname, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return sb.storage.from("media").getPublicUrl(pathname).data.publicUrl;
}
