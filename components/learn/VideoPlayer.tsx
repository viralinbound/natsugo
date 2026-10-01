import { PlayCircle } from "lucide-react";
import { toEmbed } from "@/lib/portalRepo";

export function VideoPlayer({ url, title }: { url: string | null | undefined; title: string }) {
  const embed = toEmbed(url);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-indigo-950">
      {embed?.kind === "iframe" ? (
        <iframe
          src={embed.src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : embed?.kind === "video" ? (
        <video src={embed.src} controls preload="metadata" playsInline className="absolute inset-0 h-full w-full" controlsList="nodownload">
          <track kind="captions" />
        </video>
      ) : (
        <div className="brand-pattern brand-pattern-light absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
          <PlayCircle size={48} className="text-sun-300" />
          <p className="mt-3 font-display text-lg font-bold">Video lecture coming soon</p>
          <p className="mt-1 text-sm text-white/70">Study the notes below, the recorded lecture will appear here.</p>
        </div>
      )}
    </div>
  );
}
