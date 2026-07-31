/** Admin panelinde ortak kullanılan görüntüleme yardımcıları. */

const TR_DATE_TIME = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Istanbul",
});

const TR_DATE = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Istanbul",
});

export function formatDateTime(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return TR_DATE_TIME.format(date);
}

export function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return TR_DATE.format(date);
}

/** "5321234567" → "(532) 123 45 67" */
export function formatPhone(value: string | null): string {
  if (!value) return "—";
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 10) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
}

/** `tel:` bağlantısı için E.164 formatı. */
export function telHref(value: string | null): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 10) return null;
  return `tel:+90${digits}`;
}

/** WhatsApp bağlantısı — acente ekibi çoğu müşteriye buradan dönüyor. */
export function whatsappHref(value: string | null): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 10) return null;
  return `https://wa.me/90${digits}`;
}

export function orDash(value: string | null | undefined): string {
  if (value === null || value === undefined) return "—";
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : "—";
}

/**
 * "2 saat önce" tarzı göreli zaman — listede taze kayıtları ayırt etmeyi
 * kolaylaştırır.
 */
export function relativeTime(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "az önce";
  if (minutes < 60) return `${minutes} dk önce`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} saat önce`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} gün önce`;

  const months = Math.floor(days / 30);
  return `${months} ay önce`;
}

/** Kayıt son 24 saat içinde mi? Listede "yeni" rozeti için. */
export function isFresh(value: string | null): boolean {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  return Date.now() - date.getTime() < 24 * 60 * 60 * 1000;
}
