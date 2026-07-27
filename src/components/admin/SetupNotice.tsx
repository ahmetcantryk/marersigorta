interface SetupNoticeProps {
  missing: string[];
}

const HINTS: Record<string, string> = {
  ADMIN_PASSWORD: "Panele giriş parolası. Kendiniz belirlersiniz.",
  NEXT_PUBLIC_SUPABASE_URL:
    "Supabase Dashboard → Project Settings → API → Project URL",
  SUPABASE_SERVICE_ROLE_KEY:
    "Supabase Dashboard → Project Settings → API → service_role (gizli tutun, tarayıcıya gönderilmez)",
};

/** Eksik ortam değişkenlerini ve nereden alınacağını anlatan kurulum ekranı. */
export default function SetupNotice({ missing }: SetupNoticeProps) {
  return (
    <>
      <div className="adm-page-head">
        <div>
          <h1 className="adm-page-title">Kurulum gerekli</h1>
          <p className="adm-page-sub">
            Panelin çalışması için birkaç ayar eksik
          </p>
        </div>
      </div>

      <div className="adm-alert adm-alert-warn">
        Proje kökündeki <code>.env.local</code> dosyasına aşağıdaki değişkenleri
        ekleyip dev sunucusunu yeniden başlatın.
      </div>

      <div className="adm-card">
        <div className="adm-card-head">Eksik ortam değişkenleri</div>
        <div className="adm-card-body">
          <dl className="adm-dl">
            {missing.map((key) => (
              <div className="adm-dl-row" key={key}>
                <dt>
                  <code>{key}</code>
                </dt>
                <dd>{HINTS[key] ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
