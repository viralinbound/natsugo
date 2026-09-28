import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/lib/site";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumb({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1 text-sm ${light ? "text-white/75" : "text-charcoal-500"}`}>
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight size={14} aria-hidden /> : null}
              {i === all.length - 1 ? (
                <span aria-current="page" className={light ? "text-white" : "text-charcoal-800"}>
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:underline underline-offset-2">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${site.url}${c.href}`,
          })),
        }}
      />
    </>
  );
}
