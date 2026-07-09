export const siteConfig = {
  name: '1Grow',
  tagline: 'One Platform for Academies, Rentals & Events',
  description: '1Grow is a multi-tenant SaaS ERP that helps Training Institutes, Rental Businesses, and Event Companies manage leads, operations, teams, payments, and analytics from a single cloud platform.',
  url: 'https://1grow.in',
  logo: '/logo.svg',
  logoPng: '/logo.png',
  icon: '/icon.svg',
  twitterHandle: '@1Grow',
  locale: 'en_IN',
  themeColor: '#F5A623',
  company: {
    name: 'NexGenAds Technologies Pvt Ltd',
    legalName: 'NexGenAds Technologies Private Limited',
    url: 'https://nexgenads.space',
    email: 'support@1grow.in',
    foundingDate: '2024-06',
    description: 'NexGenAds Technologies builds intelligent SaaS ERP solutions for Indian training institutes, rental businesses, and event management companies.',
    address: {
      addressCountry: 'IN',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
    },
    areaServed: ['IN', 'India'],
    knowsAbout: ['ERP Software', 'Business Management Software', 'SaaS', 'Training Institute Management', 'Rental Business Management', 'Event Management Software'],
  },
  social: {
    twitter: 'https://x.com/1Grow',
    linkedin: 'https://linkedin.com/company/1Grow',
    youtube: 'https://youtube.com/@1Grow',
  },
  openGraph: {
    image: '/meta.jpg',
    imageAlt: '1Grow - Intelligent Business Operating System for Training Institutes, Rentals, and Event Companies',
    imageWidth: 1200,
    imageHeight: 630,
  },
  founder: {
    name: '1Grow Team',
    url: 'https://1grow.in/about',
  },
} as const

export type SiteConfig = typeof siteConfig
