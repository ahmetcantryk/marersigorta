"use client";

import { useEffect, useState } from "react";
import { I, LogoMarer } from "./Icons";

interface NavItem {
  label: string;
  href: string;
  children?: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Hizmetlerimiz",
    href: "#branches",
    children: [
      "Trafik Sigortası",
      "Kasko Sigortası",
      "DASK",
      "Konut Sigortası",
      "Tamamlayıcı Sağlık",
      "Özel Sağlık",
      "Seyahat Sağlık",
      "Yeşil Kart Sigortası",
      "İşyeri",
      "Ferdi Kaza",
    ],
  },
  { label: "Hakkımızda", href: "#about" },
  { label: "Anlaşmalı Şirketler", href: "#partners" },
  { label: "Sıkça Sorulan Sorular", href: "#faq" },
  { label: "İletişim", href: "#contact" },
];

interface HeaderProps {
  onQuote: () => void;
}

export const Header = ({ onQuote }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: scrolled ? "rgba(255,255,255,0.92)" : "var(--paper)",
          backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--ink-200)"
            : "1px solid transparent",
          transition: "all .25s ease",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? 68 : 84,
            transition: "height .25s ease",
          }}
        >
          <a href="#hero" aria-label="Marer Sigorta" style={{ display: "flex" }}>
            <LogoMarer iconOnly={scrolled} height={scrolled ? 48 : 60} />
          </a>

          <nav
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
                style={{ position: "relative" }}
              >
                <a
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "10px 14px",
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: "var(--ink-700)",
                    borderRadius: 8,
                    transition: "color .15s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "var(--brand-500)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "var(--ink-700)")
                  }
                >
                  {item.label}
                  {item.children && <I.ChevronDown size={16} />}
                </a>
                {item.children && openMenu === item.label && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      paddingTop: 8,
                      minWidth: 240,
                      animation: "fadeUp .18s ease",
                    }}
                  >
                    <div
                      style={{
                        background: "var(--paper)",
                        borderRadius: 14,
                        boxShadow: "var(--shadow-lg)",
                        padding: 8,
                        border: "1px solid var(--ink-100)",
                      }}
                    >
                      {item.children.map((c) => (
                        <a
                          key={c}
                          href="#branches"
                          style={{
                            display: "block",
                            padding: "10px 14px",
                            borderRadius: 8,
                            fontSize: 14,
                            color: "var(--ink-700)",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "var(--brand-50)";
                            e.currentTarget.style.color = "var(--brand-500)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--ink-700)";
                          }}
                        >
                          {c}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href="tel:+902120000000"
              className="call-now"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 16px 9px 12px",
                borderRadius: 999,
                background:
                  "linear-gradient(135deg, var(--accent-500), var(--accent-600))",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "0 6px 16px -8px rgba(16,185,129,0.6)",
                transition: "transform .15s ease, box-shadow .2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px -10px rgba(16,185,129,0.7)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px -8px rgba(16,185,129,0.6)";
              }}
            >
              <span
                aria-hidden
                className="call-now-icon"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.2)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <I.PhoneRing size={14} />
              </span>
              <span className="call-now-label">Hemen Ara</span>
            </a>
            <button
              className="btn btn-primary btn-sm"
              onClick={onQuote}
              type="button"
            >
              Teklif Al
              <I.ArrowRight size={16} />
            </button>
            <button
              className="mobile-burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü"
              type="button"
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                border: "1px solid var(--ink-200)",
                display: "none",
                placeItems: "center",
                background: "var(--paper)",
              }}
            >
              <I.Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(11,26,44,0.5)",
            animation: "fadeUp .15s ease",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(360px, 86vw)",
              background: "var(--paper)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <LogoMarer />
              <button
                onClick={() => setMobileOpen(false)}
                type="button"
                aria-label="Kapat"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: "1px solid var(--ink-200)",
                  display: "grid",
                  placeItems: "center",
                  background: "var(--paper)",
                }}
              >
                <I.Close size={20} />
              </button>
            </div>
            {NAV_ITEMS.map((it) => (
              <a
                key={it.label}
                href={it.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "14px 12px",
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: "1px solid var(--ink-100)",
                }}
              >
                {it.label}
              </a>
            ))}
            <button
              className="btn btn-primary"
              type="button"
              style={{ marginTop: 16 }}
              onClick={() => {
                setMobileOpen(false);
                onQuote();
              }}
            >
              Hemen Teklif Al <I.ArrowRight size={16} />
            </button>
            <a href="tel:+902120000000" className="btn btn-outline">
              <I.Phone size={16} /> 0 (212) 555 00 00
            </a>
          </div>
        </div>
      )}
    </>
  );
};
