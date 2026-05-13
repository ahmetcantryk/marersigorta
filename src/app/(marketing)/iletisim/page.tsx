import type { Metadata } from "next";
import { UndrawConversation } from "react-undraw-illustrations";
import { I } from "@/components/Icons";
import { PageHero } from "@/components/marketing/PageHero";
import { PageBreadcrumb } from "@/components/marketing/PageBreadcrumb";
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
          paddingTop: "clamp(40px, 5vw, 72px)",
          paddingBottom: "clamp(32px, 4vw, 56px)",
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

      <Contact />
    </main>
  );
}
