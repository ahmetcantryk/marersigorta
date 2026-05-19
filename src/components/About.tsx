import { UndrawAgreement } from "react-undraw-illustrations";
import { I } from "./Icons";

export const About = () => (
  <section
    id="about"
    style={{
      paddingTop: "var(--pad-section)",
      paddingBottom: "var(--pad-section)",
      background: "var(--ink-50)",
    }}
  >
    <div className="container">
      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
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
            padding: "20px 20px 40px",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "10% -5%",
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
              maxWidth: 480,
            }}
          >
            <UndrawAgreement primaryColor="#3C92BF" height="360px" />
          </div>

          <div
            style={{
              position: "absolute",
              left: 4,
              bottom: 4,
              background: "var(--paper)",
              padding: "12px 16px",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--accent-500)",
                color: "white",
                display: "grid",
                placeItems: "center",
              }}
            >
              <I.Shield size={18} />
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--ink-500)" }}>
                Lisanslı Acente
              </div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>T230525-FSI2</div>
            </div>
          </div>
        </div>

        <div>
          <div className="eyebrow">Marer Sigorta Hakkında</div>
          <h2 className="section-h">
            Tek bir vaat: süreklilik.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-500)",
              marginBottom: 16,
              marginTop: 14,
            }}
          >
            2023 yılından bu yana İstanbul merkezli ofisimizden tüm
            Türkiye&apos;ye sigortacılık hizmeti sunuyoruz. Bireysel
            müşterilerden KOBİ&apos;lere kadar geniş bir müşteri portföyüyle
            çalışmaktayız.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-500)",
              marginBottom: 16,
            }}
          >
            Genç ve dinamik yapımız sayesinde, güncel sigorta mevzuatlarını
            yakından takip eden ve bu gelişmeleri iş süreçlerine en hızlı
            entegre eden şirketlerden biri olmanın avantajını kullanıyoruz.
          </p>
          <p style={{ fontSize: 16, color: "var(--ink-500)", marginBottom: 28 }}>
            Misyonumuz net: müşterilerimize tarafsız danışmanlık sunarak en
            uygun teminatı bulmak ve poliçe sonrası süreçte de her zaman
            yanlarında yer almak. Logomuzda yer alan sonsuzluk (∞) sembolü, bu
            süreklilik ve güven anlayışımızın bir yansımasıdır.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              paddingTop: 24,
              borderTop: "1px solid var(--ink-200)",
            }}
          >
            {[
              { v: "8.500+", l: "Mutlu müşteri" },
              { v: "30+", l: "Şirket anlaşması" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    fontWeight: 800,
                    color: "var(--brand-500)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.v}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--ink-500)" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            <a href="#about" className="btn btn-primary">
              Daha Fazla Bilgi <I.ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Bize Ulaşın
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
