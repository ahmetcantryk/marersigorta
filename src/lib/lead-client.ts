"use client";

export interface LeadPayload {
  source: "hero_quote" | "contact_form" | "product_quote";
  productSlug?: string;
  productLabel?: string;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  service?: string;
  tcKimlik?: string;
  vkn?: string;
  plaka?: string;
  birthDate?: string;
  addressText?: string;
  kvkkConsent: true;
}

export interface LeadResponse {
  ok: boolean;
  id?: string;
  errors?: Record<string, string[]>;
  message?: string;
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as LeadResponse;
    return data;
  } catch {
    return {
      ok: false,
      message: "Bağlantı hatası. Lütfen tekrar deneyin.",
    };
  }
}
