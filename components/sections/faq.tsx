import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const faqs = [
  {
    q: "Can I use only one module?",
    a: "Absolutely. Start with just Training, Rental, or Event management and pay only for what you use. You can add more modules anytime as your business grows. Each module works independently yet integrates seamlessly with billing, CRM, and analytics.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes - every plan starts with a 20-day free trial that includes full access to all modules. No credit card is required to get started. Experience the complete platform before making any commitment.",
  },
  {
    q: "Can I manage multiple branches?",
    a: "Yes. Multi-branch operations are built into the platform. Manage locations, staff rosters, and inventory across branches from a single dashboard while owners get a consolidated view of the entire business. Compare branch performance side by side.",
  },
  {
    q: "Do you support mobile devices?",
    a: "1Grow is mobile-first and fully responsive. Your team can manage attendance, bookings, payments, and tasks from any smartphone, tablet, or desktop computer. The mobile experience includes all core features.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is protected with enterprise-grade security including role-based access control, comprehensive audit logs, encryption at rest and in transit, and true multi-tenant isolation so each business stays completely separate and private.",
  },
  {
    q: "How does fee collection work?",
    a: "The platform automates fee collection with WhatsApp payment links, email reminders, and SMS notifications. Students and parents receive payment requests automatically, and receipts are generated instantly upon payment confirmation.",
  },
  {
    q: "Can I integrate WhatsApp for notifications?",
    a: "Yes. WhatsApp Business API integration is built in. Send attendance updates, fee reminders, class schedule changes, and promotional messages automatically. Template messages comply with WhatsApp business policies.",
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
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
