"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BUSINESS_TYPES = [
  "Training Academy",
  "Dance School",
  "Music Academy",
  "Tuition Centre",
  "Martial Arts",
  "Yoga Studio",
  "Rental Business",
  "Event Management",
  "Wedding Planner",
  "Photography Studio",
  "Other",
];

const CURRENT_PROBLEMS = [
  "Student Management",
  "Attendance",
  "Fee Collection",
  "Inventory",
  "Event Planning",
  "Staff Management",
  "Scheduling",
  "Reports",
  "Payments",
  "Communication",
  "WhatsApp Follow-up",
  "Certificate Generation",
];

const EXISTING_SOFTWARE = [
  "Excel",
  "Google Sheets",
  "WhatsApp",
  "Notebook",
  "Zoho",
  "Tally",
  "Custom ERP",
  "None",
];

const MODULE_INTEREST = [
  "Class & Training Management",
  "Rental Management",
  "Event Management",
  "CRM",
  "Billing",
  "Attendance",
  "Inventory",
  "Reports",
  "Mobile App",
];

const FEATURE_VOTING = [
  "WhatsApp Automation",
  "Online Admission",
  "Fee Reminder",
  "QR Attendance",
  "Mobile App",
  "Parent Portal",
  "Student Portal",
  "Inventory Tracking",
  "Booking Calendar",
  "Event Timeline",
  "Analytics Dashboard",
  "Certificate Generator",
];

const PRICING_OPTIONS = [
  "₹499/month",
  "₹999/month",
  "₹1,999/month",
  "₹4,999/month",
  "Depends on features",
];

const BETA_OPTIONS = [
  "Yes, I want early access",
  "I can provide product feedback",
  "I want onboarding support",
  "I want migration from Excel",
  "I'm interested in a lifetime founder plan",
];

const GROWTH_CHANNELS = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Google Search",
  "Friend",
  "YouTube",
  "Workshop",
  "Community",
  "Other",
];

interface WishlistFormProps {
  onSubmitSuccess: (leadScore: number) => void;
}

