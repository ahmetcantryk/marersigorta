import type { Metadata } from "next";
import Link from "next/link";
import {
  UndrawConnectingTeams,
  UndrawAgreement,
} from "react-undraw-illustrations";
import { I } from "@/components/Icons";
import { PageHero } from "@/components/marketing/PageHero";
import { PageBreadcrumb } from "@/components/marketing/PageBreadcrumb";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { PageFinalCta } from "@/components/marketing/PageFinalCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

export const metadata: Metadata = {
  title: "Hakkımızda | Marer Sigorta — Bağımsız Sigorta Acentesi",
  description:
    "Marer Sigorta; bağımsız bir sigorta acentesi olarak 30+ sigorta şirketinin tekliflerini karşılaştırır, müşterilerine tarafsız danışmanlık ve sonsuz destek sunar.",
  alternates: { canonical: `${SITE_URL}/hakkimizda` },
  openGraph: {
    title: "Hakkımızda | Marer Sigorta",
    description:
      "Bağımsız sigorta acentesi olarak 30+ şirketin tekliflerini sizin için karşılaştırıyor, tarafsız danışmanlık veriyoruz.",
    url: `${SITE_URL}/hakkimizda`,
    type: "website",
    locale: "tr_TR",
  },
};

const VALUES = [
  {
    Icon: I.Handshake,
    title: "Tarafsız Danışmanlık",
    desc: "Tek bir şirkete bağlı değiliz. 30+ sigorta şirketinin tekliflerini karşılaştırarak yalnızca sizin yararınıza karar veririz.",
  },
  {
    Icon: I.Bolt,
    title: "Hızlı & Şeffaf Süreç",
    desc: "Karmaşık prosedürleri sadeleştirir, fiyat ve teminat detaylarını açıkça anlatırız. Aynı gün poliçe garantisiyle iş yükünüzü en aza indiririz.",
  },
  {
    Icon: I.Shield,
    title: "Sonsuz Destek",
    desc: "Poliçeyi satmak değil, sigortanızın hayatınızı kolaylaştırması önceliğimiz. Hasar anında bile 7/24 ulaşabileceğiniz bir acenteyiz.",
  },
];

const STATS = [
  { v: "30+", l: "Anlaşmalı sigorta şirketi" },
  { v: "8.500+", l: "Mutlu müşteri" },
  { v: "%98", l: "Memnuniyet oranı" },
  { v: "7/24", l: "Hasar desteği" },
];

