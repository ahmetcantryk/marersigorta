import { NextResponse, type NextRequest } from "next/server";
import { getAdminSupabase } from "@/lib/admin/supabase-admin";

/**
 * Supabase ücretsiz projesini ayakta tutar.
 *
 * Ücretsiz projeler ~1 hafta veritabanı isteği almazsa duraklatılıyor;
 * duraklatılınca formlar veritabanına yazılamıyor (mail yine gidiyor,
 * kimse fark etmiyor). Vercel Cron bu ucu günde bir çağırır ve tabloya
 * küçük bir sorgu atar — veri döndürmez.
 *
 * Uç hiçbir veri döndürmez; dışarıdan çağrılması yalnızca zararsız bir
 * sayım sorgusu tetikler. Yine de CRON_SECRET tanımlanırsa Vercel isteğe
 * `Authorization: Bearer <secret>` ekler ve uç yalnızca onu kabul eder.
 */

export const dynamic = "force-dynamic";

const LEADS_TABLE = "lead_submissions";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    console.error("Keepalive: Supabase yapılandırılmamış.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const { error } = await supabase
    .from(LEADS_TABLE)
    .select("id", { head: true, count: "exact" })
    .limit(1);

  if (error) {
    console.error("Keepalive: Supabase sorgusu başarısız:", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
