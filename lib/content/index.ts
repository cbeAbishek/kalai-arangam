import type { BlogPost, Tutorial, LegalPage, TocItem } from './types'

function extractToc(content: string): TocItem[] {
  const headings = content.match(/^#{1,3}\s+.+$/gm) ?? []
  return headings.map((h) => {
    const level = h.match(/^(#+)/)?.[1].length ?? 1
    const text = h.replace(/^#+\s+/, '')
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    return { id, title: text, level }
  })
}

function estimateReadingTime(content: string): number {
  const words = content.replace(/[#*`>\[\]!_~]/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    const posts = require('@/data/blog/posts.json') as BlogPost[]
    return posts.map((p) => ({
      ...p,
      readingTime: p.readingTime || estimateReadingTime(p.content),
    }))
  } catch {
    return []
  }
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  )
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  )
}

export function getAllTutorialCategories(): string[] {
  const tutorials = getAllTutorials()
  return [...new Set(tutorials.map((t) => t.category))]
}

export function getAllTutorialTags(): string[] {
  const tutorials = getAllTutorials()
  return [...new Set(tutorials.flatMap((t) => t.tags))]
}

export function getAllBlogCategories(): string[] {
  const posts = getAllBlogPosts()
  return [...new Set(posts.map((p) => p.category))]
}

export function getAllBlogTags(): string[] {
  const posts = getAllBlogPosts()
  return [...new Set(posts.flatMap((p) => p.tags))]
}

export function getAllTutorials(): Tutorial[] {
  try {
    return require('@/data/tutorials/tutorials.json') as Tutorial[]
  } catch {
    return []
  }
}

export function getTutorial(slug: string): Tutorial | undefined {
  return getAllTutorials().find((t) => t.slug === slug)
}

export function getLegalPage(slug: string): LegalPage | undefined {
  try {
    const pages = require('@/data/legal/pages.json') as LegalPage[]
    return pages.find((p) => p.slug === slug)
  } catch {
    return undefined
  }
}

export function getAllLegalPages(): LegalPage[] {
  try {
    return require('@/data/legal/pages.json') as LegalPage[]
  } catch {
    return []
  }
}

export { extractToc, estimateReadingTime }
export type { TocItem }
