import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Clock, ChevronRight, ArrowLeft, ArrowRight, BookOpen, Tag } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContentLayout } from '@/components/content/content-layout'
import { CodeBlock } from '@/components/content/code-block'
import { SocialShare } from '@/components/content/social-share'
import { RelatedPosts } from '@/components/content/related-posts'
import { getTutorial, getAllTutorials, extractToc } from '@/lib/content'
import { generateMetadata as genMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tutorial = getTutorial(slug)
  if (!tutorial) return {}

  return genMeta({
    title: tutorial.title,
    description: tutorial.description,
    url: `https://1Grow.com/tutorials/${tutorial.slug}`,
    type: 'article',
  })
}

export async function generateStaticParams() {
  return getAllTutorials().map((t) => ({ slug: t.slug }))
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tutorial = getTutorial(slug)
  if (!tutorial) notifed()

  const allTutorials = getAllTutorials()
  const related = allTutorials
    .filter((t) => t.slug !== tutorial!.slug && t.category === tutorial!.category)
    .slice(0, 3)

  const toc = tutorial!.steps.map((s, i) => ({
    id: `step-${i + 1}`,
    title: `Step ${i + 1}: ${s.title}`,
    level: 2 as const,
  }))

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <a href="/tutorials" className="hover:text-primary transition-colors">Tutorials</a>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium truncate">{tutorial!.title}</span>
          </nav>

          <article>
            {/* Hero header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                  <BookOpen className="size-3" />
                  {tutorial!.category}
                </span>
                <span className={cn('rounded-full border px-3 py-1 text-xs font-semibold', difficultyColors[tutorial!.difficulty])}>
                  {tutorial!.difficulty}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {tutorial!.estimatedTime}
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight">
                {tutorial!.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {tutorial!.description}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <SocialShare
                  title={tutorial!.title}
                  url={`https://1Grow.com/tutorials/${tutorial!.slug}`}
                />
              </div>
            </header>

            {/* Prerequisites */}
            {tutorial!.prerequisites.length > 0 && (
              <div className="mb-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400">
                  <span className="grid size-5 place-items-center rounded-md bg-amber-500/10 text-[10px]">!</span>
                  Prerequisites
                </h3>
                <ul className="space-y-1.5">
                  {tutorial!.prerequisites.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="size-1.5 shrink-0 rounded-full bg-amber-500/50" />
                      {p.replace(/-/g, ' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            <div className="space-y-12">
              {tutorial!.steps.map((step, i) => (
                <section key={i} id={`step-${i + 1}`} className="scroll-mt-28">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                      {i + 1}
                    </span>
                    <h2 className="font-heading text-xl font-bold sm:text-2xl">{step.title}</h2>
                  </div>
                  <div className="ml-12 space-y-4">
                    <div className="text-base leading-relaxed text-muted-foreground">
                      {step.content.split('\n').map((paragraph, pi) => (
                        <p key={pi} className={pi > 0 ? 'mt-3' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {step.code?.map((c, j) => (
                      <CodeBlock
                        key={j}
                        code={c.code}
                        language={c.language}
                        filename={c.filename}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Tags & Footer */}
            <div className="mt-12 rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    {tutorial!.steps.length} steps &middot; Tutorial complete
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Have questions? Reach out on our support channels.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tutorial!.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      <Tag className="size-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <RelatedPosts items={related} basePath="/tutorials" type="tutorial" />
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function notifed(): never {
  notFound()
}
