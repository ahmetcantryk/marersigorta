"use client";

import { useState, type ComponentType } from "react";
import { I, type IconProps } from "./Icons";
import { SuccessModal } from "./SuccessModal";
import { submitLead } from "@/lib/lead-client";

type FieldType = "tc" | "plate" | "date" | "text";

interface QuoteField {
  key: string;
  label: string;
  placeholder: string;
  type: FieldType;
}

interface QuoteTab {
  id: string;
  label: string;
  Icon: ComponentType<IconProps>;
  fields: QuoteField[];
}

const QUOTE_TABS: QuoteTab[] = [
  {
    id: "trafik",
    label: "Trafik",
    Icon: I.Car,
    fields: [
      { key: "tc", label: "TC Kimlik No", placeholder: "11 haneli", type: "tc" },
      { key: "plaka", label: "Plaka", placeholder: "34 ABC 123", type: "plate" },
    ],
  },
  {
    id: "kasko",
    label: "Kasko",
    Icon: I.CarShield,
    fields: [
      { key: "tc", label: "TC Kimlik No", placeholder: "11 haneli", type: "tc" },
      { key: "plaka", label: "Plaka", placeholder: "34 ABC 123", type: "plate" },
    ],
  },
  {
    id: "konut",
    label: "Konut",
    Icon: I.Home,
    fields: [
      { key: "il", label: "İl", placeholder: "İstanbul", type: "text" },
      { key: "uavt", label: "UAVT veya Adres", placeholder: "Adres ya da UAVT no", type: "text" },
    ],
  },
  {
    id: "saglik",
    label: "Sağlık",
    Icon: I.Heart,
    fields: [
      { key: "tc", label: "TC Kimlik No", placeholder: "11 haneli", type: "tc" },
      { key: "dt", label: "Doğum Tarihi", placeholder: "GG.AA.YYYY", type: "date" },
    ],
  },
];

