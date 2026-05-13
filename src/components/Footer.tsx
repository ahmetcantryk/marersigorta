import type { ReactNode } from "react";
import { I, LogoMarer } from "./Icons";
import { SocialLinks } from "./SocialLinks";

interface FooterColProps {
  title: string;
  links?: string[];
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
          <a key={l} href="#">
            {l}
          </a>
        ))}
      </div>
    )}
  </div>
);

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

        <FooterCol
          title="Hizmetler"
          links={[
            "Trafik Sigortası",
            "Kasko",
            "DASK",
            "Konut Sigortası",
            "Tamamlayıcı Sağlık",
            "Özel Sağlık",
            "Seyahat Sağlık",
            "İşyeri",
            "Ferdi Kaza",
          ]}
        />
        <FooterCol
          title="Kurumsal"
          links={[
            "Hakkımızda",
            "Anlaşmalı Şirketler",
            "Hasar İşlemleri",
            "SSS",
            "Blog",
            "Kariyer",
          ]}
        />
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
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 13,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <div>© 2026 Marer Sigorta. Tüm hakları saklıdır.</div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="#">KVKK Aydınlatma</a>
          <a href="#">Çerez Politikası</a>
          <a href="#">Gizlilik Politikası</a>
          <a href="#">Kullanım Şartları</a>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        TOBB Sicil No: ##### · Levha No: ##### · SBM Sicil No: #####
      </div>
    </div>
  </footer>
);
