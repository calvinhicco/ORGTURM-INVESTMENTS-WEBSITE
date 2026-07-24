import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"

const COOKIE = "orgturm_admin"
const SESSION_DAYS = 7

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "orgturm-admin-session-key"
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "Admin123"
}

export function createSessionToken() {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  const payload = `ok.${exp}`
  const sig = createHmac("sha256", secret()).update(payload).digest("hex")
  return `${payload}.${sig}`
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return false
  const parts = token.split(".")
  if (parts.length !== 3) return false
  const [ok, expStr, sig] = parts
  if (ok !== "ok") return false
  const exp = Number(expStr)
  if (!Number.isFinite(exp) || Date.now() > exp) return false
  const payload = `${ok}.${expStr}`
  const expected = createHmac("sha256", secret()).update(payload).digest("hex")
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies()
  return verifySessionToken(jar.get(COOKIE)?.value)
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  }
}

export { COOKIE as ADMIN_COOKIE }
