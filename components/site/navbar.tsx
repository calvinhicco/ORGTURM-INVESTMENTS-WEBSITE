"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Menu, X, Search, Moon, Sun, Download } from "lucide-react"
import { company, navLinks } from "@/lib/site-content"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isDark, setIsDark] = useState(false)
  const [activeHref, setActiveHref] = useState("#home")

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen, searchOpen])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveHref(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: [0, 0.2, 0.45, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("gahs-theme", next ? "dark" : "light")
    } catch {}
  }

  const results = useMemo(() => {
    if (!query.trim()) return navLinks
    return navLinks.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background shadow-md">
        {/* Brand + tools */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={`${company.name} home`}>
            <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary ring-1 ring-gold/40 sm:size-11">
              <Image src="/images/logo-leaf.png" alt="" width={44} height={44} className="size-full object-cover" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-serif text-sm font-bold tracking-tight text-foreground sm:text-base lg:text-lg">
                {company.shortName}
              </span>
              <span className="truncate text-[10px] font-medium tracking-wide text-muted-foreground sm:text-[11px]">
                Subsidiary of {company.parentShort} &middot; German Market
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary sm:size-10"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary sm:size-10"
            >
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <a
              href="/organic-turmeric-standard-manual.txt"
              download
              className="ml-1 hidden items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <Download className="size-4" />
              Manual
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open full menu"
              className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden sm:size-10"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        {/* Always-visible section navigation */}
        <nav aria-label="Page sections" className="border-t border-border bg-primary">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
            <ul className="flex items-center gap-1 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "block whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-3.5 sm:text-sm",
                      activeHref === link.href
                        ? "bg-gold text-emerald-deep shadow-sm"
                        : "text-primary-foreground/90 hover:bg-primary-foreground/15 hover:text-primary-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Full menu drawer for smaller screens */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-background p-6 shadow-2xl transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-serif text-lg font-semibold text-primary">All sections</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-full hover:bg-secondary"
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-secondary hover:text-primary",
                  activeHref === link.href ? "bg-primary/10 text-primary" : "text-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="/organic-turmeric-standard-manual.txt"
            download
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground"
          >
            <Download className="size-4" />
            Download Standard Manual
          </a>
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[70] flex items-start justify-center p-4 pt-28 transition-opacity duration-200",
          searchOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
        <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card p-4 shadow-2xl">
          <div className="flex items-center gap-3 rounded-xl bg-secondary px-4">
            <Search className="size-5 text-muted-foreground" />
            <input
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections..."
              className="w-full bg-transparent py-3 text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X className="size-5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
          <ul className="mt-3 max-h-72 overflow-auto">
            {results.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-muted-foreground">No matches found.</li>
            )}
            {results.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => {
                    setSearchOpen(false)
                    setQuery("")
                  }}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-secondary"
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="text-xs text-muted-foreground">Jump to section</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
