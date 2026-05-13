"use client";

import type { ComponentType, FC } from "react";
import {
  UndrawTakingNotes,
  UndrawChoose,
  UndrawConfirmed,
} from "react-undraw-illustrations";
import { I, InfinityMark, type IconProps } from "./Icons";

interface UndrawComponent {
  primaryColor?: string;
  height?: string | number;
}

interface Value {
  Icon: ComponentType<IconProps>;
  title: string;
  desc: string;
}

const VALUES: Value[] = [
  {
    Icon: I.Handshake,
    title: "Tarafsız Danışmanlık",
    desc: "Tek bir şirkete bağlı değiliz. 30+ sigorta şirketinin teklifini karşılaştırır, size en uygununu öneririz.",
  },
  {
    Icon: I.Bolt,
    title: "Hızlı Teklif & İşlem",
    desc: "Hızlı teklif, aynı gün poliçe. Bürokrasi yok; sade ve şeffaf bir süreç.",
  },
  {
    Icon: I.Shield,
    title: "Sonsuz Destek",
    desc: "Poliçe satın aldıktan sonra da yanınızdayız. Hasar anında 7/24 ulaşılabilir bir acenteyiz.",
  },
  {
    Icon: I.Coins,
    title: "Avantajlı Fiyat",
    desc: "Toplu portföy gücümüzle, doğrudan satın almaya kıyasla daha avantajlı fiyatlar sunarız.",
  },
];

interface Step {
  n: string;
  title: string;
  desc: string;
  Illustration: FC<UndrawComponent>;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Bilgilerinizi paylaşın",
    desc: "Online formu doldurun ya da bizi arayın. Talebinizi kısa sürede iletin.",
    Illustration: UndrawTakingNotes,
  },
  {
    n: "02",
    title: "Tekliflerinizi inceleyin",
    desc: "Uzman danışmanımız 30+ şirket arasından en uygun seçenekleri karşılaştırarak sunar.",
    Illustration: UndrawChoose,
  },
  {
    n: "03",
    title: "Poliçeniz anında elinizde",
    desc: "Ödemenizi yapın, poliçeniz e-postanıza dakikalar içinde düşsün. Hasar anında biz buradayız.",
    Illustration: UndrawConfirmed,
  },
];

export const Why = () => (
  <section
    id="why"
    style={{
      paddingTop: "var(--pad-section)",
      paddingBottom: "var(--pad-section)",
      background: "var(--paper)",
    }}
  >
    <div className="container">
      <div
        className="why-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <div className="eyebrow">Neden Marer Sigorta?</div>
          <h2 className="section-h">Sonsuz koruma, sade bir süreç.</h2>
          <p className="section-sub" style={{ marginBottom: 28 }}>
            Logomuzdaki sonsuzluk (∞) sembolü bir söz: Sigortanız bizimle,
            kesintisiz. Belirsizliklere karşı yanınızdayız.
          </p>
          <div
            style={{
              padding: 24,
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, var(--brand-50), var(--paper))",
              border: "1px solid var(--brand-100)",
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 56,
                height: 56,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
                color: "white",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 8px 16px -8px rgba(86,172,214,0.6)",
              }}
            >
              <InfinityMark size={28} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 2 }}>
                Hayatın belirsizliklerine sonsuz güvence
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-500)" }}>
                Poliçeniz devam ettiği sürece, biz de buradayız.
              </div>
            </div>
          </div>
        </div>

        <div
          className="value-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {VALUES.map((v, i) => (
            <div
              key={i}
              style={{
                padding: 24,
                borderRadius: "var(--radius-lg)",
                background: "var(--paper)",
                border: "1px solid var(--ink-100)",
                transition: "all .25s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "var(--brand-200)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "var(--ink-100)";
                e.currentTarget.style.boxShadow = "none";
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
                  marginBottom: 14,
                }}
              >
                <v.Icon size={22} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-500)",
                  lineHeight: 1.55,
                }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const How = () => (
  <section
    id="how"
    style={{
      paddingTop: "var(--pad-section)",
      paddingBottom: "var(--pad-section)",
      background: "var(--ink-50)",
    }}
  >
    <div className="container">
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          Nasıl Çalışıyoruz?
        </div>
        <h2 className="section-h">3 adımda poliçeniz hazır.</h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          Süreç şeffaf, kolay ve hızlı. Sigortayı dert etmeyi bırakın; gerisini
          biz hallederiz.
        </p>
      </div>

      <div style={{ position: "relative" }}>
        <div
          className="how-line"
          style={{
            position: "absolute",
            left: "16%",
            right: "16%",
            top: 32,
            height: 2,
            background:
              "linear-gradient(90deg, var(--brand-100), var(--brand-300), var(--brand-100))",
            zIndex: 0,
          }}
        />

        <div
          className="how-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          {STEPS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 8px" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 999,
                  background: "var(--paper)",
                  border: "2px solid var(--brand-200)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 20px",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--brand-500)",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  width: "100%",
                  maxWidth: 240,
                  margin: "0 auto 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 160,
                }}
              >
                <s.Illustration primaryColor="#56ACD6" height="160px" />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--ink-500)",
                  maxWidth: 280,
                  margin: "0 auto",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
