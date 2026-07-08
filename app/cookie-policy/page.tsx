import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/seo-config'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Cookie Policy',
  description: 'Understand how 1Grow uses cookies, tracking technologies, and similar tools to improve your browsing experience and platform functionality.',
  url: `${siteConfig.url}/cookie-policy`,
})

export default function Page() { return <LegalPage slug="cookie-policy" /> }
