/* Shared client-side input formatters & validators */

export const formatPhone = (v: string): string => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length > 0) return `(${d}`;
  return "";
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

export const phoneDigits = (v: string): string => v.replace(/\D/g, "");

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
