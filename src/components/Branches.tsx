"use client";

import { useEffect, useRef, useState, type ComponentType, type MouseEvent } from "react";
import { I, type IconProps } from "./Icons";

interface Branch {
  id: string;
  Icon: ComponentType<IconProps>;
  title: string;
  desc: string;
}

const BRANCHES: Branch[] = [
  { id: "trafik", Icon: I.Car, title: "Trafik Sigortası", desc: "3. şahıs maddi ve bedeni teminatı." },
  { id: "kasko", Icon: I.CarShield, title: "Kasko Sigortası", desc: "Çarpışma, çalınma ve hasarlara karşı koruma." },
  { id: "dask", Icon: I.Quake, title: "DASK", desc: "Zorunlu deprem sigortası." },
  { id: "konut", Icon: I.Home, title: "Konut Sigortası", desc: "Eviniz ve eşyalarınız geniş kapsamlı güvende." },
  { id: "tss", Icon: I.Heart, title: "Tamamlayıcı Sağlık", desc: "Anlaşmalı özel hastanelerde fark ücreti yok." },
  { id: "saglik", Icon: I.Hospital, title: "Özel Sağlık", desc: "Yatılı ve ayakta tedavi güvencesi." },
  { id: "seyahat", Icon: I.Plane, title: "Seyahat Sağlık", desc: "Yurt dışı vize ve seyahat güvencesi." },
  { id: "isyeri", Icon: I.Building, title: "İşyeri Sigortası", desc: "İşyeri, stok ve sorumluluklar tek poliçede." },
  { id: "ferdi", Icon: I.HandHeart, title: "Ferdi Kaza", desc: "Beklenmedik durumlara bireysel güvence." },
];

interface BranchSlideProps {
  b: Branch;
  onQuote: () => void;
}

const BranchSlide = ({ b, onQuote }: BranchSlideProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onQuote();
  };
  return (
    <a
      href="#hero"
      onClick={handleClick}
      className="branch-slide"
      style={{
        scrollSnapAlign: "start",
        flex: "0 0 auto",
        width: "min(280px, 78vw)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "22px 22px 20px",
        background: "var(--paper)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--ink-100)",
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.borderColor = "var(--brand-200)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--ink-100)";
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "var(--brand-50)",
          color: "var(--brand-500)",
          display: "grid",
          placeItems: "center",
          marginBottom: 14,
        }}
      >
        <b.Icon size={22} />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
        {b.title}
      </h3>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--ink-500)",
          lineHeight: 1.5,
          marginBottom: 14,
          minHeight: 40,
        }}
      >
        {b.desc}
      </p>
      <div
        style={{
          marginTop: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          fontWeight: 600,
          color: "var(--brand-500)",
        }}
      >
        Teklif Al <I.ArrowRight size={14} />
      </div>
    </a>
  );
};

interface BranchesProps {
  onQuote: () => void;
}

export const Branches = ({ onQuote }: BranchesProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".branch-slide");
    if (!first) return;
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = first.offsetWidth + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="branches"
      style={{
        paddingTop: "var(--pad-section)",
        paddingBottom: "var(--pad-section)",
        background: "var(--ink-50)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow">Hizmetlerimiz</div>
            <h2 className="section-h" style={{ marginBottom: 8 }}>
              Her ihtiyaca uygun, sonsuz güvence
            </h2>
            <p className="section-sub" style={{ margin: 0 }}>
              9 ana branşta uçtan uca poliçe çözümleri.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              aria-label="Önceki"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              className="branch-arrow-top"
            >
              <I.ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Sonraki"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              className="branch-arrow-top"
            >
              <I.ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="branch-track"
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            padding: "12px clamp(20px, 4vw, 40px)",
            margin: "0 calc(-1 * clamp(20px, 4vw, 40px))",
          }}
        >
          {BRANCHES.map((b) => (
            <BranchSlide key={b.id} b={b} onQuote={onQuote} />
          ))}
        </div>
      </div>
    </section>
  );
};
