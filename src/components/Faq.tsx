"use client";

import { useState } from "react";
import { I } from "./Icons";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ: FaqItem[] = [
  {
    q: "Trafik sigortası ile kasko arasındaki fark nedir?",
    a: "Trafik sigortası yasal zorunluluktur ve sadece karşı tarafa verdiğiniz hasarı karşılar. Kasko ise isteğe bağlıdır; kendi aracınızda oluşan çarpışma, yanma, çalınma gibi hasarları teminat altına alır. İkisi farklı amaçlara hizmet eder ve çoğu sürücü için ikisinin de olması önerilir.",
  },
  {
    q: "DASK sigortasını kim ödemeli, ev sahibi mi kiracı mı?",
    a: "DASK (Zorunlu Deprem Sigortası) yasal olarak ev sahibinin sorumluluğundadır. Tapu işlemlerinde ve abonelik açtırırken aranır. Ancak konut sigortası eşyaları kapsadığından, kiracılar kendi eşyaları için ek bir konut sigortası yaptırmayı düşünebilir.",
  },
  {
    q: "Tamamlayıcı sağlık sigortası neleri kapsar?",
    a: "TSS, anlaşmalı özel hastanelerde SGK fark ücretini sıfırlar. Yatılı ve ayakta tedavi, ameliyat, doğum, kontrol ve tahlil işlemlerinizi anlaşmalı kurumlarda ek ücret ödemeden alabilirsiniz. Standart özel sağlık sigortasına göre çok daha uygun fiyatlıdır.",
  },
  {
    q: "Hasar anında ilk ne yapmalıyım?",
    a: "Önce can güvenliğinizi sağlayın. Trafik kazasıysa 155'i, yangın/deprem gibi durumlarda 112'yi arayın. Ardından bizi +90 (501) 101 47 25 numaralı acil hattan veya WhatsApp&apos;tan arayın; uzman ekibimiz hasar bildirim sürecini sizin adınıza yönetir.",
  },
  {
    q: "Online satın aldığım poliçe ne zaman geçerli olur?",
    a: "Ödemeniz onaylandıktan sonra poliçe genellikle aynı gün, çoğunlukla dakikalar içinde geçerli olur. Poliçeniz e-postanıza otomatik olarak iletilir; e-Devlet üzerinden de görüntüleyebilirsiniz.",
  },
  {
    q: "Sigorta şirketi ile acente arasındaki fark nedir?",
    a: "Sigorta şirketi poliçeyi düzenleyen kuruluştur. Acente ise sizin adınıza birden fazla şirketle çalışıp en uygun teklifi bulan bağımsız aracıdır. Acente üzerinden satın almak, doğrudan satın almaya kıyasla genellikle daha avantajlıdır; üstelik hasar anında destek alacağınız bir muhatabınız olur.",
  },
  {
    q: "Poliçemi başka bir acenteye nasıl taşırım?",
    a: "Mevcut poliçenizin vade bitimine yakın bir tarihte bizi arayın. Poliçenizin yenilemesini bizim üzerimizden yaptığınızda otomatik olarak yeni acenteniz oluruz. Süreç tamamen ücretsiz ve sizin için sıfır iş yükü ile gerçekleşir.",
  },
  {
    q: "Bilgilerim güvende mi?",
    a: "Evet. KVKK uyumlu altyapımızda sadece teklif ve poliçe işlemleri için gerekli olan bilgiler işlenir. Verileriniz üçüncü kişilerle paylaşılmaz; sadece teklif aldığınız sigorta şirketleriyle, KVKK çerçevesinde paylaşılır.",
  },
];

export const FaqSection = () => {
  const [open, setOpen] = useState<number>(0);
  return (
    <section
      id="faq"
      style={{
        paddingTop: "var(--pad-section)",
        paddingBottom: "var(--pad-section)",
        background: "var(--ink-50)",
      }}
    >
      <div className="container">
        <div
          className="faq-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div>
            <div className="eyebrow">Sıkça Sorulan Sorular</div>
            <h2 className="section-h">Sigortayla ilgili merak ettikleriniz.</h2>
            <p
              className="section-sub"
              style={{ marginTop: 14, marginBottom: 24 }}
            >
              Burada cevabını bulamadığınız sorular için bizi arayabilir veya
              WhatsApp üzerinden yazabilirsiniz. Her sorunuza net ve sade bir
              cevap vermeye söz veriyoruz.
            </p>
            <a href="#contact" className="btn btn-primary">
              Sorunuzu Yazın <I.ArrowRight size={16} />
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ.map((f, i) => {
              const active = open === i;
              return (
                <div
                  key={i}
                  style={{
                    background: "var(--paper)",
                    borderRadius: "var(--radius)",
                    border: `1px solid ${
                      active ? "var(--brand-200)" : "var(--ink-100)"
                    }`,
                    transition: "border-color .2s, box-shadow .2s",
                    boxShadow: active ? "var(--shadow-md)" : "none",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(active ? -1 : i)}
                    aria-expanded={active}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "20px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--ink-900)",
                      }}
                    >
                      {f.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        background: active ? "var(--brand-500)" : "var(--ink-50)",
                        color: active ? "white" : "var(--ink-700)",
                        display: "grid",
                        placeItems: "center",
                        transition: "all .2s",
                      }}
                    >
                      {active ? (
                        <I.Minus size={16} sw={2.5} />
                      ) : (
                        <I.Plus size={16} sw={2.5} />
                      )}
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: active ? 320 : 0,
                      transition: "max-height .35s ease",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "0 22px 22px",
                        fontSize: 15,
                        color: "var(--ink-500)",
                        lineHeight: 1.6,
                      }}
                    >
                      {f.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
