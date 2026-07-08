import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { WhoIsThisFor } from '@/components/sections/who-is-this-for'
import { ProblemsWeSolve } from '@/components/sections/problems-we-solve'
import { HowItWorks } from '@/components/sections/how-it-works'
import { FeaturesOverview } from '@/components/sections/features-overview'
import { Modules } from '@/components/sections/modules'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { LatestBlogs } from '@/components/sections/latest-blogs'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { siteConfig } from '@/lib/seo-config'
import {
  webpageSchema,
  breadcrumbSchema,
  faqSchema,
  softwareAppSchema,
  productSchema,
  renderJsonLd,
} from '@/lib/seo'

const faqData = [
  {
    question: 'Can I use only one module?',
    answer: 'Start with just Training, Rental, or Event management and pay only for what you use. Add more modules anytime as your business grows.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Every plan starts with a 20-day free trial with full access to all modules. No credit card is required to get started.',
  },
  {
    question: 'Can I manage multiple branches?',
    answer: 'Multi-branch operations are built in. Manage locations, staff, and inventory across branches while owners get a consolidated business view.',
  },
  {
    question: 'Do you support mobile devices?',
    answer: '1Grow is mobile-first. Your team can manage attendance, bookings, payments, and tasks from any phone, tablet, or desktop.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Your data is protected with role-based access control, audit logs, encryption, and true multi-tenant isolation so each business stays completely separate.',
  },
]

const schemaWebPage = webpageSchema({
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  url: siteConfig.url,
  breadcrumbs: [{ name: 'Home', url: siteConfig.url }],
})

const schemaBreadcrumb = breadcrumbSchema([{ name: 'Home', url: siteConfig.url }])

const schemaFaq = faqSchema(faqData.map(f => ({ question: f.question, answer: f.answer })))

const schemaSoftware = softwareAppSchema({
  name: siteConfig.name,
  description: siteConfig.description,
})

const schemaProduct = productSchema({
  name: '1Grow Business Plan',
  description: 'Multi-module SaaS ERP for training institutes, rental businesses, and event companies.',
  price: 1899,
})

const schemas = [schemaWebPage, schemaBreadcrumb, schemaFaq, schemaSoftware, schemaProduct]

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: '1Grow is an intelligent SaaS ERP for Training Institutes, Rental Businesses, and Event Companies. Manage leads, operations, teams, payments, and analytics from one cloud platform. Start your free trial today.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: 'Replace spreadsheets, WhatsApp groups, and disconnected software with one intelligent business operating system.',
    url: siteConfig.url,
    type: 'website',
  },
}

export default function Page() {
  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ '@context': 'https://schema.org', '@graph': schemas }) }}
        key="homepage-schemas"
      />
      <SiteHeader />
      <main>
        <Hero />
        <WhoIsThisFor />
        <ProblemsWeSolve />
        <HowItWorks />
        <FeaturesOverview />
        <Modules />
        <WhyChooseUs />
        <PricingPreview />
        <LatestBlogs />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
