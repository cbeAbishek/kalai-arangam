import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import Link from "next/link";

const faqs = [
  {
    q: "Can I use only one module?",
    a: "Absolutely. Start with just Training, Rental, or Event management and pay only for what you use. You can add more modules anytime as your business grows. Each module works independently yet integrates seamlessly with billing, CRM, and analytics.",
    link: "/features",
    linkText: "Explore all features",
  },
  {
    q: "Is there a free trial?",
    a: "Yes - every plan starts with a 20-day free trial that includes full access to all modules. No credit card is required to get started. Experience the complete platform before making any commitment.",
    link: "/pricing",
    linkText: "View pricing plans",
  },
  {
    q: "Can I manage multiple branches?",
    a: "Yes. Multi-branch operations are built into the platform. Manage locations, staff rosters, and inventory across branches from a single dashboard while owners get a consolidated view of the entire business. Compare branch performance side by side.",
  },
  {
    q: "Do you support mobile devices?",
    a: "1Grow is mobile-first and fully responsive. Your team can manage attendance, bookings, payments, and tasks from any smartphone, tablet, or desktop computer. The mobile experience includes all core features.",
    link: "/features/mobile-app",
    linkText: "Learn about the mobile app",
  },
  {
    q: "Is my data secure?",
    a: "Your data is protected with enterprise-grade security including role-based access control, comprehensive audit logs, encryption at rest and in transit, and true multi-tenant isolation so each business stays completely separate and private.",
    link: "/features/multi-tenant-architecture",
    linkText: "Learn about our security",
  },
  {
    q: "How does fee collection work?",
    a: "The platform automates fee collection with WhatsApp payment links, email reminders, and SMS notifications. Students and parents receive payment requests automatically, and receipts are generated instantly upon payment confirmation.",
    link: "/features/fee-collection",
    linkText: "See fee collection features",
  },
  {
    q: "Can I integrate WhatsApp for notifications?",
    a: "Yes. WhatsApp Business API integration is built in. Send attendance updates, fee reminders, class schedule changes, and promotional messages automatically. Template messages comply with WhatsApp business policies.",
    link: "/features/whatsapp-notifications",
    linkText: "Explore WhatsApp integration",
  },
  {
    q: "What industries does 1Grow serve?",
    a: "1Grow is built for three key industries: Training Institutes (music schools, dance studios, tuition centers, coaching classes), Rental Businesses (equipment, vehicles, venues, party supplies), and Event Companies (wedding planners, corporate events, cultural programs). Each industry gets tailored workflows and features.",
    link: "/solutions",
    linkText: "View industry solutions",
  },
  {
    q: "How much does 1Grow cost?",
    a: "1Grow offers transparent pricing starting at ₹999/month for the Starter plan. The Business plan at ₹1,899/month includes all modules and priority support. Enterprise plans with custom features are available on request. All plans include a 20-day free trial.",
    link: "/pricing",
    linkText: "See detailed pricing",
  },
  {
    q: "Can I migrate from my existing software?",
    a: "Yes. 1Grow supports data import from Excel/CSV files and can integrate with your existing tools. Our onboarding team provides free data migration assistance to ensure a smooth transition with zero data loss.",
    link: "/tutorials",
    linkText: "Check migration tutorials",
  },
  {
    q: "Does 1Grow support multiple languages?",
    a: "Yes. 1Grow supports English, Tamil, and Hindi. Your team and customers can use the platform in their preferred language. Additional languages are planned for future releases.",
  },
  {
    q: "How does 1Grow compare to using WhatsApp and Excel?",
    a: "WhatsApp and Excel are not built for business operations. With 1Grow, you get automated fee reminders, real-time inventory tracking, attendance management, and live analytics reports. No manual data entry, no lost messages, and everything is centralized in one dashboard.",
    link: "/blog/save-10-hours-weekly-single-erp",
    linkText: "Read how businesses save 10+ hours weekly",
  },
  {
    q: "Can I try 1Grow before paying?",
    a: "Yes. Start with a 20-day free trial. You get full access to every feature. Invite your team. Import your data. If it works for you, choose a plan. If not, no charge.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 px-4 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything you need to know about 1Grow before getting started."
        />

        <Reveal className="mt-12">
          <Accordion type="single" className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="mb-3 rounded-2xl border border-border bg-card px-5 transition-all data-[state=open]:border-primary/30 data-[state=open]:shadow-md data-[state=open]:shadow-primary/5"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  <p>{faq.a}</p>
                  {faq.link && faq.linkText && (
                    <Link
                      href={faq.link}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {faq.linkText} &rarr;
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
