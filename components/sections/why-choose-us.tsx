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
      "Not a generic CRM. Built specifically for training institutes, rental businesses, and event companies.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wallet,
    title: "Automated Fee Collection",
    description:
      "WhatsApp reminders, payment links, and digital receipts - all on autopilot with zero manual work.",
    color: "bg-accent-blue/10 text-accent-blue",
  },
  {
    icon: Bell,
    title: "WhatsApp Automation",
    description:
      "Send attendance updates, fee reminders, class schedules, and notifications automatically via WhatsApp.",
    color: "bg-accent-green/10 text-accent-green",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "See revenue, attendance, branch comparisons, and performance trends instantly on live dashboards.",
    color: "bg-accent-cyan/10 text-accent-cyan",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Role-based access control, encrypted data, audit logs, and true multi-tenant isolation for each business.",
    color: "bg-accent-red/10 text-accent-red",
  },
  {
    icon: Layers,
    title: "Multi-Branch Ready",
    description:
      "Manage unlimited branches from a single dashboard with consolidated reporting and cross-location visibility.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HeadphonesIcon,
    title: "Local Support",
    description:
      "Customer support available in Tamil, Hindi, and English. We understand the Indian business context.",
    color: "bg-accent-blue/10 text-accent-blue",
  },
  {
    icon: Check,
    title: "20-Day Free Trial",
    description:
      "Full access to all modules, unlimited staff users, mobile access. No credit card required to start.",
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
            Built by people who understand the academy business. Our platform
            delivers measurable improvements in efficiency, revenue tracking,
            and team coordination.
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
