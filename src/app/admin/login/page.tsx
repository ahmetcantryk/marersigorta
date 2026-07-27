import LoginForm from "@/components/admin/LoginForm";
import { getAdminConfigStatus } from "@/lib/admin/config";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { next?: string };
}

/**
 * Açık yönlendirme (open redirect) koruması: yalnızca kendi sitemizde,
 * `/admin` altında kalan göreli yollara izin verilir.
 */
function safeNextPath(raw: string | undefined): string {
  if (!raw) return "/admin";
  if (!raw.startsWith("/admin")) return "/admin";
  if (raw.startsWith("//")) return "/admin";
  return raw;
}

export default function AdminLoginPage({ searchParams }: PageProps) {
  const status = getAdminConfigStatus();
  const nextPath = safeNextPath(searchParams.next);

  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <h1 className="adm-login-title">Yönetim Paneli</h1>
        <p className="adm-login-sub">Marer Sigorta — form kayıtları</p>

        {status.hasPassword ? (
          <LoginForm nextPath={nextPath} />
        ) : (
          <div className="adm-alert adm-alert-warn" style={{ marginBottom: 0 }}>
            <strong>Kurulum gerekli.</strong> Proje kökündeki{" "}
            <code>.env.local</code> dosyasına bir yönetici parolası ekleyip dev
            sunucusunu yeniden başlatın:
            <br />
            <br />
            <code>ADMIN_PASSWORD=guclu-bir-parola</code>
          </div>
        )}
      </div>
    </div>
  );
}
