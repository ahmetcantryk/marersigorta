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
    secure,
    requireTLS: secure ? undefined : requireTLS,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
      // Shared hosting (isimtescil, cPanel) sertifikaları domain ile birebir
      // eşleşmeyebilir — bağlantı reddini önlemek için strict modu gevşet.
      rejectUnauthorized: false,
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

const formatDateTR = (d: Date): string => {
  const fmt = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
    hour12: false,
  });
  // tr-TR çıktısı: "13.05.2026 22:41"
  return fmt.format(d).replace(",", "");
};

function buildHtml(opts: LeadEmailOptions): string {
  const { lead } = opts;
  const submittedAt = formatDateTR(new Date());
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
    ["Gönderilme Zamanı", submittedAt],

  ];

  const filled = rows
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(
      ([k, v], i) => {
        const isPhone = k === "Telefon";
        const stripe = i % 2 === 0 ? "#FFFFFF" : "#F6F9FC";
        return `
        <tr>
          <td style="padding:12px 16px;background:${stripe};color:#5C6B7E;font-size:12.5px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;width:160px;border-bottom:1px solid #EEF2F6;vertical-align:top;">${esc(k)}</td>
          <td style="padding:12px 16px;background:${stripe};color:${isPhone ? "#0277BD" : "#0B1A2C"};font-size:14.5px;font-weight:${isPhone ? "700" : "600"};border-bottom:1px solid #EEF2F6;">${esc(v)}</td>
        </tr>`;
      }
    )
    .join("");

  return `<!doctype html>
<html lang="tr">
<head><meta charset="utf-8"><title>Yeni teklif talebi — Marer Sigorta</title></head>
<body style="margin:0;padding:24px;background:#F6F9FC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0B1A2C;">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #EEF2F6;border-radius:12px;overflow:hidden;">
    <div style="padding:20px 24px;background:#EFF8FC;border-bottom:2px solid #56ACD6;">
      <div style="display:flex;align-items:center;gap:8px;font-size:11.5px;color:#2D7299;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px;">
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10B981;"></span>
        Marer Sigorta
      </div>
      <div style="font-size:18px;font-weight:700;color:#0B1A2C;">Yeni teklif talebi geldi</div>
      <div style="font-size:13px;color:#5C6B7E;margin-top:2px;">${esc(SOURCE_LABEL[lead.source])}${lead.productLabel ? ` · ${esc(lead.productLabel)}` : ""}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>${filled}</tbody>
    </table>
  </div>
</body></html>`;
}

function buildText(opts: LeadEmailOptions): string {
  const { lead } = opts;
  const submittedAt = formatDateTR(new Date());
  const lines = [
    `Yeni teklif talebi — Marer Sigorta`,
    `Kaynak: ${SOURCE_LABEL[lead.source]}`,
    lead.productLabel || lead.productSlug ? `Ürün: ${lead.productLabel ?? lead.productSlug}` : "",
    `Gönderilme Zamanı: ${submittedAt}`,
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
  ];
  return lines.filter(Boolean).join("\n");
}

export async function sendLeadEmail(opts: LeadEmailOptions): Promise<void> {
  const subject =
    `[Lead] ${SOURCE_LABEL[opts.lead.source]}` +
    (opts.lead.productLabel ? ` — ${opts.lead.productLabel}` : "");
  const from = process.env.MAIL_FROM ?? "noreply@marersigorta.com";

  // Resend takes priority if API key is configured. Office 365 SMTP AUTH is
  // disabled by default at the tenant level, so this gives us a reliable
  // delivery path while the admin enables SMTP AUTH (or App Password).
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const { Resend } = await import("resend");
    const client = new Resend(resendKey);
    const result = await client.emails.send({
      from,
      to: MAIL_RECIPIENTS.to,
      cc: MAIL_RECIPIENTS.cc,
      bcc: MAIL_RECIPIENTS.bcc,
      replyTo: opts.lead.email ?? undefined,
      subject,
      html: buildHtml(opts),
      text: buildText(opts),
    });
    if (result.error) {
      throw new Error(`Resend error: ${result.error.message}`);
    }
    return;
  }

  // Fallback: classic SMTP (Office 365 / custom). Requires SMTP AUTH enabled
  // on the mailbox + tenant; otherwise see RESEND_API_KEY path above.
  const transporter = getTransporter();
  await transporter.sendMail({
    from,
    to: MAIL_RECIPIENTS.to,
    cc: MAIL_RECIPIENTS.cc,
    bcc: MAIL_RECIPIENTS.bcc,
    replyTo: opts.lead.email ?? undefined,
    subject,
    html: buildHtml(opts),
    text: buildText(opts),
  });
}
