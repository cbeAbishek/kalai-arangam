import { Reveal } from "@/components/reveal";
import {
  Check,
  Users,
  Wallet,
  Bell,
  BarChart3,
  ShieldCheck,
  Layers,
  HeadphonesIcon,
} from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Purpose-Built for Academies",
    description:
      "Not a generic CRM. Built for training institutes, rental firms, and event companies. Our features match how you work.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wallet,
    title: "Automated Fee Collection",
    description:
      "Send WhatsApp reminders, payment links, and digital receipts on auto-pilot. Zero manual work for your team.",
    color: "bg-accent-blue/10 text-accent-blue",
  },
  {
    icon: Bell,
    title: "WhatsApp Automation",
    description:
      "Send attendance, fee alerts, class updates, and promotions via WhatsApp. All automatic, all on time.",
    color: "bg-accent-green/10 text-accent-green",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "See revenue, attendance, and branch comparisons on live dashboards. Data you can act on, right now.",
    color: "bg-accent-cyan/10 text-accent-cyan",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Role-based access, encrypted data, audit logs, and true multi-tenant isolation. Each business stays separate.",
    color: "bg-accent-red/10 text-accent-red",
  },
  {
    icon: Layers,
    title: "Multi-Branch Ready",
    description:
      "Manage unlimited branches from one dashboard. See cross-location reports, staff, and inventory in one view.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HeadphonesIcon,
    title: "Local Support",
    description:
      "Get help in Tamil, Hindi, and English. We understand Indian businesses because we are one.",
    color: "bg-accent-blue/10 text-accent-blue",
  },
  {
    icon: Check,
    title: "20-Day Free Trial",
    description:
      "Full access to all modules. Unlimited staff users. Mobile access included. No credit card needed.",
    color: "bg-accent-green/10 text-accent-green",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-heading"
      className="scroll-mt-24 px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </span>
          <h2
            id="why-choose-heading"
            className="mt-5 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Why academies choose 1Grow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Built by people who know the academy business. 1Grow helps you save time, track revenue, 
            and keep your team on the same page. <strong className="text-foreground">Here is why academies pick us.</strong>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 4) * 0.08}>
              <div className="group rounded-2xl border h-59 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                <div
                  className={`grid size-11 place-items-center rounded-2xl ${reason.color} transition-transform group-hover:scale-110`}
                >
                  <reason.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
