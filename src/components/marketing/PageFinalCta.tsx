import Link from "next/link";
import { I } from "@/components/Icons";

interface PageFinalCtaProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export const PageFinalCta = ({
  title,
  subtitle = "30+ sigorta şirketinin tekliflerini karşılaştırıyor, size en uygununu 1 saat içinde iletiyoruz.",
  primaryLabel = "Hemen Teklif Al",
  primaryHref = "/#hero",
  secondaryLabel = "Bizi Arayın",
  secondaryHref = "tel:+905011014725",
}: PageFinalCtaProps) => (
  <section
    style={{
      paddingTop: "clamp(40px, 5vw, 72px)",
      paddingBottom: "clamp(40px, 5vw, 72px)",
      background:
        "linear-gradient(135deg, var(--brand-700), var(--brand-500))",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 80% 100%, rgba(255,255,255,0.18), transparent 60%)",
      }}
    />
    <div
      className="container"
      style={{
        position: "relative",
        textAlign: "center",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "clamp(26px, 3.4vw, 40px)",
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.88)",
          marginBottom: 28,
          maxWidth: 540,
          margin: "0 auto 28px",
        }}
      >
        {subtitle}
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href={primaryHref}
          className="btn btn-lg"
          style={{ background: "white", color: "var(--brand-700)" }}
        >
          {primaryLabel} <I.ArrowRight size={18} />
        </Link>
        <a
          href={secondaryHref}
          className="btn btn-lg"
          style={{
            color: "white",
            border: "1.5px solid rgba(255,255,255,0.35)",
          }}
        >
          <I.Phone size={18} /> {secondaryLabel}
        </a>
      </div>
    </div>
  </section>
);
