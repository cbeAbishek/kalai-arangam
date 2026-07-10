import { siteConfig } from './seo-config'
import type { Metadata } from 'next'

export interface SeoMetadata {
  title: string
  description: string
  url: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedAt?: string
  updatedAt?: string
  author?: string
  robots?: string
}

export function generateMetadata(seo: SeoMetadata): Metadata {
  const siteName = siteConfig.name
  const title = seo.title.includes(siteName) ? seo.title : `${seo.title} | ${siteName}`
  const description = seo.description
  const image = seo.image ?? siteConfig.openGraph.image
  const imageAlt = seo.imageAlt ?? siteConfig.openGraph.imageAlt

  return {
    title,
    description,
    robots: seo.robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    alternates: {
      canonical: seo.url,
    },
    openGraph: {
      title,
      description,
      url: seo.url,
      siteName,
      locale: siteConfig.locale,
      type: seo.type ?? 'website',
      images: image
        ? [
            {
              url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
              width: siteConfig.openGraph.imageWidth,
              height: siteConfig.openGraph.imageHeight,
              alt: imageAlt,
            },
          ]
        : [],
      ...(seo.publishedAt && { publishedTime: seo.publishedAt }),
      ...(seo.updatedAt && { modifiedTime: seo.updatedAt }),
      ...(seo.author && { authors: [seo.author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: siteConfig.twitterHandle,
      images: image
        ? [
            {
              url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
              alt: imageAlt,
            },
          ]
        : [],
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.company.legalName,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${siteConfig.logo}`,
      width: 512,
      height: 512,
    },
    description: siteConfig.description,
    foundingDate: siteConfig.company.foundingDate,
    email: siteConfig.company.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: siteConfig.company.address.addressCountry,
      addressLocality: siteConfig.company.address.addressLocality,
      addressRegion: siteConfig.company.address.addressRegion,
    },
    areaServed: siteConfig.company.areaServed.map((a) => ({ '@type': 'Country', name: a })),
    knowsAbout: siteConfig.company.knowsAbout,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: siteConfig.company.email,
        availableLanguage: ['English', 'Tamil', 'Hindi'],
      },
    ],
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 10 },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: siteConfig.locale,
  }
}

export function webpageSchema({
  title,
  description,
  url,
  breadcrumbs,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  url: string
  breadcrumbs?: { name: string; url: string }[]
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#organization` },
    datePublished: datePublished ?? new Date().toISOString().split('T')[0],
    dateModified: dateModified ?? new Date().toISOString().split('T')[0],
    breadcrumb: breadcrumbs?.length
      ? { '@id': `${url}#breadcrumb` }
      : undefined,
    inLanguage: siteConfig.locale,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.article-summary'],
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1]?.url ?? siteConfig.url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function articleSchema(post: {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author: string
  authorUrl?: string
  url: string
  image?: string
  wordCount?: number
  articleBody?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${post.url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.company.name,
    },
    image: post.image
      ? {
          '@type': 'ImageObject',
          url: post.image.startsWith('http') ? post.image : `${siteConfig.url}${post.image}`,
        }
      : undefined,
    wordCount: post.wordCount ?? post.description.split(/\s+/).length,
    articleBody: post.articleBody ?? post.description,
    inLanguage: siteConfig.locale,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-summary'],
    },
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        upvoteCount: 0,
      },
    })),
    inLanguage: siteConfig.locale,
    about: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function howToSchema({
  name,
  description,
  steps,
  totalTime,
  image,
}: {
  name: string
  description: string
  steps: { name: string; text: string; image?: string; url?: string }[]
  totalTime?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(image && { image: { '@type': 'ImageObject', url: image } }),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: { '@type': 'ImageObject', url: step.image } }),
      ...(step.url && { url: step.url }),
    })),
  }
}

export function productSchema({
  name,
  description,
  price,
  priceCurrency = 'INR',
  category = 'BusinessApplication',
  image,
  sku,
  ratingValue = 4.8,
  reviewCount = 120,
}: {
  name: string
  description: string
  price: number
  priceCurrency?: string
  category?: string
  image?: string
  sku?: string
  ratingValue?: number
  reviewCount?: number
}) {
  const productUrl = `${siteConfig.url}/pricing`
  const priceValidUntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  const validFrom = new Date().toISOString().split('T')[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    category,
    ...(image && { image: image.startsWith('http') ? image : `${siteConfig.url}${image}` }),
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    ...(sku && { sku }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount,
    },
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Verified User',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: `${name} is an excellent SaaS ERP for Indian businesses.`,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/PreOrder',
      url: productUrl,
      priceValidUntil,
      validFrom,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: siteConfig.company.name,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: priceCurrency,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
    },
  }
}

export function softwareAppSchema({
  name,
  description,
  operatingSystem = 'Web, Android, iOS',
  applicationCategory = 'BusinessApplication',
  image,
}: {
  name: string
  description: string
  operatingSystem?: string
  applicationCategory?: string
  image?: string
}) {
  const priceValidUntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  const validFrom = new Date().toISOString().split('T')[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    operatingSystem,
    applicationCategory,
    ...(image && { image: image.startsWith('http') ? image : `${siteConfig.url}${image}` }),
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      bestRating: 5,
      worstRating: 1,
      reviewCount: 120,
    },
    offers: {
      '@type': 'Offer',
      price: '999',
      priceCurrency: 'INR',
      priceValidUntil,
      validFrom,
      availability: 'https://schema.org/PreOrder',
      url: `${siteConfig.url}/pricing`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: siteConfig.company.name,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
    },
  }
}

export function localBusinessSchema({
  name,
  description,
  image,
  priceRange = '₹999-₹2,499',
}: {
  name: string
  description: string
  image?: string
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name,
    description,
    url: siteConfig.url,
    ...(image && { image: { '@type': 'ImageObject', url: image } }),
    priceRange,
    email: siteConfig.company.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  }
}

export function renderJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data, null, 2)
}