const HeroBackdrop = () => (
  <svg
    viewBox="0 0 1440 800"
    preserveAspectRatio="xMidYMid slice"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
    }}
  >
    <defs>
      <linearGradient id="heroG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--brand-700)" />
        <stop offset="55%" stopColor="var(--brand-500)" />
        <stop offset="100%" stopColor="var(--brand-600)" />
      </linearGradient>
      <radialGradient id="heroGlow" cx="0.7" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
        <stop offset="60%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <pattern id="heroDots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.10)" />
      </pattern>
    </defs>
    <rect width="1440" height="800" fill="url(#heroG)" />
    <rect width="1440" height="800" fill="url(#heroDots)" />
    <rect width="1440" height="800" fill="url(#heroGlow)" />
    {[0, 1, 2].map((i) => (
      <g key={i} style={{ opacity: 0.08 + i * 0.03, transformOrigin: "center" }}>
        <path
          d={`M ${100 + i * 180} ${500 - i * 40} Q ${260 + i * 180} ${380 - i * 40}, ${
            420 + i * 180
          } ${500 - i * 40} T ${740 + i * 180} ${500 - i * 40}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </g>
    ))}
    <circle cx="1200" cy="180" r="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
    <circle cx="1200" cy="180" r="120" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="none" />
    <circle cx="1200" cy="180" r="60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
  </svg>
);

const formatTC = (v: string) => v.replace(/\D/g, "").slice(0, 11);
const formatPlate = (v: string) =>
  v.toUpperCase().replace(/[^0-9A-ZÇĞİÖŞÜ ]/g, "").slice(0, 10);
const formatDate = (v: string) => {
  const digits = v.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 4)
    return digits.slice(0, 2) + "." + digits.slice(2, 4) + "." + digits.slice(4);
  if (digits.length > 2) return digits.slice(0, 2) + "." + digits.slice(2);
  return digits;
};
const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length > 0) return `(${d}`;
  return "";
};
const formatName = (v: string) =>
  v.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü ]/g, "").slice(0, 60);

type Status = "idle" | "loading" | "success" | "error";

const tabToProduct: Record<string, { slug: string; label: string }> = {
  trafik: { slug: "zorunlu-trafik-sigortasi", label: "Trafik Sigortası" },
  kasko: { slug: "kasko-sigortasi", label: "Kasko Sigortası" },
  konut: { slug: "konut-sigortasi", label: "Konut Sigortası" },
  saglik: { slug: "tamamlayici-saglik-sigortasi", label: "Tamamlayıcı Sağlık" },
};

interface QFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string | null;
  inputMode?: "text" | "tel" | "numeric";
}

const QField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  inputMode,
}: QFieldProps) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 3 }}>
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: "var(--ink-500)",
        letterSpacing: ".02em",
      }}
    >
      {label}
    </span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      style={{
        width: "100%",
        padding: "10px 11px",
        borderRadius: 9,
        border: `1.5px solid ${error ? "#EF4444" : "var(--ink-200)"}`,
        background: "var(--paper)",
        outline: "none",
        transition: "border .15s",
        fontSize: 14,
        fontVariantNumeric: "tabular-nums",
      }}
      onFocus={(e) => {
        if (!error) e.target.style.borderColor = "var(--brand-500)";
      }}
      onBlur={(e) => {
        if (!error) e.target.style.borderColor = "var(--ink-200)";
      }}
    />
    {error && (
      <span style={{ fontSize: 11, color: "#EF4444" }}>{error}</span>
    )}
  </label>
);

const QuoteWidget = () => {
  const [tab, setTab] = useState("trafik");
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [status, setStatus] = useState<Status>("idle");
  const cur = QUOTE_TABS.find((t) => t.id === tab) ?? QUOTE_TABS[0];

  const setField = (k: string, v: string, type: FieldType | "name" | "phone") => {
    let nv = v;
    if (type === "tc") nv = formatTC(v);
    else if (type === "plate") nv = formatPlate(v);
    else if (type === "date") nv = formatDate(v);
    else if (type === "phone") nv = formatPhone(v);
    else if (type === "name") nv = formatName(v);
    setValues((s) => ({ ...s, [k]: nv }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const name = (values.fullname || "").trim();
    const phone = (values.phone || "").replace(/\D/g, "");
    if (!name) e.fullname = "Ad soyad gerekli";
    else if (name.split(" ").filter(Boolean).length < 2)
      e.fullname = "Ad ve soyad girin";
    if (!phone) e.phone = "Telefon gerekli";
    else if (phone.length !== 10) e.phone = "10 haneli olmalı";

    cur.fields.forEach((f) => {
      const v = (values[f.key] || "").trim();
      if (!v) e[f.key] = "Bu alan zorunlu";
      else if (f.type === "tc" && v.length !== 11) e[f.key] = "11 haneli olmalı";
      else if (f.type === "date" && v.length !== 10)
        e[f.key] = "GG.AA.YYYY formatında";
      else if (f.type === "plate" && v.replace(/\s/g, "").length < 5)
        e[f.key] = "Geçerli plaka girin";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const [submitError, setSubmitError] = useState<string>("");

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setSubmitError("");

    const product = tabToProduct[cur.id];
    const tc = values.tc?.replace(/\D/g, "");
    const plaka = values.plaka?.trim().toUpperCase();
    const birthDate = values.dt;
    const address = values.il || values.uavt
      ? [values.il, values.uavt].filter(Boolean).join(" — ")
      : undefined;

    const res = await submitLead({
      source: "hero_quote",
      productSlug: product?.slug,
      productLabel: product?.label ?? cur.label,
      fullName: (values.fullname || "").trim(),
      phone: (values.phone || "").replace(/\D/g, ""),
      tcKimlik: tc || undefined,
      plaka: plaka || undefined,
      birthDate: birthDate || undefined,
      addressText: address,
      kvkkConsent: true,
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitError(res.message ?? "Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setValues({});
    setErrors({});
    setSubmitError("");
  };

  return (
    <>
    <div
      style={{
        background: "var(--paper)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-xl)",
        padding: "6px 6px 20px",
        width: "100%",
        maxWidth: 460,
        position: "relative",
        border: "1px solid rgba(255,255,255,0.4)",
      }}
    >
      <div
        role="tablist"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${QUOTE_TABS.length}, 1fr)`,
          gap: 4,
          padding: 5,
          background: "var(--ink-50)",
          borderRadius: "calc(var(--radius-xl) - 8px)",
          marginBottom: 16,
        }}
      >
        {QUOTE_TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => {
                setTab(t.id);
                setValues({});
                setErrors({});
                setStatus("idle");
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "9px 4px",
                borderRadius: 12,
                background: active ? "var(--paper)" : "transparent",
                color: active ? "var(--brand-500)" : "var(--ink-500)",
                fontWeight: 600,
                fontSize: 12.5,
                boxShadow: active ? "var(--shadow-sm)" : "none",
                transition: "all .2s",
              }}
            >
              <t.Icon size={20} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {(
        <form
          onSubmit={submit}
          style={{
            padding: "0 22px 4px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <h3 style={{ fontSize: 17, marginBottom: 0 }}>
            {cur.label} sigortası teklifi
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 11,
            }}
          >
            <QField
              label="Ad Soyad"
              value={values.fullname || ""}
              onChange={(v) => setField("fullname", v, "name")}
              placeholder="Ad Soyad"
              error={errors.fullname}
            />
            <QField
              label="Telefon"
              value={values.phone || ""}
              onChange={(v) => setField("phone", v, "phone")}
              placeholder="(5xx) xxx xx xx"
              error={errors.phone}
              inputMode="tel"
            />
            {cur.fields.map((f) => (
              <QField
                key={f.key}
                label={f.label}
                value={values[f.key] || ""}
                onChange={(v) => setField(f.key, v, f.type)}
                placeholder={f.placeholder}
                error={errors[f.key]}
                inputMode={
                  f.type === "tc" || f.type === "date" ? "numeric" : undefined
                }
              />
            ))}
          </div>

          {status === "error" && submitError && (
            <div
              role="alert"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background: "color-mix(in oklch, #EF4444 10%, white)",
                border: "1px solid color-mix(in oklch, #EF4444 22%, white)",
                color: "#B91C1C",
                fontSize: 13,
              }}
            >
              <I.AlertTriangle size={14} /> {submitError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={status === "loading"}
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: 4,
              background:
                "linear-gradient(135deg, var(--brand-500), var(--brand-600))",
              opacity: status === "loading" ? 0.7 : 1,
              cursor: status === "loading" ? "wait" : "pointer",
            }}
          >
            {status === "loading" ? (
              <>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    animation: "spin .8s linear infinite",
                    display: "inline-block",
                  }}
                />
                Hazırlanıyor…
              </>
            ) : (
              <>
                Teklif Al <I.ArrowRight size={18} />
              </>
            )}
          </button>

          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              justifyContent: "center",
              fontSize: 11.5,
              color: "var(--ink-400)",
              marginTop: 0,
            }}
          >
            <I.Lock size={12} /> Bilgileriniz KVKK uyumlu şekilde korunur.
          </p>
        </form>
      )}
    </div>
    <SuccessModal open={status === "success"} onClose={reset} />
    </>
  );
};

