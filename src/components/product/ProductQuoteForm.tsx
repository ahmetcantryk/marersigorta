"use client";

import { useState } from "react";
import { I } from "@/components/Icons";
import { SuccessModal } from "@/components/SuccessModal";
import { KvkkModal } from "@/components/KvkkModal";
import {
  formatName,
  formatPhone,
  formatTC,
  formatVKN,
  formatPlate,
  formatBirthDate,
  phoneDigits,
  validateTRMobile,
  getProductFields,
} from "@/lib/form-utils";
import { submitLead } from "@/lib/lead-client";

type Status = "idle" | "loading" | "success" | "error";

interface ProductQuoteFormProps {
  productSlug: string;
  productLabel: string;
  /** "compact" — sticky sidebar; "wide" — hero banner */
  variant?: "compact" | "wide";
}

interface FormState {
  fullName: string;
  phone: string;
  tcKimlik: string;
  vkn: string;
  plaka: string;
  birthDate: string;
  addressText: string;
  kvkk: boolean;
}

const INITIAL: FormState = {
  fullName: "",
  phone: "",
  tcKimlik: "",
  vkn: "",
  plaka: "",
  birthDate: "",
  addressText: "",
  kvkk: false,
};

export const ProductQuoteForm = ({
  productSlug,
  productLabel,
  variant = "compact",
}: ProductQuoteFormProps) => {
  const fields = getProductFields(productSlug);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [kvkkOpen, setKvkkOpen] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k as string]) {
      setErrors((e) => {
        const n = { ...e };
        delete n[k as string];
        return n;
      });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    const name = form.fullName.trim();
    if (!name) e.fullName = "Ad soyad gerekli";
    else if (name.split(/\s+/).filter(Boolean).length < 2)
      e.fullName = "Ad ve soyad girin";

    const phoneCheck = validateTRMobile(phoneDigits(form.phone));
    if (phoneCheck !== true) e.phone = phoneCheck;

    if (fields.tcKimlik) {
      if (!form.tcKimlik) e.tcKimlik = "TC kimlik gerekli";
      else if (form.tcKimlik.length !== 11) e.tcKimlik = "11 haneli olmalı";
    }
    if (fields.vkn) {
      if (!form.vkn) e.vkn = "VKN gerekli";
      else if (form.vkn.length !== 10) e.vkn = "10 haneli olmalı";
    }
    if (fields.plaka) {
      if (!form.plaka.trim()) e.plaka = "Plaka gerekli";
      else if (form.plaka.replace(/\s/g, "").length < 5)
        e.plaka = "Geçerli plaka girin";
    }
    if (fields.birthDate) {
      if (!form.birthDate) e.birthDate = "Doğum tarihi gerekli";
      else if (!/^\d{2}\.\d{2}\.\d{4}$/.test(form.birthDate))
        e.birthDate = "GG.AA.YYYY formatı";
    }
    if (fields.addressText) {
      if (!form.addressText.trim()) e.addressText = "Adres gerekli";
      else if (form.addressText.trim().length < 8)
        e.addressText = "En az 8 karakter";
    }
    if (!form.kvkk) e.kvkk = "Onay vermelisiniz";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setSubmitMessage("");

    const res = await submitLead({
      source: "product_quote",
      productSlug,
      productLabel,
      fullName: form.fullName.trim(),
      phone: phoneDigits(form.phone),
      tcKimlik: fields.tcKimlik ? form.tcKimlik : undefined,
      vkn: fields.vkn ? form.vkn : undefined,
      plaka: fields.plaka ? form.plaka.trim().toUpperCase() : undefined,
      birthDate: fields.birthDate ? form.birthDate : undefined,
      addressText: fields.addressText ? form.addressText.trim() : undefined,
      kvkkConsent: true,
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitMessage(res.message ?? "Bir hata oluştu, tekrar deneyin.");
      if (res.errors) {
        const mapped: Record<string, string> = {};
        Object.entries(res.errors).forEach(([k, v]) => {
          mapped[k] = v[0] ?? "Geçersiz değer";
        });
        setErrors((cur) => ({ ...cur, ...mapped }));
      }
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm(INITIAL);
    setErrors({});
    setSubmitMessage("");
  };

  const wide = variant === "wide";

  return (
    <>
      <aside
        className={`quote-form quote-form-${variant}`}
        aria-label="Hızlı teklif formu"
      >
        <div className="qf-card">
          <div className="qf-head">
            <span className="qf-pill">Hızlı Teklif</span>
            <h2 className="qf-title">
              {productLabel} için size özel fiyat
            </h2>
            <p className="qf-sub">
              Bilgilerinizi bırakın, 1 saat içinde uzman ekibimiz dönüş yapsın.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate className="qf-form">
            <div className={wide ? "qf-row qf-row-2" : "qf-row"}>
              <Field
                label="Ad Soyad"
                error={errors.fullName}
                value={form.fullName}
                onChange={(v) => update("fullName", formatName(v))}
                placeholder="Adınız Soyadınız"
                autoComplete="name"
              />
              <Field
                label="Telefon"
                error={errors.phone}
                value={form.phone}
                onChange={(v) => update("phone", formatPhone(v))}
                placeholder="(5xx) xxx xx xx"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>

            <div className={wide ? "qf-row qf-row-2" : "qf-row"}>
              {fields.tcKimlik && (
                <Field
                  label="TC Kimlik No"
                  error={errors.tcKimlik}
                  value={form.tcKimlik}
                  onChange={(v) => update("tcKimlik", formatTC(v))}
                  placeholder="11 haneli"
                  inputMode="numeric"
                />
              )}
              {fields.vkn && (
                <Field
                  label="Vergi Kimlik No"
                  error={errors.vkn}
                  value={form.vkn}
                  onChange={(v) => update("vkn", formatVKN(v))}
                  placeholder="10 haneli"
                  inputMode="numeric"
                />
              )}
              {fields.plaka && (
                <Field
                  label="Plaka"
                  error={errors.plaka}
                  value={form.plaka}
                  onChange={(v) => update("plaka", formatPlate(v))}
                  placeholder="34 ABC 123"
                />
              )}
              {fields.birthDate && (
                <Field
                  label="Doğum Tarihi"
                  error={errors.birthDate}
                  value={form.birthDate}
                  onChange={(v) => update("birthDate", formatBirthDate(v))}
                  placeholder="GG.AA.YYYY"
                  inputMode="numeric"
                />
              )}
              {fields.addressText && (
                <Field
                  label="Adres"
                  error={errors.addressText}
                  value={form.addressText}
                  onChange={(v) => update("addressText", v)}
                  placeholder="Mah / Sokak / İl"
                  autoComplete="street-address"
                />
              )}
            </div>

            <label
              className={`qf-kvkk${errors.kvkk ? " qf-kvkk-error" : ""}`}
            >
              <input
                type="checkbox"
                checked={form.kvkk}
                onChange={(e) => update("kvkk", e.target.checked)}
                aria-invalid={Boolean(errors.kvkk)}
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
                  KVKK metnini
                </button>{" "}
                okudum, onaylıyorum.
              </span>
            </label>

            {status === "error" && submitMessage && (
              <div className="qf-server-error" role="alert">
                <I.AlertTriangle size={14} /> {submitMessage}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary qf-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <span className="qf-spinner" aria-hidden />
                  Gönderiliyor…
                </>
              ) : (
                <>
                  Teklif İste <I.ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="qf-divider" role="separator">
            <span>veya</span>
          </div>

          <div className="qf-quick">
            <a
              href="tel:+905011014725"
              className="qf-quick-btn qf-quick-call"
              aria-label="Telefonla ara"
            >
              <I.Phone size={16} />
              <span>Ara</span>
            </a>
            <a
              href="https://wa.me/905011014725"
              target="_blank"
              rel="noopener noreferrer"
              className="qf-quick-btn qf-quick-wa"
              aria-label="WhatsApp ile yaz"
            >
              <I.Whatsapp size={16} />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="qf-trust">
            <I.Lock size={12} />
            <span>Bilgileriniz KVKK uyumlu şekilde korunur.</span>
          </div>
        </div>
      </aside>

      <SuccessModal
        open={status === "success"}
        onClose={reset}
        title="Talebiniz alındı"
        message={`${productLabel} için talebiniz başarıyla iletildi. Uzman ekibimiz en kısa sürede sizinle iletişime geçecek.`}
      />
      <KvkkModal open={kvkkOpen} onClose={() => setKvkkOpen(false)} />
    </>
  );
};

interface FieldProps {
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "text" | "tel" | "numeric";
  autoComplete?: string;
}

const Field = ({
  label,
  error,
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete,
}: FieldProps) => (
  <label className="qf-field">
    <span className="qf-label">{label}</span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      className={`qf-input${error ? " qf-input-error" : ""}`}
    />
    {error && <span className="qf-error">{error}</span>}
  </label>
);
