import type { LeadQuery } from "@/lib/admin/leads";
import { LEAD_SOURCE_LABELS } from "@/lib/admin/leads";

interface LeadFiltersProps {
  query: LeadQuery;
  products: Array<{ slug: string; label: string }>;
  /** Mevcut filtreleri koruyan dışa aktarım bağlantısı. */
  exportHref: string;
  hasActiveFilters: boolean;
}

/**
 * Filtre çubuğu — düz bir GET formu. İstemci tarafı JavaScript gerektirmez;
 * filtreler URL'de tutulduğu için sayfa paylaşılabilir ve geri tuşu çalışır.
 */
export default function LeadFilters({
  query,
  products,
  exportHref,
  hasActiveFilters,
}: LeadFiltersProps) {
  return (
    <form className="adm-filters" method="get" action="/admin">
      <div className="adm-filter-grid">
        <div className="adm-field">
          <label className="adm-label" htmlFor="f-q">
            Ara
          </label>
          <input
            id="f-q"
            name="q"
            className="adm-input"
            defaultValue={query.search ?? ""}
            placeholder="Ad soyad, telefon, e-posta, plaka…"
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="f-source">
            Kaynak
          </label>
          <select
            id="f-source"
            name="source"
            className="adm-select"
            defaultValue={query.source ?? ""}
          >
            <option value="">Tümü</option>
            {Object.entries(LEAD_SOURCE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="f-product">
            Ürün
          </label>
          <select
            id="f-product"
            name="product"
            className="adm-select"
            defaultValue={query.productSlug ?? ""}
          >
            <option value="">Tümü</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="f-from">
            Başlangıç
          </label>
          <input
            id="f-from"
            name="from"
            type="date"
            className="adm-input"
            defaultValue={query.from ?? ""}
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="f-to">
            Bitiş
          </label>
          <input
            id="f-to"
            name="to"
            type="date"
            className="adm-input"
            defaultValue={query.to ?? ""}
          />
        </div>
      </div>

      <div className="adm-filter-actions">
        <button type="submit" className="adm-btn adm-btn-primary">
          Filtrele
        </button>
        {hasActiveFilters && (
          <a href="/admin" className="adm-btn adm-btn-ghost">
            Temizle
          </a>
        )}
        <a href={exportHref} className="adm-btn adm-btn-ghost">
          ⬇ Excel'e aktar (CSV)
        </a>
      </div>
    </form>
  );
}
