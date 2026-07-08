import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { features } from "@/data/features";
import { Heart, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/seo-config";
import { generateMetadata as genMeta, webpageSchema, breadcrumbSchema, renderJsonLd } from "@/lib/seo";

const pageTitle = "Features - All-in-One Business Management Platform"
const pageDescription = "Explore 1Grow features for training academies, rental businesses, and event companies. Student management, inventory tracking, event planning, analytics, and more."
const pageUrl = `${siteConfig.url}/features`

export const metadata: Metadata = genMeta({
  title: pageTitle,
  description: pageDescription,
  url: pageUrl,
})

const categories = Array.from(new Set(features.map((f) => f.category)));

const schemas = [
  webpageSchema({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Features", url: pageUrl },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Features", url: pageUrl },
  ]),
];

export default function FeaturesPage() {
  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ "@context": "https://schema.org", "@graph": schemas }) }}
        key="features-schemas"
      />
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-accent-green/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-green">
              Features
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Comprehensive business management features organized by function -
              not a scattered list of tools. Each category integrates with our
              billing, CRM, and analytics engine.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/wishlist"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-playful inline-flex items-center gap-2 bg-primary text-primary-foreground"
                aria-label="Join the 1Grow early access wishlist"
              >
                <Heart className="size-4" aria-hidden="true" />
                Join Wishlist
              </a>
            </div>
          </Reveal>

          <div className="mt-16 space-y-16">
            {categories.map((category, gi) => (
              <Reveal key={category} delay={gi * 0.1}>
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-2">
                    {category}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {category === "Admissions" && "Manage students, attendance, fees, and batch scheduling for training academies of all sizes"}
                    {category === "Inventory" && "Track rental items, bookings, dispatch, returns, and maintenance schedules"}
                    {category === "Operations" && "Access reports, mobile management, and smart analytics dashboards"}
                    {category === "Platform" && "Enterprise-grade security, role-based access, and scalable cloud infrastructure"}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features
                      .filter((f) => f.category === category)
                      .map((f) => {
                        const Icon = f.icon;
                        return (
                          <a
                            key={f.slug}
                            href={`/features/${f.slug}`}
                            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20"
                            aria-label={`Learn about ${f.name} feature`}
                          >
                            <div
                              className={`grid size-10 shrink-0 place-items-center rounded-xl ${f.bgColor} ${f.color} group-hover:scale-110 transition-transform`}
                            >
                              <Icon className="size-5" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold group-hover:text-primary transition-colors">
                                {f.name}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {f.tagline}
                              </p>
                            </div>
                            <ArrowRight className="size-4 shrink-0 mt-1 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                          </a>
                        );
                      })}
                  </div>
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
