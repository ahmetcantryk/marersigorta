"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { I, LogoMarer } from "./Icons";

interface NavChild {
  label: string;
  slug: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Hizmetlerimiz",
    href: "/#branches",
    children: [
      { label: "Trafik Sigortası", slug: "zorunlu-trafik-sigortasi" },
      { label: "Kasko Sigortası", slug: "kasko-sigortasi" },
      { label: "DASK", slug: "dask-zorunlu-deprem-sigortasi" },
      { label: "Konut Sigortası", slug: "konut-sigortasi" },
      { label: "Tamamlayıcı Sağlık", slug: "tamamlayici-saglik-sigortasi" },
      { label: "Özel Sağlık", slug: "ozel-saglik-sigortasi" },
      { label: "Seyahat Sağlık", slug: "seyahat-saglik-sigortasi" },
      { label: "Yeşil Kart Sigortası", slug: "yesil-kart-sigortasi" },
      { label: "İşyeri / KOBİ", slug: "kobi-isyeri-sigortasi" },
      { label: "Ferdi Kaza & Hayat", slug: "ferdi-kaza-hayat-sigortasi" },
    ],
  },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Anlaşmalı Şirketler", href: "/anlasmali-sirketler" },
  { label: "Sıkça Sorulan Sorular", href: "/sikca-sorulan-sorular" },
  { label: "İletişim", href: "/iletisim" },
];

interface HeaderProps {
  onQuote?: () => void;
}

type MobileView = "main" | "services";

export const Header = ({ onQuote }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("main");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      // reset to main view whenever drawer closes
      const t = setTimeout(() => setMobileView("main"), 250);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const servicesItem = NAV_ITEMS.find((i) => i.children);

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
          <Link href="/" aria-label="Marer Sigorta — Ana Sayfa" style={{ display: "flex" }}>
            <LogoMarer iconOnly={scrolled} height={scrolled ? 48 : 60} />
          </Link>

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
                      minWidth: 260,
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
                        <Link
                          key={c.slug}
                          href={`/${c.slug}`}
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
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href="tel:+905011014725"
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
            {onQuote ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={onQuote}
                type="button"
              >
                Teklif Al
                <I.ArrowRight size={16} />
              </button>
            ) : (
              <Link href="/#hero" className="btn btn-primary btn-sm">
                Teklif Al
                <I.ArrowRight size={16} />
              </Link>
            )}
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
          className="mobile-drawer-backdrop"
          onClick={closeMobile}
        >
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
            data-view={mobileView}
          >
            <div className="mobile-drawer-head">
              {mobileView === "services" ? (
                <button
                  type="button"
                  onClick={() => setMobileView("main")}
                  aria-label="Geri"
                  className="mobile-back-btn"
                >
                  <I.ChevronLeft size={18} />
                  <span>Geri</span>
                </button>
              ) : (
                <LogoMarer />
              )}
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Menüyü kapat"
                className="mobile-close-btn"
              >
                <I.Close size={20} />
              </button>
            </div>

            <div className="mobile-drawer-track">
              {/* MAIN VIEW */}
              <div className="mobile-drawer-pane">
                <nav className="mobile-nav" aria-label="Ana menü">
                  {NAV_ITEMS.map((it) => {
                    if (it.children) {
                      return (
                        <button
                          key={it.label}
                          type="button"
                          onClick={() => setMobileView("services")}
                          className="mobile-nav-item mobile-nav-trigger"
                        >
                          <span>{it.label}</span>
                          <I.ChevronRight size={18} />
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={it.label}
                        href={it.href}
                        onClick={closeMobile}
                        className="mobile-nav-item"
                      >
                        <span>{it.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* SERVICES VIEW */}
              <div className="mobile-drawer-pane">
                <div className="mobile-submenu-title">Hizmetlerimiz</div>
                <nav className="mobile-nav" aria-label="Hizmetler">
                  {servicesItem?.children?.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}`}
                      onClick={closeMobile}
                      className="mobile-nav-item"
                    >
                      <span>{c.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="mobile-drawer-cta">
              {onQuote ? (
                <button
                  type="button"
                  className="btn btn-primary mobile-cta-primary"
                  onClick={() => {
                    closeMobile();
                    onQuote();
                  }}
                >
                  Hemen Teklif Al <I.ArrowRight size={16} />
                </button>
              ) : (
                <Link
                  href="/#hero"
                  className="btn btn-primary mobile-cta-primary"
                  onClick={closeMobile}
                >
                  Hemen Teklif Al <I.ArrowRight size={16} />
                </Link>
              )}
              <div className="mobile-cta-row">
                <a
                  href="tel:+905011014725"
                  className="mobile-cta-secondary mobile-cta-call"
                  aria-label="Telefonla ara"
                >
                  <I.Phone size={16} />
                  <span>Ara</span>
                </a>
                <a
                  href="https://wa.me/905011014725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-cta-secondary mobile-cta-wa"
                  aria-label="WhatsApp ile yaz"
                >
                  <I.Whatsapp size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
