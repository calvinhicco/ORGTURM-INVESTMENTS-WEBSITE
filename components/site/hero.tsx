import Image from "next/image"
import { ArrowRight, ChevronDown, BadgeCheck } from "lucide-react"
import { company } from "@/lib/site-content"

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Turmeric farm background */}
      <Image
        src="/images/gallery/crop-35.jpg"
        alt="Organic turmeric crop rows in the production field"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />

      {/* Deep green blend — matches the reference wash across the full hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(12, 42, 24, 0.92) 0%, rgba(18, 58, 32, 0.82) 42%, rgba(22, 68, 38, 0.72) 70%, rgba(16, 48, 28, 0.78) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8, 28, 16, 0.88) 0%, rgba(12, 40, 22, 0.35) 45%, rgba(10, 32, 18, 0.55) 100%)",
        }}
      />
      {/* Soft green color grade so the photo reads as moss/forest green */}
      <div className="absolute inset-0 bg-[oklch(0.33_0.07_152)]/45 mix-blend-multiply" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-[7.5rem] pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-serif text-2xl font-bold tracking-tight text-gold sm:text-3xl lg:text-4xl">
            {company.shortName}
          </p>
          <p className="mt-2 text-sm font-medium text-white/80 sm:text-base">{company.tagline}</p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <BadgeCheck className="size-4 text-gold" />
            Certified Organic &middot; Ecocert &middot; Fairtrade &middot; EU &middot; Mabagrown
          </span>

          <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            ORGANIC TURMERIC PRODUCTION FOR THE{" "}
            <span className="text-gradient-gold">GERMAN PHARMACEUTICAL MARKET</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            Certified organic production, international traceability, and sustainable farming practices supplying
            premium turmeric and medicinal herbs to Germany and other global markets.
          </p>

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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Contact Us
            </a>
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
