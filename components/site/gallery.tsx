"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { galleryCategories } from "@/lib/site-content"
import { Reveal } from "@/components/site/reveal"
import { cn } from "@/lib/utils"
import { useSiteContent } from "@/components/site/site-content-provider"

export function Gallery() {
  const { data } = useSiteContent()
  const galleryItems = data.galleryItems
  const [category, setCategory] = useState("All")
  const [lightbox, setLightbox] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)

  const categories = useMemo(() => {
    const hasVideos = galleryItems.some((g) => g.type === "video" || g.category === "Videos")
    const rest = galleryCategories.filter((c) => c !== "All" && c !== "Videos")
    return hasVideos ? ["All", ...rest, "Videos"] : ["All", ...rest]
  }, [galleryItems])

  const filtered = useMemo(() => {
    const items =
      category === "All" ? galleryItems : galleryItems.filter((g) => g.category === category)
    // Photos first, videos after
    if (category === "All") {
      return [...items].sort((a, b) => Number(a.type === "video") - Number(b.type === "video"))
    }
    return items
  }, [category, galleryItems])

  const photos = useMemo(() => filtered.filter((g) => g.type !== "video"), [filtered])
  const videos = useMemo(() => filtered.filter((g) => g.type === "video"), [filtered])

  const videoSrc = (src: string) => (src.includes("#") ? src : `${src}#t=0.001`)

  const openItem = (itemSrc: string) => {
    const idx = filtered.findIndex((g) => g.src === itemSrc)
    if (idx >= 0) setLightbox(idx)
  }

  const go = (dir: -1 | 1) => {
    setLightbox((p) => {
      if (p === null || filtered.length === 0) return p
      return (p + dir + filtered.length) % filtered.length
    })
  }

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
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

        {/* Photos — compact YouTube-style grid */}
        {(category === "All" || category !== "Videos") && photos.length > 0 && (
          <div className="mt-10">
            {category === "All" && (
              <h3 className="mb-4 font-serif text-xl font-semibold text-foreground sm:text-2xl">Photos</h3>
            )}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:grid-cols-4 lg:grid-cols-5">
              {photos.map((item) => (
                <button
                  key={item.id || item.src}
                  type="button"
                  onClick={() => openItem(item.src)}
                  className="group relative aspect-video w-full overflow-hidden rounded-md bg-secondary ring-1 ring-border/60"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 pb-1.5 pt-6 text-left text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 sm:text-[11px]">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Videos — smaller YouTube-style thumbs, after photos */}
        {(category === "All" || category === "Videos") && videos.length > 0 && (
          <div className={cn(category === "All" ? "mt-12" : "mt-10")}>
            {category === "All" && (
              <h3 className="mb-4 font-serif text-xl font-semibold text-foreground sm:text-2xl">Videos</h3>
            )}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:grid-cols-4 lg:grid-cols-5">
              {videos.map((item) => (
                <button
                  key={item.id || item.src}
                  type="button"
                  onClick={() => openItem(item.src)}
                  className="group relative aspect-video w-full overflow-hidden rounded-md bg-emerald-deep/90 ring-1 ring-border/60"
                >
                  <LazyVideoThumb src={item.src} />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex size-9 items-center justify-center rounded-full bg-black/70 text-white shadow-md sm:size-10">
                      <Play className="size-4 fill-current sm:size-5" />
                    </span>
                  </span>
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Video
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {active && lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-emerald-deep/96"
          onTouchStart={(e) => {
            touchX.current = e.changedTouches[0]?.clientX ?? null
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
            touchX.current = null
            if (Math.abs(dx) < 50) return
            go(dx < 0 ? 1 : -1)
          }}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <p className="text-sm font-medium text-white/80">
              {lightbox + 1} / {filtered.length}
              <span className="ml-2 text-white/50">·</span>
              <span className="ml-2 capitalize text-white/70">{active.type}</span>
            </p>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 sm:px-16">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4 sm:size-11"
            >
              <ChevronLeft className="size-6" />
            </button>

            <figure className="flex max-h-full w-full max-w-5xl flex-col items-center">
              {active.type === "video" ? (
                <video
                  key={active.src}
                  src={active.src}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="max-h-[min(70vh,720px)] w-auto max-w-full rounded-lg bg-black"
                />
              ) : (
                <Image
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  width={1400}
                  height={900}
                  className="max-h-[min(70vh,720px)] w-auto max-w-full rounded-lg object-contain"
                />
              )}
              <figcaption className="mt-3 max-w-2xl px-2 text-center text-sm text-white/75">{active.alt}</figcaption>
            </figure>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4 sm:size-11"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Scrollable strip of all items in the current filter */}
          <div className="border-t border-white/10 px-3 py-3 sm:px-6">
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filtered.map((item, i) => (
                <button
                  key={item.id || item.src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={cn(
                    "relative h-14 w-24 shrink-0 overflow-hidden rounded-md ring-2 transition sm:h-16 sm:w-28",
                    i === lightbox ? "ring-gold" : "ring-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  {item.type === "video" ? (
                    <>
                      {Math.abs(i - lightbox) <= 4 ? (
                        <video
                          src={videoSrc(item.src)}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="block h-full w-full bg-emerald-deep/80" />
                      )}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                        <Play className="size-3.5 fill-white text-white" />
                      </span>
                    </>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.src} alt="" className="h-full w-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/** Only fetch video metadata once the thumb is near the viewport — avoids flooding slow networks. */
function LazyVideoThumb({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const videoUrl = src.includes("#") ? src : `${src}#t=0.001`

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 bg-emerald-deep/80">
      {active && (
        <video
          src={videoUrl}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </div>
  )
}
