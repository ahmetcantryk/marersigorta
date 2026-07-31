"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface LoginFormProps {
  /** Giriş sonrası gidilecek yol — sunucuda doğrulanmış hâlde gelir. */
  nextPath: string;
}

export default function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setError(data.message ?? "Giriş yapılamadı.");
        setBusy(false);
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı. Bağlantınızı kontrol edin.");
      setBusy(false);
    }
  };

  return (
    <form className="adm-login-form" onSubmit={onSubmit}>
      {error && <div className="adm-login-error">{error}</div>}

      <div className="adm-field">
        <label className="adm-label" htmlFor="adm-password">
          Parola
        </label>
        <input
          id="adm-password"
          className="adm-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          autoFocus
          required
        />
      </div>

      <button
        type="submit"
        className="adm-btn adm-btn-primary"
        disabled={busy || password.length === 0}
      >
        {busy ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
