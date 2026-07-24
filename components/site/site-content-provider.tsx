"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { SiteData } from "@/lib/admin/types"
import { defaultSiteData } from "@/lib/admin/defaults"

type ContentCtx = {
  data: SiteData
  loading: boolean
  refresh: () => Promise<void>
  setData: (data: SiteData) => void
}

const Ctx = createContext<ContentCtx | null>(null)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(() => defaultSiteData())
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" })
      if (res.ok) {
        setData(await res.json())
      }
    } catch {
      // keep defaults
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo(() => ({ data, loading, refresh, setData }), [data, loading, refresh])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSiteContent() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider")
  return ctx
}
