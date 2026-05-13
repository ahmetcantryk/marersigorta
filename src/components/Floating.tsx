"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { I, InfinityMark } from "./Icons";

export const Floating = () => {
  const [showTop, setShowTop] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setTooltipOpen(true), 6000);
    const t2 = setTimeout(() => setTooltipOpen(false), 16000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 70,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-end",
      }}
    >
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Yukarı çık"
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "var(--paper)",
            border: "1px solid var(--ink-200)",
            display: "grid",
            placeItems: "center",
            boxShadow: "var(--shadow-md)",
            transform: "rotate(-90deg)",
            animation: "fadeUp .3s ease",
          }}
        >
          <I.ArrowRight size={18} color="var(--ink-700)" />
        </button>
      )}

      {tooltipOpen && (
        <div
          style={{
            background: "white",
            color: "var(--ink-900)",
            padding: "10px 14px",
            borderRadius: 12,
            boxShadow: "var(--shadow-lg)",
            fontSize: 13,
            fontWeight: 500,
            maxWidth: 240,
            animation: "fadeUp .25s ease",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={() => setTooltipOpen(false)}
            aria-label="Kapat"
            style={{
              position: "absolute",
              right: 4,
              top: 4,
              width: 20,
              height: 20,
              borderRadius: 999,
              color: "var(--ink-400)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <I.Close size={12} />
          </button>
          <div style={{ paddingRight: 18 }}>
            👋 Bir sorunuz mu var? <strong>WhatsApp&apos;tan</strong> hemen yazın.
          </div>
        </div>
      )}

      <a
        href="https://wa.me/905011014725"
        aria-label="WhatsApp"
        style={{
          width: 60,
          height: 60,
          borderRadius: 999,
          background: "#25D366",
          display: "grid",
          placeItems: "center",
          boxShadow:
            "0 12px 24px -8px rgba(37,211,102,0.5), var(--shadow-md)",
          color: "white",
          position: "relative",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: 999,
            background: "#25D366",
            opacity: 0.35,
            animation: "wPulse 2s ease-out infinite",
          }}
        />
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          style={{ position: "relative" }}
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.86 9.86 0 0 0 5.77 1.85h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01a9.85 9.85 0 0 0-7.02-2.91Zm0 18.05a8.18 8.18 0 0 1-4.15-1.13l-.3-.18-3.07.81.82-3-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.78 2.4a8.13 8.13 0 0 1 2.4 5.77c0 4.5-3.67 8.14-8.2 8.14Zm4.49-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23a7.51 7.51 0 0 1-1.39-1.72c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.22.25-.85.84-.85 2.04 0 1.2.87 2.36 1 2.52.12.16 1.71 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3Z" />
        </svg>
      </a>
    </div>
  );
};

export const ExitIntent = () => {
  const [open, setOpen] = useState(false);
  const fired = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const ready = setTimeout(() => setMounted(true), 5000);
    return () => clearTimeout(ready);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (sessionStorage.getItem("marer_exit_seen")) return;
    const onLeave = (e: MouseEvent) => {
      if (fired.current) return;
      if (e.clientY <= 0) {
        fired.current = true;
        sessionStorage.setItem("marer_exit_seen", "1");
        setOpen(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [mounted]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(11,26,44,0.55)",
        display: "grid",
        placeItems: "center",
        animation: "fadeUp .25s ease",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--paper)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-xl)",
          maxWidth: 520,
          width: "100%",
          padding: 36,
          position: "relative",
          animation: "fadeUp .35s ease",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Kapat"
          style={{
            position: "absolute",
            right: 14,
            top: 14,
            width: 36,
            height: 36,
            borderRadius: 999,
            background: "var(--ink-50)",
            color: "var(--ink-700)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <I.Close size={18} />
        </button>

        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background:
              "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
            color: "white",
            display: "grid",
            placeItems: "center",
            marginBottom: 16,
          }}
        >
          <InfinityMark size={32} color="white" />
        </div>

        <h3 style={{ fontSize: 24, marginBottom: 10 }}>
          Bir saniye, teklifimizi kaçırmayın!
        </h3>
        <p
          style={{
            color: "var(--ink-500)",
            fontSize: 15.5,
            marginBottom: 22,
          }}
        >
          Bilgilerinizi bırakın, uzman danışmanımız size özel{" "}
          <strong style={{ color: "var(--ink-900)" }}>en uygun teklifi</strong>{" "}
          hazırlasın. Hiçbir taahhüt yok.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            href="/#hero"
            onClick={() => setOpen(false)}
            className="btn btn-primary btn-lg"
            style={{ flex: 1, justifyContent: "center", minWidth: 200 }}
          >
            Hemen teklif al <I.ArrowRight size={18} />
          </Link>
          <a
            href="tel:+905011014725"
            className="btn btn-outline btn-lg"
            style={{ minWidth: 140, justifyContent: "center" }}
          >
            <I.Phone size={16} /> Ara
          </a>
        </div>

        <p
          style={{
            fontSize: 12,
            color: "var(--ink-400)",
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <I.Lock size={12} /> Bilgileriniz KVKK uyumlu şekilde korunur.
        </p>
      </div>
    </div>
  );
};
