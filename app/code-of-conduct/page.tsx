import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Breadcrumbs } from '@/components/content/breadcrumbs'
import { generateMetadata as genMeta, webpageSchema, breadcrumbSchema, renderJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/seo-config'

const pageTitle = 'Code of Conduct'
const pageDescription = 'The 1Grow Code of Conduct outlines our commitment to maintaining a professional, inclusive, and harassment-free environment for all users and community members.'
const pageUrl = `${siteConfig.url}/code-of-conduct`

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
      { name: pageTitle, url: pageUrl },
    ],
  }),
  breadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: pageTitle, url: pageUrl },
  ]),
]

export default function CodeOfConductPage() {
  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ '@context': 'https://schema.org', '@graph': schemas }) }}
        key="conduct-schemas"
      />
      <SiteHeader />
      <main className="px-4 pb-24 pt-28">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ label: 'Code of Conduct' }]} />

          <h1 className="mb-8 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Code of Conduct
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 id="our-commitment">Our Commitment</h2>
              <p>
                1Grow is committed to providing a welcoming, inclusive, and harassment-free
                experience for everyone, regardless of gender, age, sexual orientation, disability,
                physical appearance, body size, race, ethnicity, religion, or technology choices.
              </p>
            </section>

            <section>
              <h2 id="standards">Expected Behavior</h2>
              <ul>
                <li>Use welcoming and inclusive language</li>
                <li>Respect differing viewpoints and experiences</li>
                <li>Accept constructive criticism gracefully</li>
                <li>Focus on what is best for the community</li>
                <li>Show empathy towards other community members</li>
              </ul>
            </section>

            <section>
              <h2 id="unacceptable">Unacceptable Behavior</h2>
              <ul>
                <li>Harassment, intimidation, or discrimination in any form</li>
                <li>Trolling, insulting, or derogatory comments</li>
                <li>Publishing others private information without consent</li>
                <li>Sexual content or unwelcome advances</li>
                <li>Other conduct which could reasonably be considered inappropriate</li>
              </ul>
            </section>

            <section>
              <h2 id="enforcement">Enforcement</h2>
              <p>
                Community leaders are responsible for clarifying and enforcing our standards.
                Reports of unacceptable behavior can be sent to{' '}
                <a href="mailto:conduct@1grow.in">conduct@1grow.in</a>.
                All complaints will be reviewed and investigated promptly and fairly.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
