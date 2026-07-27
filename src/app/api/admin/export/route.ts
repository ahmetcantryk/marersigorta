import { NextResponse, type NextRequest } from "next/server";
import { fetchLeads, LEAD_SOURCE_LABELS, type LeadRow } from "@/lib/admin/leads";
import { formatDateTime } from "@/lib/admin/format";
import { parseLeadQuery } from "@/lib/admin/query-params";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Tek seferde dışa aktarılacak azami kayıt — bellek ve süre koruması. */
const EXPORT_LIMIT = 5000;

const COLUMNS: Array<{ header: string; get: (row: LeadRow) => string }> = [
  { header: "Tarih", get: (r) => formatDateTime(r.created_at) },
  {
    header: "Kaynak",
    get: (r) => (r.source ? LEAD_SOURCE_LABELS[r.source] ?? r.source : ""),
  },
  { header: "Ürün", get: (r) => r.product_label ?? r.product_slug ?? "" },
  { header: "Ad Soyad", get: (r) => r.full_name ?? "" },
  { header: "Telefon", get: (r) => (r.phone ? `0${r.phone}` : "") },
  { header: "E-posta", get: (r) => r.email ?? "" },
  { header: "TC Kimlik", get: (r) => r.tc_kimlik ?? "" },
  { header: "VKN", get: (r) => r.vkn ?? "" },
  { header: "Plaka", get: (r) => r.plaka ?? "" },
  { header: "Belge Seri No", get: (r) => r.belge_seri_no ?? "" },
  { header: "Doğum Tarihi", get: (r) => r.birth_date ?? "" },
  { header: "Adres", get: (r) => r.address_text ?? "" },
  { header: "Hizmet", get: (r) => r.service ?? "" },
  { header: "Mesaj", get: (r) => r.message ?? "" },
  { header: "KVKK Onayı", get: (r) => (r.kvkk_consent ? "Evet" : "Hayır") },
  { header: "IP", get: (r) => r.ip_address ?? "" },
];

/**
 * CSV alanı kaçışlama. Excel'de formül enjeksiyonunu (=, +, -, @ ile
 * başlayan hücreler) engellemek için tek tırnak öneki eklenir.
 */
function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const query = parseLeadQuery(req.nextUrl.searchParams);
  const { rows, error } = await fetchLeads({
    ...query,
    page: 1,
    pageSize: EXPORT_LIMIT,
  });

  if (error) {
    return NextResponse.json({ ok: false, message: error }, { status: 502 });
  }

  const lines = [
    COLUMNS.map((c) => csvCell(c.header)).join(";"),
    ...rows.map((row) => COLUMNS.map((c) => csvCell(c.get(row))).join(";")),
  ];

  // BOM — Excel'in UTF-8'i doğru okuması ve Türkçe karakterlerin bozulmaması
  // için gerekli. Ayraç olarak `;` kullanılır (TR yerel ayarı).
  const body = `﻿${lines.join("\r\n")}`;
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="marer-formlar-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
