import Image from "next/image"
import { Reveal } from "@/components/site/reveal"
import { leadershipNarrative, leaders } from "@/lib/site-content"
import { jacobSocials } from "@/components/site/social-icons"

export function Leadership() {
  return (
    <section id="leadership" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Directors</span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Project directors
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl">
          <figure className="rounded-3xl border border-border bg-secondary/50 p-7 sm:p-10">
            <span className="font-serif text-5xl leading-none text-accent">&ldquo;</span>
            <blockquote className="mt-2 whitespace-pre-line text-pretty text-lg leading-relaxed text-foreground">
              {leadershipNarrative}
            </blockquote>
          </figure>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-7 sm:grid-cols-2">
          {leaders.map((leader, i) => (
            <Reveal key={leader.name} delay={i * 90}>
              <article className="flex h-full flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
                <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-full ring-4 ring-gold/35 shadow-md">
                  <Image
                    src={leader.photoSrc}
                    alt={leader.name}
                    fill
                    sizes="240px"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">{leader.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{leader.role}</p>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{leader.detail}</p>
                {leader.socials && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {jacobSocials.map(({ name, href, Icon }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Jacob Chazireni on ${name}`}
                        className="flex size-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Icon className="size-5" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
