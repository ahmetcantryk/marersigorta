"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import Select, { type StylesConfig, type GroupBase } from "react-select";
import { I, type IconProps } from "./Icons";
import { SuccessModal } from "./SuccessModal";
import { KvkkModal } from "./KvkkModal";
import { submitLead } from "@/lib/lead-client";
import { formatPhone, phoneDigits, validateTRMobile } from "@/lib/form-utils";

interface ServiceOption {
  value: string;
  label: string;
  Icon: ComponentType<IconProps>;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "Trafik Sigortası", label: "Trafik Sigortası", Icon: I.Car },
  { value: "Kasko Sigortası", label: "Kasko Sigortası", Icon: I.CarShield },
  { value: "DASK (Zorunlu Deprem)", label: "DASK (Zorunlu Deprem)", Icon: I.Quake },
  { value: "Konut Sigortası", label: "Konut Sigortası", Icon: I.Home },
  { value: "Tamamlayıcı Sağlık", label: "Tamamlayıcı Sağlık", Icon: I.Heart },
  { value: "Özel Sağlık Sigortası", label: "Özel Sağlık Sigortası", Icon: I.Hospital },
  { value: "Seyahat Sağlık Sigortası", label: "Seyahat Sağlık Sigortası", Icon: I.Plane },
  { value: "Yeşil Kart Sigortası", label: "Yeşil Kart Sigortası", Icon: I.Doc },
  { value: "Ferdi Kaza & Hayat", label: "Ferdi Kaza & Hayat", Icon: I.HandHeart },
  { value: "İşyeri / KOBİ", label: "İşyeri / KOBİ", Icon: I.Building },
  { value: "Nakliyat Sigortası", label: "Nakliyat Sigortası", Icon: I.Truck },
  { value: "Yat ve Tekne Sigortası", label: "Yat ve Tekne Sigortası", Icon: I.Boat },
  { value: "Mühendislik Sigortaları", label: "Mühendislik Sigortaları", Icon: I.Wrench },
  { value: "Filo Yönetimi Sigortası", label: "Filo Yönetimi Sigortası", Icon: I.Fleet },
  { value: "Diğer", label: "Diğer", Icon: I.Sparkle },
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
          width: 44,
          height: 44,
          borderRadius: 12,
          background: inverse ? "rgba(255,255,255,0.16)" : "var(--brand-50)",
          color: inverse ? "white" : "var(--brand-500)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          border: inverse ? "1px solid rgba(255,255,255,0.2)" : "none",
        }}
      >
        <Icon size={20} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: 11.5,
            opacity: inverse ? 0.8 : 1,
            color: inverse ? "white" : "var(--ink-500)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15.5,
            fontWeight: 700,
            color: inverse ? "white" : "var(--ink-900)",
            letterSpacing: "-0.005em",
            lineHeight: 1.4,
            wordBreak: "break-word",
            whiteSpace: "pre-line",
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
    alignItems: "flex-start",
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
    const name = form.name.trim();
    if (!name) e.name = "Ad soyadınızı girin";
    else if (name.split(/\s+/).filter(Boolean).length < 2)
      e.name = "Ad ve soyad girin";

    const phoneCheck = validateTRMobile(phoneDigits(form.phone));
    if (phoneCheck !== true) e.phone = phoneCheck;

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
      phone: phoneDigits(form.phone),
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
      if (res.errors) {
        // Server-side Zod errors → ilgili alanlara yansıt
        const mapped: Record<string, string | null> = {};
        const aliasMap: Record<string, string> = {
          fullName: "name",
          phone: "phone",
          email: "email",
          service: "service",
          kvkkConsent: "kvkk",
        };
        Object.entries(res.errors).forEach(([k, v]) => {
          const local = aliasMap[k] ?? k;
          mapped[local] = v[0] ?? "Geçersiz değer";
        });
        setErrors((cur) => ({ ...cur, ...mapped }));
      }
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
            gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)",
            gap: 24,
            alignItems: "start",
            maxWidth: 1120,
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
                      onChange={(e) => set("phone", formatPhone(e.target.value))}
                      placeholder="(5xx) xxx xx xx"
                      style={inputStyle(errors.phone)}
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={16}
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

                <Field label="Mesajınız (opsiyonel)">
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      set("message", e.target.value.slice(0, 1000))
                    }
                    placeholder="Eklemek istediğiniz detaylar varsa buraya yazabilirsiniz."
                    rows={3}
                    style={{
                      ...inputStyle(false),
                      resize: "vertical",
                      minHeight: 84,
                      fontFamily: "inherit",
                      lineHeight: 1.55,
                    }}
                  />
                </Field>

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
                padding: "28px 26px",
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
                  width: 220,
                  height: 220,
                  borderRadius: 999,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)",
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    opacity: 0.85,
                    marginBottom: 8,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}
                >
                  Bize Ulaşın
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "white",
                    fontSize: 22,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: 22,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Sorularınız için 7/24 yanınızdayız.
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <ContactRow
                    Icon={I.Phone}
                    title="Telefon"
                    value="+90 (501) 101 47 25"
                    href="tel:+905011014725"
                    inverse
                  />
                  <ContactRow
                    Icon={I.Phone}
                    title="Telefon 2"
                    value="+90 (501) 000 47 25"
                    href="tel:+905010004725"
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
                    value={"Hafta içi 09:00 – 18:00\nCumartesi 09:00 – 17:00 · 7/24 WhatsApp"}
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
