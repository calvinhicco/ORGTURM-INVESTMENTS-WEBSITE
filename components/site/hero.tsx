"use client"

import Image from "next/image"
import { ArrowRight, ChevronDown, BadgeCheck } from "lucide-react"
import { useSiteContent } from "@/components/site/site-content-provider"

const heroStills = [
  {
    src: "/images/hero/flower-01.jpg",
    alt: "Blooming turmeric flower with pink and white bracts in the field",
  },
  {
    src: "/images/hero/flower-02.jpg",
    alt: "Close-up of a fresh turmeric bloom among lush green leaves",
  },
  {
    src: "/images/turmeric-rhizomes.png",
    alt: "Fresh organic turmeric rhizomes cut open to show vivid orange flesh",
  },
] as const

export function Hero() {
  const { data } = useSiteContent()
  const { company, hero } = data

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <Image
        src="/images/gallery/crop-35.jpg"
        alt="Organic turmeric crop rows in the production field"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%] scale-105 animate-hero-kenburns"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(10, 36, 20, 0.78) 0%, rgba(14, 48, 26, 0.55) 38%, rgba(18, 58, 32, 0.28) 68%, rgba(12, 40, 22, 0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8, 28, 16, 0.72) 0%, rgba(12, 40, 22, 0.12) 42%, rgba(10, 32, 18, 0.28) 100%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pt-[7.5rem] pb-16 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:px-8 lg:pb-20">
        <div className="max-w-3xl animate-hero-rise">
          <p className="font-serif text-2xl font-bold tracking-tight text-gold sm:text-3xl lg:text-4xl">
            {company.shortName}
          </p>
          <p className="mt-2 text-sm font-medium text-white/85 sm:text-base">{company.tagline}</p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/45 bg-black/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-[2px]">
            <BadgeCheck className="size-4 text-gold" />
            Certified Organic &middot; Ecocert &middot; Fairtrade &middot; EU &middot; Mabagrown
          </span>

          <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {hero.headline} <span className="text-gradient-gold">{hero.highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">{hero.supporting}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Learn More
              <ArrowRight className="size-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-black/15 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-[2px] transition-colors hover:bg-black/25"
            >
              Contact Us
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2.5 lg:hidden">
            {heroStills.map((still, i) => (
              <div
                key={still.src}
                className="relative aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-white/30 animate-hero-rise"
                style={{ animationDelay: `${160 + i * 120}ms` }}
              >
                <Image src={still.src} alt={still.alt} fill sizes="30vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold/10 blur-3xl" aria-hidden />
          <div className="relative flex h-[min(72vh,640px)] flex-col justify-center">
            <div
              className="absolute right-[8%] top-[4%] z-[1] h-[46%] w-[44%] overflow-hidden rounded-sm ring-1 ring-white/30 animate-hero-rise"
              style={{ animationDelay: "180ms" }}
            >
              <Image src={heroStills[0].src} alt={heroStills[0].alt} fill sizes="22vw" className="object-cover" priority />
            </div>
            <div
              className="absolute left-[2%] top-[22%] z-[2] h-[52%] w-[48%] overflow-hidden rounded-sm ring-1 ring-white/30 animate-hero-rise"
              style={{ animationDelay: "320ms" }}
            >
              <Image src={heroStills[1].src} alt={heroStills[1].alt} fill sizes="24vw" className="object-cover" />
            </div>
            <div
              className="absolute bottom-[2%] right-[0%] z-[3] h-[38%] w-[58%] overflow-hidden rounded-sm ring-1 ring-white/30 animate-hero-rise"
              style={{ animationDelay: "460ms" }}
            >
              <Image src={heroStills[2].src} alt={heroStills[2].alt} fill sizes="28vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/80 md:block"
      >
        <ChevronDown className="size-8" />
      </a>
    </section>
  )
}
