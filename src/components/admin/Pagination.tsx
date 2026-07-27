import Link from "next/link";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  /** Sayfa numarasını alıp hedef URL üreten fonksiyon. */
  hrefFor: (page: number) => string;
}

export default function Pagination({
  page,
  pageSize,
  total,
  hrefFor,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="adm-pagination">
      <span className="adm-pagination-info">
        {total === 0
          ? "Kayıt yok"
          : `${total} kayıttan ${first}–${last} arası · Sayfa ${page}/${totalPages}`}
      </span>

      <div className="adm-pagination-links">
        <Link
          href={hrefFor(page - 1)}
          className="adm-page-btn"
          aria-disabled={!hasPrev}
          tabIndex={hasPrev ? undefined : -1}
        >
          ← Önceki
        </Link>
        <Link
          href={hrefFor(page + 1)}
          className="adm-page-btn"
          aria-disabled={!hasNext}
          tabIndex={hasNext ? undefined : -1}
        >
          Sonraki →
        </Link>
      </div>
    </div>
  );
}
