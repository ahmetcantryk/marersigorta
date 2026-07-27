/**
 * Giriş denemeleri için basit bellek-içi hız sınırlayıcı.
 *
 * Serverless ortamda instance başına çalışır (dolayısıyla mutlak bir koruma
 * değildir), ancak kaba kuvvet denemelerini pratikte anlamsız kılacak kadar
 * yavaşlatır. Kalıcı koruma gerekirse Upstash/Redis'e taşınmalıdır.
 */

interface Attempt {
  count: number;
  /** Pencerenin başladığı zaman (ms). */
  windowStart: number;
  /** Kilitliyse serbest kalma zamanı (ms). */
  blockedUntil: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const BLOCK_MS = 15 * 60 * 1000;

const attempts = new Map<string, Attempt>();

/** Belleğin sınırsız büyümesini engelle — süresi geçmiş kayıtları at. */
function prune(now: number): void {
  for (const [key, value] of attempts) {
    if (now - value.windowStart > WINDOW_MS && value.blockedUntil < now) {
      attempts.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Kilitliyse kalan saniye. */
  retryAfterSeconds: number;
  remaining: number;
}

export function checkLoginRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  if (attempts.size > 500) prune(now);

  const entry = attempts.get(key);

  if (entry && entry.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.blockedUntil - now) / 1000),
      remaining: 0,
    };
  }

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(key, { count: 0, windowStart: now, blockedUntil: 0 });
    return { allowed: true, retryAfterSeconds: 0, remaining: MAX_ATTEMPTS };
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
    remaining: Math.max(0, MAX_ATTEMPTS - entry.count),
  };
}

/** Başarısız giriş sonrası çağrılır; eşik aşılırsa kilit devreye girer. */
export function registerFailedLogin(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key) ?? {
    count: 0,
    windowStart: now,
    blockedUntil: 0,
  };

  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_MS;
    entry.count = 0;
    entry.windowStart = now;
  }
  attempts.set(key, entry);
}

/** Başarılı girişte sayaç sıfırlanır. */
export function clearLoginAttempts(key: string): void {
  attempts.delete(key);
}
