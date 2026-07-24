import { NextResponse } from "next/server"
import { getSiteData } from "@/lib/admin/store"

/** Public read endpoint for live site content */
export async function GET() {
  const data = await getSiteData()
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  })
}
