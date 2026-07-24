import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin/auth"
import { deleteCmsFile, getSiteData, saveSiteData, uploadCmsFile } from "@/lib/admin/store"

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get("file")
  const alt = String(form.get("alt") || "ORGTURM media")
  const category = String(form.get("category") || "Project")
  const section = String(form.get("section") || "gallery")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  try {
    const uploaded = await uploadCmsFile(file)
    const data = await getSiteData()

    if (section === "gallery") {
      data.galleryItems = [
        {
          id: `gal-${Date.now()}`,
          src: uploaded.url,
          alt,
          category: uploaded.type === "video" ? "Videos" : category,
          type: uploaded.type,
        },
        ...data.galleryItems,
      ]
    }

    await saveSiteData(data)
    return NextResponse.json({ ok: true, url: uploaded.url, type: uploaded.type, data })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as { id?: string; url?: string }
  const data = await getSiteData()
  const item = data.galleryItems.find((g) => g.id === body.id || g.src === body.url)
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  data.galleryItems = data.galleryItems.filter((g) => g.id !== item.id)
  await deleteCmsFile(item.src)
  try {
    await saveSiteData(data)
    return NextResponse.json({ ok: true, data })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
