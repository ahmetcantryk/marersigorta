import { NextResponse, type NextRequest } from "next/server";
import { getAdminPassword, getSessionSecret } from "@/lib/admin/config";
import {
  ADMIN_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  createSessionToken,
  safeEqual,
} from "@/lib/admin/session";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  registerFailedLogin,
} from "@/lib/admin/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "local";
}

export async function POST(req: NextRequest) {
  const password = getAdminPassword();
  const secret = getSessionSecret();

  if (!password || !secret) {
    return NextResponse.json(
      { ok: false, message: "Admin parolası sunucuda tanımlı değil." },
      { status: 503 }
    );
  }

  const key = clientKey(req);
  const limit = checkLoginRateLimit(key);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: `Çok fazla hatalı deneme. ${Math.ceil(limit.retryAfterSeconds / 60)} dakika sonra tekrar deneyin.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let submitted = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    submitted = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json(
      { ok: false, message: "Geçersiz istek." },
      { status: 400 }
    );
  }

  if (!safeEqual(submitted, password)) {
    registerFailedLogin(key);
    return NextResponse.json(
      { ok: false, message: "Parola hatalı." },
      { status: 401 }
    );
  }

  clearLoginAttempts(key);
  const token = await createSessionToken(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
