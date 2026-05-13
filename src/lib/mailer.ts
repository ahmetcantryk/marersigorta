import nodemailer, { type Transporter } from "nodemailer";
import { MAIL_RECIPIENTS } from "@/config/mail-recipients";
import type { LeadInput } from "./lead-schema";

let cached: Transporter | null = null;

function getTransporter(): Transporter {
  if (cached) return cached;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = (process.env.SMTP_SECURE ?? "false") === "true";
  const requireTLS = (process.env.SMTP_REQUIRE_TLS ?? "true") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP environment variables are not configured.");
  }
  cached = nodemailer.createTransport({
    host,
    port,
    // For Office 365 / Outlook: port 587 + STARTTLS → secure=false + requireTLS=true.
    // For SSL (port 465): secure=true (requireTLS ignored).
    secure,
    requireTLS: secure ? undefined : requireTLS,
    auth: { user, pass },
    // 10-second timeouts so a bad SMTP host doesn't hang the API request.
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
      // Office 365 sometimes needs minimum TLS version forced.
      minVersion: "TLSv1.2",
    },
  });
  return cached;
}

const SOURCE_LABEL: Record<LeadInput["source"], string> = {
  hero_quote: "Anasayfa hızlı teklif",
  contact_form: "İletişim formu",
  product_quote: "Ürün detay teklif formu",
};

interface LeadEmailOptions {
  lead: LeadInput;
  leadId: string;
  userAgent?: string | null;
  ipAddress?: string | null;
}

const esc = (v: unknown): string =>
  String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatPhoneDisplay = (digits: string): string => {
  if (digits.length !== 10) return digits;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
};

function buildHtml(opts: LeadEmailOptions): string {
  const { lead, leadId, userAgent, ipAddress } = opts;
  const rows: Array<[string, string | undefined]> = [
    ["Kaynak", SOURCE_LABEL[lead.source]],
    ["Ürün", lead.productLabel ?? lead.productSlug],
    ["Ad Soyad", lead.fullName],
    ["Telefon", formatPhoneDisplay(lead.phone)],
    ["E-posta", lead.email],
    ["TC Kimlik", lead.tcKimlik],
    ["VKN", lead.vkn],
    ["Plaka", lead.plaka],
    ["Doğum Tarihi", lead.birthDate],
    ["Adres", lead.addressText],
    ["İlgilendiği Hizmet", lead.service],
    ["Mesaj", lead.message],
  ];

  const filled = rows
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 14px;background:#f6f9fc;color:#5C6B7E;font-size:13px;font-weight:600;width:160px;border-bottom:1px solid #EEF2F6;">${esc(k)}</td>
          <td style="padding:10px 14px;color:#0B1A2C;font-size:14px;border-bottom:1px solid #EEF2F6;">${esc(v)}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="tr">
<head><meta charset="utf-8"><title>Yeni Lead — Marer Sigorta</title></head>
<body style="margin:0;padding:24px;background:#F6F9FC;font-family:Inter,system-ui,Segoe UI,sans-serif;color:#0B1A2C;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #EEF2F6;">
    <div style="padding:24px 28px;background:linear-gradient(135deg,#56ACD6,#2D7299);color:#fff;">
      <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.85;font-weight:700;">Marer Sigorta</div>
      <div style="font-size:20px;font-weight:800;margin-top:6px;">Yeni teklif talebi geldi</div>
      <div style="font-size:13px;opacity:.9;margin-top:4px;">${esc(SOURCE_LABEL[lead.source])}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>${filled}</tbody>
    </table>
    <div style="padding:16px 28px;font-size:11.5px;color:#8493A5;background:#F6F9FC;border-top:1px solid #EEF2F6;">
      Lead ID: ${esc(leadId)}<br>
      ${userAgent ? `User-Agent: ${esc(userAgent)}<br>` : ""}
      ${ipAddress ? `IP: ${esc(ipAddress)}` : ""}
    </div>
  </div>
</body></html>`;
}

function buildText(opts: LeadEmailOptions): string {
  const { lead, leadId } = opts;
  const lines = [
    `MARER SİGORTA — Yeni Lead`,
    `Kaynak: ${SOURCE_LABEL[lead.source]}`,
    lead.productLabel || lead.productSlug ? `Ürün: ${lead.productLabel ?? lead.productSlug}` : "",
    ``,
    `Ad Soyad: ${lead.fullName}`,
    `Telefon: ${formatPhoneDisplay(lead.phone)}`,
    lead.email ? `E-posta: ${lead.email}` : "",
    lead.tcKimlik ? `TC: ${lead.tcKimlik}` : "",
    lead.vkn ? `VKN: ${lead.vkn}` : "",
    lead.plaka ? `Plaka: ${lead.plaka}` : "",
    lead.birthDate ? `Doğum Tarihi: ${lead.birthDate}` : "",
    lead.addressText ? `Adres: ${lead.addressText}` : "",
    lead.service ? `Hizmet: ${lead.service}` : "",
    lead.message ? `Mesaj: ${lead.message}` : "",
    ``,
    `Lead ID: ${leadId}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function sendLeadEmail(opts: LeadEmailOptions): Promise<void> {
  const transporter = getTransporter();
  const subject =
    `[Lead] ${SOURCE_LABEL[opts.lead.source]}` +
    (opts.lead.productLabel ? ` — ${opts.lead.productLabel}` : "");

  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? "noreply@marersigorta.com",
    to: MAIL_RECIPIENTS.to,
    cc: MAIL_RECIPIENTS.cc,
    bcc: MAIL_RECIPIENTS.bcc,
    replyTo: opts.lead.email ?? undefined,
    subject,
    html: buildHtml(opts),
    text: buildText(opts),
  });
}
