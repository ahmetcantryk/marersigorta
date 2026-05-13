import Link from "next/link";
import { I } from "@/components/Icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const PageBreadcrumb = ({ items }: PageBreadcrumbProps) => (
  <nav
    aria-label="Breadcrumb"
    style={{
      background: "var(--ink-50)",
      borderBottom: "1px solid var(--ink-100)",
    }}
  >
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 0",
        fontSize: 13,
        color: "var(--ink-500)",
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            {item.href && !isLast ? (
              <Link href={item.href} style={{ color: "var(--ink-500)" }}>
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  color: isLast ? "var(--ink-900)" : "var(--ink-500)",
                  fontWeight: isLast ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            )}
            {!isLast && <I.ChevronRight size={14} />}
          </span>
        );
      })}
    </div>
  </nav>
);
