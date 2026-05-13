import { NextResponse, type NextRequest } from "next/server";
import { leadInputSchema } from "@/lib/lead-schema";
import { getSupabase } from "@/lib/supabase";
import { sendLeadEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadResponse {
  ok: boolean;
  id?: string;
  errors?: Record<string, string[]>;
  message?: string;
}

function clientIp(req: NextRequest): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return null;
}

export async function POST(req: NextRequest): Promise<NextResponse<LeadResponse>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Geçersiz istek gövdesi." },
      { status: 400 }
    );
  }

  const parsed = leadInputSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_";
      (errors[key] ??= []).push(issue.message);
    }
    return NextResponse.json(
      { ok: false, errors, message: "Form bilgileri doğrulanamadı." },
      { status: 400 }
    );
  }

  const lead = parsed.data;
  const userAgent = req.headers.get("user-agent");
  const ipAddress = clientIp(req);

  // Route inserts through SECURITY DEFINER RPC to keep anon role honest
  // while still letting public form submissions land in the leads table.
  let leadId: string;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.rpc("insert_lead", {
      payload: {
        source: lead.source,
        product_slug: lead.productSlug ?? null,
        product_label: lead.productLabel ?? null,
        full_name: lead.fullName,
        phone: lead.phone,
        email: lead.email ?? null,
        message: lead.message ?? null,
        service: lead.service ?? null,
        tc_kimlik: lead.tcKimlik ?? null,
        vkn: lead.vkn ?? null,
        plaka: lead.plaka ?? null,
        birth_date: parseBirthDate(lead.birthDate),
        address_text: lead.addressText ?? null,
        kvkk_consent: lead.kvkkConsent,
        user_agent: userAgent,
        ip_address: ipAddress,
      },
    });

    if (error || !data) {
      console.error("Supabase rpc error:", error);
      return NextResponse.json(
        { ok: false, message: "Kayıt sırasında bir hata oluştu." },
        { status: 500 }
      );
    }
    leadId = data as string;
  } catch (e: unknown) {
    console.error("Supabase exception:", e);
    return NextResponse.json(
      { ok: false, message: "Veritabanı bağlantı hatası." },
      { status: 500 }
    );
  }

  // Fire-and-forget email — DB success is the source of truth
  try {
    await sendLeadEmail({
      lead,
      leadId,
      userAgent,
      ipAddress,
    });
  } catch (e: unknown) {
    // Don't fail the request if email fails; the lead is in DB.
    console.error("Mail send failed:", e);
  }

  return NextResponse.json({ ok: true, id: leadId });
}

function parseBirthDate(dmy?: string): string | null {
  if (!dmy) return null;
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(dmy);
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  return `${yyyy}-${mm}-${dd}`;
}
