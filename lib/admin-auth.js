import "server-only";
import crypto from "node:crypto";
import { cookies, headers } from "next/headers";

const cookieName = "karcari_admin";
function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET must be configured (32+ characters)");
  return s;
}
function sign(value) { return crypto.createHmac("sha256", secret()).update(value).digest("hex"); }
export function validCredentials(user, password) {
  const knownUser = process.env.ADMIN_USERNAME || "owner";
  const knownPassword = process.env.ADMIN_PASSWORD;
  if (!knownPassword || knownPassword.length < 12) throw new Error("Set ADMIN_PASSWORD to a strong password (12+ characters)");
  const a = Buffer.from(crypto.createHash("sha256").update(String(user)).digest());
  const b = Buffer.from(crypto.createHash("sha256").update(knownUser).digest());
  const c = Buffer.from(crypto.createHash("sha256").update(String(password)).digest());
  const d = Buffer.from(crypto.createHash("sha256").update(knownPassword).digest());
  return crypto.timingSafeEqual(a,b) && crypto.timingSafeEqual(c,d);
}
export function token() {
  const expiry = Date.now() + 8 * 60 * 60 * 1000;
  const payload = String(expiry);
  return `${payload}.${sign(payload)}`;
}
export async function isAdmin() {
  try {
    const value = (await cookies()).get(cookieName)?.value || "";
    const [payload, mac, extra] = value.split(".");
    if (!payload || !mac || extra || !/^\d+$/.test(payload) || Number(payload) < Date.now()) return false;
    const expected = Buffer.from(sign(payload), "hex");
    const supplied = Buffer.from(mac, "hex");
    return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
  } catch { return false; }
}
export function setCookie(response, value) {
  response.cookies.set(cookieName, value, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 8*60*60, path: "/" });
}
export async function sameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = (await headers()).get("host");
  if (!origin || !host) return false;
  try { const url = new URL(origin); return url.host === host && (url.protocol === "https:" || process.env.NODE_ENV !== "production"); } catch { return false; }
}
