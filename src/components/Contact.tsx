"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import Select, { type StylesConfig, type GroupBase } from "react-select";
import { I, type IconProps } from "./Icons";
import { SuccessModal } from "./SuccessModal";
import { KvkkModal } from "./KvkkModal";
import { submitLead } from "@/lib/lead-client";

interface ServiceOption {
  value: string;
  label: string;
  Icon: ComponentType<IconProps>;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "trafik", label: "Trafik Sigortası", Icon: I.Car },
  { value: "kasko", label: "Kasko", Icon: I.CarShield },
  { value: "saglik", label: "Sağlık Sigortası", Icon: I.Heart },
  { value: "konut", label: "Konut / DASK", Icon: I.Home },
  { value: "isyeri", label: "İşyeri", Icon: I.Building },
  { value: "seyahat", label: "Seyahat Sağlık", Icon: I.Plane },
  { value: "diger", label: "Diğer", Icon: I.Sparkle },
];

const buildSelectStyles = (
  hasError: boolean
): StylesConfig<ServiceOption, false, GroupBase<ServiceOption>> => ({
  control: (base, state) => ({
    ...base,
    minHeight: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: hasError
      ? "#EF4444"
      : state.isFocused
        ? "var(--brand-500)"
        : "var(--ink-200)",
    boxShadow: state.isFocused
      ? "0 0 0 3px color-mix(in oklch, var(--brand-500) 18%, transparent)"
      : "none",
    background: "var(--paper)",
    transition: "border-color .15s, box-shadow .15s",
    "&:hover": {
      borderColor: hasError ? "#EF4444" : "var(--brand-300)",
    },
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 10px" }),
  placeholder: (base) => ({ ...base, color: "var(--ink-400)", fontSize: 15 }),
  singleValue: (base) => ({ ...base, color: "var(--ink-900)", fontSize: 15 }),
  input: (base) => ({ ...base, color: "var(--ink-900)" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "var(--brand-500)" : "var(--ink-400)",
    transition: "transform .2s, color .15s",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0)",
    padding: "6px 10px",
    "&:hover": { color: "var(--brand-500)" },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "var(--shadow-lg)",
    border: "1px solid var(--ink-100)",
    zIndex: 30,
    marginTop: 6,
  }),
  menuList: (base) => ({ ...base, padding: 6 }),
  option: (base, state) => ({
    ...base,
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14.5,
    cursor: "pointer",
    background: state.isSelected
      ? "var(--brand-500)"
      : state.isFocused
        ? "var(--brand-50)"
        : "transparent",
    color: state.isSelected ? "white" : "var(--ink-900)",
    transition: "background .12s",
  }),
});

type ContactStatus = "idle" | "loading" | "success";

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  kvkk: boolean;
}

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  kvkk: false,
};

const inputStyle = (err: unknown): React.CSSProperties => ({
  width: "100%",
  padding: "11px 13px",
  borderRadius: 10,
  border: `1.5px solid ${err ? "#EF4444" : "var(--ink-200)"}`,
  background: "var(--paper)",
  outline: "none",
  transition: "border .15s",
});

interface FieldProps {
  label: string;
  error?: string | null;
  children: ReactNode;
}

const Field = ({ label, error, children }: FieldProps) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: "var(--ink-500)",
        letterSpacing: ".02em",
      }}
    >
      {label}
    </span>
    {children}
    {error && (
      <span style={{ fontSize: 12, color: "#EF4444" }}>{error}</span>
    )}
  </label>
);

interface ContactRowProps {
  Icon: ComponentType<IconProps>;
  title: string;
  value: string;
  href?: string;
  inverse?: boolean;
}

