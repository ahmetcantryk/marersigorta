import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseReadKey, getSupabaseUrl } from "./config";

/**
 * Admin tarafı Supabase istemcisi — YALNIZCA sunucuda kullanılır.
 *
 * Service role anahtarı taşıdığı için bu modülü import eden hiçbir dosya
 * `"use client"` olmamalıdır. Anahtarın tarayıcıya sızmaması kritik.
 */

let cached: SupabaseClient | null = null;

export function getAdminSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = getSupabaseUrl();
  const key = getSupabaseReadKey();
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
