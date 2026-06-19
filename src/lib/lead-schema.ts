import { z } from "zod";
import {
  VALID_TR_MOBILE_PREFIXES,
  isSuspiciousPhone,
  validateTCKimlik,
  validatePlate,
  validateBelgeSeri,
  validateFullName,
  splitPlate,
} from "./form-utils";

const phoneDigitsOnly = (v: string): string => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("90") && d.length > 10) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
};

export const leadSourceSchema = z.enum([
  "hero_quote",
  "contact_form",
  "product_quote",
]);

export const fullNameSchema = z
  .string()
  .max(80, "Ad soyad çok uzun")
  .superRefine((v, ctx) => {
    const r = validateFullName(v);
    if (r !== true) ctx.addIssue({ code: z.ZodIssueCode.custom, message: r });
  })
  .transform((v) => v.trim().replace(/\s+/g, " "));

export const phoneSchema = z
  .string()
  .transform((v) => phoneDigitsOnly(v))
  .refine((d) => d.length === 10, "10 haneli telefon girin")
  .refine((d) => d.startsWith("5"), "Mobil hat olmalı (5 ile başlamalı)")
  .refine(
    (d) => VALID_TR_MOBILE_PREFIXES.has(d.slice(0, 3)),
    "Geçersiz operatör kodu"
  )
  .refine(
    (d) => !isSuspiciousPhone(d),
    "Geçerli bir telefon numarası girin"
  );

export const tcSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((d) => {
    const r = validateTCKimlik(d);
    return r === true;
  }, "Geçersiz TC kimlik no");

export const vknSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((d) => d.length === 10, "10 haneli VKN girin");

/**
 * Plaka — algoritmik validasyon (il kodu 01–81, harf/rakam kombinasyonu).
 * Kabul edilen formatlar: NN L NNNN, NN LL NNN/NNNN, NN LLL NN/NNN
 * Server'a normalize edilmiş halde (boşluksuz, uppercase) yazılır.
 */
export const plakaSchema = z
  .string()
  .refine((v) => validatePlate(v) === true, "Geçerli plaka girin")
  .transform((v) => {
    const { city, letters, nums } = splitPlate(v);
    return `${city} ${letters} ${nums}`;
  });

export const belgeSeriNoSchema = z
  .string()
  .refine((v) => validateBelgeSeri(v) === true, "Geçerli belge seri no girin")
  .transform((v) => v.replace(/\s/g, "").toUpperCase());

export const birthDateSchema = z
  .string()
  .regex(/^\d{2}\.\d{2}\.\d{4}$/, "GG.AA.YYYY formatında girin");

export const emailSchema = z
  .string()
  .email("Geçerli e-posta girin");

export const leadInputSchema = z
  .object({
    source: leadSourceSchema,
    productSlug: z.string().min(1).max(100).optional(),
    productLabel: z.string().min(1).max(100).optional(),
    fullName: fullNameSchema,
    phone: phoneSchema,
    email: emailSchema.optional().or(z.literal("")),
    message: z.string().max(2000).optional().or(z.literal("")),
    service: z.string().max(100).optional().or(z.literal("")),
    tcKimlik: tcSchema.optional().or(z.literal("")),
    vkn: vknSchema.optional().or(z.literal("")),
    plaka: plakaSchema.optional().or(z.literal("")),
    belgeSeriNo: belgeSeriNoSchema.optional().or(z.literal("")),
    birthDate: birthDateSchema.optional().or(z.literal("")),
    addressText: z.string().max(500).optional().or(z.literal("")),
    kvkkConsent: z.literal(true, {
      message: "KVKK onayı zorunlu",
    }),
  })
  .transform((d) => ({
    ...d,
    email: d.email || undefined,
    message: d.message || undefined,
    service: d.service || undefined,
    tcKimlik: d.tcKimlik || undefined,
    vkn: d.vkn || undefined,
    plaka: d.plaka || undefined,
    belgeSeriNo: d.belgeSeriNo || undefined,
    birthDate: d.birthDate || undefined,
    addressText: d.addressText || undefined,
  }));

export type LeadInput = z.infer<typeof leadInputSchema>;
