import { Reveal } from '@/components/reveal'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  {
    slug: 'replacing-spreadsheets-with-saas-erp',
    title: 'Why Training Academies Should Replace Spreadsheets with a SaaS ERP',
    description: 'Discover how digitizing your academy operations can save 10+ hours per week and reduce fee collection time by 70%.',
    category: 'Industry Insights',
    readingTime: 5,
    date: 'Jan 15, 2025',
  },
  {
    slug: 'multi-branch-rental-business-management',
    title: 'Managing a Multi-Branch Rental Business Without Chaos',
    description: 'Learn how rental businesses use cloud inventory management to track assets across locations in real time.',
    category: 'Industry Insights',
    readingTime: 4,
    date: 'Jan 22, 2025',
  },
  {
    slug: 'event-management-budget-tracking',
    title: 'How Event Companies Track Budgets and Profitability in Real Time',
    description: 'Replace manual budget spreadsheets with real-time tracking dashboards that show profitability per event.',
    category: 'Product Updates',
    readingTime: 4,
    date: 'Feb 1, 2025',
  },
]

export function LatestBlogs() {
  return (
    <section id="blog" aria-labelledby="blog-heading" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Blog
          </span>
          <h2 id="blog-heading" className="mt-5 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Latest from the blog
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Expert tips and guides for academy owners, rental operators, and event managers. 
            Learn how to save time, cut costs, and grow your business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <a href={`/blog/${post.slug}`} className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">{post.category}</span>
                  <span className="flex items-center gap-1"><Clock className="size-3" aria-hidden="true" />{post.readingTime} min read</span>
                </div>
                <h3 className="mt-4 font-heading text-base font-bold leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  Read full article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            View all articles and guides
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
