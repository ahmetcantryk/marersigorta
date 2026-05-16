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
 */
export const phoneDigits = (v: string): string => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("90") && d.length > 10) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
};

/**
 * Maskele: `(5XX) XXX XX XX` (3-3-2-2).
 */
export const formatPhone = (v: string): string => {
  const d = phoneDigits(v);
  if (d.length > 8) return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length > 0) return `(${d}`;
  return "";
};

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

/* ===========================================================
 *  TC KİMLİK NO — algoritmik validasyon (mod 10 / mod 7-2)
 *  Kaynak: NVI / e-Devlet doğrulama algoritması
 * =========================================================== */

export const formatTC = (v: string): string =>
  v.replace(/\D/g, "").slice(0, 11);

/**
 * Türkiye Cumhuriyeti kimlik numarası algoritma doğrulaması.
 *  1. 11 haneli olmalı
 *  2. İlk hane 0 olamaz
 *  3. d10 = ((d1+d3+d5+d7+d9)*7 - (d2+d4+d6+d8)) mod 10
 *  4. d11 = (d1+d2+...+d10) mod 10
 */
export const validateTCKimlik = (tc: string): true | string => {
  const digits = tc.replace(/\D/g, "");
  if (!digits) return "TC kimlik gerekli";
  if (digits.length !== 11) return "11 haneli TC kimlik girin";
  if (digits[0] === "0") return "TC kimlik 0 ile başlayamaz";

  const d = digits.split("").map((n) => parseInt(n, 10));
  // Doğrulama 1 — 10. hane
  const oddSum = d[0] + d[2] + d[4] + d[6] + d[8];
  const evenSum = d[1] + d[3] + d[5] + d[7];
  const check10 = (((oddSum * 7) - evenSum) % 10 + 10) % 10;
  if (check10 !== d[9]) return "Geçersiz TC kimlik no";
  // Doğrulama 2 — 11. hane
  const sumFirst10 = d.slice(0, 10).reduce((a, b) => a + b, 0);
  if (sumFirst10 % 10 !== d[10]) return "Geçersiz TC kimlik no";
  return true;
};

/* ===========================================================
 *  VKN — Vergi Kimlik Numarası (10 hane)
 * =========================================================== */

export const formatVKN = (v: string): string =>
  v.replace(/\D/g, "").slice(0, 10);

/* ===========================================================
 *  PLAKA — Türkiye formatı
 *  - İl kodu: 2 hane, 01–81 arası
 *  - Harf bölümü: 1, 2 veya 3 harf (Q, W, X kullanılmaz)
 *  - Rakam bölümü: 1 harfle 4; 2 harfle 3 veya 4; 3 harfle 2 veya 3
 *
 *  Geçerli kombinasyonlar:
 *    NN L NNNN     (örn: 34 A 1234)
 *    NN LL NNN     (örn: 06 AB 123)
 *    NN LL NNNN    (örn: 34 AB 1234)
 *    NN LLL NN     (örn: 35 ABC 12)
 *    NN LLL NNN    (örn: 16 ABC 123)
 * =========================================================== */

const PLATE_VALID_LETTERS = /^[ABCDEFGHIJKLMNOPRSTUVYZ]$/;

interface PlateParts {
  city: string;
  letters: string;
  nums: string;
}

/** Ham metni Türk plaka segmentlerine ayırır (boşluk/sembol yok sayılır). */
export const splitPlate = (v: string): PlateParts => {
  // Türkçe karakterleri ASCII'ye normalize et, Q/W/X'leri at
  const norm = v
    .toUpperCase()
    .replace(/İ/g, "I")
    .replace(/Ç/g, "C")
    .replace(/Ş/g, "S")
    .replace(/Ğ/g, "G")
    .replace(/Ü/g, "U")
    .replace(/Ö/g, "O")
    .replace(/[^0-9A-Z]/g, "")
    .replace(/[QWX]/g, "");

  let i = 0;
  let city = "";
  while (i < norm.length && city.length < 2 && /\d/.test(norm[i])) {
    city += norm[i];
    i++;
  }
  // İl kodu 2 hane dolmadan harf bölümüne geçilmez —
  // ilk hane harfse veya sadece 1 hane yazıldıysa geri kalan yok sayılır
  let letters = "";
  if (city.length === 2) {
    while (i < norm.length && letters.length < 3 && PLATE_VALID_LETTERS.test(norm[i])) {
      letters += norm[i];
      i++;
    }
  }
  // Harf sayısına göre rakam bölümü maks. uzunluğu
  const maxNums =
    letters.length === 1 ? 4 :
    letters.length === 2 ? 4 :
    letters.length === 3 ? 3 : 0;
  let nums = "";
  while (i < norm.length && nums.length < maxNums && /\d/.test(norm[i])) {
    nums += norm[i];
    i++;
  }
  return { city, letters, nums };
};

/**
 * Plaka maskeleme: kullanıcı yazarken otomatik boşluk ekler.
 * `34A1234` → `34 A 1234`
 * `06AB123` → `06 AB 123`
 * `35ABC12` → `35 ABC 12`
 * Yanlış sıralı karakterler (ör. ilk hane harf) sessizce yok sayılır.
 */
export const formatPlate = (v: string): string => {
  const { city, letters, nums } = splitPlate(v);
  const parts = [city, letters, nums].filter(Boolean);
  return parts.join(" ");
};

const PLATE_COMBOS: Record<number, number[]> = {
  1: [4],
  2: [3, 4],
  3: [2, 3],
};

/**
 * Plaka algoritmik validasyonu.
 * Yanlış kombinasyonlarda kullanıcıya net mesaj döner.
 */
export const validatePlate = (v: string): true | string => {
  const { city, letters, nums } = splitPlate(v);
  if (!city) return "Plaka gerekli";
  if (city.length !== 2) return "2 haneli il kodu girin (örn. 34)";
  const cityCode = parseInt(city, 10);
  if (cityCode < 1 || cityCode > 81)
    return "İl kodu 01–81 arası olmalı";
  if (letters.length === 0) return "Harf bölümü gerekli";
  if (letters.length > 3) return "En fazla 3 harf olabilir";
  const allowed = PLATE_COMBOS[letters.length];
  if (!allowed || !allowed.includes(nums.length)) {
    if (letters.length === 1) return "1 harfli plakada 4 haneli rakam olmalı";
    if (letters.length === 2) return "2 harfli plakada 3 veya 4 haneli rakam olmalı";
    if (letters.length === 3) return "3 harfli plakada 2 veya 3 haneli rakam olmalı";
    return "Geçersiz plaka formatı";
  }
  return true;
};

/* ===========================================================
 *  Doğum Tarihi — GG.AA.YYYY
 * =========================================================== */

export const formatBirthDate = (v: string): string => {
  const digits = v.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 4)
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
  if (digits.length > 2) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return digits;
};

/* ===========================================================
 *  Ürün — alan konfigürasyonu
 * =========================================================== */

export interface ProductFieldsConfig {
  tcKimlik?: boolean;
  vkn?: boolean;
  plaka?: boolean;
  birthDate?: boolean;
  addressText?: boolean;
}

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
  "nakliyat-sigortasi": { vkn: true, addressText: true },
  "yat-tekne-sigortasi": { tcKimlik: true, addressText: true },
  "muhendislik-sigortalari": { vkn: true, addressText: true },
};

export const getProductFields = (slug?: string): ProductFieldsConfig => {
  if (!slug) return { tcKimlik: true };
  return PRODUCT_FIELDS[slug] ?? { tcKimlik: true };
};
