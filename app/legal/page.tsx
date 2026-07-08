import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Breadcrumbs } from '@/components/content/breadcrumbs'
import { getAllLegalPages } from '@/lib/content'
import { generateMetadata as genMeta, webpageSchema, breadcrumbSchema, renderJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/seo-config'

const pageTitle = 'Legal - Policies & Terms'
const pageDescription = 'Access 1Grow legal documents including Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, and other legal agreements governing platform use.'
const pageUrl = `${siteConfig.url}/legal`

export const metadata: Metadata = genMeta({
  title: pageTitle,
  description: pageDescription,
  url: pageUrl,
})

const schemas = [
  webpageSchema({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    breadcrumbs: [
      { name: 'Home', url: siteConfig.url },
      { name: 'Legal', url: pageUrl },
    ],
  }),
  breadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Legal', url: pageUrl },
  ]),
]

export default function LegalPage() {
  const pages = getAllLegalPages()

  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ '@context': 'https://schema.org', '@graph': schemas }) }}
        key="legal-schemas"
      />
      <SiteHeader />
      <main className="px-4 pb-24 pt-28">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={[{ label: 'Legal' }]} />

          <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Legal
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
            Policies, terms, and legal documents governing the use of 1Grow platform and services.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/legal/${page.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-border/80 hover:shadow-lg"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <FileText className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-base font-semibold transition-colors group-hover:text-brand">
                    {page.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground/60">
                    Last updated: {page.lastUpdated}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
