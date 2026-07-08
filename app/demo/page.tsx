import type { Metadata } from "next";
import { HeroBase } from '@/components/ui/hero'
import { siteConfig } from "@/lib/seo-config";
import { generateMetadata as genMeta } from "@/lib/seo";

const pageTitle = "Schedule a Demo - See 1Grow in Action"
const pageDescription = "Book a personalized demo of 1Grow. See how our SaaS ERP can transform your training academy, rental business, or event company operations."
const pageUrl = `${siteConfig.url}/demo`

export const metadata: Metadata = genMeta({
  title: pageTitle,
  description: pageDescription,
  url: pageUrl,
})

export default function Page() {
  return (
    <div className="w-full h-full min-h-screen">
      <HeroBase />
    </div>
  )
}
