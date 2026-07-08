import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/seo-config'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Refund Policy',
  description: 'Learn about the 1Grow refund policy, cancellation terms, and how we handle refunds for subscription plans and services.',
  url: `${siteConfig.url}/refund-policy`,
})

export default function Page() { return <LegalPage slug="refund-policy" /> }
