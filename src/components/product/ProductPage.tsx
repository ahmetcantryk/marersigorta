import Link from "next/link";
import type { ProductData, CoverageItem, FaqItem, ComparisonTable, StepItem } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import { I } from "@/components/Icons";
import { ProductJsonLd } from "./JsonLd";
import { ProductQuoteForm } from "./ProductQuoteForm";
import { MobileProductCta } from "./MobileProductCta";

interface ProductPageProps {
  product: ProductData;
}

export const ProductPage = ({ product }: ProductPageProps) => {
  return (
    <>
      <ProductJsonLd product={product} />
      <article>
        <Breadcrumb short={product.short} />
        <Hero product={product} />
        <main
          className="container product-shell"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 40,
            paddingTop: "clamp(24px, 3vw, 40px)",
            paddingBottom: "clamp(24px, 3vw, 40px)",
          }}
        >
          <Nedir product={product} />
          <Coverage
            title={product.teminatlar.title ?? "Ana Teminatlar"}
            items={product.teminatlar.items}
            accent
          />
          {product.ekTeminatlar && (
            <Coverage
              title={product.ekTeminatlar.title}
              items={product.ekTeminatlar.items}
            />
          )}
          {product.limitTable && <InfoTable table={product.limitTable} highlight />}
          {product.fiyatKriterleri && (
            <PriceCriteria items={product.fiyatKriterleri} />
          )}
          {product.comparison && <InfoTable table={product.comparison} />}
          {product.nasilYaptirilir && (
            <StepsBlock steps={product.nasilYaptirilir} />
          )}
          <NotCoveredList items={product.teminatDisi} />
          {product.faq.length > 0 && <FaqAccordion items={product.faq} />}
        </main>
        <CrossSell slugs={product.crossSell} />
        <FinalCta product={product} />
      </article>
      <MobileProductCta />
    </>
  );
};

/* ---------------- Breadcrumb ---------------- */

const Breadcrumb = ({ short }: { short: string }) => (
  <nav
    aria-label="Breadcrumb"
    style={{
      background: "var(--ink-50)",
      borderBottom: "1px solid var(--ink-100)",
    }}
  >
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 0",
        fontSize: 13,
        color: "var(--ink-500)",
      }}
    >
      <Link href="/" style={{ color: "var(--ink-500)" }}>
        Ana Sayfa
      </Link>
      <I.ChevronRight size={14} />
      <Link href="/#branches" style={{ color: "var(--ink-500)" }}>
        Hizmetlerimiz
      </Link>
      <I.ChevronRight size={14} />
      <span style={{ color: "var(--ink-900)", fontWeight: 600 }}>{short}</span>
    </div>
  </nav>
);

/* ---------------- Hero ---------------- */

const Hero = ({ product }: { product: ProductData }) => {
  return (
    <section
      style={{
        position: "relative",
        background:
          "linear-gradient(135deg, var(--brand-700), var(--brand-500))",
        color: "white",
        overflow: "hidden",
        paddingTop: "clamp(36px, 4.5vw, 64px)",
        paddingBottom: "clamp(40px, 5vw, 72px)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.18), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-12%",
          top: "-30%",
          width: "60%",
          height: "120%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="container product-hero"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(360px,460px)",
          gap: 36,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              marginBottom: 18,
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
            {product.hero.eyebrow}
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              marginBottom: 18,
              lineHeight: 1.15,
            }}
          >
            {product.hero.title}
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.88)",
              maxWidth: 560,
              marginBottom: 24,
            }}
          >
            {product.hero.subtitle}
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 28px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {product.hero.badges.map((b) => (
              <li
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14.5,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <I.Check size={14} sw={2.4} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href="/#hero"
              className="btn btn-lg"
              style={{ background: "white", color: "var(--brand-700)" }}
            >
              Hemen Teklif Al <I.ArrowRight size={18} />
            </Link>
            <a
              href="tel:+905011014725"
              className="btn btn-lg"
              style={{
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.32)",
              }}
            >
              <I.Phone size={18} /> Bizi Arayın
            </a>
          </div>
        </div>

        <div className="product-hero-form">
          <ProductQuoteForm
            productSlug={product.slug}
            productLabel={product.short}
            variant="wide"
          />
        </div>
      </div>
    </section>
  );
};

/* ---------------- Nedir ---------------- */

