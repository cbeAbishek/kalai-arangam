import { Reveal } from "@/components/reveal";
import { X } from "lucide-react";

const problems = [
  {
    problem: "Tracking fees with WhatsApp messages and Excel sheets",
    solution: "1Grow automates fee collection. Send payment links, auto-reminders, and instant receipts. No more manual follow-ups.",
  },
  {
    problem: "Double-bookings for classes and equipment across branches",
    solution: "See real-time availability for every branch, asset, and time slot. No overlaps, no conflicts, no confusion.",
  },
  {
    problem: "No visibility into daily revenue or attendance numbers",
    solution: "Live dashboards show revenue, attendance, and branch comparisons. Know your numbers anytime.",
  },
  {
    problem: "Manually following up on every student enquiry",
    solution: "Auto-capture leads from WhatsApp and web forms. Score, assign, and follow up without lifting a finger.",
  },
  {
    problem: "Managing staff schedules across multiple locations",
    solution: "Central staff management with role-based access. Spot conflicts before they happen. Assign with one click.",
  },
  {
    problem: "Creating certificates and reports by hand",
    solution: "Generate certificates, invoices, and reports in one click. Export to PDF, Excel, or CSV instantly.",
  },
];

const comparisonRows = [
  { area: 'Data Entry', manual: 'Manual in 3+ apps', automated: 'One dashboard, auto synced' },
  { area: 'Error Rate', manual: 'High - typos and missed chats', automated: 'Low - validation and auto-checks' },
  { area: 'Fee Collection', manual: '2-3 days per cycle', automated: '5 minutes per cycle' },
  { area: 'Reports', manual: 'Build from scratch each time', automated: 'Live and auto-generated' },
  { area: 'Staff Access', manual: 'Shared passwords on WhatsApp', automated: 'Role-based, secure logins' },
]

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
            Every problem you face daily - 1Grow already has a fix. 
            See how we turn manual work into automation and real-time data.
          </p>
        </Reveal>

        <div className="sr-only" aria-hidden="true">
          <p>ERP definition: An ERP (Enterprise Resource Planning) system is software that connects all parts of a business - students, inventory, billing, and reports - in one platform. 1Grow is an ERP built for training academies, rental businesses, and event companies.</p>
        </div>

        <Reveal className="mt-14">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-center font-heading text-xl font-bold">Manual vs Automated: A comparison</h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
              See how 1Grow compares to the WhatsApp + Excel approach that most academies use today.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 pr-4 font-heading font-bold">Area</th>
                    <th className="pb-3 pr-4 font-heading text-sm font-bold text-accent-red">WhatsApp + Excel</th>
                    <th className="pb-3 font-heading text-sm font-bold text-primary">1Grow ERP</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.area} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-semibold">{row.area}</td>
                      <td className="py-3 pr-4 text-accent-red/80">{row.manual}</td>
                      <td className="py-3 text-primary/80">{row.automated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