const ContactRow = ({ Icon, title, value, href, inverse }: ContactRowProps) => {
  const inner = (
    <>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: inverse ? "rgba(255,255,255,0.14)" : "var(--brand-50)",
          color: inverse ? "white" : "var(--brand-500)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          border: inverse ? "1px solid rgba(255,255,255,0.16)" : "none",
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            opacity: inverse ? 0.75 : 1,
            color: inverse ? "white" : "var(--ink-500)",
            letterSpacing: ".05em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            marginTop: 2,
            color: inverse ? "white" : "var(--ink-900)",
          }}
        >
          {value}
        </div>
      </div>
    </>
  );
  const wrap: React.CSSProperties = {
    display: "flex",
    gap: 14,
    alignItems: "center",
  };
  const external = href?.startsWith("http");
  return href ? (
    <a
      href={href}
      style={wrap}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  ) : (
    <div style={wrap}>{inner}</div>
  );
};

export const Contact = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [status, setStatus] = useState<ContactStatus>("idle");

  const set = <K extends keyof ContactForm>(k: K, v: ContactForm[K]) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Ad soyadınızı girin";
    if (!form.phone.trim()) e.phone = "Telefon numarası gerekli";
    else if (!/^[\d\s+()-]{10,}$/.test(form.phone))
      e.phone = "Geçerli bir numara girin";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Geçerli e-posta girin";
    if (!form.service) e.service = "Bir hizmet seçin";
    if (!form.kvkk) e.kvkk = "KVKK metnini onaylamalısınız";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const [submitError, setSubmitError] = useState<string>("");
  const [kvkkOpen, setKvkkOpen] = useState(false);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setSubmitError("");

    const res = await submitLead({
      source: "contact_form",
      fullName: form.name.trim(),
      phone: form.phone.replace(/\D/g, ""),
      email: form.email || undefined,
      message: form.message || undefined,
      service: form.service || undefined,
      kvkkConsent: true,
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("idle");
      setSubmitError(res.message ?? "Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: "var(--pad-section)",
        paddingBottom: "var(--pad-section)",
        background: "var(--paper)",
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.5,
          background:
            "radial-gradient(ellipse at 70% 100%, var(--brand-50), transparent 60%)",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 32px" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            İletişim
          </div>
          <h2 className="section-h" style={{ marginBottom: 10 }}>
            Bize ulaşın, size en uygun teklifi hazırlayalım.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Formu doldurun ya da doğrudan arayın.{" "}
            <strong style={{ color: "var(--ink-900)" }}>1 saat içinde</strong>{" "}
            dönüş yapacağımıza söz veriyoruz.
          </p>
        </div>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: 18,
            alignItems: "start",
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              padding: "clamp(20px, 2.6vw, 32px)",
              borderRadius: "var(--radius-xl)",
              background: "var(--paper)",
              border: "1px solid var(--ink-100)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {(
              <form
                onSubmit={submit}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  className="form-row"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
                >
                  <Field label="Ad Soyad *" error={errors.name}>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Adınız Soyadınız"
                      style={inputStyle(errors.name)}
                    />
                  </Field>
                  <Field label="Telefon *" error={errors.phone}>
                    <input
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="0 (5xx) xxx xx xx"
                      style={inputStyle(errors.phone)}
                      inputMode="tel"
                    />
                  </Field>
                </div>

                <div
                  className="form-row"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
                >
                  <Field label="E-posta" error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="ornek@mail.com"
                      style={inputStyle(errors.email)}
                    />
                  </Field>
                  <Field label="İlgilendiğiniz hizmet *" error={errors.service}>
                    <Select<ServiceOption, false>
                      instanceId="contact-service"
                      options={SERVICE_OPTIONS}
                      value={
                        SERVICE_OPTIONS.find((o) => o.value === form.service) ??
                        null
                      }
                      onChange={(opt) => set("service", opt?.value ?? "")}
                      placeholder="Seçin…"
                      isSearchable={false}
                      styles={buildSelectStyles(Boolean(errors.service))}
                      formatOptionLabel={(opt) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <opt.Icon size={16} />
                          <span>{opt.label}</span>
                        </div>
                      )}
                    />
                  </Field>
                </div>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 13,
                    color: "var(--ink-700)",
                    cursor: "pointer",
                    padding: "8px 10px",
                    background: errors.kvkk
                      ? "color-mix(in oklch, #EF4444 8%, white)"
                      : "var(--ink-50)",
                    borderRadius: 10,
                    border: `1px solid ${errors.kvkk ? "#FCA5A5" : "transparent"}`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.kvkk}
                    onChange={(e) => set("kvkk", e.target.checked)}
                    style={{
                      marginTop: 3,
                      accentColor: "var(--brand-500)",
                      width: 16,
                      height: 16,
                    }}
                  />
                  <span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setKvkkOpen(true);
                      }}
                      className="qf-kvkk-link"
                    >
                      KVKK aydınlatma metnini
                    </button>{" "}
                    okudum, kişisel verilerimin işlenmesine onay veriyorum. *
                  </span>
                </label>
                {errors.kvkk && (
                  <div style={{ fontSize: 12, color: "#EF4444", marginTop: -12 }}>
                    {errors.kvkk}
                  </div>
                )}

                {submitError && (
                  <div
                    role="alert"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 14px",
                      borderRadius: 8,
                      background:
                        "color-mix(in oklch, #EF4444 10%, white)",
                      border:
                        "1px solid color-mix(in oklch, #EF4444 22%, white)",
                      color: "#B91C1C",
                      fontSize: 13.5,
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
                    justifyContent: "center",
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
                        }}
                      />
                      Gönderiliyor…
                    </>
                  ) : (
                    <>
                      Teklif İsteği Gönder <I.Send size={18} />
                    </>
                  )}
                </button>

                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    justifyContent: "center",
                    fontSize: 12,
                    color: "var(--ink-400)",
                  }}
                >
                  <I.Lock size={13} /> Bilgileriniz güvende. 1 saat içinde size
                  dönüş yapacağız.
                </p>
              </form>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                padding: 24,
                borderRadius: "var(--radius-xl)",
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
                  right: -40,
                  top: -40,
                  width: 200,
                  height: 200,
                  borderRadius: 999,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)",
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    fontSize: 13,
                    opacity: 0.8,
                    marginBottom: 6,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                  }}
                >
                  Bize Ulaşın
                </div>
                <h3 style={{ color: "white", fontSize: 20, marginBottom: 18 }}>
                  Sorularınız için 7/24 yanınızdayız.
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <ContactRow
                    Icon={I.Phone}
                    title="Telefon"
                    value="+90 (501) 101 47 25"
                    href="tel:+905011014725"
                    inverse
                  />
                  <ContactRow
                    Icon={I.Whatsapp}
                    title="WhatsApp"
                    value="+90 (501) 101 47 25"
                    href="https://wa.me/905011014725"
                    inverse
                  />
                  <ContactRow
                    Icon={I.Mail}
                    title="E-posta"
                    value="info@marersigorta.com"
                    href="mailto:info@marersigorta.com"
                    inverse
                  />
                  <ContactRow
                    Icon={I.Pin}
                    title="Adres"
                    value="Doğu Mah. Ihlamur Sk. No:34 D:2, 34890 Pendik / İstanbul"
                    href="https://share.google/bHzB3dtVtCEhMBjUQ"
                    inverse
                  />
                  <ContactRow
                    Icon={I.Clock}
                    title="Çalışma saatleri"
                    value="Hafta içi 09:00 – 18:00 · Cumartesi 10:00 – 14:00"
                    inverse
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <SuccessModal
        open={status === "success"}
        onClose={() => {
          setStatus("idle");
          setForm(initialForm);
          setErrors({});
        }}
        title="Mesajınız bize ulaştı"
        message="Formunuz başarıyla dolduruldu. Ekibimiz en kısa sürede sizinle iletişime geçecek."
      />
      <KvkkModal open={kvkkOpen} onClose={() => setKvkkOpen(false)} />
    </section>
  );
};
