import { DEFAULT_PAGE_SIZE, type LeadQuery } from "./leads";

/** URL arama parametrelerini doğrulanmış bir `LeadQuery`ye çevirir. */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const VALID_SOURCES = new Set(["hero_quote", "contact_form", "product_quote"]);
const MAX_PAGE_SIZE = 100;

function readDate(value: string | null): string | undefined {
  if (!value || !ISO_DATE.test(value)) return undefined;
  return value;
}

function readPage(value: string | null): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function readPageSize(value: string | null): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_PAGE_SIZE;
  return Math.min(parsed, MAX_PAGE_SIZE);
}

export function parseLeadQuery(params: URLSearchParams): LeadQuery {
  const source = params.get("source");
  const productSlug = params.get("product");

  return {
    search: params.get("q")?.trim() || undefined,
    source: source && VALID_SOURCES.has(source) ? source : undefined,
    // Slug'lar kısıtlı bir karakter kümesindedir; beklenmedik girdiyi at.
    productSlug:
      productSlug && /^[a-z0-9-]{1,100}$/.test(productSlug)
        ? productSlug
        : undefined,
    from: readDate(params.get("from")),
    to: readDate(params.get("to")),
    page: readPage(params.get("page")),
    pageSize: readPageSize(params.get("size")),
  };
}

/** Filtreleri koruyarak yeni bir sorgu dizesi üretir (sayfalama, dışa aktarım). */
export function buildLeadQueryString(
  query: LeadQuery,
  overrides: Partial<Record<"page" | "q" | "source" | "product" | "from" | "to", string | number | undefined>> = {}
): string {
  const params = new URLSearchParams();
  const set = (key: string, value: string | number | undefined): void => {
    if (value === undefined || value === "" || value === null) return;
    params.set(key, String(value));
  };

  set("q", overrides.q !== undefined ? overrides.q : query.search);
  set("source", overrides.source !== undefined ? overrides.source : query.source);
  set(
    "product",
    overrides.product !== undefined ? overrides.product : query.productSlug
  );
  set("from", overrides.from !== undefined ? overrides.from : query.from);
  set("to", overrides.to !== undefined ? overrides.to : query.to);

  const page = overrides.page !== undefined ? overrides.page : query.page;
  if (page && Number(page) > 1) set("page", page);

  return params.toString();
}
