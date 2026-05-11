"use client";

import { useEffect } from "react";
import { I } from "./Icons";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  ctaLabel?: string;
}

export const SuccessModal = ({
  open,
  onClose,
  title = "Talebiniz Alındı",
  message = "Formunuz başarıyla dolduruldu. Ekibimiz en kısa sürede sizinle iletişime geçecek.",
  ctaLabel = "Tamam",
}: SuccessModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(11,26,44,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        padding: 20,
        animation: "successFade .22s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 440,
          background: "var(--paper)",
          borderRadius: "var(--radius-xl)",
          padding: "40px 32px 32px",
          boxShadow: "var(--shadow-xl)",
          textAlign: "center",
          position: "relative",
          animation: "successPop .35s cubic-bezier(.18,.89,.32,1.28)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 34,
            height: 34,
            borderRadius: 999,
            background: "var(--ink-50)",
            color: "var(--ink-500)",
            display: "grid",
            placeItems: "center",
            transition: "background .15s, color .15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "var(--ink-100)";
            e.currentTarget.style.color = "var(--ink-900)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "var(--ink-50)";
            e.currentTarget.style.color = "var(--ink-500)";
          }}
        >
          <I.Close size={16} />
        </button>

        <div
          style={{
            width: 88,
            height: 88,
            margin: "0 auto 22px",
            borderRadius: 999,
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--accent-500) 22%, white), color-mix(in oklch, var(--accent-500) 8%, white))",
            color: "var(--accent-500)",
            display: "grid",
            placeItems: "center",
            position: "relative",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              border: "2px solid var(--accent-500)",
              opacity: 0.4,
              animation: "successPing 1.6s ease-out infinite",
            }}
          />
          <I.CheckCircle size={48} />
        </div>

        <h3
          id="success-modal-title"
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 10,
            color: "var(--ink-900)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: "var(--ink-500)",
            lineHeight: 1.6,
            maxWidth: 340,
            margin: "0 auto 8px",
          }}
        >
          {message}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            margin: "16px 0 24px",
            padding: "8px 14px",
            borderRadius: 999,
            background: "var(--brand-50)",
            color: "var(--brand-700)",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <I.Clock size={14} />
          1 saat içinde geri dönüş
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary btn-lg"
          style={{
            width: "100%",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, var(--brand-500), var(--brand-600))",
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
};
