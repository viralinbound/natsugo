// A red hanko (name seal) with a doubled border. Decorative.
export function Hanko({ text, size = 40, className = "" }: { text: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`hanko-seal inline-grid shrink-0 place-items-center font-mincho font-bold leading-none text-[#fff3e0] ${className}`}
      style={{ width: size, height: size, fontSize: text.length > 1 ? size * 0.36 : size * 0.6 }}
    >
      <span className="grid h-[82%] w-[82%] place-items-center rounded-[3px] border border-[#fff3e0]/70 text-center" style={{ writingMode: text.length > 1 ? "vertical-rl" : undefined }}>
        {text}
      </span>
    </span>
  );
}
