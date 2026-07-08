import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/seo-config'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Privacy Policy',
  description: 'Read the 1Grow Privacy Policy to understand how we collect, use, store, and protect your personal data when you use our SaaS ERP platform.',
  url: `${siteConfig.url}/privacy-policy`,
})

export default function Page() { return <LegalPage slug="privacy-policy" /> }
