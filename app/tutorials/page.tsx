import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Tag, ArrowRight, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { ContentSearch } from "@/components/content/search";
import { getAllTutorials, getAllTutorialCategories } from "@/lib/content";
import { generateMetadata as genMeta, webpageSchema, breadcrumbSchema, courseSchema, renderJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/seo-config";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const pageTitle = "Tutorials - Step-by-Step Guides for 1Grow"
const pageDescription = "Master 1Grow with our comprehensive step-by-step tutorials. Learn training management, rental operations, event planning, and more with practical guides."
const pageUrl = `${siteConfig.url}/tutorials`

export const metadata: Metadata = genMeta({
  title: pageTitle,
  description: pageDescription,
  url: pageUrl,
})

const difficultyColors = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-amber-500/10 text-amber-600",
  advanced: "bg-destructive/10 text-destructive",
};

const schemas = [
  webpageSchema({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Tutorials", url: pageUrl },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Tutorials", url: pageUrl },
  ]),
  courseSchema({
    name: "1Grow Business Management Training",
    description: "Comprehensive training on using 1Grow for training institute management, rental business operations, and event company workflows. Learn step-by-step with practical tutorials.",
    url: pageUrl,
    duration: "PT2H",
    courseMode: "online",
    outcome: "Master 1Grow platform features including student management, fee collection, inventory tracking, and event planning",
  }),
];

export default function TutorialsPage() {
  const tutorials = getAllTutorials();
  const categories = getAllTutorialCategories();

  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ "@context": "https://schema.org", "@graph": schemas }) }}
        key="tutorials-schemas"
      />
      <SiteHeader />
      <main className="px-4 pb-24 pt-28">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Tutorials" }]} />

          <div className="mb-10">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Tutorials
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Step-by-step guides to help you master every feature of
              1Grow. Follow along at your own pace.
            </p>
          </div>

          <div className="mb-8">
            <Suspense>
              <ContentSearch
                items={tutorials.map((t) => ({
                  slug: t.slug,
                  title: t.title,
                  description: t.description,
                  category: t.category,
                }))}
                basePath="/tutorials"
                placeholder="Search tutorials..."
              />
            </Suspense>
          </div>

          <div className="mb-8 flex flex-wrap gap-2" role="list" aria-label="Tutorial categories">
            {categories.map((cat) => (
              <span
                key={cat}
                role="listitem"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <BookOpen className="size-3" aria-hidden="true" />
                {cat}
              </span>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-border/80 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-medium text-brand">
                    {tutorial.category}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                      difficultyColors[tutorial.difficulty],
                    )}
                  >
                    {tutorial.difficulty}
                  </span>
                </div>
                <h3 className="font-heading text-base font-semibold transition-colors group-hover:text-brand">
                  {tutorial.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {tutorial.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" aria-hidden="true" />
                    {tutorial.estimatedTime}
                  </span>
                  <span>{tutorial.steps.length} steps</span>
                  <ArrowRight className="ml-auto size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          {tutorials.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              <p className="text-lg">No tutorials available yet.</p>
              <p className="mt-2 text-sm">Check back soon for new guides.</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
