import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin/session";

/**
 * /admin ve /api/admin altındaki her şeyi oturum jetonu ile korur.
 *
 * Giriş sayfası ve giriş/çıkış uçları muaftır; aksi hâlde kullanıcı
 * oturum açamaz (sonsuz yönlendirme).
 */

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/api/admin/login",
  "/api/admin/logout",
]);

function sessionSecret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length >= 16) return explicit;
  const password = process.env.ADMIN_PASSWORD;
  return password ? `marer-admin-session:${password}` : null;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) return NextResponse.next();

  const secret = sessionSecret();
  // Parola tanımlı değilse sayfalar kurulum ekranını gösterebilsin diye
  // geçirilir; veri dönen API uçları ise fail-closed kalır — aksi hâlde
  // parola eklenmeden önce /api/admin/export herkese açık olurdu.
  if (!secret) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { ok: false, message: "Yönetim paneli henüz yapılandırılmadı." },
        { status: 503 }
      );
    }
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token, secret);
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { ok: false, message: "Oturum gerekli." },
      { status: 401 }
    );
  }

  const loginUrl = new URL("/admin/login", req.url);
  // Giriş sonrası kullanıcıyı gitmek istediği sayfaya geri gönder.
  if (pathname !== "/admin") {
    loginUrl.searchParams.set("next", `${pathname}${search}`);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
