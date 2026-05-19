"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { I } from "./Icons";
import { PARTNERS, type Partner } from "@/lib/partners";

interface PartnerLogoProps {
  partner: Partner;
}

const PartnerLogo = ({ partner }: PartnerLogoProps) => (
  <div
    style={{
      flexShrink: 0,
      height: 64,
      width: 160,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRight: "1px solid var(--ink-100)",
      transition: "filter .2s, opacity .2s",
      filter: "grayscale(1)",
      opacity: 0.7,
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.filter = "grayscale(0)";
      e.currentTarget.style.opacity = "1";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.filter = "grayscale(1)";
      e.currentTarget.style.opacity = "0.7";
    }}
  >
    <Image
      src={partner.logo}
      alt={`${partner.name} Sigorta`}
      width={120}
      height={48}
      style={{
        maxWidth: "100%",
        maxHeight: 48,
        width: "auto",
        height: "auto",
        objectFit: "contain",
      }}
      unoptimized
    />
  </div>
);

export const Partners = () => {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <section
      id="partners"
      style={{
        paddingTop: 56,
        paddingBottom: 56,
        background: "var(--paper)",
        borderTop: "1px solid var(--ink-100)",
        borderBottom: "1px solid var(--ink-100)",
      }}
    >
      <div className="container" style={{ textAlign: "center", marginBottom: 24 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink-500)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          {PARTNERS.length}+ sigorta şirketiyle anlaşmalıyız
        </div>
      </div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "scrollX 80s linear infinite",
          }}
        >
          {list.map((p, i) => (
            <PartnerLogo key={`${p.name}-${i}`} partner={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Review {
  name: string;
  svc: string;
  rating: number;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: "Mehmet K.",
    svc: "Kasko",
    rating: 5,
    text: "İşlemler hızlı ve sorunsuzdu. Hasar anında bile ulaşabildiğim bir acente — ki bu çok değerli.",
  },
  {
    name: "Ayşe Y.",
    svc: "Tamamlayıcı Sağlık",
    rating: 5,
    text: "Onlarca şirketin teklifini karşılaştırdılar, en uygunda anlaştık. Tarafsız bir bakış açısı bulmak zor.",
  },
  {
    name: "Can D.",
    svc: "DASK",
    rating: 5,
    text: "Telefonda 5 dakikada hallolacak işi neden başkaları zorlaştırıyor anlamadım. Marer Sigorta gerçekten profesyonel.",
  },
  {
    name: "Selin O.",
    svc: "Konut",
    rating: 5,
    text: "Ev sigortamı yenilerken hem fiyatı hem teminatı güzelce açıkladılar. İlk acente ki açıklamada bu kadar sabırlı.",
  },
  {
    name: "Burak Ş.",
    svc: "Trafik",
    rating: 5,
    text: "Plaka yazdım, çok kısa sürede teklif geldi. Sektörde böyle hızlısını görmemiştim açıkçası.",
  },
  {
    name: "Elif T.",
    svc: "Seyahat",
    rating: 5,
    text: "Yurt dışı seyahatim öncesinde son anda halletmek zorunda kaldım, 1 saat içinde poliçem hazırdı.",
  },
];

const Stars = ({ n = 5 }: { n?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: n }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="var(--warn-500)"
      >
        <path d="m12 3 2.7 5.7 6.3.9-4.5 4.4 1 6.3L12 17.3 6.5 20.3l1-6.3L3 9.6l6.3-.9L12 3Z" />
      </svg>
    ))}
  </div>
);

const navBtn: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 999,
  border: "1px solid var(--ink-200)",
  background: "var(--paper)",
  display: "grid",
  placeItems: "center",
  color: "var(--ink-700)",
  transition: "all .15s",
};

export const Reviews = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const visible = 3;
  const items = Array.from({ length: visible }).map(
    (_, i) => REVIEWS[(idx + i) % REVIEWS.length]
  );

  return (
    <section
      id="reviews"
      style={{
        paddingTop: "var(--pad-section)",
        paddingBottom: "var(--pad-section)",
        background: "var(--paper)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 40,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="eyebrow">Müşterilerimiz Diyor Ki</div>
            <h2 className="section-h" style={{ maxWidth: 640 }}>
              Sözümüz değil, müşterilerimizin sözü.
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Stars n={5} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>4.9 / 5</div>
                <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
                  800+ Google yorumu
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() =>
                  setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)
                }
                aria-label="Önceki"
                style={navBtn}
              >
                <I.ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)}
                aria-label="Sonraki"
                style={navBtn}
              >
                <I.ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="reviews-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {items.map((r, i) => (
            <div
              key={`${r.name}-${idx}-${i}`}
              style={{
                padding: 28,
                borderRadius: "var(--radius-lg)",
                background:
                  i === 0
                    ? "linear-gradient(180deg, var(--brand-50), var(--paper))"
                    : "var(--paper)",
                border: "1px solid var(--ink-100)",
                animation: "fadeUp .35s ease",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                minHeight: 240,
              }}
            >
              <Stars n={r.rating} />
              <p
                style={{
                  fontSize: 16,
                  color: "var(--ink-700)",
                  lineHeight: 1.55,
                  flex: 1,
                }}
              >
                &ldquo;{r.text}&rdquo;
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 14,
                  borderTop: "1px solid var(--ink-100)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 999,
                      background:
                        "linear-gradient(135deg, var(--brand-200), var(--brand-500))",
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {r.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
                      Doğrulanmış müşteri
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: 999,
                    background: "var(--ink-50)",
                    color: "var(--ink-700)",
                  }}
                >
                  {r.svc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 28,
          }}
        >
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Yorum ${i + 1}`}
              style={{
                width: i === idx ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: i === idx ? "var(--brand-500)" : "var(--ink-200)",
                transition: "all .25s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
