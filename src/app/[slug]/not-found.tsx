import Link from "next/link";
import { I } from "@/components/Icons";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "80px 20px",
        background: "var(--ink-50)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div
          style={{
            display: "inline-grid",
            placeItems: "center",
            width: 72,
            height: 72,
            borderRadius: 999,
            background: "var(--brand-50)",
            color: "var(--brand-500)",
            marginBottom: 18,
          }}
        >
          <I.Search size={32} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>
          Ürün bulunamadı
        </h1>
        <p
          style={{
            fontSize: 15.5,
            color: "var(--ink-500)",
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          Aradığınız sigorta ürünü mevcut değil veya bağlantı değişmiş olabilir.
          Tüm ürünlerimize ana sayfadan ulaşabilirsiniz.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            Ana Sayfaya Dön <I.ArrowRight size={16} />
          </Link>
          <Link href="/#branches" className="btn btn-outline">
            Hizmetlerimiz
          </Link>
        </div>
      </div>
    </section>
  );
}
