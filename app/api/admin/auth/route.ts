import { NextResponse } from "next/server"
import {
  adminPassword,
  createSessionToken,
  isAdminAuthenticated,
  sessionCookieOptions,
  ADMIN_COOKIE,
} from "@/lib/admin/auth"

export async function GET() {
  return NextResponse.json({ authenticated: await isAdminAuthenticated() })
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string }
  if (!body.password || body.password !== adminPassword()) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
  }
  const token = createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(sessionCookieOptions(token))
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  })
  return res
}
