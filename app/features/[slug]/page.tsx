import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { FeatureHero } from "@/components/sections/feature-hero";
import { features, getFeatureBySlug, getAllFeatureSlugs } from "@/data/features";
import { ArrowRight, Check, ChevronRight, HelpCircle } from "lucide-react";
import type { Metadata } from "next";
import { generateMetadata as genMeta, webpageSchema, breadcrumbSchema, faqSchema, renderJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/seo-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return { title: "Feature Not Found - 1Grow" };

  return genMeta({
    title: `${feature.name} - 1Grow Feature`,
    description: feature.description,
    url: `${siteConfig.url}/features/${feature.slug}`,
  });
}

export default async function FeaturePage({ params }: PageProps) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) notFound();

  const featureUrl = `${siteConfig.url}/features/${feature.slug}`;
  const relatedFeatures = features
    .filter((f) => f.category === feature.category && f.slug !== feature.slug)
    .slice(0, 3);

  const schemas = [
    webpageSchema({
      title: `${feature.name} - 1Grow Feature`,
      description: feature.description,
      url: featureUrl,
      breadcrumbs: [
        { name: "Home", url: siteConfig.url },
        { name: "Features", url: `${siteConfig.url}/features` },
        { name: feature.name, url: featureUrl },
      ],
    }),
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Features", url: `${siteConfig.url}/features` },
      { name: feature.name, url: featureUrl },
    ]),
    ...(feature.faqs.length > 0
      ? [
          faqSchema(
            feature.faqs.map((f) => ({
              question: f.question,
              answer: f.answer,
            }))
          ),
        ]
      : []),
  ];

  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd({ "@context": "https://schema.org", "@graph": schemas }) }}
        key="feature-schemas"
      />
      <SiteHeader />
      <main className="pt-28 pb-24">
        <FeatureHero
          iconName={feature.iconName}
          bgColor={feature.bgColor}
          color={feature.color}
          category={feature.category}
          name={feature.name}
          tagline={feature.tagline}
          stats={feature.stats}
        />

        <section className="mx-auto mt-20 max-w-4xl px-4">
          <Reveal>
            <p className="text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {feature.description}
            </p>
          </Reveal>
        </section>

        <section className="mx-auto mt-20 max-w-6xl px-4" aria-labelledby="capabilities-heading">
          <Reveal>
            <h2 id="capabilities-heading" className="text-center font-heading text-2xl font-bold sm:text-3xl">
              Key Capabilities
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 grid max-w-3xl gap-3">
              {feature.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Check className="size-4" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto mt-24 max-w-6xl px-4" aria-labelledby="benefits-heading">
          <Reveal>
            <h2 id="benefits-heading" className="text-center font-heading text-2xl font-bold sm:text-3xl">
              Why You Will Love It
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Designed to solve real operational challenges, not just check boxes.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2">
            {feature.benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.1}>
                <div className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-primary/20">
                  <div
                    className={`grid size-12 place-items-center rounded-2xl ${feature.bgColor} ${feature.color} transition-transform group-hover:scale-110`}
                  >
                    <benefit.icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-6xl px-4" aria-labelledby="usecases-heading">
          <Reveal>
            <h2 id="usecases-heading" className="text-center font-heading text-2xl font-bold sm:text-3xl">
              How Others Use It
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-3">
            {feature.useCases.map((useCase, i) => (
              <Reveal key={useCase.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                  <div className="flex items-center gap-2 text-primary">
                    <ChevronRight className="size-5" aria-hidden="true" />
                    <h3 className="font-heading font-bold">{useCase.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-3xl px-4" aria-labelledby="faq-heading">
          <Reveal>
            <h2 id="faq-heading" className="text-center font-heading text-2xl font-bold sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 space-y-4">
            {feature.faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 0.05}>
                <details className="group rounded-2xl border border-border bg-card transition-all hover:border-primary/20">
                  <summary className="flex cursor-pointer items-center gap-3 p-5 font-medium list-none [&::-webkit-details-marker]:hidden">
                    <HelpCircle className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    {faq.question}
                    <ChevronRight className="size-4 shrink-0 ml-auto transition-transform group-open:rotate-90 text-muted-foreground" aria-hidden="true" />
                  </summary>
                  <div className="px-5 pb-5 pl-13 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-4xl px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent-blue/10 border border-border p-8 sm:p-12 text-center">
              <div
                className="absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -right-20 top-1/3 h-32 w-32 rounded-full bg-accent-blue/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  Ready to Transform Your {feature.category.toLowerCase()}?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  Join hundreds of institutes already using 1Grow to
                  streamline their operations.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-gray-200 bg-white px-6 text-base font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-white/25 dark:hover:bg-white/15 sm:h-14 sm:px-8 sm:text-lg"
                    aria-label="Contact sales to learn more"
                  >
                    Talk to Sales
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {relatedFeatures.length > 0 && (
          <section className="mx-auto mt-24 max-w-6xl px-4" aria-labelledby="related-heading">
            <Reveal>
              <h2 id="related-heading" className="text-center font-heading text-2xl font-bold sm:text-3xl">
                Related Features
              </h2>
            </Reveal>
            <div className="mx-auto mt-10 grid gap-4 sm:grid-cols-3">
              {relatedFeatures.map((related, i) => {
                const RelatedIcon = related.icon;
                return (
                  <Reveal key={related.slug} delay={i * 0.1}>
                    <a
                      href={`/features/${related.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20"
                      aria-label={`Learn about ${related.name}`}
                    >
                      <div
                        className={`grid size-10 shrink-0 place-items-center rounded-xl ${related.bgColor} ${related.color} group-hover:scale-110 transition-transform`}
                      >
                        <RelatedIcon className="size-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold group-hover:text-primary transition-colors">
                          {related.name}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {related.tagline}
                        </p>
                      </div>
                      <ArrowRight className="size-4 shrink-0 mt-1 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
