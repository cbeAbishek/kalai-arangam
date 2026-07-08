import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/seo-config'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Data Processing Policy',
  description: 'Review the 1Grow Data Processing Agreement outlining how we process, store, and protect business data on behalf of our customers.',
  url: `${siteConfig.url}/data-processing-policy`,
})

export default function Page() { return <LegalPage slug="data-processing-policy" /> }
