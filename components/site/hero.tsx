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
    <section
      id="home"
      className="relative flex min-h-[100svh] items-start overflow-hidden lg:items-center"
    >
      <Image
        src="/images/hero/field-bg.png"
        alt="Lush organic turmeric field under open sky"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_55%] scale-105 animate-hero-kenburns sm:object-[center_45%]"
      />

      {/* Mobile: stronger bottom veil so type sits cleanly on the crop */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(8, 28, 16, 0.55) 0%, rgba(10, 36, 20, 0.28) 28%, rgba(10, 36, 20, 0.45) 52%, rgba(8, 26, 14, 0.88) 100%)",
        }}
      />
      {/* Desktop overlays */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(105deg, rgba(10, 36, 20, 0.78) 0%, rgba(14, 48, 26, 0.55) 38%, rgba(18, 58, 32, 0.28) 68%, rgba(12, 40, 22, 0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(to top, rgba(8, 28, 16, 0.72) 0%, rgba(12, 40, 22, 0.12) 42%, rgba(10, 32, 18, 0.28) 100%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center px-4 pb-16 pt-[8.75rem] sm:px-6 sm:pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:px-8 lg:pb-20 lg:pt-[8.5rem]">
        <div className="max-w-3xl animate-hero-rise">
          <p className="font-serif text-[1.65rem] font-bold leading-none tracking-tight text-gold sm:text-3xl lg:text-4xl">
            {company.shortName}
          </p>
          <p className="mt-2 max-w-[22rem] text-[13px] font-medium leading-snug text-white/85 sm:mt-2.5 sm:max-w-none sm:text-base">
            {company.tagline}
          </p>

          {/* Compact on phone — full certs from sm up */}
          <span className="mt-4 inline-flex max-w-full items-center gap-1.5 rounded-full border border-gold/45 bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-[2px] sm:mt-6 sm:gap-2 sm:px-4 sm:text-sm">
            <BadgeCheck className="size-3.5 shrink-0 text-gold sm:size-4" />
            <span className="sm:hidden">Certified Organic · German Market</span>
            <span className="hidden sm:inline">
              Certified Organic &middot; Ecocert &middot; Fairtrade &middot; EU &middot; Mabagrown
            </span>
          </span>

          <h1 className="mt-4 text-balance font-serif text-[1.85rem] font-bold leading-[1.12] text-white sm:mt-6 sm:text-5xl sm:leading-[1.05] lg:text-6xl xl:text-[4.25rem]">
            {hero.headline} <span className="text-gradient-gold">{hero.highlight}</span>
          </h1>

          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
            <span className="line-clamp-3 sm:line-clamp-none">{hero.supporting}</span>
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:items-center sm:gap-3">
            <a
              href="#about"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Learn More
              <ArrowRight className="size-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/45 bg-black/20 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-[2px] transition-colors hover:bg-black/25 sm:w-auto"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile / tablet stills — compact overlapping strip */}
          <div className="mt-7 lg:hidden">
            <div className="relative mx-auto flex h-[9.25rem] max-w-md items-end justify-center sm:h-[11rem] sm:max-w-lg">
              <div
                className="absolute left-[2%] bottom-0 z-[1] h-[88%] w-[38%] overflow-hidden rounded-sm shadow-lg ring-1 ring-white/35 animate-hero-rise"
                style={{ animationDelay: "160ms" }}
              >
                <Image src={heroStills[0].src} alt={heroStills[0].alt} fill sizes="38vw" className="object-cover" />
              </div>
              <div
                className="absolute left-1/2 bottom-0 z-[3] h-full w-[42%] -translate-x-1/2 overflow-hidden rounded-sm shadow-xl ring-1 ring-white/40 animate-hero-rise"
                style={{ animationDelay: "280ms" }}
              >
                <Image
                  src={heroStills[1].src}
                  alt={heroStills[1].alt}
                  fill
                  sizes="42vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div
                className="absolute right-[2%] bottom-0 z-[2] h-[88%] w-[38%] overflow-hidden rounded-sm shadow-lg ring-1 ring-white/35 animate-hero-rise"
                style={{ animationDelay: "400ms" }}
              >
                <Image src={heroStills[2].src} alt={heroStills[2].alt} fill sizes="38vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop collage */}
        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold/10 blur-3xl" aria-hidden />
          <div className="relative flex h-[min(72vh,640px)] flex-col justify-center">
            <div
              className="absolute right-[8%] top-[4%] z-[1] h-[46%] w-[44%] overflow-hidden rounded-sm ring-1 ring-white/30 animate-hero-rise"
              style={{ animationDelay: "180ms" }}
            >
              <Image
                src={heroStills[0].src}
                alt={heroStills[0].alt}
                fill
                sizes="22vw"
                className="object-cover"
                priority
              />
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
        className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce text-white/75 sm:bottom-6 sm:block md:bottom-8"
      >
        <ChevronDown className="size-7 sm:size-8" />
      </a>
    </section>
  )
}
