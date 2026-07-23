"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"

const details = [
  {
    icon: Phone,
    label: "Phone",
    value: "+263 773 355 153",
    href: "tel:+263773355153",
  },
  {
    icon: Mail,
    label: "Email",
    value: "jackychaz3@gmail.com",
    href: "mailto:jackychaz3@gmail.com",
  },
  {
    icon: MapPin,
    label: "Coordination",
    value: "National Project Operations \u00b7 German Market Programme",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Growing Season",
    value: "7 to 9 months, certification year-round",
    href: undefined,
  },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact</span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Partner with ORGTURM INVESTMENTS
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Whether you are an outgrower farmer, a buyer or an institution, reach out to ORGTURM INVESTMENTS Private
            Limited — a subsidiary of GAHS — to join the organic turmeric production programme for the German market.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <d.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d.label}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-foreground">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                  <CheckCircle2 className="size-14 text-primary" />
                  <h3 className="font-serif text-2xl font-semibold text-foreground">Thank you</h3>
                  <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
                    Your message has been received. Our coordination team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="you@example.com"
                      />
                    </Field>
                  </div>
                  <Field label="Subject" htmlFor="subject">
                    <input
                      id="subject"
                      name="subject"
                      required
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="How can we help?"
                    />
                  </Field>
                  <Field label="Message" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="Tell us about your interest in the programme..."
                    />
                  </Field>
                  <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto sm:justify-self-start">
                    Send message
                    <Send className="size-4" />
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}
