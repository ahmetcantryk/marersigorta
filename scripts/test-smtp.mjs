/**
 * SMTP host/port tarayıcı.
 * `node scripts/test-smtp.mjs` ile çalıştır.
 * Çalışan kombinasyonu bulup .env.local'e koy.
 */
import nodemailer from "nodemailer";

const USER = "noreply@marersigorta.com";
const PASS = "Marer4725";

const COMBOS = [
  { host: "mail.guzel.net.tr", port: 587, secure: false, requireTLS: true },
  { host: "mail.guzel.net.tr", port: 465, secure: true },
  { host: "mail.marersigorta.com", port: 587, secure: false, requireTLS: true },
  { host: "mail.marersigorta.com", port: 465, secure: true },
  { host: "smtp.marersigorta.com", port: 25, secure: false, requireTLS: false },
  { host: "smtp.marersigorta.com", port: 26, secure: false, requireTLS: false },
  { host: "smtp.marersigorta.com", port: 2525, secure: false, requireTLS: false },
  { host: "mx01.marersigorta.com", port: 587, secure: false, requireTLS: true },
  { host: "relay.guzelhosting.com", port: 587, secure: false, requireTLS: true },
  { host: "relay.guzelhosting.com", port: 465, secure: true },
];

async function test(c) {
  const t = nodemailer.createTransport({
    host: c.host,
    port: c.port,
    secure: c.secure,
    requireTLS: c.secure ? undefined : c.requireTLS,
    auth: { user: USER, pass: PASS },
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 8000,
    tls: { rejectUnauthorized: false, minVersion: "TLSv1.2" },
  });
  try {
    await t.verify();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      err: e.code ? `${e.code} — ${e.message?.split("\n")[0] ?? ""}` : String(e),
    };
  } finally {
    t.close();
  }
}

console.log("Testing SMTP combos...\n");
for (const c of COMBOS) {
  const label = `${c.host}:${c.port} (${c.secure ? "SSL" : "STARTTLS"})`.padEnd(60);
  const r = await test(c);
  console.log(r.ok ? `✅ ${label}` : `❌ ${label} ${r.err}`);
}