const FEATURES = [
  {
    Icon: I.Coins,
    title: "Avantajlı Fiyat",
    desc: "Toplu portföy gücümüzle, doğrudan satın almaya kıyasla daha avantajlı fiyatlar sunarız.",
  },
  {
    Icon: I.Sparkle,
    title: "Uzman Acente",
    desc: "Sigortacılık deneyimimizle, ihtiyacınıza tam uygun teminat paketini birlikte belirleriz.",
  },
  {
    Icon: I.Lock,
    title: "KVKK Güvencesi",
    desc: "Bilgileriniz KVKK uyumlu altyapımızda korunur, üçüncü kişilerle paylaşılmaz.",
  },
  {
    Icon: I.Star,
    title: "Yüksek Müşteri Memnuniyeti",
    desc: "Müşterilerimizden aldığımız 4.9/5 puan, sade ve şeffaf yaklaşımımızın bir yansımasıdır.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageBreadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hakkımızda" },
        ]}
      />
      <PageHero
        eyebrow="Marer Sigorta"
        title="Sigortacılığı sade, şeffaf ve insan odaklı yapıyoruz."
        subtitle="Bağımsız bir sigorta acentesi olarak; tek bir şirkete bağlı kalmadan, 30+ sigorta şirketinin tekliflerini sizin için karşılaştırır, yalnızca sizin yararınıza karar veririz."
        badges={[
          "Bağımsız sigorta acentesi",
          "30+ sigorta şirketi karşılaştırması",
          "Hasar anında 7/24 destek",
        ]}
        Illustration={UndrawConnectingTeams}
      />

      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 72px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
          background: "var(--paper)",
        }}
      >
        <div
          className="container about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "5% -5%",
                borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                background:
                  "radial-gradient(circle at 30% 30%, var(--brand-100), transparent 65%)",
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
              <UndrawAgreement primaryColor="#3C92BF" height="360px" />
            </div>
          </div>

          <div>
            <SectionTitle eyebrow="Hikayemiz" title="Bizi tanıyın" />
            <p
              style={{
                fontSize: 16,
                color: "var(--ink-700)",
                lineHeight: 1.75,
                marginBottom: 14,
              }}
            >
              Marer Sigorta, İstanbul Pendik merkezli bir sigorta acentesi olarak
              kuruldu. Misyonumuz net: müşterilerimize tarafsız danışmanlıkla en
              uygun teminatı bulmak ve poliçe sonrası süreçte de yanlarında
              olmak.
            </p>
            <p
              style={{
                fontSize: 16,
                color: "var(--ink-700)",
                lineHeight: 1.75,
                marginBottom: 14,
              }}
            >
              Bireysel müşterilerden KOBİ&apos;lere kadar geniş bir portföyle
              çalışıyoruz. Trafik, kasko, konut, DASK, sağlık, seyahat ve işyeri
              sigortalarında uzmanlığımızla; sigortayı dert etmenize gerek
              kalmadan size en uygun çözümü üretiyoruz.
            </p>
            <p
              style={{
                fontSize: 16,
                color: "var(--ink-700)",
                lineHeight: 1.75,
              }}
            >
              Logomuzdaki sonsuzluk (∞) sembolü, müşterilerimize verdiğimiz
              sözün karşılığıdır:{" "}
              <strong style={{ color: "var(--ink-900)" }}>
                Sigortanız bizimle, kesintisiz güvende.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 72px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
          background: "var(--ink-50)",
        }}
      >
        <div className="container">
          <SectionTitle
            eyebrow="Değerlerimiz"
            title="Üç temel söz veriyoruz"
            align="center"
            subtitle="Marer Sigorta'da çalışma şeklimizi belirleyen ilkeler, her müşteri ilişkisinin temelini oluşturur."
          />
          <div
            className="value-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {VALUES.map((v) => (
              <div
                key={v.title}
                style={{
                  padding: 28,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--paper)",
                  border: "1px solid var(--ink-100)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <v.Icon size={24} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{v.title}</h3>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "var(--ink-500)",
                    lineHeight: 1.6,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 72px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
          background: "var(--paper)",
        }}
      >
        <div className="container">
          <SectionTitle
            eyebrow="Rakamlarla"
            title="Marer Sigorta"
            align="center"
          />
          <div
            className="about-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              padding: 28,
              borderRadius: "var(--radius-xl)",
              background:
                "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
              color: "white",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.l}
                style={{
                  padding: "12px 8px",
                  textAlign: "center",
                  borderRight: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3.4vw, 38px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.85)",
                    marginTop: 4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 72px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
          background: "var(--ink-50)",
        }}
      >
        <div className="container">
          <SectionTitle
            eyebrow="Neden Marer?"
            title="Bağımsız acentenin avantajları"
            align="center"
            subtitle="Marer Sigorta'yı tercih etmek; sadece bir poliçe satın almak değil, sigortacılık ihtiyaçlarınız için sürekli bir ortak edinmek demektir."
          />
          <div
            className="value-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: 22,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--paper)",
                  border: "1px solid var(--ink-100)",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    borderRadius: 12,
                    background: "var(--brand-50)",
                    color: "var(--brand-500)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <f.Icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16.5, fontWeight: 700, marginBottom: 4 }}>
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ink-500)",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: 24,
              borderRadius: "var(--radius-lg)",
              background: "var(--paper)",
              border: "1px dashed var(--brand-200)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "var(--accent-500)",
                  color: "white",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <I.Shield size={22} />
              </div>
              <div>
                <div
                  style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 2 }}
                >
                  Lisanslı Acente
                </div>
                <div style={{ fontWeight: 700 }}>T230525-FSI2</div>
              </div>
            </div>
            <Link href="/anlasmali-sirketler" className="btn btn-ghost btn-sm">
              Anlaşmalı şirketleri gör <I.ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <PageFinalCta title="Sigortanız için doğru ortağı seçtiniz" />
    </main>
  );
}
