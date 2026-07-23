import { Sprout, MapPin, Phone, Mail } from "lucide-react"
import { company, navLinks } from "@/lib/site-content"
import { jacobSocials } from "@/components/site/social-icons"

export function Footer() {
  return (
    <footer className="bg-emerald-deep text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/10 ring-1 ring-primary-foreground/20">
                <Sprout className="size-6 text-accent" />
              </span>
              <span className="font-serif text-lg font-bold leading-tight">
                ORGTURM
                <br />
                INVESTMENTS
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-accent">{company.tagline}</p>
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-primary-foreground/70">
              {company.name} produces certified organic Lakadong turmeric strictly to German pharmaceutical standards,
              connecting committed outgrower farmers to European and American markets as a subsidiary of{" "}
              {company.parent} ({company.parentShort}).
            </p>
            <div className="mt-6 flex items-center gap-3">
              {jacobSocials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-accent">Explore</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-accent">Programme</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              <li>Organic Turmeric Production</li>
              <li>Outgrower Certification</li>
              <li>German Market Supply</li>
              <li>Medicinal Herbs</li>
              <li>Traceability &amp; Records</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-accent">Get in touch</h3>
            <ul className="mt-4 space-y-4 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href="tel:+263773355153" className="transition-colors hover:text-primary-foreground">
                  +263 773 355 153
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href="mailto:jackychaz3@gmail.com" className="transition-colors hover:text-primary-foreground">
                  jackychaz3@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>National Project Operations Coordination</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 text-sm text-primary-foreground/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. A subsidiary of {company.parentShort}. All rights
            reserved.
          </p>
          <p className="text-pretty">Organic Turmeric Production for German Market Standard Manual.</p>
        </div>
      </div>
    </footer>
  )
}
