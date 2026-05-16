import type { Metadata } from "next";
import Link from "next/link";
import { UndrawSpecs } from "react-undraw-illustrations";
import { I } from "@/components/Icons";
import { PageHero } from "@/components/marketing/PageHero";
import { PageBreadcrumb } from "@/components/marketing/PageBreadcrumb";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { PageFinalCta } from "@/components/marketing/PageFinalCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Marer Sigorta",
  description:
    "Trafik, kasko, DASK, konut, sağlık ve seyahat sigortaları hakkında en sık sorulan sorular ve uzman cevapları.",
  alternates: { canonical: `${SITE_URL}/sikca-sorulan-sorular` },
  openGraph: {
    title: "Sıkça Sorulan Sorular | Marer Sigorta",
    description:
      "Sigorta hakkında merak ettiğiniz tüm soruların cevapları tek sayfada.",
    url: `${SITE_URL}/sikca-sorulan-sorular`,
    type: "website",
    locale: "tr_TR",
  },
};

interface FaqGroup {
  category: string;
  description: string;
  items: { q: string; a: string }[];
}

const FAQ_GROUPS: FaqGroup[] = [
  {
    category: "Genel",
    description: "Acente, süreç ve gizlilik hakkında",
    items: [
      {
        q: "Sigorta şirketi ile acente arasındaki fark nedir?",
        a: "Sigorta şirketi poliçeyi düzenleyen kuruluştur. Acente ise sizin adınıza birden fazla şirketle çalışıp en uygun teklifi bulan bağımsız aracıdır. Acente üzerinden satın almak, doğrudan satın almaya kıyasla genellikle daha avantajlıdır; üstelik hasar anında destek alacağınız bir muhatabınız olur.",
      },
      {
        q: "Marer Sigorta tarafsız bir acente mi?",
        a: "Evet. 30+ sigorta şirketi ile çalışıyoruz ve hiçbirinin bağlı acentesi değiliz. Her ürün için size en uygun teklifi tarafsız olarak değerlendiriyoruz.",
      },
      {
        q: "Bilgilerim güvende mi?",
        a: "Evet. KVKK uyumlu altyapımızda sadece teklif ve poliçe işlemleri için gerekli olan bilgiler işlenir. Verileriniz üçüncü kişilerle paylaşılmaz; sadece teklif aldığınız sigorta şirketleriyle, KVKK çerçevesinde paylaşılır.",
      },
      {
        q: "Poliçemi başka bir acenteye nasıl taşırım?",
        a: "Mevcut poliçenizin vade bitimine yakın bir tarihte bizi arayın. Poliçenizin yenilemesini bizim üzerimizden yaptığınızda otomatik olarak yeni acenteniz oluruz. Süreç tamamen ücretsiz ve sizin için sıfır iş yükü ile gerçekleşir.",
      },
      {
        q: "Online satın aldığım poliçe ne zaman geçerli olur?",
        a: "Ödemeniz onaylandıktan sonra poliçe genellikle aynı gün, çoğunlukla dakikalar içinde geçerli olur. Poliçeniz e-postanıza otomatik olarak iletilir; e-Devlet üzerinden de görüntüleyebilirsiniz.",
      },
    ],
  },
  {
    category: "Trafik & Kasko",
    description: "Araç sigortaları hakkında",
    items: [
      {
        q: "Trafik sigortası ile kasko arasındaki fark nedir?",
        a: "Trafik sigortası, kazada karşı tarafa verilen maddi ve bedeni zararları zorunlu olarak karşılarken; kasko sigortası isteğe bağlı olup, kendi aracınızı kaza, çalınma, yangın ve benzeri risklere karşı güvence altına alır.",
      },
      {
        q: "Hasarsızlık indirimimi başka şirkete taşıyabilir miyim?",
        a: "Evet. Yenileme döneminizde hasarınız yok ise hangi şirkete geçerseniz geçin hasarsızlık aktarımı yapılabilir.",
      },
      {
        q: "Aracım çalınırsa ne kadar sürede ödeme alırım?",
        a: "Yetkili makamların 30 günlük araştırma süresi sonrasında, bulunamadığına dair yazı ile sigorta şirketi tazminatı öder.",
      },
    ],
  },
  {
    category: "Sağlık",
    description: "TSS ve özel sağlık sigortası",
    items: [
      {
        q: "Tamamlayıcı sağlık sigortası neleri kapsar?",
        a: "TSS, anlaşmalı özel hastanelerde SGK fark ücretini sıfırlar. Yatılı ve ayakta tedavi, ameliyat, doğum, kontrol ve tahlil işlemlerinizi anlaşmalı kurumlarda ek ücret ödemeden alabilirsiniz. Standart özel sağlık sigortasına göre çok daha uygun fiyatlıdır.",
      },
      {
        q: "SGK'm yok, hangi sağlık sigortasını yaptırabilirim?",
        a: "SGK'nız yoksa TSS yaptıramazsınız. Bunun yerine Özel Sağlık Sigortası (ÖSS) seçeneğine yönelmelisiniz. ÖSS, premium hastane ağları, yurt dışı tedavi ve doğum teminatı gibi avantajlar sunar.",
      },
      {
        q: "Mevcut hastalığım var, kapsama girer mi?",
        a: "Mevcut hastalıklar genellikle sağlık sigortalarında teminat kapsamı dışında değerlendirilir; ancak bu durum poliçenin türüne ve özel şartlarına göre değişebilir. ÖBYG (Ömür boyu yenileme garantisi) kapsamında iseniz hiçbir muafiyet konmayacaktır.",
      },
      {
        q: "Bebeğime tek başına sağlık sigortası yaptırabilir miyim?",
        a: "Evet. Doğumdan 15 gün sonra bebeğiniz için sağlık sigortası poliçesi yaptırabilirsiniz. Doğumdan hemen sonra poliçe başlatmanız halinde, bebeğiniz sigorta şirketleri açısından 'yeni doğan' statüsünde değerlendirilir ve bu sayede bazı teminat ve haklardan daha erken yararlanma imkânı elde eder.",
      },
    ],
  },
  {
    category: "Konut & DASK",
    description: "Ev sigortaları ve zorunlu deprem",
    items: [
      {
        q: "DASK sigortasını kim ödemeli, ev sahibi mi kiracı mı?",
        a: "DASK (Zorunlu Deprem Sigortası) yasal olarak ev sahibinin sorumluluğundadır. Tapu işlemlerinde ve abonelik açtırırken aranır. Kiracılar kendi eşyaları için ek bir konut sigortası yaptırmayı düşünebilir.",
      },
      {
        q: "DASK ile konut sigortası aynı şey mi?",
        a: "Hayır. DASK sadece deprem ve binayı kapsar, zorunludur. Konut sigortası ise yangın, hırsızlık, sel, dahili su, cam kırılması gibi geniş riskleri kapsar; bina + eşyalarınızı korur. İdealde her ikisi birlikte yaptırılır.",
      },
      {
        q: "DASK fiyatları şirketten şirkete değişir mi?",
        a: "Hayır. Fiyatlar DASK tarafından belirlenir ve tüm sigorta şirketleri/acenteleri aynı tarifeyi uygular.",
      },
      {
        q: "Evimde antika eşyalar var, konut poliçesine dahil mi?",
        a: "Sanat eseri, antika, mücevher ve değerli madenler otomatik kapsama girmez. Bu eşyaları beyan ederek ek bedel ile poliçeye eklemelisiniz.",
      },
    ],
  },
  {
    category: "Hasar & Süreç",
    description: "Hasar anı ve sonrası",
    items: [
      {
        q: "Hasar anında ilk ne yapmalıyım?",
        a: "Önce can güvenliğinizi sağlayın. Trafik kazasıysa 155'i, yangın/deprem gibi durumlarda 112'yi arayın. Ardından bizi +90 (501) 101 47 25 numaralı hattan veya WhatsApp'tan arayın; uzman ekibimiz hasar bildirim sürecini sizin adınıza yönetir.",
      },
      {
        q: "Hasar dosyam reddedilirse ne yapabilirim?",
        a: "Sigorta şirketinin red gerekçesini inceleriz; itiraz ya da SBM Tahkim sürecine başvurabiliriz. Marer Sigorta tarafsız acente olarak bu süreçte sizi temsil eder.",
      },
      {
        q: "Tazminat ne kadar sürede ödenir?",
        a: "Hasar tespiti ve evrak tamamlama süresine bağlı olarak ortalama 7–30 iş günü içinde ödenir. Acil durumlarda hızlandırılmış süreç uygulanabilir.",
      },
      {
        q: "Anlaşmalı serviste mi tamir ettirmek zorundayım?",
        a: "Hayır. Ancak anlaşmalı servis kullanırsanız OEM (orijinal) parça ve işçilik garantisi gibi avantajlar elde edersiniz.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <PageBreadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Sıkça Sorulan Sorular" },
        ]}
      />
      <PageHero
        eyebrow="SSS"
        title="Sigorta hakkında merak edilenler"
        subtitle="Müşterilerimizden en sık aldığımız sorulara verdiğimiz net cevapları kategoriler halinde sizin için derledik."
        badges={[
          "5 kategori altında 20 soru",
          "Uzman ekibimizden cevaplar",
          "Hâlâ sorunuz varsa bize ulaşın",
        ]}
        Illustration={UndrawSpecs}
      />

      <nav
        aria-label="SSS kategorileri"
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--ink-100)",
          position: "sticky",
          top: 68,
          zIndex: 40,
        }}
      >
        <div
          className="container faq-nav"
          style={{
            display: "flex",
            gap: 8,
            padding: "14px 0",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {FAQ_GROUPS.map((g) => (
            <a
              key={g.category}
              href={`#${slug(g.category)}`}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                background: "var(--ink-50)",
                color: "var(--ink-700)",
                fontSize: 13.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
                border: "1px solid var(--ink-100)",
                transition: "background .15s, color .15s, border-color .15s",
              }}
            >
              {g.category}
            </a>
          ))}
        </div>
      </nav>

      <section
        style={{
          paddingTop: "clamp(28px, 3.5vw, 48px)",
          paddingBottom: "clamp(28px, 3.5vw, 48px)",
          background: "var(--paper)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          {FAQ_GROUPS.map((g) => (
            <div key={g.category} id={slug(g.category)}>
              <SectionTitle
                eyebrow={g.category}
                title={g.description}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {g.items.map((f, i) => (
                  <details
                    key={i}
                    className="faq-item"
                    style={{
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--ink-100)",
                      background: "var(--paper)",
                      overflow: "hidden",
                    }}
                  >
                    <summary
                      style={{
                        padding: "16px 20px",
                        cursor: "pointer",
                        listStyle: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        fontSize: 15.5,
                        fontWeight: 600,
                        color: "var(--ink-900)",
                      }}
                    >
                      <span>{f.q}</span>
                      <span className="faq-chev" aria-hidden>
                        <I.ChevronDown size={18} />
                      </span>
                    </summary>
                    <div
                      style={{
                        padding: "0 20px 18px",
                        fontSize: 14.5,
                        color: "var(--ink-500)",
                        lineHeight: 1.7,
                      }}
                    >
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          paddingTop: "clamp(36px, 4.5vw, 64px)",
          paddingBottom: "clamp(36px, 4.5vw, 64px)",
          background: "var(--ink-50)",
        }}
      >
        <div className="container">
          <div
            className="faq-still-question"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: 32,
              alignItems: "center",
              padding: "32px 28px",
              borderRadius: "var(--radius-xl)",
              background: "var(--paper)",
              border: "1px solid var(--ink-100)",
            }}
          >
            <div>
              <SectionTitle eyebrow="Hâlâ sorum var" title="Bize ulaşın" />
              <p
                style={{
                  fontSize: 15.5,
                  color: "var(--ink-500)",
                  lineHeight: 1.65,
                  marginBottom: 18,
                }}
              >
                Burada bulamadığınız bir sorunuz mu var? Uzman ekibimiz size 1
                saat içinde dönüş yapsın.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <Link href="/iletisim" className="btn btn-primary">
                  İletişime Geç <I.ArrowRight size={16} />
                </Link>
                <a href="tel:+905011014725" className="btn btn-outline">
                  <I.Phone size={16} /> +90 (501) 101 47 25
                </a>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: 22,
                borderRadius: "var(--radius-lg)",
                background:
                  "linear-gradient(135deg, var(--brand-50), var(--paper))",
                border: "1px solid var(--brand-100)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "#25D366",
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <I.Whatsapp size={22} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--ink-500)",
                      fontWeight: 600,
                      letterSpacing: ".04em",
                      textTransform: "uppercase",
                    }}
                  >
                    WhatsApp
                  </div>
                  <div style={{ fontWeight: 700 }}>Anında yanıt alın</div>
                </div>
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--ink-500)",
                  lineHeight: 1.55,
                }}
              >
                Hızlı sorular için WhatsApp üzerinden bize yazabilirsiniz.
              </p>
              <a
                href="https://wa.me/905011014725"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 10,
                  background: "#25D366",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <I.Whatsapp size={16} /> WhatsApp ile yaz
              </a>
            </div>
          </div>
        </div>
      </section>

      <PageFinalCta title="Sigortanız için doğru karar burada başlıyor" />
    </main>
  );
}

function slug(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
