import type { Metadata } from "next";
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { GraduationCap, Music, Waves, Swords, Heart, Package, PartyPopper, Camera, BookOpen } from 'lucide-react'
import { siteConfig } from "@/lib/seo-config";
import { generateMetadata as genMeta, webpageSchema, breadcrumbSchema, renderJsonLd } from "@/lib/seo";

const pageTitle = "Industry Solutions - 1Grow for Academies, Rentals & Events"
const pageDescription = "Discover industry-specific solutions from 1Grow. Purpose-built for dance academies, music schools, rental businesses, event companies, yoga studios, and more."
const pageUrl = `${siteConfig.url}/solutions`

export const metadata: Metadata = genMeta({
  title: pageTitle,
  description: pageDescription,
  url: pageUrl,
})

const solutions = [
  { icon: GraduationCap, name: 'Dance Academy', description: 'Manage students, batches, attendance, and recitals for Bharatanatyam, Kuchipudi, and contemporary dance schools.', color: 'bg-primary/10 text-primary border-primary/15' },
  { icon: Music, name: 'Music School', description: 'Schedule vocal and instrumental classes, track student progress, and manage exam preparations efficiently.', color: 'bg-accent-blue/10 text-accent-blue border-accent-blue/15' },
  { icon: BookOpen, name: 'Tuition Centre', description: 'Handle batch scheduling, fee collection, and parent notifications for academic coaching centres of all sizes.', color: 'bg-accent-green/10 text-accent-green border-accent-green/15' },
  { icon: Waves, name: 'Swimming Academy', description: 'Track pool schedules, instructor availability, and swimmer progress across age groups and skill levels.', color: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/15' },
  { icon: Heart, name: 'Yoga Studio', description: 'Manage class schedules, instructor assignments, and wellness program tracking for studios and wellness centres.', color: 'bg-accent-red/10 text-accent-red border-accent-red/15' },
  { icon: Swords, name: 'Martial Arts', description: 'Track belt progress, attendance, and competition schedules for karate, taekwondo, and kalaripayattu schools.', color: 'bg-primary/10 text-primary border-primary/15' },
  { icon: Package, name: 'Rental Business', description: 'Manage inventory, bookings, dispatch, returns, and damage assessment for any rental business operation.', color: 'bg-accent-blue/10 text-accent-blue border-accent-blue/15' },
  { icon: PartyPopper, name: 'Event Company', description: 'Handle event planning, quotations, budgets, team assignments, and closure reports end to end.', color: 'bg-accent-red/10 text-accent-red border-accent-red/15' },
  { icon: Heart, name: 'Wedding Planner', description: 'Manage wedding event timelines, vendor coordination, budgets, and client communications seamlessly.', color: 'bg-primary/10 text-primary border-primary/15' },
  { icon: Camera, name: 'Photography Studio', description: 'Track bookings, equipment, shoots, editing workflows, and client deliveries from one dashboard.', color: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/15' },
]

const schemas = [
  webpageSchema({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Solutions", url: pageUrl },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Solutions", url: pageUrl },
  ]),
]

export default function SolutionsPage() {
  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ "@context": "https://schema.org", "@graph": schemas }) }}
        key="solutions-schemas"
      />
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Solutions
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Industry Solutions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Purpose-built for your specific business. Each solution addresses industry-specific workflows, common challenges, and feature requirements.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.08}>
                <a href={`/solutions#${s.name.toLowerCase().replace(/\s+/g, '-')}`} className={`group flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 ${s.color}`} aria-label={`1Grow for ${s.name}`}>
                  <div className="grid size-12 place-items-center rounded-2xl bg-white/80 shadow-sm">
                    <s.icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
