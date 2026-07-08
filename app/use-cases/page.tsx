"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight, X, CheckCircle2, ChevronRight, Landmark, Users, UserCheck, MessageSquare, Building2, Package, Award, Target, UserCog, CalendarHeart } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = [Landmark, Users, UserCheck, MessageSquare, Building2, Package, Award, Target, UserCog, CalendarHeart];

const useCases = [
  {
    title: "How to collect fees online",
    description:
      "Set up automated payment collection with WhatsApp reminders and instant receipts.",
    category: "Fee Collection",
    steps: [
      "Enable the Billing module in your 1grow dashboard",
      "Add fee structures for each course or batch",
      "Share payment links via WhatsApp or SMS automatically",
      "Track payments in real-time with auto-receipts",
    ],
    benefit: "Reduce fee collection time by 70% and eliminate manual tracking.",
  },
  {
    title: "How to manage dance students",
    description:
      "Track student progress, attendance, and batch assignments for dance academies.",
    category: "Student Management",
    steps: [
      "Create student profiles with contact and batch details",
      "Assign students to specific batches and time slots",
      "Track attendance per class with one-tap check-in",
      "Monitor progress with periodic assessments",
    ],
    benefit: "Keep every student journey organized across batches and levels.",
  },
  {
    title: "How to reduce absent students",
    description:
      "Use automated attendance tracking and parent notifications to improve attendance rates.",
    category: "Attendance",
    steps: [
      "Set up daily attendance tracking for each batch",
      "Enable automatic WhatsApp messages to parents on absence",
      "Review weekly attendance reports in the dashboard",
      "Follow up with chronic absentees via CRM pipeline",
    ],
    benefit: "Improve attendance rates by up to 30% with automated follow-ups.",
  },
  {
    title: "How to send WhatsApp reminders",
    description:
      "Automate fee reminders, class schedules, and event notifications via WhatsApp.",
    category: "Notifications",
    steps: [
      "Connect your WhatsApp Business API in Settings",
      "Create message templates for fees, classes, and events",
      "Set up automated triggers (e.g., 3 days before due date)",
      "Monitor delivery status and responses in one place",
    ],
    benefit: "Send 1000+ reminders in minutes instead of hours of manual messaging.",
  },
  {
    title: "How to manage academy branches",
    description:
      "Run multiple branches from a single dashboard with consolidated reporting.",
    category: "Branch Management",
    steps: [
      "Create branch profiles with location and staff details",
      "Assign staff and students to specific branches",
      "View consolidated reports across all branches",
      "Compare branch performance with side-by-side analytics",
    ],
    benefit: "Get a bird's eye view of all branches without logging in separately.",
  },
  {
    title: "How to manage rentals",
    description:
      "Track inventory, bookings, dispatch, and returns with real-time availability.",
    category: "Rental Business",
    steps: [
      "Add your inventory items with photos and pricing",
      "Create booking calendars with availability status",
      "Manage dispatch and return workflows with checklists",
      "Track maintenance schedules and item conditions",
    ],
    benefit: "Eliminate double-bookings and lost inventory with real-time tracking.",
  },
  {
    title: "How to generate certificates",
    description:
      "Create professional certificates for students with one-click generation.",
    category: "Student Management",
    steps: [
      "Upload your certificate template or choose from presets",
      "Map student data fields to template placeholders",
      "Select students and generate certificates in bulk",
      "Share certificates via WhatsApp or email instantly",
    ],
    benefit: "Generate 100 certificates in under 2 minutes instead of hours.",
  },
  {
    title: "How to track enquiries",
    description:
      "Capture leads from WhatsApp, phone, and walk-ins into a unified pipeline.",
    category: "CRM",
    steps: [
      "Configure lead capture from WhatsApp, web forms, and calls",
      "Score and prioritize leads automatically",
      "Assign follow-ups with reminders and deadlines",
      "Track conversion rates across sources",
    ],
    benefit: "Never lose a lead again with automated tracking and follow-ups.",
  },
  {
    title: "How to manage staff",
    description:
      "Assign roles, track performance, and manage schedules across branches.",
    category: "Staff Management",
    steps: [
      "Create staff profiles with roles and permissions",
      "Build and publish class schedules with conflict detection",
      "Track attendance and performance metrics",
      "Manage payroll-ready timesheets and leave requests",
    ],
    benefit: "Centralize staff management across all branches in one place.",
  },
  {
    title: "How to manage event bookings",
    description:
      "Handle event enquiries, quotations, budgets, and team assignments.",
    category: "Event Business",
    steps: [
      "Capture event enquiries with date, venue, and requirements",
      "Create and share professional quotations",
      "Track budget, expenses, and vendor payments",
      "Assign team members and manage event-day tasks",
    ],
    benefit: "Run events profitably with end-to-end tracking from enquiry to invoice.",
  },
];

const categoryColors: Record<string, string> = {
  "Fee Collection": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Student Management": "bg-primary/10 text-primary border-primary/20",
  Attendance: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Notifications: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Branch Management": "bg-violet-500/10 text-violet-600 border-violet-500/20",
  "Rental Business": "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  CRM: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  "Staff Management": "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  "Event Business": "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

export default function UseCasesPage() {
  const [selected, setSelected] = useState<(typeof useCases)[number] & { index: number } | null>(null);

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-blue">
              Use Cases
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Real business problems, solved
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every card answers a real business problem. Click to see how 1Grow solves it with step-by-step instructions.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2" role="list" aria-label="Use cases">
            {useCases.map((uc, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={i} delay={(i % 2) * 0.06}>
                  <button
                    onClick={() => setSelected({ ...uc, index: i })}
                    role="listitem"
                    className="group w-full text-left flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20"
                    aria-label={`Learn how to ${uc.title.toLowerCase()}`}
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", categoryColors[uc.category] || "bg-primary/10 text-primary border-primary/20")}>
                        {uc.category}
                      </span>
                      <h3 className="mt-2 font-heading text-base font-bold group-hover:text-primary transition-colors">
                        {uc.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {uc.description}
                      </p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 mt-2 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`How to ${selected.title.toLowerCase()}`}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  {(() => { const Icon = ICONS[selected.index]; return <Icon className="size-5" aria-hidden="true" />; })()}
                </div>
                <div>
                  <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", categoryColors[selected.category] || "bg-primary/10 text-primary border-primary/20")}>
                    {selected.category}
                  </span>
                </div>
              </div>

              <h2 className="mt-4 font-heading text-xl font-bold sm:text-2xl">
                {selected.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selected.description}
              </p>

              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">How it works</h3>
                {selected.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden="true" />
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {selected.benefit}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="/wishlist"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
                  aria-label="Get early access to 1Grow"
                >
                  Get Early Access
                  <ChevronRight className="size-4" aria-hidden="true" />
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
