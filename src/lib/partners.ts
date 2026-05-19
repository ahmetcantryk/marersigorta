/**
 * Anlaşmalı sigorta şirketleri — tek kaynak.
 * Hem anasayfa Partners şeridi hem /anlasmali-sirketler sayfası buradan beslenir.
 * Yeni logo eklemek için public/images/insurance-logo/ altına dosyayı koy ve
 * aşağıdaki listeye satır ekle. Türkiye Sigorta ilk sırada kalır (revize talebi).
 */
export interface Partner {
  /** Görünen ad — wordmark + alt text */
  name: string;
  /** public-relative logo yolu */
  logo: string;
}

export const PARTNERS: Partner[] = [
  { name: "Türkiye Sigorta", logo: "/images/insurance-logo/turkiye-sigorta.webp" },
  { name: "Allianz", logo: "/images/insurance-logo/allianz.webp" },
  { name: "Anadolu", logo: "/images/insurance-logo/anadolu-sigorta.webp" },
  { name: "AXA", logo: "/images/insurance-logo/axa-sigorta.webp" },
  { name: "HDI", logo: "/images/insurance-logo/hdi-sigorta.png" },
  { name: "Mapfre", logo: "/images/insurance-logo/mapfre-sigorta-v2.webp" },
  { name: "Ray", logo: "/images/insurance-logo/ray-sigorta.webp" },
  { name: "Quick", logo: "/images/insurance-logo/quick-sigorta.webp" },
  { name: "Aksigorta", logo: "/images/insurance-logo/ak-sigorta.webp" },
  { name: "Zurich", logo: "/images/insurance-logo/zurich-sigorta-v2.webp" },
  { name: "Sompo", logo: "/images/insurance-logo/sompo-sigorta.webp" },
  { name: "Referans", logo: "/images/insurance-logo/referans-sigorta.png" },
  { name: "Doğa", logo: "/images/insurance-logo/doga-sigorta.webp" },
  { name: "Neova", logo: "/images/insurance-logo/neova-sigorta.webp" },
  { name: "Unico", logo: "/images/insurance-logo/unico.webp" },
  { name: "Türk Nippon", logo: "/images/insurance-logo/turk-nippon-sigorta.webp" },
  { name: "Eureko", logo: "/images/insurance-logo/eureko-sigorta.svg" },
  { name: "Bupa Acıbadem", logo: "/images/insurance-logo/bupa-acibadem-sigorta.png" },
  { name: "Bereket", logo: "/images/insurance-logo/bereket-sigorta.png" },
  { name: "Magdeburger", logo: "/images/insurance-logo/magdeburger-sigorta.webp" },
  { name: "GIG", logo: "/images/insurance-logo/gig-sigorta.png" },
  { name: "Ankara", logo: "/images/insurance-logo/ankara-sigorta.webp" },
  { name: "Koru", logo: "/images/insurance-logo/koru-sigorta.png" },
  { name: "Şeker", logo: "/images/insurance-logo/seker-sigorta.svg" },
  { name: "Emaa", logo: "/images/insurance-logo/emaa-sigorta.svg" },
  { name: "Corpus", logo: "/images/insurance-logo/corpus-sigorta.webp" },
  { name: "Türkiye Katılım", logo: "/images/insurance-logo/turkiye-katilim-sigorta.webp" },
];
