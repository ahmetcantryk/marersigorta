/**
 * Lead bildirim e-postalarının nereye gideceği — env dışı bir konfig.
 * Bu dosyayı düzenleyip alıcıları güncelleyebilirsiniz.
 *
 * `to`: gerekli, en az bir adres (asıl alıcı).
 * `cc`: opsiyonel kopya alıcılar.
 * `bcc`: opsiyonel gizli kopya alıcılar.
 */

export interface MailRecipientsConfig {
  to: string[];
  cc?: string[];
  bcc?: string[];
}

export const MAIL_RECIPIENTS: MailRecipientsConfig = {
  to: ["teknik@marersigorta.com"],
  cc: ["hamzag@marersigorta.com", "mahsumk@marersigorta.com"],
};
