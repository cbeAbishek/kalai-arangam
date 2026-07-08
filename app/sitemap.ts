import { MetadataRoute } from 'next'
import { getAllBlogPosts, getAllTutorials, getAllLegalPages } from '@/lib/content'
import { siteConfig } from '@/lib/seo-config'
import { features } from '@/data/features'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/solutions`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/features`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/tutorials`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/use-cases`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${base}/legal`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${base}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${base}/refund-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${base}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.1 },
    { url: `${base}/data-processing-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.1 },
    { url: `${base}/accessibility-statement`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.1 },
    { url: `${base}/code-of-conduct`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.2 },
    { url: `${base}/community-guidelines`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.2 },
  ]

  const blogPages = getAllBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const tutorialPages = getAllTutorials().map((tutorial) => ({
    url: `${base}/tutorials/${tutorial.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const featurePages = features.map((feature) => ({
    url: `${base}/features/${feature.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const legalPages = getAllLegalPages().map((page) => ({
    url: `${base}/legal/${page.slug}`,
    lastModified: new Date(page.lastUpdated),
    changeFrequency: 'yearly' as const,
    priority: 0.2,
  }))

  return [...staticPages, ...blogPages, ...tutorialPages, ...featurePages, ...legalPages]
}
