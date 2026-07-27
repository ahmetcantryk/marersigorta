import Link from "next/link";
import {
  LEAD_SOURCE_LABELS,
  LEAD_STATUS_LABELS,
  type LeadRow,
} from "@/lib/admin/leads";
import {
  formatDateTime,
  formatPhone,
  isFresh,
  orDash,
  relativeTime,
  telHref,
  whatsappHref,
} from "@/lib/admin/format";

interface LeadsTableProps {
  rows: LeadRow[];
}

/** Satırda gösterilecek ikincil kimlik bilgisi (plaka > TC > VKN). */
function identityHint(row: LeadRow): string | null {
  if (row.plaka) return row.plaka;
  if (row.tc_kimlik) return `TC ${row.tc_kimlik}`;
  if (row.vkn) return `VKN ${row.vkn}`;
  return null;
}

export default function LeadsTable({ rows }: LeadsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="adm-empty">
        <div className="adm-empty-title">Kayıt bulunamadı</div>
        <p>Filtreleri değiştirip tekrar deneyin.</p>
      </div>
    );
  }

  return (
    <div className="adm-table-scroll">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Ad Soyad</th>
            <th>Telefon</th>
            <th>Ürün / Kaynak</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const tel = telHref(row.phone);
            const wa = whatsappHref(row.phone);
            const hint = identityHint(row);

            return (
              <tr key={row.id}>
                <td className="adm-cell-nowrap">
                  <div>{formatDateTime(row.created_at)}</div>
                  <div className="adm-cell-muted">
                    {relativeTime(row.created_at)}
                  </div>
                </td>

                <td>
                  <Link href={`/admin/leads/${row.id}`} className="adm-cell-name">
                    {orDash(row.full_name)}
                  </Link>
                  {isFresh(row.created_at) && (
                    <span className="adm-badge adm-badge-new">YENİ</span>
                  )}
                  {hint && <div className="adm-cell-muted">{hint}</div>}
                </td>

                <td className="adm-cell-nowrap">
                  {tel ? (
                    <a href={tel} className="adm-link">
                      {formatPhone(row.phone)}
                    </a>
                  ) : (
                    orDash(row.phone)
                  )}
                </td>

                <td>
                  <div>{orDash(row.product_label ?? row.product_slug)}</div>
                  {row.source && (
                    <span className="adm-badge adm-badge-source">
                      {LEAD_SOURCE_LABELS[row.source] ?? row.source}
                    </span>
                  )}
                </td>

                <td>
                  {row.status && (
                    <span className={`adm-badge adm-status-${row.status}`}>
                      {LEAD_STATUS_LABELS[row.status] ?? row.status}
                    </span>
                  )}
                  {row.email && (
                    <div className="adm-cell-muted" style={{ marginTop: 4 }}>
                      <a href={`mailto:${row.email}`} className="adm-link">
                        {row.email}
                      </a>
                    </div>
                  )}
                </td>

                <td>
                  <div className="adm-actions">
                    {wa && (
                      <a
                        href={wa}
                        className="adm-icon-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp'tan yaz"
                      >
                        ✆
                      </a>
                    )}
                    <Link
                      href={`/admin/leads/${row.id}`}
                      className="adm-icon-btn"
                      title="Detay"
                    >
                      →
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
