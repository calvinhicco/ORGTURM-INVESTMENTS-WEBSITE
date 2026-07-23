import {
  BadgeCheck,
  Landmark,
  Route,
  Recycle,
  ShieldCheck,
  Handshake,
  type LucideIcon,
} from "lucide-react"
import { whyChooseUs } from "@/lib/site-content"
import { Reveal } from "@/components/site/reveal"

const iconMap: Record<string, LucideIcon> = {
  BadgeCheck,
  Landmark,
  Route,
  Recycle,
  ShieldCheck,
  Handshake,
}

export function WhyChooseUs() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Why Choose Us</span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Built for export readiness and pharmaceutical-grade trust
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] ?? BadgeCheck
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group h-full rounded-3xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
