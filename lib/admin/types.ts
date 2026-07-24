export type CmsGalleryItem = {
  id: string
  src: string
  alt: string
  category: string
  type: "image" | "video"
}

export type CmsLeader = {
  id: string
  name: string
  role: string
  detail: string
  photoSrc: string
}

export type CmsNewsItem = {
  id: string
  tag: string
  date: string
  image: string
  title: string
  excerpt: string
}

export type SiteData = {
  company: {
    name: string
    shortName: string
    parent: string
    parentShort: string
    tagline: string
  }
  hero: {
    headline: string
    highlight: string
    supporting: string
  }
  about: {
    body: string
    mission: string
    exportFocus: string
  }
  contact: {
    heading: string
    intro: string
    phone: string
    email: string
    coordination: string
    season: string
  }
  galleryIntro: string
  galleryItems: CmsGalleryItem[]
  leaders: CmsLeader[]
  newsItems: CmsNewsItem[]
  productionTitle: string
  productionSections: { id: string; heading: string; paragraphs: string[] }[]
}