export function WishlistForm({ onSubmitSuccess }: WishlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPainPoints, setCurrentPainPoints] = useState<string[]>([]);
  const [interestedModules, setInterestedModules] = useState<string[]>([]);
  const [mostWantedFeatures, setMostWantedFeatures] = useState<string[]>([]);

  const handleCheckboxChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    max: number
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.length < max
          ? [...prev, value]
          : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      fullName: formData.get("fullName") as string,
      workEmail: formData.get("workEmail") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      companyName: formData.get("companyName") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      businessType: formData.get("businessType") as string,
      industry: formData.get("industry") as string,
      yearsInBusiness: formData.get("yearsInBusiness")
        ? parseInt(formData.get("yearsInBusiness") as string)
        : null,
      teamSize: formData.get("teamSize")
        ? parseInt(formData.get("teamSize") as string)
        : null,
      numberOfBranches: formData.get("numberOfBranches")
        ? parseInt(formData.get("numberOfBranches") as string)
        : null,
      monthlyCustomers: formData.get("monthlyCustomers")
        ? parseInt(formData.get("monthlyCustomers") as string)
        : null,
      currentSoftware: formData.get("currentSoftware") as string,
      currentPainPoints,
      currentWorkflow: formData.get("currentWorkflow") as string,
      interestedModules,
      mostWantedFeatures,
      expectedBudget: formData.get("expectedBudget") as string,
      interestedInBeta: formData.get("interestedInBeta") === "on",
      willingToGiveFeedback: formData.get("willingToGiveFeedback") === "on",
      interestedInLifetime: formData.get("interestedInLifetime") === "on",
      howDidYouHear: formData.get("howDidYouHear") as string,
      referralCode: formData.get("referralCode") as string,
      approximateRevenueRange: formData.get("approximateRevenueRange") as string,
      numberOfStaff: formData.get("numberOfStaff")
        ? parseInt(formData.get("numberOfStaff") as string)
        : null,
      numberOfActiveStudents: formData.get("numberOfActiveStudents")
        ? parseInt(formData.get("numberOfActiveStudents") as string)
        : null,
      biggestChallenge: formData.get("biggestChallenge") as string,
      adoptionTimeline: formData.get("adoptionTimeline") as string,
      canScheduleDemo: formData.get("canScheduleDemo") === "on",
    };

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit");
      }

      onSubmitSuccess(result.leadScore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Join the 1grow Wishlist
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Help us build the perfect platform for your business. Get early access and shape the product.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <FormSection title="Contact Information">
          <Input label="Full Name" name="fullName" required placeholder="John Doe" />
          <Input label="Work Email" name="workEmail" type="email" placeholder="john@company.com" />
          <Input label="Phone Number" name="phoneNumber" type="tel" placeholder="+91 98765 43210" />
          <Input label="Company Name" name="companyName" placeholder="Academy Name" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="City" name="city" placeholder="Chennai" />
            <Input label="State" name="state" placeholder="Tamil Nadu" />
          </div>
        </FormSection>

        <FormSection title="Business Details">
          <Select label="Business Type" name="businessType" options={BUSINESS_TYPES} />
          <Input label="Industry" name="industry" placeholder="Dance, Music, Karate, Yoga..." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="Years in Business"
              name="yearsInBusiness"
              type="number"
              placeholder="3"
            />
            <Input label="Team Size" name="teamSize" type="number" placeholder="10" />
            <Input label="Number of Branches" name="numberOfBranches" type="number" placeholder="2" />
          </div>
          <Input
            label="Monthly Customers/Students"
            name="monthlyCustomers"
            type="number"
            placeholder="200"
          />
          <Select label="Current Software" name="currentSoftware" options={EXISTING_SOFTWARE} />
          <Input label="Current Workflow" name="currentWorkflow" placeholder="Excel, WhatsApp, Notebook..." />
        </FormSection>

        <FormSection title="Current Pain Points (select all that apply)">
          <CheckboxGroup
            options={CURRENT_PROBLEMS}
            selected={currentPainPoints}
            onChange={(val) => handleCheckboxChange(val, setCurrentPainPoints, 12)}
          />
        </FormSection>

        <FormSection title="Interested Modules (select all that apply)">
          <CheckboxGroup
            options={MODULE_INTEREST}
            selected={interestedModules}
            onChange={(val) => handleCheckboxChange(val, setInterestedModules, 9)}
          />
        </FormSection>

        <FormSection title="Most Wanted Features (select up to 5)">
          <CheckboxGroup
            options={FEATURE_VOTING}
            selected={mostWantedFeatures}
            onChange={(val) => handleCheckboxChange(val, setMostWantedFeatures, 5)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {mostWantedFeatures.length}/5 selected
          </p>
        </FormSection>

        <FormSection title="Pricing">
          <Select
            label="Expected Monthly Budget"
            name="expectedBudget"
            options={PRICING_OPTIONS}
          />
        </FormSection>

        <FormSection title="Beta Program">
          <div className="space-y-3">
            <CheckboxField label="I'm interested in early access (Beta)" name="interestedInBeta" />
            <CheckboxField label="I can provide product feedback" name="willingToGiveFeedback" />
            <CheckboxField label="I'm interested in a lifetime founder plan" name="interestedInLifetime" />
          </div>
        </FormSection>

        <FormSection title="Marketing">
          <Select label="How did you hear about us?" name="howDidYouHear" options={GROWTH_CHANNELS} />
          <Input label="Referral Code" name="referralCode" placeholder="Optional" />
        </FormSection>

        <FormSection title="Optional High-Value Questions">
          <Select
            label="Approximate Monthly Revenue Range"
            name="approximateRevenueRange"
            options={["Under ₹1 Lakh", "₹1-5 Lakhs", "₹5-20 Lakhs", "₹20 Lakhs+", "Prefer not to say"]}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Number of Staff/Trainers"
              name="numberOfStaff"
              type="number"
              placeholder="5"
            />
            <Input
              label="Number of Active Students/Customers"
              name="numberOfActiveStudents"
              type="number"
              placeholder="100"
            />
          </div>
          <Textarea label="Biggest Operational Challenge" name="biggestChallenge" placeholder="Tell us what hurts most..." />
          <Select
            label="When are you planning to adopt new software?"
            name="adoptionTimeline"
            options={["Immediately", "Within 1 month", "Within 3 months", "Within 6 months", "Just exploring"]}
          />
          <CheckboxField label="Can we schedule a product demo?" name="canScheduleDemo" />
        </FormSection>

        {error && (
          <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 text-base font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Join Wishlist"}
        </Button>
      </form>
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {options.map((option) => (
        <label
          key={option}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm transition-all hover:bg-muted",
            selected.includes(option) && "border-primary bg-primary/5 text-primary"
          )}
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          <span
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded border",
              selected.includes(option)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border"
            )}
          >
            {selected.includes(option) && (
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          {option}
        </label>
      ))}
    </div>
  );
}

function CheckboxField({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm transition-all hover:bg-muted">
      <input type="checkbox" name={name} className="size-4 rounded border-border accent-primary" />
      {label}
    </label>
  );
}
