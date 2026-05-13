import Link from "next/link";
import type { ReactNode } from "react";
import { I, LogoMarer } from "./Icons";
import { SocialLinks } from "./SocialLinks";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColProps {
  title: string;
  links?: FooterLink[];
  custom?: ReactNode;
}

const FooterCol = ({ title, links, custom }: FooterColProps) => (
  <div>
    <h4
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: "white",
        textTransform: "uppercase",
        letterSpacing: ".12em",
        marginBottom: 18,
      }}
    >
      {title}
    </h4>
    {custom ? (
      custom
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          fontSize: 14,
        }}
      >
        {links?.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

const SERVICES: FooterLink[] = [
  { label: "Trafik Sigortası", href: "/zorunlu-trafik-sigortasi" },
  { label: "Kasko Sigortası", href: "/kasko-sigortasi" },
  { label: "DASK", href: "/dask-zorunlu-deprem-sigortasi" },
  { label: "Konut Sigortası", href: "/konut-sigortasi" },
  { label: "Tamamlayıcı Sağlık", href: "/tamamlayici-saglik-sigortasi" },
  { label: "Özel Sağlık", href: "/ozel-saglik-sigortasi" },
  { label: "Seyahat Sağlık", href: "/seyahat-saglik-sigortasi" },
  { label: "Yeşil Kart", href: "/yesil-kart-sigortasi" },
  { label: "İşyeri / KOBİ", href: "/kobi-isyeri-sigortasi" },
  { label: "Ferdi Kaza & Hayat", href: "/ferdi-kaza-hayat-sigortasi" },
];

const CORPORATE: FooterLink[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Anlaşmalı Şirketler", href: "/anlasmali-sirketler" },
  { label: "Sıkça Sorulan Sorular", href: "/sikca-sorulan-sorular" },
  { label: "İletişim", href: "/iletisim" },
];

export const Footer = () => (
  <footer
    id="footer"
    style={{
      background: "var(--brand-900)",
      color: "rgba(255,255,255,0.75)",
      paddingTop: 72,
      paddingBottom: 24,
    }}
  >
    <div className="container">
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: 40,
          marginBottom: 56,
        }}
      >
        <div>
          <LogoMarer inverse />
          <p
            style={{
              marginTop: 20,
              fontSize: 14.5,
              lineHeight: 1.6,
              maxWidth: 320,
            }}
          >
            Bağımsız sigorta acentesi olarak 30+ sigorta şirketinin en uygun
            tekliflerini sizin için bir araya getiriyoruz. Sigortanız bizimle,
            kesintisiz.
          </p>
          <div style={{ marginTop: 24 }}>
            <SocialLinks size={38} gap={10} />
          </div>
        </div>

        <FooterCol title="Hizmetler" links={SERVICES} />
        <FooterCol title="Kurumsal" links={CORPORATE} />
        <FooterCol
          title="İletişim"
          custom={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                fontSize: 14,
              }}
            >
              <a
                href="https://share.google/bHzB3dtVtCEhMBjUQ"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <I.Pin size={16} color="var(--brand-300)" />
                <span>
                  Doğu Mah. Ihlamur Sk. No:34 D:2
                  <br />
                  34890 Pendik / İstanbul
                </span>
              </a>
              <a
                href="tel:+905011014725"
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  color: "white",
                }}
              >
                <I.Phone size={16} color="var(--brand-300)" />
                <span>+90 (501) 101 47 25</span>
              </a>
              <a
                href="mailto:info@marersigorta.com"
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <I.Mail size={16} color="var(--brand-300)" />
                <span>info@marersigorta.com</span>
              </a>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <I.Clock size={16} color="var(--brand-300)" />
                <span>
                  Hafta içi 09:00 – 18:00
                  <br />
                  Cumartesi 10:00 – 14:00
                </span>
              </div>
            </div>
          }
        />
      </div>

      <div
        style={{
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.10)",
          fontSize: 13,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        © 2026 Marer Sigorta. Tüm hakları saklıdır.
      </div>
    </div>
  </footer>
);
