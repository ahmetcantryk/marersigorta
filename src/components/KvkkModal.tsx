"use client";

import { useEffect } from "react";
import { I } from "./Icons";

interface KvkkModalProps {
  open: boolean;
  onClose: () => void;
}

export const KvkkModal = ({ open, onClose }: KvkkModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kvkk-modal-title"
      onClick={onClose}
      className="kvkk-modal-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="kvkk-modal-card"
      >
        <header className="kvkk-modal-head">
          <div>
            <div className="kvkk-modal-eyebrow">KVKK</div>
            <h2 id="kvkk-modal-title" className="kvkk-modal-title">
              Kişisel Verilerin Korunması Aydınlatma Metni
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="kvkk-modal-close"
          >
            <I.Close size={18} />
          </button>
        </header>

        <div className="kvkk-modal-body">
          <section className="kvkk-meta">
            <dl>
              <div>
                <dt>Veri Sorumlusu</dt>
                <dd>Marer Sigorta</dd>
              </div>
              <div>
                <dt>Adres</dt>
                <dd>
                  Doğu Mah. Ihlamur Sk. No:34 D:2, 34890 Pendik / İstanbul
                </dd>
              </div>
              <div>
                <dt>İletişim</dt>
                <dd>
                  <a href="tel:+905011014725">+90 (501) 101 47 25</a> ·{" "}
                  <a href="mailto:info@marersigorta.com">
                    info@marersigorta.com
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <article className="kvkk-article">
            <h3>1. Kişisel Verilerin İşlenme Amacı</h3>
            <p>
              Toplanan kişisel verileriniz; iş süreçlerinin yürütülmesi, hizmet
              kalitesinin artırılması, müşteri ilişkilerinin yönetimi, yasal
              yükümlülüklerin yerine getirilmesi ve ticari faaliyetlerin
              yürütülmesi amacıyla işlenmektedir.
            </p>

            <h3>2. İşlenen Kişisel Veri Kategorileri</h3>
            <p>
              Kimlik, iletişim, finans, işlem güvenliği, müşteri işlem,
              görsel-işitsel kayıtlar.
            </p>

            <h3>3. Kişisel Verilerin Aktarılması</h3>
            <p>
              Yalnızca mevzuat gereği ve işin gerekliliği kapsamında yetkili
              kamu kurumları, iş ortakları, tedarikçiler ve hizmet
              sağlayıcılarla paylaşılabilir.
            </p>

            <h3>4. Toplama Yöntemi ve Hukuki Sebep</h3>
            <p>
              Verileriniz; elektronik ortam (web form, e-posta, çerez) ve fiziki
              ortamlar aracılığıyla, KVKK m.5 ve m.6&apos;daki hukuki sebepler
              kapsamında toplanmaktadır.
            </p>

            <h3>5. İlgili Kişinin Hakları</h3>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca; verilerin işlenip işlenmediğini
              öğrenme, silinmesini isteme, düzeltme, itiraz etme gibi haklara
              sahipsiniz. Taleplerinizi{" "}
              <a href="mailto:info@marersigorta.com">info@marersigorta.com</a>{" "}
              üzerinden iletebilirsiniz.
            </p>
          </article>
        </div>

        <footer className="kvkk-modal-foot">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Anladım, kapat
          </button>
        </footer>
      </div>
    </div>
  );
};
