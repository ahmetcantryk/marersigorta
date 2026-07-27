/**
 * Acente künye bilgileri — adres, telefon, harita bağlantısı.
 *
 * Bu değerler daha önce TopBar, Footer, Contact, KvkkModal ve JsonLd
 * içinde ayrı ayrı gömülüydü; adres değişikliğinde biri atlanabiliyordu.
 * Tek kaynak burasıdır.
 */

export interface CompanyAddress {
  /** Mahalle + sokak + kapı/daire. */
  street: string;
  district: string;
  city: string;
  postalCode: string;
  countryCode: string;
}

export const COMPANY_ADDRESS: CompanyAddress = {
  street: "Yenişehir Mah. Sümbül Sk. No:6/1 D:76",
  district: "Pendik",
  city: "İstanbul",
  postalCode: "34912",
  countryCode: "TR",
};

/** "Yenişehir Mah. Sümbül Sk. No:6/1 D:76, 34912 Pendik / İstanbul" */
export const COMPANY_ADDRESS_FULL = `${COMPANY_ADDRESS.street}, ${COMPANY_ADDRESS.postalCode} ${COMPANY_ADDRESS.district} / ${COMPANY_ADDRESS.city}`;

/** Üst barda tek satıra sığması için posta kodsuz kısa biçim. */
export const COMPANY_ADDRESS_SHORT = `${COMPANY_ADDRESS.street}, ${COMPANY_ADDRESS.district} / ${COMPANY_ADDRESS.city}`;

/** Footer'da iki satıra bölmek için. */
export const COMPANY_ADDRESS_LINES: readonly [string, string] = [
  COMPANY_ADDRESS.street,
  `${COMPANY_ADDRESS.postalCode} ${COMPANY_ADDRESS.district} / ${COMPANY_ADDRESS.city}`,
];

/**
 * Google Haritalar bağlantısı — arama tabanlı URL kullanılır.
 *
 * Eski `share.google/...` kısa bağlantısı taşınmadan önceki ofisi
 * gösteriyordu ve dışarıdan güncellenemiyor. Google Business Profile
 * yeni adrese taşındıktan sonra buraya işletme sayfasının kalıcı
 * bağlantısı konabilir.
 */
export const COMPANY_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Marer Sigorta, ${COMPANY_ADDRESS_FULL}`
)}`;
