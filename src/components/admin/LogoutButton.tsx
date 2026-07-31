"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const logout = async (): Promise<void> => {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } catch {
      // Ağ hatası — kullanıcı tekrar deneyebilsin diye butonu serbest bırak.
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className="adm-topbar-link"
      onClick={logout}
      disabled={busy}
    >
      {busy ? "Çıkılıyor…" : "Çıkış"}
    </button>
  );
}
