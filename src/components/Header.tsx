"use client";

import { useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { I, LogoMarer, type IconProps } from "./Icons";

interface NavChild {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
}

interface ServiceGroup {
  label: string;
  items: NavChild[];
  columns?: 1 | 2;
}

interface NavItem {
  label: string;
  href: string;
  groups?: ServiceGroup[];
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: "Bireysel",
    columns: 2,
    items: [
      { label: "Kasko Sigortası", href: "/kasko-sigortasi", Icon: I.CarShield },
      { label: "Trafik Sigortası", href: "/zorunlu-trafik-sigortasi", Icon: I.Car },
      { label: "DASK", href: "/dask-zorunlu-deprem-sigortasi", Icon: I.Quake },
      { label: "Konut Sigortası", href: "/konut-sigortasi", Icon: I.Home },
      { label: "Tamamlayıcı Sağlık", href: "/tamamlayici-saglik-sigortasi", Icon: I.Heart },
      { label: "Özel Sağlık", href: "/ozel-saglik-sigortasi", Icon: I.Hospital },
      { label: "Seyahat Sağlık", href: "/seyahat-saglik-sigortasi", Icon: I.Plane },
      { label: "Yeşil Kart", href: "/yesil-kart-sigortasi", Icon: I.Doc },
      { label: "Ferdi Kaza & Hayat", href: "/ferdi-kaza-hayat-sigortasi", Icon: I.HandHeart },
    ],
  },
  {
    label: "Kurumsal",
    columns: 1,
    items: [
      { label: "İşyeri Sigortası", href: "/kobi-isyeri-sigortasi", Icon: I.Building },
      { label: "Mühendislik Sigortaları", href: "/muhendislik-sigortalari", Icon: I.Wrench },
      { label: "Nakliyat Sigortası", href: "/nakliyat-sigortasi", Icon: I.Truck },
      { label: "Yat ve Tekne Sigortası", href: "/yat-tekne-sigortasi", Icon: I.Boat },
      { label: "Filo Yönetimi Sigortası", href: "/filo-yonetimi-sigortasi", Icon: I.Fleet },
    ],
  },
];

const NAV_ITEMS: NavItem[] = [
  { label: "Ürünlerimiz", href: "/#branches", groups: SERVICE_GROUPS },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Anlaşmalı Şirketler", href: "/anlasmali-sirketler" },
  { label: "Sıkça Sorulan Sorular", href: "/sikca-sorulan-sorular" },
  { label: "İletişim", href: "/iletisim" },
];

/**
 * Scroll edildiğinde header'da görünecek hızlı ürün chip'leri.
 * `priority` ile dar viewport'larda hangileri saklanacak belirlenir.
 */
interface QuickProduct extends NavChild {
  priority?: "high" | "mid" | "low";
}
const QUICK_PRODUCTS: QuickProduct[] = [
  { label: "Kasko", href: "/kasko-sigortasi", Icon: I.CarShield, priority: "high" },
  { label: "Trafik", href: "/zorunlu-trafik-sigortasi", Icon: I.Car, priority: "high" },
  { label: "DASK", href: "/dask-zorunlu-deprem-sigortasi", Icon: I.Quake, priority: "high" },
  { label: "Konut", href: "/konut-sigortasi", Icon: I.Home, priority: "mid" },
  { label: "Sağlık", href: "/tamamlayici-saglik-sigortasi", Icon: I.Heart, priority: "low" },
];

interface HeaderProps {
  onQuote?: () => void;
}

type MobileView = "main" | "services";

/* ============================================================
 *  MEGA MENU — desktop dropdown (Bireysel + Kurumsal sütunları)
 * ============================================================ */

interface MegaMenuProps {
  groups: ServiceGroup[];
  onItemClick?: () => void;
  /** "left" — parent'ın sol kenarına hizalı (sağa açılır)
   *  "right" — parent'ın sağ kenarına hizalı (sola açılır)
   *  "center" — parent merkezine hizalı (her iki yana) */
  align?: "left" | "right" | "center";
}

