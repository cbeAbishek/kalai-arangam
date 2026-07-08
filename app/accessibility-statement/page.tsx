import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/seo-config'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Accessibility Statement',
  description: 'Learn about the 1Grow commitment to digital accessibility and our ongoing efforts to ensure our platform is usable by everyone.',
  url: `${siteConfig.url}/accessibility-statement`,
})

export default function Page() { return <LegalPage slug="accessibility-statement" /> }
