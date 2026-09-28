import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getAdminUser } from "@/lib/supabase/server";

// Issues short-lived tokens so the admin's browser can upload large files (videos, PDFs) straight to Vercel Blob.
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "Vercel Blob is not connected." }, { status: 503 });
  }
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await getAdminUser())) throw new Error("Not authorised");
        if (!/^(lessons|materials|recordings|teachers)\//.test(pathname)) throw new Error("Invalid upload folder");
        return {
          allowedContentTypes: ["video/mp4", "video/webm", "video/quicktime", "application/pdf", "image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 2 * 1024 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
}