const Nedir = ({ product }: { product: ProductData }) => (
  <section>
    <SectionTitle eyebrow="Tanım" title={`${product.short} nedir?`} />
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {product.nedir.paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: 16,
            color: "var(--ink-700)",
            lineHeight: 1.7,
          }}
        >
          {p}
        </p>
      ))}
      {product.nedir.callout && (
        <div
          style={{
            marginTop: 6,
            padding: "16px 18px",
            borderRadius: "var(--radius)",
            background:
              "linear-gradient(135deg, var(--brand-50), color-mix(in oklch, var(--accent-500) 8%, white))",
            border: "1px solid var(--brand-100)",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            fontSize: 14.5,
            color: "var(--ink-700)",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              flexShrink: 0,
              borderRadius: 8,
              background: "var(--brand-500)",
              color: "white",
              display: "grid",
              placeItems: "center",
              marginTop: 1,
            }}
          >
            <I.AlertTriangle size={16} />
          </span>
          <span>{product.nedir.callout}</span>
        </div>
      )}
    </div>
  </section>
);

/* ---------------- Coverage ---------------- */

const Coverage = ({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: CoverageItem[];
  accent?: boolean;
}) => (
  <section>
    <SectionTitle
      eyebrow={accent ? "Teminat" : "Ek Teminat"}
      title={title}
    />
    <div
      className="coverage-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 14,
      }}
    >
      {items.map((c) => (
        <div
          key={c.title}
          style={{
            padding: 18,
            borderRadius: "var(--radius-lg)",
            background: "var(--paper)",
            border: "1px solid var(--ink-100)",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 11,
              background: accent ? "var(--brand-500)" : "var(--brand-50)",
              color: accent ? "white" : "var(--brand-500)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <c.Icon size={20} />
          </div>
          <div>
            <div
              style={{
                fontSize: 15.5,
                fontWeight: 700,
                marginBottom: 4,
                color: "var(--ink-900)",
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: "var(--ink-500)",
                lineHeight: 1.55,
              }}
            >
              {c.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------------- InfoTable ---------------- */

const InfoTable = ({
  table,
  highlight = false,
}: {
  table: ComparisonTable;
  highlight?: boolean;
}) => (
  <section>
    {table.title && (
      <SectionTitle
        eyebrow={highlight ? "Limitler" : "Karşılaştırma"}
        title={table.title}
      />
    )}
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--ink-100)",
        overflow: "hidden",
        background: "var(--paper)",
      }}
    >
      <div className="table-scroll" style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14.5,
          }}
        >
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    textAlign: "left",
                    padding: "14px 18px",
                    background: "var(--ink-50)",
                    color: "var(--ink-700)",
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    borderBottom: "1px solid var(--ink-100)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const isLastColEmphasis =
                    highlight && ci === row.length - 1 && ri >= 0;
                  return (
                    <td
                      key={ci}
                      style={{
                        padding: "14px 18px",
                        borderBottom:
                          ri === table.rows.length - 1
                            ? "none"
                            : "1px solid var(--ink-100)",
                        color: isLastColEmphasis
                          ? "var(--brand-700)"
                          : ci === 0
                            ? "var(--ink-900)"
                            : "var(--ink-700)",
                        fontWeight: ci === 0 || isLastColEmphasis ? 600 : 400,
                      }}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {table.note && (
      <p
        style={{
          marginTop: 10,
          fontSize: 13,
          color: "var(--ink-500)",
          fontStyle: "italic",
        }}
      >
        {table.note}
      </p>
    )}
  </section>
);

/* ---------------- PriceCriteria ---------------- */

const PriceCriteria = ({ items }: { items: string[] }) => (
  <section>
    <SectionTitle eyebrow="Prim" title="Fiyat belirleme kriterleri" />
    <div
      style={{
        padding: 24,
        borderRadius: "var(--radius-lg)",
        background: "var(--ink-50)",
        border: "1px solid var(--ink-100)",
      }}
    >
      <ul
        className="price-criteria-grid"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}
      >
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              fontSize: 14.5,
              color: "var(--ink-700)",
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                flexShrink: 0,
                borderRadius: 999,
                background: "var(--brand-500)",
                color: "white",
                display: "grid",
                placeItems: "center",
                marginTop: 1,
              }}
            >
              <I.Check size={14} sw={2.4} />
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ---------------- Steps ---------------- */