const HERO_TRUST: { Icon: ComponentType<IconProps>; text: string }[] = [
  { Icon: I.Handshake, text: "30+ sigorta şirketi karşılaştırması" },
  { Icon: I.Sparkle, text: "Uzman acente desteği" },
  { Icon: I.Shield, text: "Hasar anında 7/24 yanınızda" },
];

export const Hero = () => {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(64px, 8vw, 110px)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <HeroBackdrop />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,460px)",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(40px, 5.4vw, 68px)",
                color: "white",
                fontWeight: 800,
                marginBottom: 22,
              }}
            >
              Sigortanız{" "}
              <span
                style={{
                  background: "linear-gradient(120deg, #fff, var(--brand-100))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                sonsuz güvende
              </span>
              .
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 560,
                marginBottom: 32,
              }}
            >
              Türkiye&apos;nin önde gelen sigorta şirketleri arasından size en
              uygun teklifi alın. Marer Sigorta ile fiyat ve teminat avantajı
              bir arada.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {HERO_TRUST.map((t, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "grid",
                      placeItems: "center",
                      color: "white",
                    }}
                  >
                    <I.Check size={16} sw={2.4} />
                  </span>
                  <span
                    style={{ fontSize: 15.5, color: "rgba(255,255,255,0.92)" }}
                  >
                    {t.text}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}
            >
              <a
                href="#branches"
                className="btn btn-lg"
                style={{ background: "white", color: "var(--brand-700)" }}
              >
                Tüm Hizmetler <I.ArrowRight size={18} />
              </a>
              <a
                href="tel:+905011014725"
                className="btn btn-lg"
                style={{
                  color: "white",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                }}
              >
                <I.Phone size={18} /> Bizi Arayın
              </a>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -16,
                background: "rgba(255,255,255,0.06)",
                borderRadius: "calc(var(--radius-xl) + 16px)",
                border: "1px solid rgba(255,255,255,0.12)",
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <QuoteWidget />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
