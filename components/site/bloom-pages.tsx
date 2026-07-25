"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

const bloomPages = [
  {
    id: "bloom-1",
    src: "/images/hero/flower-01.jpg",
    alt: "Blooming turmeric flower with pink and white bracts in the field",
    caption: "Turmeric in bloom",
    nextHref: "#bloom-2",
  },
  {
    id: "bloom-2",
    src: "/images/hero/flower-02.jpg",
    alt: "Close-up of a fresh turmeric bloom among lush green leaves",
    caption: "Field flower detail",
    nextHref: "#about",
  },
] as const

export function BloomPages() {
  return (
    <>
      {bloomPages.map((page, index) => (
        <section
          key={page.id}
          id={page.id}
          className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
        >
          <Image
            src="/images/hero/field-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-emerald-deep/35" aria-hidden />

          <div className="relative z-10 flex h-[95svh] w-[95vw] max-w-[95vw] flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm shadow-2xl ring-1 ring-white/25">
              <Image
                src={page.src}
                alt={page.alt}
                fill
                sizes="95vw"
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
            <p className="mt-3 text-center font-serif text-sm font-medium tracking-wide text-white/90 sm:text-base">
              {page.caption}
            </p>
          </div>

          <a
            href={page.nextHref}
            aria-label={`Continue to ${page.nextHref === "#about" ? "about" : "next bloom"}`}
            className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white/80"
          >
            <ChevronDown className="size-7 sm:size-8" />
          </a>
        </section>
      ))}
    </>
  )
}
