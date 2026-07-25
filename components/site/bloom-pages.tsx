"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

const blooms = [
  {
    id: "bloom-1",
    src: "/images/hero/flower-01.jpg",
    alt: "Blooming turmeric flower with pink and white bracts in the field",
    caption: "Turmeric in bloom",
  },
  {
    id: "bloom-2",
    src: "/images/hero/flower-02.jpg",
    alt: "Close-up of a fresh turmeric bloom among lush green leaves",
    caption: "Field flower detail",
  },
] as const

export function BloomPages() {
  return (
    <>
      {/* Phone: one full portrait page per flower */}
      <div className="lg:hidden">
        {blooms.map((bloom, index) => (
          <section
            key={bloom.id}
            id={bloom.id}
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
            <div className="absolute inset-0 bg-emerald-deep/40" aria-hidden />

            <div className="relative z-10 flex h-[min(92svh,920px)] w-[min(94vw,420px)] flex-col">
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm shadow-2xl ring-1 ring-white/30">
                <Image
                  src={bloom.src}
                  alt={bloom.alt}
                  fill
                  sizes="94vw"
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
              <p className="mt-3 text-center font-serif text-sm font-medium tracking-wide text-white/90">
                {bloom.caption}
              </p>
            </div>

            <a
              href={index === 0 ? "#bloom-2" : "#about"}
              aria-label={index === 0 ? "Next bloom" : "Continue to about"}
              className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white/80"
            >
              <ChevronDown className="size-7" />
            </a>
          </section>
        ))}
      </div>

      {/* PC: both flowers side by side on one field page */}
      <section
        id="blooms"
        className="relative hidden min-h-[100svh] items-center justify-center overflow-hidden lg:flex"
      >
        <Image
          src="/images/hero/field-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-emerald-deep/35" aria-hidden />

        <div className="relative z-10 grid h-[90svh] w-[95vw] max-w-7xl grid-cols-2 gap-5 xl:gap-7">
          {blooms.map((bloom) => (
            <figure key={bloom.id} id={bloom.id} className="flex min-h-0 flex-col scroll-mt-28">
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm shadow-2xl ring-1 ring-white/30">
                <Image
                  src={bloom.src}
                  alt={bloom.alt}
                  fill
                  sizes="45vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-center font-serif text-base font-medium tracking-wide text-white/90">
                {bloom.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href="#about"
          aria-label="Continue to about"
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white/80"
        >
          <ChevronDown className="size-8" />
        </a>
      </section>
    </>
  )
}
