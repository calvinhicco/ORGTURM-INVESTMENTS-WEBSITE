import { Award, ShieldCheck, FileCheck, Leaf, Droplets, Users, Sparkles, ScrollText, BadgeCheck } from "lucide-react"
import { certifications } from "@/lib/site-content"
import { Reveal } from "@/components/site/reveal"

const icons = [Award, ShieldCheck, BadgeCheck, Sparkles, FileCheck, ScrollText, Droplets, Users, Leaf]

export function Certifications() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-emerald-deep py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Certifications &amp; Records</span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
            Fully certified, fully traceable
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/75">
            International certifications and farm-level records maintained for traceability towards certification.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={cert.name} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/10">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="font-serif text-lg font-semibold">{cert.name}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{cert.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
