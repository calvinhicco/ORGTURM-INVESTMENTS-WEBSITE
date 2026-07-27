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
      {/* Phone: one full-screen flower per page — no crop, no field background */}
      <div className="lg:hidden">
        {blooms.map((bloom, index) => (
          <section
            key={bloom.id}
            id={bloom.id}
            className="relative h-[100svh] w-full overflow-hidden bg-emerald-deep"
          >
            <Image
              src={bloom.src}
              alt={bloom.alt}
              fill
              sizes="100vw"
              className="object-contain object-center"
              priority={index === 0}
            />

            <a
              href={index === 0 ? "#bloom-2" : "#about"}
              aria-label={index === 0 ? "Next bloom" : "Continue to about"}
              className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/35 p-2 text-white/90 backdrop-blur-[2px]"
            >
              <ChevronDown className="size-7 animate-bounce" />
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
