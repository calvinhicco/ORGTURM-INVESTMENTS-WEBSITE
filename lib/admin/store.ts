import { promises as fs } from "fs"
import path from "path"
import { put, list, del } from "@vercel/blob"
import { defaultSiteData } from "@/lib/admin/defaults"
import type { SiteData } from "@/lib/admin/types"

export type { SiteData, CmsGalleryItem, CmsLeader, CmsNewsItem } from "@/lib/admin/types"
export { defaultSiteData }

const DATA_PATH = path.join(process.cwd(), "data", "site-data.json")
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "cms")
const BLOB_CONTENT_KEY = "cms/site-data.json"

function useBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
}

async function readFsData(): Promise<SiteData | null> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8")
    return JSON.parse(raw) as SiteData
  } catch {
    return null
  }
}

async function writeFsData(data: SiteData) {
  await ensureUploadDir()
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8")
}

async function readBlobData(): Promise<SiteData | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_CONTENT_KEY, limit: 5 })
    const hit = blobs.find((b) => b.pathname === BLOB_CONTENT_KEY) || blobs[0]
    if (!hit) return null
    const res = await fetch(hit.url, { cache: "no-store" })
    if (!res.ok) return null
    return (await res.json()) as SiteData
  } catch {
    return null
  }
}

async function writeBlobData(data: SiteData) {
  await put(BLOB_CONTENT_KEY, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

export async function getSiteData(): Promise<SiteData> {
  if (useBlob()) {
    const fromBlob = await readBlobData()
    if (fromBlob) return fromBlob
  }
  const fromFs = await readFsData()
  if (fromFs) return fromFs
  const seeded = defaultSiteData()
  try {
    if (useBlob()) await writeBlobData(seeded)
    else await writeFsData(seeded)
  } catch {
    // read-only environments may not allow seed write
  }
  return seeded
}

export async function saveSiteData(data: SiteData) {
  if (useBlob()) {
    await writeBlobData(data)
    return { storage: "blob" as const }
  }
  try {
    await writeFsData(data)
    return { storage: "filesystem" as const }
  } catch {
    throw new Error(
      "Could not save content. On Vercel, add a BLOB_READ_WRITE_TOKEN (Vercel Blob) so admin changes persist.",
    )
  }
}

export async function uploadCmsFile(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer())
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")
  const filename = `${Date.now()}-${safe}`
  const isVideo = file.type.startsWith("video/")

  if (useBlob()) {
    const blob = await put(`cms/media/${filename}`, bytes, {
      access: "public",
      contentType: file.type || (isVideo ? "video/mp4" : "image/jpeg"),
      addRandomSuffix: false,
    })
    return { url: blob.url, type: isVideo ? ("video" as const) : ("image" as const) }
  }

  await ensureUploadDir()
  const dest = path.join(UPLOAD_DIR, filename)
  await fs.writeFile(dest, bytes)
  return {
    url: `/uploads/cms/${filename}`,
    type: isVideo ? ("video" as const) : ("image" as const),
  }
}

export async function deleteCmsFile(url: string) {
  if (!url) return
  if (url.includes("blob.vercel-storage.com") || url.startsWith("https://")) {
    if (useBlob()) {
      try {
        await del(url)
      } catch {
        // ignore missing blob
      }
    }
    return
  }
  if (url.startsWith("/uploads/cms/")) {
    const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""))
    try {
      await fs.unlink(filePath)
    } catch {
      // ignore
    }
  }
}
