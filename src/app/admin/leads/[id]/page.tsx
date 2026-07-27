import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import {
  LEAD_SOURCE_LABELS,
  LEAD_STATUS_LABELS,
  fetchLeadById,
} from "@/lib/admin/leads";
import {
  formatDate,
  formatDateTime,
  formatPhone,
  orDash,
  telHref,
  whatsappHref,
} from "@/lib/admin/format";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

interface Field {
  label: string;
  value: string;
}

function Row({ label, value }: Field) {
  return (
    <div className="adm-dl-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { row, error } = await fetchLeadById(params.id);

  if (error) {
    return (
      <AdminShell>
        <Link href="/admin" className="adm-back">
          ← Listeye dön
        </Link>
        <div className="adm-alert adm-alert-error">
          <strong>Kayıt getirilemedi.</strong> {error}
        </div>
      </AdminShell>
    );
  }

  if (!row) notFound();

  const tel = telHref(row.phone);
  const wa = whatsappHref(row.phone);

  // Yalnızca dolu olan kimlik/poliçe alanları gösterilir — ürüne göre
  // hangi alanların toplandığı değişiyor.
  const policyFields: Field[] = [
    { label: "TC Kimlik", value: row.tc_kimlik ?? "" },
    { label: "VKN", value: row.vkn ?? "" },
    { label: "Plaka", value: row.plaka ?? "" },
    { label: "Belge Seri No", value: row.belge_seri_no ?? "" },
    { label: "Doğum Tarihi", value: row.birth_date ? formatDate(row.birth_date) : "" },
    { label: "Adres", value: row.address_text ?? "" },
    { label: "Hizmet", value: row.service ?? "" },
  ].filter((f) => f.value.trim().length > 0);

  return (
    <AdminShell>
      <Link href="/admin" className="adm-back">
        ← Listeye dön
      </Link>

      <div className="adm-page-head">
        <div>
          <h1 className="adm-page-title">{orDash(row.full_name)}</h1>
          <p className="adm-page-sub">
            {formatDateTime(row.created_at)}
            {row.source
              ? ` · ${LEAD_SOURCE_LABELS[row.source] ?? row.source}`
              : ""}
          </p>
        </div>
        <div className="adm-actions">
          {tel && (
            <a href={tel} className="adm-btn adm-btn-ghost">
              ☎ Ara
            </a>
          )}
          {wa && (
            <a
              href={wa}
              className="adm-btn adm-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>

      <div className="adm-detail-grid">
        <div className="adm-card">
          <div className="adm-card-head">İletişim</div>
          <div className="adm-card-body">
            <dl className="adm-dl">
              <Row label="Ad Soyad" value={orDash(row.full_name)} />
              <Row label="Telefon" value={formatPhone(row.phone)} />
              <Row label="E-posta" value={orDash(row.email)} />
              <Row
                label="KVKK Onayı"
                value={row.kvkk_consent ? "Evet" : "Hayır"}
              />
            </dl>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-head">Talep</div>
          <div className="adm-card-body">
            <dl className="adm-dl">
              <Row
                label="Ürün"
                value={orDash(row.product_label ?? row.product_slug)}
              />
              <Row
                label="Kaynak"
                value={
                  row.source
                    ? LEAD_SOURCE_LABELS[row.source] ?? row.source
                    : "—"
                }
              />
              <Row label="Mesaj" value={orDash(row.message)} />
              <Row
                label="Durum"
                value={
                  row.status ? LEAD_STATUS_LABELS[row.status] ?? row.status : "—"
                }
              />
              <Row label="Ekip notu" value={orDash(row.notes)} />
            </dl>
          </div>
        </div>

        {policyFields.length > 0 && (
          <div className="adm-card">
            <div className="adm-card-head">Poliçe bilgileri</div>
            <div className="adm-card-body">
              <dl className="adm-dl">
                {policyFields.map((f) => (
                  <Row key={f.label} label={f.label} value={f.value} />
                ))}
              </dl>
            </div>
          </div>
        )}

        <div className="adm-card">
          <div className="adm-card-head">Teknik</div>
          <div className="adm-card-body">
            <dl className="adm-dl">
              <Row label="Kayıt No" value={row.id} />
              <Row label="IP Adresi" value={orDash(row.ip_address)} />
              <Row label="Tarayıcı" value={orDash(row.user_agent)} />
            </dl>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