const MegaMenu = ({ groups, onItemClick, align = "left" }: MegaMenuProps) => (
  <div
    role="menu"
    style={{
      position: "absolute",
      top: "100%",
      left: align === "left" ? 0 : align === "center" ? "50%" : "auto",
      right: align === "right" ? 0 : "auto",
      transform: align === "center" ? "translateX(-50%)" : undefined,
      paddingTop: 10,
      width: "min(780px, 94vw)",
      zIndex: 30,
    }}
  >
    <div
      style={{
        background: "var(--paper)",
        borderRadius: 16,
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--ink-100)",
        padding: 16,
        display: "grid",
        gridTemplateColumns: "1.55fr 1px 1fr",
        gap: 18,
        animation: "megaFadeIn .16s ease",
      }}
    >
      {groups.map((group, gi) => (
        <div key={group.label} style={{ display: "contents" }}>
          {gi > 0 && (
            <div
              aria-hidden
              style={{ background: "var(--ink-100)", width: 1 }}
            />
          )}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
                padding: "4px 10px 12px",
              }}
            >
              {group.label}
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns:
                  group.columns === 2 ? "1fr 1fr" : "1fr",
                gridAutoFlow: group.columns === 2 ? "column" : "row",
                gridTemplateRows:
                  group.columns === 2
                    ? `repeat(${Math.ceil(group.items.length / 2)}, auto)`
                    : undefined,
                columnGap: 6,
                rowGap: 2,
              }}
            >
              {group.items.map((c) => (
                <li key={`${group.label}-${c.label}`}>
                  <Link
                    href={c.href}
                    onClick={onItemClick}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "var(--ink-700)",
                      transition: "background .12s, color .12s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "var(--brand-50)";
                      e.currentTarget.style.color = "var(--brand-700)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--ink-700)";
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        flexShrink: 0,
                        borderRadius: 8,
                        background: "var(--ink-50)",
                        color: "var(--brand-500)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <c.Icon size={15} />
                    </span>
                    <span
                      style={{
                        minWidth: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: 600,
                      }}
                    >
                      {c.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ============================================================
 *  MOBILE — services view (drawer içinde Bireysel + Kurumsal)
 * ============================================================ */

interface MobileGroupProps {
  group: ServiceGroup;
  onItemClick: () => void;
}

const MobileGroup = ({ group, onItemClick }: MobileGroupProps) => (
  <div style={{ marginBottom: 14 }}>
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "var(--ink-400)",
        padding: "12px 10px 8px",
      }}
    >
      {group.label}
    </div>
    <nav className="mobile-nav" aria-label={group.label}>
      {group.items.map((c) => (
        <Link
          key={`${group.label}-${c.label}`}
          href={c.href}
          onClick={onItemClick}
          className="mobile-nav-item"
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0,
              flex: 1,
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                flexShrink: 0,
                borderRadius: 8,
                background: "var(--ink-50)",
                color: "var(--brand-500)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <c.Icon size={15} />
            </span>
            <span
              style={{
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {c.label}
            </span>
          </span>
        </Link>
      ))}
    </nav>
  </div>
);

/* ============================================================
 *  HEADER — 2 bar: default + scrolled (sadece desktop)
 * ============================================================ */

export const Header = ({ onQuote }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("main");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      const t = setTimeout(() => setMobileView("main"), 250);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const servicesItem = NAV_ITEMS.find((i) => i.groups);

  return (
    <>
      <header
        data-scrolled={scrolled}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: scrolled ? "rgba(255,255,255,0.92)" : "var(--paper)",
          backdropFilter: scrolled ? "saturate(160%) blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(160%) blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--ink-100)"
            : "1px solid transparent",
          height: scrolled ? 64 : 84,
          transition:
            "height .28s ease, background .25s ease, border-color .25s ease",
        }}
      >
        {/* --------- DEFAULT BAR (scroll yokken) --------- */}
        <div
          className="header-bar"
          data-variant="default"
          data-active={!scrolled}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 16,
            }}
          >
            <Link
              href="/"
              aria-label="Marer Sigorta — Ana Sayfa"
              style={{ display: "flex" }}
            >
              <LogoMarer height={60} />
            </Link>

            <nav
              className="desktop-nav"
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  onMouseEnter={() => item.groups && setOpenMenu(item.label)}
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
                    {item.groups && <I.ChevronDown size={16} />}
                  </a>
                  {item.groups && openMenu === item.label && (
                    <MegaMenu
                      groups={item.groups}
                      onItemClick={() => setOpenMenu(null)}
                    />
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
                  transition:
                    "transform .15s ease, box-shadow .2s ease",
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
                <Link href="/#contact" className="btn btn-primary btn-sm">
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
        </div>

        {/* --------- SCROLLED BAR (sadece desktop, scroll edince) --------- */}
        <div
          className="header-bar"
          data-variant="scrolled"
          data-active={scrolled}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 14,
            }}
          >
            {/* SOL — logo icon */}
            <Link
              href="/"
              aria-label="Marer Sigorta — Ana Sayfa"
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <LogoMarer iconOnly height={36} />
            </Link>

            {/* ORTA — chip'ler + Tümünü Gör (mega menü) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flex: 1,
                minWidth: 0,
              }}
            >
              {QUICK_PRODUCTS.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="scrolled-chip"
                  data-priority={p.priority}
                  aria-label={`${p.label} sigortası`}
                >
                  <span className="scrolled-chip-icon" aria-hidden>
                    <p.Icon size={14} />
                  </span>
                  <span>{p.label}</span>
                </Link>
              ))}

              <div
                onMouseEnter={() => setOpenMenu("scrolled-all")}
                onMouseLeave={() => setOpenMenu(null)}
                style={{ position: "relative" }}
              >
                <Link
                  href="/#branches"
                  className="see-all-btn"
                  data-open={openMenu === "scrolled-all"}
                  aria-haspopup="true"
                  aria-expanded={openMenu === "scrolled-all"}
                >
                  Tümünü Gör
                  <I.ChevronDown size={14} />
                </Link>
                {openMenu === "scrolled-all" && (
                  <MegaMenu
                    groups={SERVICE_GROUPS}
                    align="center"
                    onItemClick={() => setOpenMenu(null)}
                  />
                )}
              </div>
            </div>

            {/* SAĞ — iletişim CTA'ları */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <a
                href="tel:+905011014725"
                className="scrolled-iconbtn"
                aria-label="Telefonla ara"
                title="Hemen ara"
              >
                <I.Phone size={16} />
              </a>
              <a
                href="https://wa.me/905011014725"
                target="_blank"
                rel="noopener noreferrer"
                className="scrolled-iconbtn scrolled-iconbtn--wa"
                aria-label="WhatsApp ile yaz"
                title="WhatsApp"
              >
                <I.Whatsapp size={16} />
              </a>
              {onQuote ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={onQuote}
                  type="button"
                  style={{ marginLeft: 4 }}
                >
                  Teklif Al
                  <I.ArrowRight size={16} />
                </button>
              ) : (
                <Link
                  href="/#contact"
                  className="btn btn-primary btn-sm"
                  style={{ marginLeft: 4 }}
                >
                  Teklif Al
                  <I.ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --------- MOBILE DRAWER --------- */}
      {mobileOpen && (
        <div className="mobile-drawer-backdrop" onClick={closeMobile}>
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
              <div className="mobile-drawer-pane">
                <nav className="mobile-nav" aria-label="Ana menü">
                  {NAV_ITEMS.map((it) => {
                    if (it.groups) {
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

              <div className="mobile-drawer-pane">
                <div className="mobile-submenu-title">Ürünlerimiz</div>
                {servicesItem?.groups?.map((g) => (
                  <MobileGroup
                    key={g.label}
                    group={g}
                    onItemClick={closeMobile}
                  />
                ))}
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
                  href="/#contact"
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
