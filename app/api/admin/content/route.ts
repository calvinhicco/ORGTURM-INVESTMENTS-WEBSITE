import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin/auth"
import { getSiteData, saveSiteData, type SiteData } from "@/lib/admin/store"

export async function GET() {
  const data = await getSiteData()
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = (await req.json()) as SiteData
  try {
    const result = await saveSiteData(data)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
