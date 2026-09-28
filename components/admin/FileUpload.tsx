"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { Loader2, Upload } from "lucide-react";
import { fieldCls } from "@/components/admin/AdminControls";

// A URL field with an optional "upload file" button. The chosen file goes straight to Vercel Blob
// and its public URL fills the field.
export function UrlOrUpload({
  name,
  defaultValue,
  folder,
  accept,
  placeholder,
  blobEnabled,
}: {
  name: string;
  defaultValue?: string | null;
  folder: "lessons" | "materials" | "recordings";
  accept: string;
  placeholder: string;
  blobEnabled: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [pct, setPct] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function onFile(file: File) {
    setError("");
    setPct(0);
    try {
      const safe = file.name.replace(/[^\w.-]+/g, "-").slice(-80);
      const blob = await upload(`${folder}/${safe}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        multipart: file.size > 50 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => setPct(Math.round(percentage)),
      });
      setValue(blob.url);
    } catch (e) {
      setError((e as Error).message || "Upload failed");
    } finally {
      setPct(null);
    }
  }

  return (
    <div className="grid gap-1.5">
      <div className="flex gap-2">
        <input name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className={fieldCls} />
        {blobEnabled ? (
          <label className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded border border-charcoal-300/70 bg-surface px-3 min-h-[40px] text-sm font-semibold hover:border-sun-400">
            {pct !== null ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {pct !== null ? `${pct}%` : "Upload"}
            <input type="file" accept={accept} className="sr-only" disabled={pct !== null} onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          </label>
        ) : null}
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
