/* Shared client-side input formatters & validators */

/**
 * Türkiye GSM operatörlerinin BTK tarafından tahsis edilen mobil prefix listesi.
 * (5XX) — sadece bunlar geçerli; 599 vb. yazılamaz.
 */
export const VALID_TR_MOBILE_PREFIXES = new Set([
  "500", "501", "505", "506", "507",
  "530", "531", "532", "533", "534", "535", "536", "537", "538", "539",
  "540", "541", "542", "543", "544", "545", "546", "547", "548", "549",
  "550", "551", "552", "553", "554", "555", "559",
]);

/**
 * Kullanıcı tarafından girilen ham metni 10 haneli yerel TR mobil
 * numarasına normalize eder.
 * - Tüm boşluk/sembolleri kaldırır
 * - Başta 0 (yerel kod) veya 90 (uluslararası kod) varsa silinir
 * - Maks 10 hane
 */
export const phoneDigits = (v: string): string => {
  let d = v.replace(/\D/g, "");
  // Uluslararası kod 90
  if (d.startsWith("90") && d.length > 10) d = d.slice(2);
  // Yerel kod 0
  if (d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
};

/**
 * Maskele: `(5XX) XXX XX XX` (3-3-2-2). Girilen ham metni temizler.
 */
export const formatPhone = (v: string): string => {
  const d = phoneDigits(v);
  if (d.length > 8) return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length > 0) return `(${d}`;
  return "";
};

/**
 * 10 haneli yerel numarayı tam doğrular:
 * - 10 hane olmalı
 * - Hanenin başı `5` olmalı
 * - İlk 3 hane VALID_TR_MOBILE_PREFIXES içinde olmalı
 */
export const validateTRMobile = (digits: string): true | string => {
  if (!digits) return "Telefon gerekli";
  if (digits.length !== 10) return "10 haneli telefon girin";
  if (!digits.startsWith("5")) return "5 ile başlamalı (mobil hat)";
  const prefix = digits.slice(0, 3);
  if (!VALID_TR_MOBILE_PREFIXES.has(prefix))
    return `Geçersiz operatör kodu (${prefix})`;
  return true;
};

export const formatName = (v: string): string =>
  v.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü ]/g, "").slice(0, 60);

export const formatTC = (v: string): string =>
  v.replace(/\D/g, "").slice(0, 11);

export const formatVKN = (v: string): string =>
  v.replace(/\D/g, "").slice(0, 10);

export const formatPlate = (v: string): string =>
  v.toUpperCase().replace(/[^0-9A-ZÇĞİÖŞÜ ]/g, "").slice(0, 10);

export const formatBirthDate = (v: string): string => {
  const digits = v.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 4)
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
  if (digits.length > 2) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return digits;
};

export interface ProductFieldsConfig {
  tcKimlik?: boolean;
  vkn?: boolean;
  plaka?: boolean;
  birthDate?: boolean;
  addressText?: boolean;
}

/** Hangi üründe hangi ek alan görünür? */
export const PRODUCT_FIELDS: Record<string, ProductFieldsConfig> = {
  "zorunlu-trafik-sigortasi": { tcKimlik: true, plaka: true },
  "kasko-sigortasi": { tcKimlik: true, plaka: true },
  "yesil-kart-sigortasi": { tcKimlik: true, plaka: true },
  "konut-sigortasi": { tcKimlik: true, addressText: true },
  "dask-zorunlu-deprem-sigortasi": { tcKimlik: true, addressText: true },
  "kobi-isyeri-sigortasi": { vkn: true, addressText: true },
  "tamamlayici-saglik-sigortasi": { tcKimlik: true, birthDate: true },
  "ozel-saglik-sigortasi": { tcKimlik: true, birthDate: true },
  "seyahat-saglik-sigortasi": { tcKimlik: true, birthDate: true },
  "ferdi-kaza-hayat-sigortasi": { tcKimlik: true, birthDate: true },
};

export const getProductFields = (slug?: string): ProductFieldsConfig => {
  if (!slug) return { tcKimlik: true };
  return PRODUCT_FIELDS[slug] ?? { tcKimlik: true };
};
