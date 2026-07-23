"use client"

import { useEffect, useState } from "react"
import {
  Sprout,
  MapPin,
  Shovel,
  Droplets,
  Leaf,
  Package,
  ChevronDown,
  Download,
  FileText,
  type LucideIcon,
} from "lucide-react"
import { productionManual } from "@/lib/site-content"
import { Reveal } from "@/components/site/reveal"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  MapPin,
  Shovel,
  Droplets,
  Leaf,
  Package,
}

const sectionIds = productionManual.sections.map((s) => s.id)

export function ProductionStandards() {
  const [open, setOpen] = useState<string | null>(productionManual.sections[0].id)

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1)
      if (sectionIds.includes(hash)) {
        setOpen(hash)
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
        })
      }
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  return (
    <section id="production" className="scroll-mt-32 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Production Standards</span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {productionManual.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            The complete standard manual governing our organic turmeric crop production management, reproduced in full.
            Expand each stage to read the detailed protocol.
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {productionManual.sections.map((section, i) => {
            const Icon = iconMap[section.icon] ?? FileText
            const isOpen = open === section.id
            return (
              <Reveal key={section.id} delay={i * 60}>
                <div
                  id={section.id}
                  className="scroll-mt-32 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : section.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isOpen ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1 font-serif text-lg font-semibold text-foreground sm:text-xl">
                      {section.heading}
                    </span>
                    <ChevronDown
                      className={cn("size-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-4 border-t border-border px-5 py-5 text-pretty leading-relaxed text-muted-foreground sm:px-6">
                        {section.paragraphs.map((para, pi) => (
                          <p key={`${section.id}-${pi}`} className="whitespace-pre-line">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row">
            <div className="text-sm leading-relaxed text-muted-foreground">
              {productionManual.signoffLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <a
              href="/organic-turmeric-standard-manual.txt"
              download
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              <Download className="size-4" />
              Download Full Manual
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
