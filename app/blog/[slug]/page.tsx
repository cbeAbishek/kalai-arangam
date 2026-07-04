import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Clock, Tag, Calendar, ChevronRight, BookOpen, User } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SocialShare } from '@/components/content/social-share'
import { NewsletterCta } from '@/components/content/newsletter-cta'
import { RelatedPosts } from '@/components/content/related-posts'
import { getBlogPost, getAllBlogPosts, extractToc } from '@/lib/content'
import { generateMetadata as genMeta, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return genMeta({
    title: post.title,
    description: post.description,
    url: `https://1Grow.com/blog/${post.slug}`,
    type: 'article',
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author.name,
  })
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const toc = extractToc(post.content)
  const allPosts = getAllBlogPosts()
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author.name,
    url: `https://1Grow.com/blog/${post.slug}`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://1Grow.com' },
    { name: 'Blog', url: 'https://1Grow.com/blog' },
    { name: post.title, url: `https://1Grow.com/blog/${post.slug}` },
  ])

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />

          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium truncate">{post.title}</span>
          </nav>

          <article>
            {/* Hero header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                  <BookOpen className="size-3" />
                  {post.category}
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {post.author.name.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {post.readingTime} min read
                </span>
              </div>
              <div className="mt-5">
                <SocialShare
                  title={post.title}
                  url={`https://1Grow.com/blog/${post.slug}`}
                />
              </div>
            </header>

            {/* Content */}
            <div
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Tags & Footer */}
            {post.tags.length > 0 && (
              <div className="mt-12 rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
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
            )}

            <div className="mt-12">
              <RelatedPosts items={related} basePath="/blog" type="blog" />
            </div>
          </article>

          <div className="mt-12">
            <NewsletterCta />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 id="$1">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, '<ul>$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
}
