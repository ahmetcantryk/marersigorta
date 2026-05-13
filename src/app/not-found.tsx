import type { Metadata } from "next";
import Link from "next/link";
import { UndrawLost } from "react-undraw-illustrations";
import { I } from "@/components/Icons";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | Marer Sigorta",
  description:
    "Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek hizmetlerimizi keşfedebilirsiniz.",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  {
    label: "Hizmetlerimiz",
    desc: "10 sigorta ürünü, anlık karşılaştırma",
    href: "/#branches",
    Icon: I.Sparkle,
  },
  {
    label: "Sıkça Sorulan Sorular",
    desc: "Cevabı hazır 22+ soru",
    href: "/sikca-sorulan-sorular",
    Icon: I.Search,
  },
  {
    label: "İletişim",
    desc: "Telefon, WhatsApp, e-posta, form",
    href: "/iletisim",
    Icon: I.Phone,
  },
];

export default function NotFound() {
  return (
    <>
      <TopBar />
      <Header />
      <main
        style={{
          background:
            "linear-gradient(180deg, var(--paper) 0%, var(--brand-50) 100%)",
          paddingTop: "clamp(40px, 6vw, 80px)",
          paddingBottom: "clamp(48px, 7vw, 96px)",
        }}
      >
        <div
          className="container nf-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: "var(--brand-50)",
                border: "1px solid var(--brand-100)",
                color: "var(--brand-700)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              <I.AlertTriangle size={14} />
              Hata 404
            </div>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 14,
                color: "var(--ink-900)",
                letterSpacing: "-0.02em",
              }}
            >
              Bu sayfa kayıplara karışmış.
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "var(--ink-500)",
                lineHeight: 1.6,
                maxWidth: 480,
                marginBottom: 28,
              }}
            >
              Aradığınız sayfa bulunamadı, taşınmış veya silinmiş olabilir. Ama
              merak etmeyin — Marer Sigorta&apos;da kaybolmazsınız. Aşağıdan
              istediğiniz yere ulaşabilirsiniz.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-primary btn-lg">
                <I.ChevronLeft size={18} /> Ana Sayfaya Dön
              </Link>
              <a href="tel:+905011014725" className="btn btn-outline btn-lg">
                <I.Phone size={18} /> Bizi Arayın
              </a>
            </div>
          </div>

          <div
            className="nf-illu"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "5% -10%",
                borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                background:
                  "radial-gradient(circle at 50% 40%, var(--brand-100), transparent 65%)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: 460,
              }}
            >
              <UndrawLost primaryColor="#56ACD6" height="360px" />
            </div>
          </div>
        </div>

        <div
          className="container"
          style={{
            marginTop: "clamp(40px, 5vw, 64px)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <div
              className="eyebrow"
              style={{ justifyContent: "center", display: "inline-flex" }}
            >
              Hızlı bağlantılar
            </div>
            <h2
              style={{
                fontSize: "clamp(20px, 2.4vw, 26px)",
                fontWeight: 700,
                margin: "6px 0 0",
              }}
            >
              Bunlardan birine gitmek ister misiniz?
            </h2>
          </div>
          <div
            className="nf-links"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nf-link-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: 20,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--paper)",
                  border: "1px solid var(--ink-100)",
                  transition:
                    "transform .2s ease, box-shadow .2s ease, border-color .2s",
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
                    flexShrink: 0,
                  }}
                >
                  <l.Icon size={20} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--ink-900)",
                    }}
                  >
                    {l.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--ink-500)",
                      marginTop: 2,
                    }}
                  >
                    {l.desc}
                  </div>
                </div>
                <I.ArrowRight size={16} color="var(--brand-500)" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
