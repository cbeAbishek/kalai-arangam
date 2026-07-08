import { Reveal } from "@/components/reveal";
import { X } from "lucide-react";

const problems = [
  {
    problem: "Tracking fees with WhatsApp messages and Excel sheets",
    solution: "Automated fee collection with payment links, reminders, and instant receipts.",
  },
  {
    problem: "Double-bookings for classes and equipment across branches",
    solution: "Real-time availability calendar showing every branch, asset, and time slot.",
  },
  {
    problem: "No visibility into daily revenue or attendance numbers",
    solution: "Live dashboards displaying revenue, attendance trends, and branch comparisons.",
  },
  {
    problem: "Manually following up on every student enquiry",
    solution: "Automated lead pipeline with WhatsApp follow-up reminders and scoring.",
  },
  {
    problem: "Managing staff schedules across multiple locations",
    solution: "Centralized staff management with role-based access and conflict detection.",
  },
  {
    problem: "Creating certificates and reports by hand",
    solution: "One-click certificate generation and report export in PDF, Excel, and CSV.",
  },
];

export function ProblemsWeSolve() {
  return (
    <section
      id="problems-we-solve"
      aria-labelledby="problems-heading"
      className="relative overflow-hidden bg-surface-alt scroll-mt-24 px-4 py-24"
    >
      <div
        className="absolute -right-20 top-1/4 h-48 w-48 rounded-full bg-accent-red/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-16 bottom-1/3 h-36 w-36 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-red/20 bg-accent-red/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-red">
            Problems We Solve
          </span>
          <h2
            id="problems-heading"
            className="mt-5 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Stop juggling spreadsheets, WhatsApp, and manual registers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every operational challenge you face daily - 1Grow already has a
            proven solution. See how we replace manual processes with automation
            and real-time data.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                <div className="flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-red/10 text-accent-red">
                    <X className="size-4" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground line-through decoration-accent-red/40">
                    {item.problem}
                  </p>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-green/10 text-accent-green">
                    <span className="text-sm" aria-hidden="true">✓</span>
                  </div>
                  <p className="text-sm font-semibold">{item.solution}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
