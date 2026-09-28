"use client";

import { Volume2 } from "lucide-react";

export function speakJapanese(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.85;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("ja"));
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
  return true;
}

export function SpeakButton({ text, label, className = "" }: { text: string; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => speakJapanese(text)}
      aria-label={label ?? `Listen: ${text}`}
      className={`inline-flex items-center justify-center rounded-md p-2 text-indigo-700 hover:bg-sun-100 transition-colors ${className}`}
    >
      <Volume2 size={18} />
    </button>
  );
}
