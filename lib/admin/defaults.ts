import {
  company as defaultCompany,
  galleryItems as defaultGallery,
  leaders as defaultLeaders,
  newsItems as defaultNews,
  productionManual as defaultManual,
} from "@/lib/site-content"
import type { SiteData } from "@/lib/admin/types"

export function defaultSiteData(): SiteData {
  return {
    company: { ...defaultCompany },
    hero: {
      headline: "ORGANIC TURMERIC PRODUCTION FOR THE",
      highlight: "GERMAN PHARMACEUTICAL MARKET",
      supporting:
        "Certified organic production, international traceability, and sustainable farming practices supplying premium turmeric and medicinal herbs to Germany and other global markets.",
    },
    about: {
      body: `${defaultCompany.name} produces certified organic Lakadong turmeric and medicinal herbs strictly for the German pharmaceutical industry, extending to European, American and other international markets. As a subsidiary of ${defaultCompany.parent} (${defaultCompany.parentShort}), we carry forward the structured, traceable and sustainable outgrower programme — anchored by partnership with the University of Bonn and more than 60 family-owned pharmaceutical companies — that delivers consistent, high-curcumin turmeric the world can trust.`,
      mission:
        "Smooth, successful, structured and modelled organic turmeric and medicinal herbs production strictly for German markets.",
      exportFocus:
        "End-to-end quality from GPS-mapped soil sampling to consignments shipped to Germany once samples qualify.",
    },
    contact: {
      heading: "Partner with ORGTURM INVESTMENTS",
      intro:
        "Whether you are an outgrower farmer, a buyer or an institution, reach out to ORGTURM INVESTMENTS Private Limited — a subsidiary of GAHS — to join the organic turmeric production programme for the German market.",
      phone: "+263 773 355 153",
      email: "jackychaz3@gmail.com",
      coordination: "National Project Operations · German Market Programme",
      season: "7 to 9 months, certification year-round",
    },
    galleryIntro: "Crop, field, harvest and project photography and video from organic turmeric production.",
    galleryItems: defaultGallery.map((g, i) => ({
      id: `gal-${i + 1}`,
      src: g.src,
      alt: g.alt,
      category: g.category,
      type: g.type === "video" ? "video" : "image",
    })),
    leaders: defaultLeaders.map((l, i) => ({
      id: `leader-${i + 1}`,
      name: l.name,
      role: l.role,
      detail: l.detail,
      photoSrc: l.photoSrc,
    })),
    newsItems: defaultNews.map((n, i) => ({
      id: `news-${i + 1}`,
      tag: n.tag,
      date: n.date,
      image: n.image,
      title: n.title,
      excerpt: n.excerpt,
    })),
    productionTitle: defaultManual.title,
    productionSections: defaultManual.sections.map((s) => ({
      id: s.id,
      heading: s.heading,
      paragraphs: [...s.paragraphs],
    })),
  }
}
