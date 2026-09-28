import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "dark"
  | "secondary"
  | "outline"
  | "outline-light"
  | "ghost"
  | "whatsapp";
type Size = "sm" | "md" | "lg";

// Flat colour, a crisp 1px edge, and a small hard-offset shadow (like a printed card, not a glowing
// SaaS button) — the hover state nudges the shadow rather than lifting or glowing.
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-sun-400 text-white shadow-[2px_2px_0_0_var(--color-indigo-950)] hover:shadow-[3px_3px_0_0_var(--color-indigo-950)] hover:-translate-x-px hover:-translate-y-px active:shadow-none active:translate-x-0 active:translate-y-0",
  dark: "bg-indigo-900 text-white hover:bg-indigo-800",
  secondary: "bg-white text-indigo-950 border border-charcoal-100 hover:bg-sun-100",
  outline: "bg-surface text-indigo-950 border-2 border-indigo-950/80 hover:border-sun-400 hover:text-sun-500",
  "outline-light": "bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-indigo-950",
  ghost: "bg-transparent text-charcoal-700 hover:bg-charcoal-100",
  whatsapp: "bg-[#25D366] text-white hover:brightness-95",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-4 py-2 min-h-[40px]",
  md: "text-sm sm:text-base px-5 py-3 min-h-[44px]",
  lg: "text-base sm:text-lg px-7 py-3.5 min-h-[52px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-bold transition-all duration-150 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
}

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", children, className = "" } = props;
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const rest = { ...(props as NativeButtonProps) } as Record<string, unknown>;
  for (const k of ["href", "variant", "size", "className", "children"]) delete rest[k];
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
