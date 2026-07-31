/**
 * Admin oturum jetonu — HMAC-SHA256 ile imzalanmış, durumsuz (stateless) cookie.
 *
 * Web Crypto API kullanır; böylece hem Edge runtime'da (middleware) hem de
 * Node runtime'da (route handler) aynı kod çalışır. Node-only `crypto` modülü
 * middleware'de kullanılamadığı için bu tercih zorunludur.
 */

export const ADMIN_COOKIE_NAME = "marer_admin";

/** Oturum ömrü — 8 saat (bir mesai günü). */
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

interface SessionPayload {
  /** Oturumu açan kullanıcı etiketi (şimdilik tek hesap). */
  sub: string;
  /** Veriliş zamanı — unix saniye. */
  iat: number;
  /** Son geçerlilik — unix saniye. */
  exp: number;
}

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  // ArrayBuffer'ı açıkça oluştur — Web Crypto `BufferSource` imzası
  // SharedArrayBuffer destekli Uint8Array'i kabul etmiyor.
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Zamanlama saldırılarına karşı sabit süreli string karşılaştırması.
 * `crypto.subtle.timingSafeEqual` her runtime'da bulunmadığı için elle yazıldı.
 */
export function safeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  // Uzunluk farkı erken dönerse bilgi sızar; yine de sabit döngü çalıştırılır.
  const length = Math.max(aBytes.length, bBytes.length);
  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < length; i += 1) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

/** Verilen gizli anahtarla imzalı oturum jetonu üretir. */
export async function createSessionToken(
  secret: string,
  subject = "admin"
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: subject,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };
  const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await importKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `${body}.${base64UrlEncode(new Uint8Array(signature))}`;
}

/**
 * Jetonu doğrular. İmza geçersiz veya süresi dolmuşsa `null` döner —
 * çağıran taraf her iki durumu da "oturum yok" olarak ele almalıdır.
 */
export async function verifySessionToken(
  token: string | undefined,
  secret: string
): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts;

  try {
    const key = await importKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(signature),
      encoder.encode(body)
    );
    if (!valid) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(body))
    ) as SessionPayload;

    if (typeof payload.exp !== "number") return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    // Bozuk base64 / JSON — geçersiz jeton olarak ele al.
    return null;
  }
}
