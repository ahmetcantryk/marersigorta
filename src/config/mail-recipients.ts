/**
 * Lead bildirim e-postalarının nereye gideceği — env dışı bir konfig.
 * Bu dosyayı düzenleyip yeni alıcı ekleyebilirsiniz.
 *
 * `to`: gerekli, en az bir adres.
 * `cc`: opsiyonel kopya alıcılar (şu an boş).
 * `bcc`: opsiyonel gizli kopya alıcılar (şu an boş).
 *
 * Yayına geçtiğinizde info@marersigorta.com veya başka kurumsal
 * adresleri buraya ekleyebilirsiniz.
 */

export interface MailRecipientsConfig {
  to: string[];
  cc?: string[];
  bcc?: string[];
}

export const MAIL_RECIPIENTS: MailRecipientsConfig = {
  to: ["ahmetcan.1855@gmail.com"],
  // cc: [], // şu an boş — gerekirse adres ekleyin
  // bcc: [],
};
