/**
 * Admin panel yapılandırması — tüm ortam değişkeni okumaları tek yerde.
 *
 * Panel, eksik konfigürasyonda çökmek yerine kullanıcıya ne yapması
 * gerektiğini anlatan bir kurulum ekranı gösterir; bu yüzden getter'lar
 * throw etmez, `null` döner.
 */

export interface AdminConfigStatus {
  hasPassword: boolean;
  hasSessionSecret: boolean;
  hasSupabaseUrl: boolean;
  hasServiceRoleKey: boolean;
  /** Service role yoksa anon anahtar ile denenir (RLS izin veriyorsa çalışır). */
  usingAnonFallback: boolean;
  /** Panelin açılabilmesi için gereken minimum ayarlar tamam mı? */
  ready: boolean;
  missing: string[];
}

export function getAdminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length > 0 ? value : null;
}

/**
 * Oturum imzalama anahtarı. Ayrı bir değer tanımlanmadıysa parolanın
 * kendisinden türetilir — böylece tek env değişkeni ile de çalışır, ancak
 * parola değişince tüm oturumlar geçersiz olur (istenen davranış).
 */
export function getSessionSecret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length >= 16) return explicit;
  const password = getAdminPassword();
  return password ? `marer-admin-session:${password}` : null;
}

export function getSupabaseUrl(): string | null {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || null;
}

/**
 * Okuma anahtarı. Service role tercih edilir (RLS'i aşar); yoksa anon
 * anahtara düşer. Anon anahtar yalnızca `leads` tablosunda SELECT izni
 * veren bir RLS politikası varsa iş görür.
 */
export function getSupabaseReadKey(): string | null {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    null
  );
}

export function getAdminConfigStatus(): AdminConfigStatus {
  const hasPassword = getAdminPassword() !== null;
  const hasSessionSecret = getSessionSecret() !== null;
  const hasSupabaseUrl = getSupabaseUrl() !== null;
  const hasServiceRoleKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const missing: string[] = [];
  if (!hasPassword) missing.push("ADMIN_PASSWORD");
  if (!hasSupabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!hasServiceRoleKey && !hasAnonKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  return {
    hasPassword,
    hasSessionSecret,
    hasSupabaseUrl,
    hasServiceRoleKey,
    usingAnonFallback: !hasServiceRoleKey && hasAnonKey,
    ready: missing.length === 0,
    missing,
  };
}
