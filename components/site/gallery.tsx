"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react"
import { galleryCategories } from "@/lib/site-content"
import { Reveal } from "@/components/site/reveal"
import { cn } from "@/lib/utils"
import { useSiteContent } from "@/components/site/site-content-provider"

export function Gallery() {
  const { data } = useSiteContent()
  const galleryItems = data.galleryItems
  const [category, setCategory] = useState("All")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const categories = useMemo(() => {
    const hasVideos = galleryItems.some((g) => g.type === "video" || g.category === "Videos")
    const rest = galleryCategories.filter((c) => c !== "All" && c !== "Videos")
    // Keep Videos next to All so it is easy to find on mobile
    return hasVideos ? ["All", "Videos", ...rest] : ["All", ...rest]
  }, [galleryItems])

  const filtered = useMemo(() => {
    const items =
      category === "All" ? galleryItems : galleryItems.filter((g) => g.category === category)
    // Videos were last in the CMS list and looked "missing" under 100+ photos
    if (category === "All") {
      return [...items].sort((a, b) => Number(a.type !== "video") - Number(b.type !== "video"))
    }
    return items
  }, [category, galleryItems])

  const videoSrc = (src: string) => (src.includes("#") ? src : `${src}#t=0.001`)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowRight") setLightbox((p) => (p === null ? p : (p + 1) % filtered.length))
      if (e.key === "ArrowLeft") setLightbox((p) => (p === null ? p : (p - 1 + filtered.length) % filtered.length))
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightbox, filtered.length])

  const active = lightbox !== null ? filtered[lightbox] : null

  return (
    <section id="gallery" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Gallery</span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            From our fields
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {data.galleryIntro}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative w-full overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/gallery/crop-33.jpg"
              alt="Organic turmeric crop rows"
              width={1400}
              height={620}
              className="h-[280px] w-full object-cover sm:h-[420px]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 right-6 font-serif text-2xl font-semibold text-white sm:text-3xl">
              Organic turmeric production
            </span>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((item, i) => (
            <button
              key={item.id || item.src}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-sm"
            >
              {item.type === "video" ? (
                <div className="relative aspect-[3/4] w-full bg-emerald-deep/90">
                  <video
                    src={videoSrc(item.src)}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-emerald-deep/25">
                    <span className="flex size-14 items-center justify-center rounded-full bg-gold text-emerald-deep shadow-lg">
                      <Play className="size-6 fill-current" />
                    </span>
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-deep">
                    Video
                  </span>
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={i % 3 === 0 ? 760 : i % 3 === 1 ? 520 : 640}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-emerald-deep/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-2 p-4 text-left">
                  {item.type === "video" ? (
                    <Play className="size-4 text-gold" />
                  ) : (
                    <ImageIcon className="size-4 text-gold" />
                  )}
                  <span className="rounded-full bg-gold/90 px-2.5 py-1 text-xs font-semibold text-emerald-deep">
                    {item.category}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && lightbox !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-emerald-deep/95 p-4">
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => setLightbox((p) => (p === null ? p : (p - 1 + filtered.length) % filtered.length))}
            aria-label="Previous"
            className="absolute left-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="size-6" />
          </button>
          <figure className="max-h-[85vh] max-w-4xl">
            {active.type === "video" ? (
              <video
                key={active.src}
                src={active.src}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="max-h-[78vh] w-auto max-w-full rounded-xl"
              />
            ) : (
              <Image
                src={active.src}
                alt={active.alt}
                width={1200}
                height={800}
                className="max-h-[78vh] w-auto rounded-xl object-contain"
              />
            )}
            <figcaption className="mt-3 text-center text-sm text-white/80">{active.alt}</figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setLightbox((p) => (p === null ? p : (p + 1) % filtered.length))}
            aria-label="Next"
            className="absolute right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  )
}
