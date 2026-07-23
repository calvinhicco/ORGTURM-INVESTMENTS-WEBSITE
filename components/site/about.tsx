import Image from "next/image"
import { Globe2, Target, Ship, Building2 } from "lucide-react"
import { Reveal } from "@/components/site/reveal"
import { company, postCovidStatement, germanDemandStatement } from "@/lib/site-content"

export function About() {
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/about-crops.jpg"
                  alt="Rows of organic turmeric crops growing in the field"
                  width={720}
                  height={820}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden max-w-[220px] rounded-2xl border border-border bg-card p-5 shadow-lg sm:block">
                <p className="font-serif text-3xl font-bold text-primary">6&ndash;7.5%</p>
                <p className="mt-1 text-sm text-muted-foreground">Curcumin content in our Lakadong Turmeric</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">About the Company</span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {company.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-accent">{company.tagline}</p>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                {company.name} produces certified organic Lakadong turmeric and medicinal herbs strictly for the German
                pharmaceutical industry, extending to European, American and other international markets. As a subsidiary
                of {company.parent} ({company.parentShort}), we carry forward the structured, traceable and sustainable
                outgrower programme — anchored by partnership with the University of Bonn and more than 60 family-owned
                pharmaceutical companies — that delivers consistent, high-curcumin turmeric the world can trust.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5">
              {[
                {
                  icon: Building2,
                  title: "Our Structure",
                  text: `${company.shortName} operates as a subsidiary of ${company.parent} (${company.parentShort}), delivering the organic turmeric production programme for the German market.`,
                },
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "Smooth, successful, structured and modelled organic turmeric and medicinal herbs production strictly for German markets.",
                },
                {
                  icon: Ship,
                  title: "Export Focus",
                  text: "End-to-end quality from GPS-mapped soil sampling to consignments shipped to Germany once samples qualify.",
                },
                {
                  icon: Globe2,
                  title: "Global Markets",
                  text: "Germany and Europe first, extending to American and other international pharmaceutical markets.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <figure className="h-full rounded-3xl border border-border bg-secondary/50 p-7 sm:p-9">
              <span className="font-serif text-4xl leading-none text-accent">&ldquo;</span>
              <blockquote className="mt-2 text-pretty text-lg leading-relaxed text-foreground">
                {postCovidStatement}
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-muted-foreground">Post COVID-19 demand</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={90}>
            <figure className="h-full rounded-3xl border border-border bg-primary p-7 text-primary-foreground sm:p-9">
              <span className="font-serif text-4xl leading-none text-gold">&ldquo;</span>
              <blockquote className="mt-2 text-pretty text-lg leading-relaxed">{germanDemandStatement}</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-primary-foreground/70">German market demand</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
