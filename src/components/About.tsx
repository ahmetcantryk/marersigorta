import { I, InfinityMark } from "./Icons";

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
          gap: 56,
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "1/1",
            maxHeight: 460,
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "var(--radius-xl)",
              background:
                "linear-gradient(160deg, var(--brand-700), var(--brand-500))",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-30%",
                right: "-30%",
                width: "90%",
                height: "90%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.18), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: "-25%",
                left: "-15%",
                width: "70%",
                height: "70%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(16,185,129,0.22), transparent 65%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 18,
                color: "white",
                padding: 40,
                textAlign: "center",
              }}
            >
              <div className="about-mark">
                <InfinityMark size={88} color="white" stroke={2.4} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Marer Sigorta
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 2.6vw, 30px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  maxWidth: 320,
                }}
              >
                Sonsuz güvence, kesintisiz destek.
              </div>
              <div
                style={{
                  marginTop: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "var(--accent-500)",
                  }}
                />
                2013&apos;ten beri
              </div>
            </div>
          </div>

         
        </div>

        <div>
          <div className="eyebrow">Marer Sigorta Hakkında</div>
          <h2 className="section-h">
            12 yılı aşkın deneyim, tek bir vaat: süreklilik.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-500)",
              marginBottom: 16,
              marginTop: 14,
            }}
          >
            2013&apos;ten bu yana İstanbul merkezli ofisimizden tüm Türkiye&apos;ye
            sigortacılık hizmeti sunuyoruz. Bireysel müşterilerden KOBİ&apos;lere
            kadar geniş bir portföyle çalışıyoruz.
          </p>
          <p style={{ fontSize: 16, color: "var(--ink-500)", marginBottom: 28 }}>
            Misyonumuz net: müşterilerimize tarafsız danışmanlıkla en uygun
            teminatı bulmak ve poliçe sonrası süreçte de yanlarında olmak.
            Logomuzdaki sonsuzluk (∞) sembolü bu sözün karşılığıdır.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              paddingTop: 24,
              borderTop: "1px solid var(--ink-200)",
            }}
          >
            {[
              { v: "12+", l: "Yıllık tecrübe" },
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
