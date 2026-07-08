import { Reveal } from "@/components/reveal";
import { UserPlus, Building2, LayoutGrid, Users, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds with a 20-day free trial. No credit card required and no commitment.",
    color: "bg-primary/10 text-primary",
    number: "bg-primary text-primary-foreground",
  },
  {
    icon: Building2,
    title: "Set Up Your Business",
    description: "Add your branches, staff members, and customize branding to match your business identity.",
    color: "bg-accent-blue/10 text-accent-blue",
    number: "bg-accent-blue text-white",
  },
  {
    icon: LayoutGrid,
    title: "Import Your Data",
    description: "Add customers, students, inventory items, events, or migrate your existing records seamlessly.",
    color: "bg-accent-red/10 text-accent-red",
    number: "bg-accent-red text-white",
  },
  {
    icon: Users,
    title: "Manage Daily Operations",
    description: "Track attendance, collect fees, send notifications, and manage teams - all automated.",
    color: "bg-accent-green/10 text-accent-green",
    number: "bg-accent-green text-white",
  },
  {
    icon: Rocket,
    title: "Grow Your Business",
    description: "Leverage analytics dashboards, revenue reports, and smart insights to drive growth.",
    color: "bg-accent-cyan/10 text-accent-cyan",
    number: "bg-accent-cyan text-white",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-24 px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-blue">
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className="mt-5 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            From sign-up to live operations in five simple steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Getting started with 1Grow takes minutes. Follow this step-by-step
            process to move from setup to daily operations without technical
            assistance.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-14 right-14 top-7 hidden h-px bg-gradient-to-r from-primary/20 via-accent-blue/20 to-accent-cyan/20 lg:block"
          />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} as="li">
                <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div
                    className={`relative z-10 grid size-14 place-items-center rounded-2xl border border-border bg-card shadow-sm ${step.color}`}
                  >
                    <step.icon className="size-6" aria-hidden="true" />
                    <span
                      className={`absolute -right-2 -top-2 grid size-6 place-items-center rounded-full text-xs font-bold shadow-md ${step.number}`}
                      aria-label={`Step ${i + 1}`}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-base font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
