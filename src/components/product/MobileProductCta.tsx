"use client";

import { useEffect, useState } from "react";
import { I } from "@/components/Icons";

const scrollToForm = () => {
  if (typeof window === "undefined") return;
  const target = document.querySelector<HTMLElement>(".quote-form");
  if (!target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const offset = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: offset, behavior: "smooth" });
};

export const MobileProductCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="mobile-product-cta"
      aria-hidden={!visible}
      data-visible={visible}
    >
      <a
        href="tel:+905011014725"
        className="mpc-btn mpc-btn-outline"
        aria-label="Telefonla ara"
      >
        <I.Phone size={18} />
        <span>Ara</span>
      </a>
      <a
        href="https://wa.me/905011014725"
        target="_blank"
        rel="noopener noreferrer"
        className="mpc-btn mpc-btn-wa"
        aria-label="WhatsApp ile yaz"
      >
        <I.Whatsapp size={18} />
        <span>WhatsApp</span>
      </a>
      <button
        type="button"
        onClick={scrollToForm}
        className="mpc-btn mpc-btn-primary"
      >
        <span>Teklif Al</span>
        <I.ArrowRight size={16} />
      </button>
    </div>
  );
};
