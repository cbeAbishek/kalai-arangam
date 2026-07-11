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
  howToSchema,
  softwareAppSchema,
  productSchema,
  renderJsonLd,
} from '@/lib/seo'

  const faqData = [
    {
      question: 'Can I use only one module?',
      answer: 'Yes. You can start with just Training, Rental, or Event management. Pay only for what you use. Add more modules anytime as your business grows.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Every plan comes with a 20-day free trial. You get full access to all modules. No credit card needed. No risk.',
    },
    {
      question: 'Can I manage multiple branches?',
      answer: 'Yes. Multi-branch support is built in. Manage locations, staff, and inventory across all branches from one dashboard. Owners see the full picture at a glance.',
    },
    {
      question: 'Do you support mobile devices?',
      answer: '1Grow works on any device. Your team can manage attendance, bookings, payments, and tasks from phones, tablets, or desktops. The full app is mobile-friendly.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Your data is safe with role-based access, audit logs, and encryption at rest and in transit. Each business stays fully separate with true multi-tenant isolation.',
    },
    {
      question: 'What is an ERP and why do I need one?',
      answer: 'ERP stands for Enterprise Resource Planning. It is software that connects all parts of your business - students, inventory, billing, and reports - in one place. Instead of jumping between WhatsApp, Excel, and registers, you manage everything from one dashboard.',
    },
    {
      question: 'How is 1Grow different from using WhatsApp and Excel?',
      answer: 'WhatsApp and Excel are not built for business operations. With 1Grow, you get auto fee reminders, real-time inventory, attendance tracking, and live reports. No manual data entry. No lost messages. Everything is in one place.',
    },
    {
      question: 'What industries does 1Grow serve?',
      answer: '1Grow is built for three key industries: Training Institutes (music schools, dance studios, tuition centers, coaching classes), Rental Businesses (equipment, vehicles, venues, party supplies), and Event Companies (wedding planners, corporate events, cultural programs). Each industry gets tailored workflows and features.',
    },
    {
      question: 'How much does 1Grow cost?',
      answer: '1Grow offers transparent pricing starting at ₹999/month for the Starter plan. The Business plan at ₹1,899/month includes all modules and priority support. Enterprise plans with custom features are available on request. All plans include a 20-day free trial.',
    },
    {
      question: 'Can I migrate from my existing software?',
      answer: 'Yes. 1Grow supports data import from Excel/CSV files and can integrate with your existing tools. Our onboarding team provides free data migration assistance to ensure a smooth transition with zero data loss.',
    },
    {
      question: 'Does 1Grow support multiple languages?',
      answer: 'Yes. 1Grow supports English, Tamil, and Hindi. Your team and customers can use the platform in their preferred language. Additional languages are planned for future releases.',
    },
    {
      question: 'Can I try 1Grow before paying?',
      answer: 'Yes. Start with a 20-day free trial. You get full access to every feature. Invite your team. Import your data. If it works for you, choose a plan. If not, no charge.',
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

const schemaHowTo = howToSchema({
  name: 'Get started with 1Grow',
  description: 'Follow these steps to set up your business on 1Grow and start managing operations from one platform.',
  steps: [
    { name: 'Create Account', text: 'Sign up in seconds with a 20-day free trial. No credit card required and no commitment.' },
    { name: 'Set Up Your Business', text: 'Add your branches, staff members, and customize branding to match your business identity.' },
    { name: 'Import Your Data', text: 'Add customers, students, inventory items, events, or migrate your existing records seamlessly.' },
    { name: 'Manage Daily Operations', text: 'Track attendance, collect fees, send notifications, and manage teams - all automated.' },
    { name: 'Grow Your Business', text: 'Leverage analytics dashboards, revenue reports, and smart insights to drive growth.' },
  ],
  totalTime: 'PT30M',
})

const schemaSoftware = softwareAppSchema({
  name: siteConfig.name,
  description: siteConfig.description,
  image: '/meta.jpg',
})

const schemaProduct = productSchema({
  name: '1Grow Business Plan',
  description: 'Multi-module SaaS ERP for training institutes, rental businesses, and event companies.',
  price: 1899,
  image: '/meta.jpg',
  sku: '1GROW-BUSINESS',
})

const schemas = [schemaWebPage, schemaBreadcrumb, schemaFaq, schemaHowTo, schemaSoftware, schemaProduct]

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: '1Grow is a cloud ERP for Training Institutes, Rental Businesses, and Event Companies. Track leads, manage teams, collect payments, and view reports from one dashboard. Start your free trial today.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: 'Replace WhatsApp, Excel, and paper registers with one smart platform for academies, rentals, and events.',
    url: siteConfig.url,
    type: 'website',
  },
  other: {
    'article:published_time': '2025-06-01',
    'article:modified_time': new Date().toISOString().split('T')[0],
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
        <div className="sr-only article-summary" aria-hidden="true">
          <h1>1Grow - One Platform for Academies, Rentals and Events</h1>
          <p>1Grow is a cloud ERP that helps training institutes, rental businesses, and event companies manage leads, operations, teams, payments, and analytics from one dashboard. Replace WhatsApp, Excel, and paper registers with automation. Get a 20-day free trial. No credit card required.</p>
          <dl>
            <dt>Training Management</dt>
            <dd>Manage student enrollments, batches, attendance, and fee collection automatically.</dd>
            <dt>Rental Management</dt>
            <dd>Track inventory, bookings, returns, and maintenance in real time.</dd>
            <dt>Event Management</dt>
            <dd>Plan events, manage budgets, assign teams, and track tasks from start to finish.</dd>
          </dl>
          <p>1Grow is built by NexGenAds Technologies Pvt Ltd for Indian businesses. Support available in Tamil, Hindi, and English.</p>
        </div>
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
      <div className="sr-only" aria-hidden="true">
        <p>Sources and references:</p>
        <ul>
          <li>India SaaS market expected to reach $50 billion by 2030 (NASSCOM, 2024)</li>
          <li>70% of Indian SMBs still use manual processes for business operations (KPMG India SMB Survey, 2023)</li>
          <li>Businesses using ERP report 20-30% improvement in operational efficiency (Panorama Consulting Solutions, 2024)</li>
          <li>1Grow founded: 2024. Built for Indian training, rental, and event businesses.</li>
        </ul>
      </div>
      <SiteFooter />
    </div>
  )
}
