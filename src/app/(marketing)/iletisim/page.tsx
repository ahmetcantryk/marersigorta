import type { Metadata } from "next";
import { UndrawConversation } from "react-undraw-illustrations";
import { I } from "@/components/Icons";
import { PageHero } from "@/components/marketing/PageHero";
import { PageBreadcrumb } from "@/components/marketing/PageBreadcrumb";
import { SocialLinks } from "@/components/SocialLinks";
import { Contact } from "@/components/Contact";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

export const metadata: Metadata = {
  title: "İletişim | Marer Sigorta — Bize Ulaşın",
  description:
    "Marer Sigorta ile iletişime geçin. Telefon, WhatsApp, e-posta veya formla ulaşın; uzman ekibimiz 1 saat içinde dönüş yapsın.",
  alternates: { canonical: `${SITE_URL}/iletisim` },
  openGraph: {
    title: "İletişim | Marer Sigorta",
    description:
      "Telefon, WhatsApp, e-posta veya form ile bize ulaşın. 1 saat içinde dönüş.",
    url: `${SITE_URL}/iletisim`,
    type: "website",
    locale: "tr_TR",
  },
};

const CONTACT_METHODS = [
  {
    Icon: I.Phone,
    label: "Telefon",
    value: "+90 (501) 101 47 25",
    href: "tel:+905011014725",
    color: "var(--brand-500)",
  },
  {
    Icon: I.Whatsapp,
    label: "WhatsApp",
    value: "+90 (501) 101 47 25",
    href: "https://wa.me/905011014725",
    color: "#25D366",
    external: true,
  },
  {
    Icon: I.Mail,
    label: "E-posta",
    value: "info@marersigorta.com",
    href: "mailto:info@marersigorta.com",
    color: "var(--brand-700)",
  },
];

const HOURS = [
  { day: "Pazartesi – Cuma", hours: "09:00 – 18:00" },
  { day: "Cumartesi", hours: "10:00 – 14:00" },
  { day: "Pazar", hours: "Kapalı" },
];

export default function ContactPage() {
  return (
    <main>
      <PageBreadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "İletişim" },
        ]}
      />
      <PageHero
        eyebrow="Bize Ulaşın"
        title="Sigortanız hakkında konuşalım"
        subtitle="Telefon, WhatsApp veya formdan bize ulaşın; uzman ekibimiz 1 saat içinde size özel bir teklif veya cevap ile dönüş yapsın."
        badges={[
          "1 saat içinde dönüş garantisi",
          "Telefon, WhatsApp, e-posta",
          "Pendik / İstanbul ofisinden",
        ]}
        Illustration={UndrawConversation}
      />

      <section
        style={{
          paddingTop: "clamp(56px, 7vw, 96px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          background: "var(--paper)",
        }}
      >
        <div className="container">
          <div
            className="contact-methods"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {CONTACT_METHODS.map((m) => (
              <a
                key={m.label}
                href={m.href}
                {...(m.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 22,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--paper)",
                  border: "1px solid var(--ink-100)",
                  transition:
                    "transform .2s, box-shadow .2s, border-color .2s",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    borderRadius: 14,
                    background: `color-mix(in oklch, ${m.color} 14%, white)`,
                    color: m.color,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <m.Icon size={24} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--ink-500)",
                      fontWeight: 600,
                      letterSpacing: ".04em",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 15.5,
                      fontWeight: 700,
                      color: "var(--ink-900)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          background: "var(--paper)",
        }}
      >
        <div
          className="container contact-info-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          <a
            href="https://share.google/bHzB3dtVtCEhMBjUQ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: 28,
              borderRadius: "var(--radius-xl)",
              background:
                "linear-gradient(135deg, var(--brand-700), var(--brand-500))",
              color: "white",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 220,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-30%",
                right: "-20%",
                width: "70%",
                height: "70%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.18), transparent 65%)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 12px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                <I.Pin size={12} /> Ofisimiz
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                Doğu Mah. Ihlamur Sk. No:34 D:2
              </h3>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.88)" }}>
                34890 Pendik / İstanbul
              </p>
            </div>
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 18,
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              Google Maps ile yol tarifi al <I.ArrowRight size={14} />
            </div>
          </a>

          <div
            style={{
              padding: 28,
              borderRadius: "var(--radius-xl)",
              background: "var(--paper)",
              border: "1px solid var(--ink-100)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 12px",
                borderRadius: 999,
                background: "var(--brand-50)",
                color: "var(--brand-700)",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                alignSelf: "flex-start",
              }}
            >
              <I.Clock size={12} /> Çalışma Saatleri
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "var(--ink-50)",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "var(--ink-700)" }}>{h.day}</span>
                  <span
                    style={{
                      color:
                        h.hours === "Kapalı"
                          ? "var(--ink-400)"
                          : "var(--ink-900)",
                      fontWeight: 600,
                    }}
                  >
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "auto",
                paddingTop: 16,
                borderTop: "1px solid var(--ink-100)",
              }}
            >
              <div
                style={{
                  fontSize: 11.5,
                  color: "var(--ink-500)",
                  fontWeight: 600,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Sosyal Medya
              </div>
              <SocialLinks
                only={["instagram", "linkedin", "whatsapp"]}
                size={38}
                gap={10}
              />
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
