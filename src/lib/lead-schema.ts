import { z } from "zod";
import { VALID_TR_MOBILE_PREFIXES } from "./form-utils";

const turkishLettersRegex = /^[A-Za-zÇĞİÖŞÜçğıöşü ]+$/;

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
  .trim()
  .min(3, "Ad soyad en az 3 karakter olmalı")
  .max(80, "Ad soyad çok uzun")
  .regex(turkishLettersRegex, "Sadece harf ve boşluk girin")
  .refine(
    (v) => v.split(/\s+/).filter(Boolean).length >= 2,
    "Ad ve soyad girin"
  );

export const phoneSchema = z
  .string()
  .transform((v) => phoneDigitsOnly(v))
  .refine((d) => d.length === 10, "10 haneli telefon girin")
  .refine((d) => d.startsWith("5"), "Mobil hat olmalı (5 ile başlamalı)")
  .refine(
    (d) => VALID_TR_MOBILE_PREFIXES.has(d.slice(0, 3)),
    "Geçersiz operatör kodu"
  );

export const tcSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((d) => d.length === 11, "11 haneli TC kimlik girin");

export const vknSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((d) => d.length === 10, "10 haneli VKN girin");

export const plakaSchema = z
  .string()
  .trim()
  .toUpperCase()
  .min(5, "Geçerli plaka girin")
  .max(10, "Plaka çok uzun")
  .regex(/^[0-9A-ZÇĞİÖŞÜ ]+$/, "Sadece harf ve rakam");

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
    birthDate: d.birthDate || undefined,
    addressText: d.addressText || undefined,
  }));

export type LeadInput = z.infer<typeof leadInputSchema>;
