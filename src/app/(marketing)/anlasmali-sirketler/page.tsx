import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";
import { I, type IconProps } from "@/components/Icons";
import { PageBreadcrumb } from "@/components/marketing/PageBreadcrumb";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { PageFinalCta } from "@/components/marketing/PageFinalCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

export const metadata: Metadata = {
  title: "Anlaşmalı Sigorta Şirketleri | Marer Sigorta",
  description:
    "Marer Sigorta olarak 30+ sigorta şirketinin tekliflerini karşılaştırıyor, size en uygun fiyat ve teminatı sunuyoruz. Allianz, Anadolu, AXA, HDI, Quick ve daha fazlası.",
  alternates: { canonical: `${SITE_URL}/anlasmali-sirketler` },
  openGraph: {
    title: "Anlaşmalı Sigorta Şirketleri | Marer Sigorta",
    description:
      "30+ sigorta şirketi: Allianz, Anadolu, AXA, HDI, Quick, Türkiye, Mapfre, Aksigorta ve daha fazlası.",
    url: `${SITE_URL}/anlasmali-sirketler`,
    type: "website",
    locale: "tr_TR",
  },
};

const ALL_PARTNERS = [
  "Allianz",
  "Anadolu",
  "AXA",
  "HDI",
  "Mapfre",
  "Ray",
  "Türkiye",
  "Quick",
  "Aksigorta",
  "Zurich",
  "Sompo",
  "Referans",
  "Doğa",
  "Neova",
  "Unico",
  "Türk Nippon",
  "Eureko",
  "Bupa Acıbadem",
  "Bereket",
  "Magdeburger",
  "GIG",
  "Ankara",
  "Koru",
  "Quick Sigorta",
  "Şeker",
  "Emaa",
];

interface Category {
  Icon: ComponentType<IconProps>;
  title: string;
  desc: string;
  productSlug: string;
  partnerCount: number;
}

const CATEGORIES: Category[] = [
  {
    Icon: I.Car,
    title: "Araç Sigortaları",
    desc: "Trafik, kasko ve yeşil kart sigortalarında 30+ şirketin tekliflerini karşılaştırıyoruz.",
    productSlug: "kasko-sigortasi",
    partnerCount: 28,
  },
  {
    Icon: I.Home,
    title: "Konut & DASK",
    desc: "DASK zorunlu deprem ve kapsamlı konut sigortalarında uzman şirketlerle çalışıyoruz.",
    productSlug: "konut-sigortasi",
    partnerCount: 22,
  },
  {
    Icon: I.Heart,
    title: "Sağlık Sigortaları",
    desc: "Tamamlayıcı ve özel sağlık sigortalarında premium sağlık networklerine erişim.",
    productSlug: "tamamlayici-saglik-sigortasi",
    partnerCount: 14,
  },
  {
    Icon: I.Plane,
    title: "Seyahat & Yeşil Kart",
    desc: "Schengen onaylı ve yurt dışı geçerli sigortalarda en uygun primler.",
    productSlug: "seyahat-saglik-sigortasi",
    partnerCount: 18,
  },
  {
    Icon: I.Building,
    title: "İşyeri / KOBİ",
    desc: "KOBİ paketleri, ticari yangın ve iş durması teminatlarında sektör uzmanlığı.",
    productSlug: "kobi-isyeri-sigortasi",
    partnerCount: 16,
  },
  {
    Icon: I.HandHeart,
    title: "Ferdi Kaza & Hayat",
    desc: "Hayat ve ferdi kaza sigortalarında çeşitli plan seçenekleri.",
    productSlug: "ferdi-kaza-hayat-sigortasi",
    partnerCount: 12,
  },
];

interface WordmarkProps {
  name: string;
  idx: number;
}

