import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft, Search } from 'lucide-react'
import { siteConfig } from '@/lib/seo-config'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved. Find your way back to 1Grow homepage.',
  url: `${siteConfig.url}/404`,
  robots: 'noindex',
})

const quickLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="pt-36 pb-24 mx-auto max-w-lg text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            404 Error
          </span>
          <h1 className="mt-5 text-balance font-heading text-5xl font-extrabold tracking-tight sm:text-7xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Sorry, we could not find the page you are looking for. 
            It may have been moved, renamed, or deleted.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Search className="size-4" aria-hidden="true" />
              Contact Support
            </Link>
          </div>
          <div className="mt-10">
            <p className="text-xs pt-10 text-muted-foreground uppercase tracking-wider font-semibold">
              Quick Links
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
