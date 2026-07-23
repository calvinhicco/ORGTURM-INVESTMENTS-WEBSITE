import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { About } from "@/components/site/about"
import { ProductionStandards } from "@/components/site/production-standards"
import { WhyChooseUs } from "@/components/site/why-choose-us"
import { Gallery } from "@/components/site/gallery"
import { News } from "@/components/site/news"
import { Leadership } from "@/components/site/leadership"
import { Certifications } from "@/components/site/certifications"
import { Partners } from "@/components/site/partners"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProductionStandards />
        <WhyChooseUs />
        <Gallery />
        <News />
        <Leadership />
        <Certifications />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
