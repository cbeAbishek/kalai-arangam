import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Target, Users, Heart, Shield } from "lucide-react";
import { siteConfig } from "@/lib/seo-config";
import { generateMetadata as genMeta, webpageSchema, breadcrumbSchema, renderJsonLd } from "@/lib/seo";

const pageTitle = "About 1Grow - Our Story & Mission"
const pageDescription = "Learn about 1Grow, the intelligent SaaS ERP built for Indian training academies, rental businesses, and event companies. Discover our mission to simplify business operations."
const pageUrl = `${siteConfig.url}/about`

export const metadata: Metadata = genMeta({
  title: pageTitle,
  description: '1Grow is a SaaS ERP built for Indian training academies, rental businesses, and event companies. Learn our story, mission, and values.',
  url: pageUrl,
})

const values = [
  {
    icon: Target,
    title: "Built for Real Businesses",
    description:
      "We understand the academy and rental business because we built this software to solve our own operational challenges.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Every feature starts with a conversation with our users. We build only what you actually need to run your business better.",
  },
  {
    icon: Heart,
    title: "Made in India",
    description:
      "Built specifically for Indian businesses with multilingual support in Tamil, Hindi, and English.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Your data is protected with enterprise-grade security, role-based access control, and comprehensive audit logs.",
  },
]

const schemas = [
  webpageSchema({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "About", url: pageUrl },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: pageUrl },
  ]),
]

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ "@context": "https://schema.org", "@graph": schemas }) }}
        key="about-schemas"
      />
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              About
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              About 1Grow
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              One platform to run your academy or business. Built by people who understand your 
              challenges and the way Indian businesses work.
            </p>
          </Reveal>

          <div className="sr-only article-summary" aria-hidden="true">
            <p><strong>1Grow</strong> is a SaaS ERP built by NexGenAds Technologies Pvt Ltd for Indian training academies, rental businesses, and event companies. The platform replaces manual tools like WhatsApp and Excel with automated student management, inventory tracking, fee collection, and event planning. Founded in 2024, the company serves businesses across India with support in Tamil, Hindi, and English.</p>
          </div>

          <Reveal className="mt-12">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
              <h2 className="font-heading text-2xl font-bold">Our Story</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                1Grow started with a simple problem. Training academies, rental firms, and event companies 
                in India still use WhatsApp, Excel, and paper registers. As they grow, the chaos grows too. 
                Double-bookings, missed payments, and lost leads become daily problems.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We built 1Grow to fix that. One smart platform handles admissions, fees, inventory, 
                and event planning. Our goal is simple: give business owners their time back. 
                Let them focus on serving customers, not fighting paperwork.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                1Grow is a product of{' '}
                <a
                  href="https://nexgenads.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  NexGenAds Technologies Pvt Ltd
                </a>
                , a tech company that builds smart software for Indian businesses.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <v.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
