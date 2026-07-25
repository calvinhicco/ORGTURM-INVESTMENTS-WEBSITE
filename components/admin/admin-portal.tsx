"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Lock,
  X,
  LogOut,
  Save,
  Home,
  Info,
  BookOpen,
  Images,
  Newspaper,
  Users,
  Phone,
  Upload,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useSiteContent } from "@/components/site/site-content-provider"
import type { SiteData } from "@/lib/admin/types"
import { cn } from "@/lib/utils"

type SectionId = "home" | "about" | "production" | "gallery" | "news" | "directors" | "contact"

const MENU: { id: SectionId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home / Hero", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "production", label: "Production text", icon: BookOpen },
  { id: "gallery", label: "Gallery media", icon: Images },
  { id: "news", label: "News", icon: Newspaper },
  { id: "directors", label: "Directors", icon: Users },
  { id: "contact", label: "Contact", icon: Phone },
]

export function AdminTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Admin portal"
        title="Admin"
        className="flex size-8 items-center justify-center rounded-full text-current opacity-80 transition-opacity hover:bg-black/10 hover:opacity-100 sm:size-9"
      >
        <Lock className="size-3.5 sm:size-4" />
      </button>
      {open && <AdminPortal onClose={() => setOpen(false)} />}
    </>
  )
}

