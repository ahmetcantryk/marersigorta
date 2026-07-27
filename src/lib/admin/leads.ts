import { getAdminSupabase } from "./supabase-admin";

/** `leads` tablosunun admin panelinde kullanılan alanları. */
export interface LeadRow {
  id: string;
  created_at: string | null;
  source: string | null;
  product_slug: string | null;
  product_label: string | null;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  service: string | null;
  tc_kimlik: string | null;
  vkn: string | null;
  plaka: string | null;
  belge_seri_no: string | null;
  birth_date: string | null;
  address_text: string | null;
  kvkk_consent: boolean | null;
  user_agent: string | null;
  ip_address: string | null;
}

export const LEAD_SOURCE_LABELS: Record<string, string> = {
  hero_quote: "Anasayfa hızlı teklif",
  contact_form: "İletişim formu",
  product_quote: "Ürün teklif formu",
};

export interface LeadQuery {
  search?: string;
  source?: string;
  productSlug?: string;
  /** ISO tarih (YYYY-MM-DD) — dahil. */
  from?: string;
  /** ISO tarih (YYYY-MM-DD) — dahil (gün sonuna kadar). */
  to?: string;
  page: number;
  pageSize: number;
}

export interface LeadQueryResult {
  rows: LeadRow[];
  total: number;
  /** Sorgu başarısızsa kullanıcıya gösterilecek mesaj. */
  error: string | null;
}

export const DEFAULT_PAGE_SIZE = 25;

/**
 * PostgREST `or()` filtresi virgül ve parantezle ayrıştırılır; kullanıcı
 * girdisindeki bu karakterler filtreyi bozabilir. Güvenli tarafta kalmak
 * için ayrıştırıcı için anlamlı olan karakterleri temizliyoruz.
 */
function sanitizeSearchTerm(raw: string): string {
  return raw.replace(/[,()*\\%]/g, " ").trim().slice(0, 80);
}

/** Telefon araması için: kullanıcı "0532 111..." yazsa da eşleşsin. */
function phoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length > 10) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

const SERVICE_ROLE_HINT =
  "Bu tablo anon anahtara kapalı. `.env.local` dosyasına " +
  "SUPABASE_SERVICE_ROLE_KEY ekleyin " +
  "(Supabase Dashboard → Project Settings → API → service_role) ve dev " +
  "sunucusunu yeniden başlatın.";

function describeError(error: { message?: string; code?: string }): string {
  const message = error.message ?? "Bilinmeyen hata";

  // PGRST205 / 42P01: tablo yok *veya* PostgREST şemasında görünmüyor.
  // Pratikte ikincisi çok daha sık — `leads` yalnızca SECURITY DEFINER
  // `insert_lead` RPC'si üzerinden yazılıyor, anon'a hiç açılmamış.
  if (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    /could not find the table/i.test(message)
  ) {
    return SERVICE_ROLE_HINT;
  }

  if (/permission denied|row-level security|JWT/i.test(message)) {
    return `Supabase okuma izni yok. ${SERVICE_ROLE_HINT}`;
  }

  return `Supabase hatası: ${message}`;
}

export async function fetchLeads(query: LeadQuery): Promise<LeadQueryResult> {
  const supabase = getAdminSupabase();
  if (!supabase) {
    return { rows: [], total: 0, error: "Supabase yapılandırması eksik." };
  }

  const from = (query.page - 1) * query.pageSize;
  const to = from + query.pageSize - 1;

  let request = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (query.source) request = request.eq("source", query.source);
  if (query.productSlug) request = request.eq("product_slug", query.productSlug);
  if (query.from) request = request.gte("created_at", `${query.from}T00:00:00`);
  if (query.to) request = request.lte("created_at", `${query.to}T23:59:59.999`);

  const term = query.search ? sanitizeSearchTerm(query.search) : "";
  if (term) {
    const digits = phoneDigits(term);
    const clauses = [
      `full_name.ilike.%${term}%`,
      `email.ilike.%${term}%`,
      `plaka.ilike.%${term}%`,
      `product_label.ilike.%${term}%`,
    ];
    if (digits.length >= 3) clauses.push(`phone.ilike.%${digits}%`);
    request = request.or(clauses.join(","));
  }

  const { data, error, count } = await request;
  if (error) {
    return { rows: [], total: 0, error: describeError(error) };
  }

  return {
    rows: (data ?? []) as LeadRow[],
    total: count ?? 0,
    error: null,
  };
}

export async function fetchLeadById(
  id: string
): Promise<{ row: LeadRow | null; error: string | null }> {
  const supabase = getAdminSupabase();
  if (!supabase) return { row: null, error: "Supabase yapılandırması eksik." };

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) return { row: null, error: describeError(error) };
  return { row: (data as LeadRow) ?? null, error: null };
}

export interface LeadStats {
  total: number;
  today: number;
  last7Days: number;
  last30Days: number;
}

/**
 * Özet kartlar için sayımlar. `head: true` ile satır gövdesi çekilmez,
 * yalnızca count döner — büyük tablolarda ucuz kalır.
 */
export async function fetchLeadStats(): Promise<LeadStats> {
  const empty: LeadStats = { total: 0, today: 0, last7Days: 0, last30Days: 0 };
  const supabase = getAdminSupabase();
  if (!supabase) return empty;

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).toISOString();
  const days = (n: number): string =>
    new Date(now.getTime() - n * 24 * 60 * 60 * 1000).toISOString();

  const countSince = async (since?: string): Promise<number> => {
    let request = supabase
      .from("leads")
      .select("id", { count: "exact", head: true });
    if (since) request = request.gte("created_at", since);
    const { count, error } = await request;
    return error ? 0 : count ?? 0;
  };

  const [total, today, last7Days, last30Days] = await Promise.all([
    countSince(),
    countSince(startOfToday),
    countSince(days(7)),
    countSince(days(30)),
  ]);

  return { total, today, last7Days, last30Days };
}

/** Filtre açılır menüsünü doldurmak için kayıtlı ürünlerin listesi. */
export async function fetchDistinctProducts(): Promise<
  Array<{ slug: string; label: string }>
> {
  const supabase = getAdminSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("leads")
    .select("product_slug, product_label")
    .not("product_slug", "is", null)
    .limit(1000);

  if (error || !data) return [];

  const seen = new Map<string, string>();
  for (const row of data as Array<{
    product_slug: string | null;
    product_label: string | null;
  }>) {
    if (!row.product_slug) continue;
    if (!seen.has(row.product_slug)) {
      seen.set(row.product_slug, row.product_label ?? row.product_slug);
    }
  }

  return Array.from(seen, ([slug, label]) => ({ slug, label })).sort((a, b) =>
    a.label.localeCompare(b.label, "tr")
  );
}