const Wordmark = ({ name, idx }: WordmarkProps) => {
  const fonts = ['"Manrope"', '"Inter"', "Georgia, serif"];
  const weights = [800, 700, 600] as const;
  const styles: React.CSSProperties[] = [
    { transform: "none" },
    { fontStyle: "italic" },
    { letterSpacing: "-0.04em" },
    {
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      fontSize: 13,
    },
    { textTransform: "lowercase", letterSpacing: "-0.02em" },
  ];
  return (
    <div
      style={{
        height: 84,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: "var(--paper)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--ink-100)",
        color: "var(--ink-400)",
        transition: "color .2s, border-color .2s, transform .2s",
      }}
    >
      <span
        style={{
          fontFamily: fonts[idx % fonts.length],
          fontWeight: weights[idx % weights.length],
          fontSize: 17,
          whiteSpace: "nowrap",
          textAlign: "center",
          ...styles[idx % styles.length],
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default function PartnersPage() {
  return (
    <main>
      <PageBreadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Anlaşmalı Şirketler" },
        ]}
      />

      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 72px)",
          paddingBottom: "clamp(28px, 3.5vw, 48px)",
          background: "var(--paper)",
        }}
      >
        <div className="container">
          <SectionTitle
            eyebrow="Tüm Şirketler"
            title="Anlaşmalı sigorta şirketlerimiz"
            align="center"
            subtitle="Aşağıdaki 30+ sigorta şirketinden istediğiniz ürünün teklifini Marer Sigorta üzerinden alabilirsiniz."
          />
          <div
            className="partners-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {ALL_PARTNERS.map((p, i) => (
              <Wordmark key={p} name={p} idx={i} />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          paddingTop: "clamp(28px, 3.5vw, 48px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
          background: "var(--ink-50)",
        }}
      >
        <div className="container">
          <SectionTitle
            eyebrow="Kategoriler"
            title="Ürün bazında şirket sayıları"
            align="center"
            subtitle="Hangi sigorta türü için kaç şirketin tekliflerini karşılaştırdığımızı buradan görebilirsiniz."
          />
          <div
            className="partners-cat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {CATEGORIES.map((c) => (
              <Link
                key={c.title}
                href={`/${c.productSlug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  padding: 22,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--paper)",
                  border: "1px solid var(--ink-100)",
                  transition: "transform .2s, box-shadow .2s, border-color .2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
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
                    }}
                  >
                    <c.Icon size={22} />
                  </div>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: 999,
                      background: "var(--brand-50)",
                      color: "var(--brand-700)",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {c.partnerCount}+ şirket
                  </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700 }}>{c.title}</h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-500)",
                    lineHeight: 1.55,
                    minHeight: 60,
                  }}
                >
                  {c.desc}
                </p>
                <span
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--brand-500)",
                    fontWeight: 600,
                    fontSize: 13.5,
                  }}
                >
                  Detayları gör <I.ArrowRight size={14} />
                </span>
              </Link>
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
        <div
          className="container partners-advantage"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
            gap: 36,
            alignItems: "center",
          }}
        >
          <div>
            <SectionTitle
              eyebrow="Bağımsız Acente"
              title="Tek bir şirket değil, en iyi şirket"
            />
            <p
              style={{
                fontSize: 16,
                color: "var(--ink-700)",
                lineHeight: 1.75,
                marginBottom: 18,
              }}
            >
              Direkt satıcı veya bağlı acentenin aksine, Marer Sigorta size
              özel{" "}
              <strong style={{ color: "var(--ink-900)" }}>
                tarafsız bir karşılaştırma
              </strong>{" "}
              sunar. Her şirketin güçlü olduğu ürün ve teminat farklıdır; biz
              sizin için en uygununu buluruz.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                "Aynı poliçe için 30+ teklifi yan yana görün",
                "Her şirketin kampanya ve indirimlerinden yararlanın",
                "Yenileme döneminde otomatik en uygun teklif",
                "Hasar anında her şirkette aynı ekip yanınızda",
              ].map((line) => (
                <li
                  key={line}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    fontSize: 15,
                    color: "var(--ink-700)",
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      flexShrink: 0,
                      borderRadius: 999,
                      background: "var(--accent-500)",
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      marginTop: 1,
                    }}
                  >
                    <I.Check size={14} sw={2.4} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              position: "relative",
              padding: "32px 28px",
              borderRadius: "var(--radius-xl)",
              background:
                "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
              color: "white",
              overflow: "hidden",
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
                  "radial-gradient(circle, rgba(255,255,255,0.16), transparent 65%)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  opacity: 0.85,
                  marginBottom: 6,
                }}
              >
                Hızlı Karşılaştırma
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 14,
                  lineHeight: 1.3,
                }}
              >
                30+ şirketin tekliflerini 2 dakikada görün
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 22,
                  lineHeight: 1.55,
                }}
              >
                Uzman ekibimiz tüm anlaşmalı şirketler arasından size en uygun
                fiyat ve teminat kombinasyonunu sunsun.
              </p>
              <Link
                href="/#hero"
                className="btn btn-lg"
                style={{
                  background: "white",
                  color: "var(--brand-700)",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Hemen Teklif Al <I.ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PageFinalCta
        title="Hangi şirketten alacağınızı bilmiyor musunuz?"
        subtitle="Size en uygun şirketi 1 saat içinde belirleyip, en avantajlı teklifi iletelim."
      />
    </main>
  );
}
