"use client";

import type { ComponentType } from "react";
import { UndrawActiveSupport } from "react-undraw-illustrations";
import { I, type IconProps } from "./Icons";

interface ClaimCard {
  Icon: ComponentType<IconProps>;
  color: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

const CLAIMS_CARDS: ClaimCard[] = [
  {
    Icon: I.AlertTriangle,
    color: "#EF4444",
    title: "Hasar İhbarı",
    desc: "Hasar mı yaşadınız? Anında bildirim yapın, sürecinizi sizin adınıza yönetelim.",
    cta: "Hasar Bildir",
    href: "#contact",
  },
  {
    Icon: I.Search,
    color: "var(--brand-500)",
    title: "Poliçe Sorgulama",
    desc: "TC kimlik no veya plaka ile aktif poliçenizi anında görüntüleyin.",
    cta: "Poliçe Sorgula",
    href: "#contact",
  },
  {
    Icon: I.Doc,
    color: "var(--accent-500)",
    title: "Belge & Form İndir",
    desc: "Kaza tespit tutanağı, hasar başvuru formu ve diğer belgeler bir tıkla elinizde.",
    cta: "Belgeleri Gör",
    href: "#contact",
  },
];

export const Claims = () => (
  <section
    id="claims"
    style={{
      paddingTop: "var(--pad-section)",
      paddingBottom: "var(--pad-section)",
      background: "var(--paper)",
    }}
  >
    <div className="container">
      <div
        className="claims-header"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)",
          alignItems: "center",
          gap: 32,
          marginBottom: 40,
        }}
      >
        <div>
          <div className="eyebrow">Mevcut Müşterilerimiz</div>
          <h2 className="section-h" style={{ maxWidth: 640, marginBottom: 14 }}>
            Hasar ve poliçe işlemleriniz tek noktada.
          </h2>
          <p
            className="section-sub"
            style={{ marginBottom: 22, maxWidth: 540 }}
          >
            Hasar bildirimi, poliçe sorgulama ve belge işlemleri için her zaman
            yanınızdayız.
          </p>
          <a href="tel:+905011014725" className="btn btn-outline">
            <I.Phone size={16} /> Acil hasar hattı
          </a>
        </div>
        <div
          className="claims-illustration"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <UndrawActiveSupport primaryColor="#56ACD6" height="240px" />
          </div>
        </div>
      </div>

      <div
        className="claims-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {CLAIMS_CARDS.map((c, i) => (
          <a
            key={i}
            href={c.href}
            style={{
              padding: 28,
              borderRadius: "var(--radius-lg)",
              background: "var(--paper)",
              border: "1px solid var(--ink-100)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              transition: "all .25s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.borderColor = "var(--brand-200)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "var(--ink-100)";
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `color-mix(in oklch, ${c.color} 12%, white)`,
                color: c.color,
                display: "grid",
                placeItems: "center",
              }}
            >
              <c.Icon size={26} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>{c.title}</h3>
            <p
              style={{
                fontSize: 14.5,
                color: "var(--ink-500)",
                lineHeight: 1.55,
              }}
            >
              {c.desc}
            </p>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "var(--brand-500)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {c.cta} <I.ArrowRight size={16} />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
