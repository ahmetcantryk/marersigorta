import AdminShell from "@/components/admin/AdminShell";
import LeadFilters from "@/components/admin/LeadFilters";
import LeadsTable from "@/components/admin/LeadsTable";
import Pagination from "@/components/admin/Pagination";
import StatCards from "@/components/admin/StatCards";
import SetupNotice from "@/components/admin/SetupNotice";
import { getAdminConfigStatus } from "@/lib/admin/config";
import {
  fetchDistinctProducts,
  fetchLeadStats,
  fetchLeads,
} from "@/lib/admin/leads";
import { buildLeadQueryString, parseLeadQuery } from "@/lib/admin/query-params";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function toSearchParams(
  input: Record<string, string | string[] | undefined>
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "string") params.set(key, value);
    else if (Array.isArray(value) && value[0]) params.set(key, value[0]);
  }
  return params;
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const status = getAdminConfigStatus();
  if (!status.ready) {
    return (
      <AdminShell>
        <SetupNotice missing={status.missing} />
      </AdminShell>
    );
  }

  const query = parseLeadQuery(toSearchParams(searchParams));

  const [{ rows, total, error }, stats, products] = await Promise.all([
    fetchLeads(query),
    fetchLeadStats(),
    fetchDistinctProducts(),
  ]);

  const hasActiveFilters = Boolean(
    query.search || query.source || query.productSlug || query.from || query.to
  );

  const exportQs = buildLeadQueryString(query, { page: undefined });
  const exportHref = `/api/admin/export${exportQs ? `?${exportQs}` : ""}`;

  const hrefFor = (page: number): string => {
    const qs = buildLeadQueryString(query, { page });
    return `/admin${qs ? `?${qs}` : ""}`;
  };

  return (
    <AdminShell>
      <div className="adm-page-head">
        <div>
          <h1 className="adm-page-title">Gelen Formlar</h1>
          <p className="adm-page-sub">
            Siteden gönderilen tüm teklif ve iletişim talepleri
          </p>
        </div>
      </div>

      {status.usingAnonFallback && (
        <div className="adm-alert adm-alert-warn">
          <strong>Not:</strong> <code>SUPABASE_SERVICE_ROLE_KEY</code> tanımlı
          değil; anon anahtar kullanılıyor. RLS politikaları okumayı engelliyorsa
          liste boş görünür.
        </div>
      )}

      {error && (
        <div className="adm-alert adm-alert-error">
          <strong>Kayıtlar getirilemedi.</strong> {error}
        </div>
      )}

      <StatCards stats={stats} />

      <LeadFilters
        query={query}
        products={products}
        exportHref={exportHref}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="adm-table-wrap">
        <LeadsTable rows={rows} />
        <Pagination
          page={query.page}
          pageSize={query.pageSize}
          total={total}
          hrefFor={hrefFor}
        />
      </div>
    </AdminShell>
  );
}
