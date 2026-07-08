import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/seo-config'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Terms & Conditions',
  description: 'Review the 1Grow Terms and Conditions governing the use of our SaaS ERP platform for training institutes, rental businesses, and event companies.',
  url: `${siteConfig.url}/terms-and-conditions`,
})

export default function Page() { return <LegalPage slug="terms-and-conditions" /> }