function AdminPortal({ onClose }: { onClose: () => void }) {
  const { data, setData, refresh } = useSiteContent()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [section, setSection] = useState<SectionId>("home")
  const [draft, setDraft] = useState<SiteData>(data)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/auth")
        const json = await res.json()
        setAuthed(Boolean(json.authenticated))
      } catch {
        setAuthed(false)
      } finally {
        setChecking(false)
      }
    })()
  }, [])

  useEffect(() => {
    setDraft(data)
  }, [data])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      setError("Incorrect password")
      return
    }
    setAuthed(true)
    setPassword("")
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" })
    setAuthed(false)
  }

  async function save() {
    setSaving(true)
    setStatus("")
    setError("")
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Save failed")
      setData(draft)
      setStatus(json.storage === "blob" ? "Saved to cloud storage." : "Saved.")
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  async function uploadMedia(file: File) {
    setUploading(true)
    setError("")
    setStatus("")
    try {
      const form = new FormData()
      form.set("file", file)
      form.set("alt", "ORGTURM project media")
      form.set("category", file.type.startsWith("video/") ? "Videos" : "Project")
      form.set("section", "gallery")
      const res = await fetch("/api/admin/media", { method: "POST", body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Upload failed")
      if (json.data) {
        setDraft(json.data)
        setData(json.data)
      }
      setStatus("Media uploaded.")
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  async function deleteMedia(id: string) {
    if (!confirm("Delete this gallery item?")) return
    setError("")
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Delete failed")
      if (json.data) {
        setDraft(json.data)
        setData(json.data)
      }
      setStatus("Media deleted.")
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    }
  }

  const galleryPreview = useMemo(() => {
    const videos = draft.galleryItems.filter((g) => g.type === "video")
    const images = draft.galleryItems.filter((g) => g.type !== "video")
    // Prefer showing videos so they are not hidden behind the image-only head of the list
    return [...videos, ...images].slice(0, 80)
  }, [draft.galleryItems])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-deep/80 p-3 backdrop-blur-sm sm:p-6">
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <div>
            <p className="font-serif text-lg font-semibold text-foreground">Admin portal</p>
            <p className="text-xs text-muted-foreground">Edit website text and media</p>
          </div>
          <div className="flex items-center gap-2">
            {authed && (
              <button
                type="button"
                onClick={() => void logout()}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="size-3.5" />
                Log out
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close admin"
              className="flex size-9 items-center justify-center rounded-full hover:bg-secondary"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {checking ? (
          <div className="flex flex-1 items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : !authed ? (
          <form onSubmit={login} className="mx-auto flex w-full max-w-sm flex-col gap-4 px-6 py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="size-6" />
            </div>
            <h3 className="text-center font-serif text-xl font-semibold">Enter admin password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Unlock portal
            </button>
          </form>
        ) : (
          <div className="grid min-h-0 min-w-0 flex-1 md:grid-cols-[210px_1fr]">
            <AdminSectionNav section={section} onSelect={setSection} />

            <div className="flex min-h-0 min-w-0 flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
                {section === "home" && (
                  <Fields>
                    <Field label="Company short name">
                      <input
                        value={draft.company.shortName}
                        onChange={(e) =>
                          setDraft({ ...draft, company: { ...draft.company, shortName: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Tagline">
                      <input
                        value={draft.company.tagline}
                        onChange={(e) =>
                          setDraft({ ...draft, company: { ...draft.company, tagline: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Hero headline">
                      <input
                        value={draft.hero.headline}
                        onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, headline: e.target.value } })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Hero highlight (gold line)">
                      <input
                        value={draft.hero.highlight}
                        onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, highlight: e.target.value } })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Supporting sentence">
                      <textarea
                        rows={3}
                        value={draft.hero.supporting}
                        onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, supporting: e.target.value } })}
                        className={inputClass}
                      />
                    </Field>
                  </Fields>
                )}

                {section === "about" && (
                  <Fields>
                    <Field label="Company full name">
                      <input
                        value={draft.company.name}
                        onChange={(e) => setDraft({ ...draft, company: { ...draft.company, name: e.target.value } })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="About body">
                      <textarea
                        rows={6}
                        value={draft.about.body}
                        onChange={(e) => setDraft({ ...draft, about: { ...draft.about, body: e.target.value } })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Mission">
                      <textarea
                        rows={3}
                        value={draft.about.mission}
                        onChange={(e) => setDraft({ ...draft, about: { ...draft.about, mission: e.target.value } })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Export focus">
                      <textarea
                        rows={3}
                        value={draft.about.exportFocus}
                        onChange={(e) =>
                          setDraft({ ...draft, about: { ...draft.about, exportFocus: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                  </Fields>
                )}

                {section === "production" && (
                  <Fields>
                    <Field label="Manual title">
                      <input
                        value={draft.productionTitle}
                        onChange={(e) => setDraft({ ...draft, productionTitle: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                    {draft.productionSections.map((sec, si) => (
                      <div key={sec.id} className="rounded-xl border border-border p-3">
                        <Field label="Section heading">
                          <input
                            value={sec.heading}
                            onChange={(e) => {
                              const productionSections = [...draft.productionSections]
                              productionSections[si] = { ...sec, heading: e.target.value }
                              setDraft({ ...draft, productionSections })
                            }}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Paragraphs (one blank line between)">
                          <textarea
                            rows={8}
                            value={sec.paragraphs.join("\n\n")}
                            onChange={(e) => {
                              const productionSections = [...draft.productionSections]
                              productionSections[si] = {
                                ...sec,
                                paragraphs: e.target.value
                                  .split(/\n\s*\n/)
                                  .map((p) => p.trim())
                                  .filter(Boolean),
                              }
                              setDraft({ ...draft, productionSections })
                            }}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    ))}
                  </Fields>
                )}

                {section === "gallery" && (
                  <Fields>
                    <Field label="Gallery intro">
                      <textarea
                        rows={2}
                        value={draft.galleryIntro}
                        onChange={(e) => setDraft({ ...draft, galleryIntro: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                    <div className="rounded-xl border border-dashed border-border p-4">
                      <label className="flex cursor-pointer flex-col items-center gap-2 text-sm text-muted-foreground">
                        <Upload className="size-6 text-primary" />
                        <span>{uploading ? "Uploading…" : "Upload image or video to gallery"}</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          disabled={uploading}
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) void uploadMedia(f)
                            e.target.value = ""
                          }}
                        />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {galleryPreview.map((item) => (
                        <div key={item.id} className="overflow-hidden rounded-lg border border-border bg-card">
                          <div className="relative aspect-square bg-secondary">
                            {item.type === "video" ? (
                              <video
                                src={`${item.src.includes("#") ? item.src : `${item.src}#t=0.001`}`}
                                className="h-full w-full object-cover"
                                muted
                                playsInline
                                preload="metadata"
                              />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2 p-2">
                            <span className="truncate text-[11px] text-muted-foreground">
                              {item.type} · {item.category}
                            </span>
                            <button
                              type="button"
                              onClick={() => void deleteMedia(item.id)}
                              className="rounded-full p-1.5 text-destructive hover:bg-destructive/10"
                              aria-label="Delete"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Showing {galleryPreview.length} of {draft.galleryItems.length} items.
                    </p>
                  </Fields>
                )}

                {section === "news" && (
                  <Fields>
                    {draft.newsItems.map((item, i) => (
                      <div key={item.id} className="rounded-xl border border-border p-3">
                        <Field label="Title">
                          <input
                            value={item.title}
                            onChange={(e) => {
                              const newsItems = [...draft.newsItems]
                              newsItems[i] = { ...item, title: e.target.value }
                              setDraft({ ...draft, newsItems })
                            }}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Tag / date">
                          <div className="grid gap-2 sm:grid-cols-2">
                            <input
                              value={item.tag}
                              onChange={(e) => {
                                const newsItems = [...draft.newsItems]
                                newsItems[i] = { ...item, tag: e.target.value }
                                setDraft({ ...draft, newsItems })
                              }}
                              className={inputClass}
                            />
                            <input
                              value={item.date}
                              onChange={(e) => {
                                const newsItems = [...draft.newsItems]
                                newsItems[i] = { ...item, date: e.target.value }
                                setDraft({ ...draft, newsItems })
                              }}
                              className={inputClass}
                            />
                          </div>
                        </Field>
                        <Field label="Excerpt">
                          <textarea
                            rows={4}
                            value={item.excerpt}
                            onChange={(e) => {
                              const newsItems = [...draft.newsItems]
                              newsItems[i] = { ...item, excerpt: e.target.value }
                              setDraft({ ...draft, newsItems })
                            }}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    ))}
                  </Fields>
                )}

                {section === "directors" && (
                  <Fields>
                    {draft.leaders.map((leader, i) => (
                      <div key={leader.id} className="rounded-xl border border-border p-3">
                        <Field label="Name">
                          <input
                            value={leader.name}
                            onChange={(e) => {
                              const leaders = [...draft.leaders]
                              leaders[i] = { ...leader, name: e.target.value }
                              setDraft({ ...draft, leaders })
                            }}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Role">
                          <input
                            value={leader.role}
                            onChange={(e) => {
                              const leaders = [...draft.leaders]
                              leaders[i] = { ...leader, role: e.target.value }
                              setDraft({ ...draft, leaders })
                            }}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Bio">
                          <textarea
                            rows={4}
                            value={leader.detail}
                            onChange={(e) => {
                              const leaders = [...draft.leaders]
                              leaders[i] = { ...leader, detail: e.target.value }
                              setDraft({ ...draft, leaders })
                            }}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Photo URL / path">
                          <input
                            value={leader.photoSrc}
                            onChange={(e) => {
                              const leaders = [...draft.leaders]
                              leaders[i] = { ...leader, photoSrc: e.target.value }
                              setDraft({ ...draft, leaders })
                            }}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    ))}
                  </Fields>
                )}

                {section === "contact" && (
                  <Fields>
                    <Field label="Heading">
                      <input
                        value={draft.contact.heading}
                        onChange={(e) =>
                          setDraft({ ...draft, contact: { ...draft.contact, heading: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Intro">
                      <textarea
                        rows={3}
                        value={draft.contact.intro}
                        onChange={(e) =>
                          setDraft({ ...draft, contact: { ...draft.contact, intro: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        value={draft.contact.phone}
                        onChange={(e) =>
                          setDraft({ ...draft, contact: { ...draft.contact, phone: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        value={draft.contact.email}
                        onChange={(e) =>
                          setDraft({ ...draft, contact: { ...draft.contact, email: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Coordination line">
                      <input
                        value={draft.contact.coordination}
                        onChange={(e) =>
                          setDraft({ ...draft, contact: { ...draft.contact, coordination: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Season line">
                      <input
                        value={draft.contact.season}
                        onChange={(e) =>
                          setDraft({ ...draft, contact: { ...draft.contact, season: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </Field>
                  </Fields>
                )}

                {error && <p className="text-sm text-destructive">{error}</p>}
                {status && <p className="text-sm text-primary">{status}</p>}
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => void save()}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
                >
                  {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"

function AdminSectionNav({
  section,
  onSelect,
}: {
  section: SectionId
  onSelect: (id: SectionId) => void
}) {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateEdges = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateEdges()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener("scroll", updateEdges, { passive: true })
    window.addEventListener("resize", updateEdges)
    return () => {
      el.removeEventListener("scroll", updateEdges)
      window.removeEventListener("resize", updateEdges)
    }
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const active = el.querySelector<HTMLElement>(`[data-section="${section}"]`)
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    // Allow layout to settle then refresh edge fades
    requestAnimationFrame(updateEdges)
  }, [section])

  const slide = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(160, el.clientWidth * 0.65), behavior: "smooth" })
  }

  return (
    <nav className="relative min-w-0 shrink-0 border-b border-border md:border-b-0 md:border-r">
      {/* Mobile / tablet: horizontal slide strip */}
      <div className="md:hidden">
        <div className="flex items-center justify-between gap-2 px-3 pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Edit section</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous sections"
              disabled={!canLeft}
              onClick={() => slide(-1)}
              className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next sections"
              disabled={!canRight}
              onClick={() => slide(1)}
              className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <ul
            ref={scrollerRef}
            className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain px-3 py-3 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MENU.map((item) => (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  data-section={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                    section === item.id
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground",
                  )}
                >
                  <item.icon className="size-3.5 shrink-0" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          {canLeft && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent"
            />
          )}
          {canRight && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent"
            />
          )}
        </div>
      </div>

      {/* Desktop: vertical mini menu */}
      <ul className="hidden gap-1 p-3 md:flex md:flex-col">
        {MENU.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex w-full items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                section === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Fields({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