const StepsBlock = ({ steps }: { steps: StepItem[] }) => (
  <section>
    <SectionTitle eyebrow="Süreç" title="Nasıl yaptırılır?" />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: 16,
      }}
      className="steps-grid"
    >
      {steps.map((s, i) => (
        <div
          key={i}
          style={{
            padding: 22,
            borderRadius: "var(--radius-lg)",
            background: "var(--paper)",
            border: "1px solid var(--ink-100)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
              color: "white",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 15,
              marginBottom: 14,
            }}
          >
            {i + 1}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
            {s.title}
          </h3>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--ink-500)",
              lineHeight: 1.55,
            }}
          >
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

/* ---------------- Not Covered ---------------- */

const NotCoveredList = ({ items }: { items: string[] }) => (
  <section>
    <SectionTitle eyebrow="Dikkat" title="Teminat dışında kalan haller" />
    <div
      style={{
        padding: 24,
        borderRadius: "var(--radius-lg)",
        background: "color-mix(in oklch, #EF4444 5%, white)",
        border: "1px solid color-mix(in oklch, #EF4444 18%, white)",
      }}
    >
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
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              fontSize: 14.5,
              color: "var(--ink-700)",
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                flexShrink: 0,
                borderRadius: 999,
                background: "color-mix(in oklch, #EF4444 14%, white)",
                color: "#EF4444",
                display: "grid",
                placeItems: "center",
                marginTop: 1,
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              ×
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ---------------- FAQ ---------------- */

const FaqAccordion = ({ items }: { items: FaqItem[] }) => (
  <section>
    <SectionTitle eyebrow="SSS" title="Sıkça sorulan sorular" />
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((f, i) => (
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
              lineHeight: 1.65,
            }}
          >
            {f.a}
          </div>
        </details>
      ))}
    </div>
    <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
      <Link href="/sikca-sorulan-sorular" className="btn btn-outline">
        Devamını Gör <I.ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

/* ---------------- CrossSell ---------------- */

const CrossSell = ({ slugs }: { slugs: string[] }) => {
  const related = slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is ProductData => Boolean(p));
  if (related.length === 0) return null;
  return (
    <section
      style={{
        background: "var(--ink-50)",
        paddingTop: "clamp(36px, 4.5vw, 64px)",
        paddingBottom: "clamp(36px, 4.5vw, 64px)",
        borderTop: "1px solid var(--ink-100)",
      }}
    >
      <div className="container">
        <SectionTitle eyebrow="Devamı" title="İlgili ürünler" />
        <div
          className="cross-sell-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              style={{
                padding: 22,
                background: "var(--paper)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--ink-100)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                transition: "transform .2s, box-shadow .2s, border-color .2s",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "var(--brand-50)",
                  color: "var(--brand-500)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 4,
                }}
              >
                <p.CardIcon size={22} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{p.card}</h3>
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--ink-500)",
                  lineHeight: 1.5,
                }}
              >
                {p.cardDesc}
              </p>
              <span
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--brand-500)",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Detayları gör <I.ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Final CTA ---------------- */

const FinalCta = ({ product }: { product: ProductData }) => (
  <section
    style={{
      paddingTop: "clamp(40px, 5vw, 72px)",
      paddingBottom: "clamp(40px, 5vw, 72px)",
      background:
        "linear-gradient(135deg, var(--brand-700), var(--brand-500))",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 80% 100%, rgba(255,255,255,0.18), transparent 60%)",
      }}
    />
    <div
      className="container"
      style={{
        position: "relative",
        textAlign: "center",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "clamp(26px, 3.4vw, 40px)",
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        {product.short} için size özel teklif
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.88)",
          marginBottom: 28,
          maxWidth: 540,
          margin: "0 auto 28px",
        }}
      >
        30+ sigorta şirketinin tekliflerini karşılaştırıyor, size en uygununu 1
        saat içinde iletiyoruz.
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href="/#hero"
          className="btn btn-lg"
          style={{ background: "white", color: "var(--brand-700)" }}
        >
          Hemen Teklif Al <I.ArrowRight size={18} />
        </Link>
        <a
          href="tel:+905011014725"
          className="btn btn-lg"
          style={{
            color: "white",
            border: "1.5px solid rgba(255,255,255,0.35)",
          }}
        >
          <I.Phone size={18} /> Bizi Arayın
        </a>
      </div>
    </div>
  </section>
);

/* ---------------- SectionTitle ---------------- */

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <header style={{ marginBottom: 22 }}>
    <div className="eyebrow">{eyebrow}</div>
    <h2
      style={{
        fontSize: "clamp(22px, 2.6vw, 30px)",
        fontWeight: 700,
        margin: 0,
      }}
    >
      {title}
    </h2>
  </header>
);
