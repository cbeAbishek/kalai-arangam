"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchLocation, type LocationData } from "@/lib/location-client";
import {
  User,
  Building2,
  AlertTriangle,
  Layers,
  Sparkles,
  IndianRupee,
  Megaphone,
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  Loader2,
} from "lucide-react";

const STEPS = [
  { id: "contact", label: "Contact", icon: User },
  { id: "business", label: "Business", icon: Building2 },
  { id: "problems", label: "Pain Points", icon: AlertTriangle },
  { id: "modules", label: "Modules", icon: Layers },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "pricing", label: "Pricing", icon: IndianRupee },
  { id: "marketing", label: "Marketing", icon: Megaphone },
];

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

const INDUSTRY_PLACEHOLDERS = [
  "Dance Academy",
  "Music School",
  "Yoga Studio",
  "Martial Arts",
  "Tuition Centre",
  "Photography Studio",
  "Event Management",
  "Wedding Planning",
  "Swimming Academy",
  "Art & Craft Studio",
  "Fitness Centre",
  "Cricket Academy",
];

export interface WishlistFormData {
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  city: string;
  state: string;
  businessType: string;
  industry: string;
  yearsInBusiness: string;
  teamSize: string;
  numberOfBranches: string;
  monthlyCustomers: string;
  currentSoftware: string;
  currentWorkflow: string;
  currentPainPoints: string[];
  interestedModules: string[];
  mostWantedFeatures: string[];
  expectedBudget: string;
  interestedInBeta: boolean;
  willingToGiveFeedback: boolean;
  interestedInLifetime: boolean;
  howDidYouHear: string;
  referralCode: string;
  approximateRevenueRange: string;
  numberOfStaff: string;
  numberOfActiveStudents: string;
  biggestChallenge: string;
  adoptionTimeline: string;
  canScheduleDemo: boolean;
}

const INITIAL_DATA: WishlistFormData = {
  fullName: "",
  workEmail: "",
  phoneNumber: "",
  companyName: "",
  city: "",
  state: "",
  businessType: "",
  industry: "",
  yearsInBusiness: "",
  teamSize: "",
  numberOfBranches: "",
  monthlyCustomers: "",
  currentSoftware: "",
  currentWorkflow: "",
  currentPainPoints: [],
  interestedModules: [],
  mostWantedFeatures: [],
  expectedBudget: "",
  interestedInBeta: false,
  willingToGiveFeedback: false,
  interestedInLifetime: false,
  howDidYouHear: "",
  referralCode: "",
  approximateRevenueRange: "",
  numberOfStaff: "",
  numberOfActiveStudents: "",
  biggestChallenge: "",
  adoptionTimeline: "",
  canScheduleDemo: false,
};

interface WishlistFormProps {
  onSubmitSuccess: (name: string, companyName: string) => void;
}

export function WishlistForm({ onSubmitSuccess }: WishlistFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WishlistFormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetchLocation()
      .then((loc) => {
        setLocation(loc);
        setLocationLoading(false);
        if (loc.ipCity) {
          setData((prev) => ({ ...prev, city: loc.ipCity || "" }));
        }
        if (loc.ipRegion) {
          setData((prev) => ({ ...prev, state: loc.ipRegion || "" }));
        }
      })
      .catch(() => setLocationLoading(false));

    fetch("/api/session")
      .then((r) => r.json())
      .then((session) => {
        if (session.user) {
          setAuthenticated(true);
          setData((prev) => ({
            ...prev,
            fullName: session.user.name || prev.fullName,
            workEmail: session.user.email || prev.workEmail,
          }));
        }
        setAuthLoading(false);
      })
      .catch(() => setAuthLoading(false));
  }, []);

  const updateField = useCallback(
    <K extends keyof WishlistFormData>(field: K, value: WishlistFormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleArrayItem = useCallback(
    (field: "currentPainPoints" | "interestedModules" | "mostWantedFeatures", item: string, max: number) => {
      setData((prev) => {
        const arr = prev[field];
        const next = arr.includes(item) ? arr.filter((v) => v !== item) : arr.length < max ? [...arr, item] : arr;
        return { ...prev, [field]: next };
      });
    },
    []
  );

  const canProceed = () => {
    switch (step) {
      case 0:
        return data.fullName.trim().length > 0 && data.workEmail.trim().length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...data,
        yearsInBusiness: data.yearsInBusiness ? parseInt(data.yearsInBusiness) : null,
        teamSize: data.teamSize ? parseInt(data.teamSize) : null,
        numberOfBranches: data.numberOfBranches ? parseInt(data.numberOfBranches) : null,
        monthlyCustomers: data.monthlyCustomers ? parseInt(data.monthlyCustomers) : null,
        numberOfStaff: data.numberOfStaff ? parseInt(data.numberOfStaff) : null,
        numberOfActiveStudents: data.numberOfActiveStudents ? parseInt(data.numberOfActiveStudents) : null,
        location,
      };

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to submit");

      onSubmitSuccess(data.fullName, data.companyName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Join the 1Grow Wishlist
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Help us build the perfect platform for your business
        </p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all",
                  i === step
                    ? "text-primary"
                    : i < step
                      ? "text-primary/70 cursor-pointer hover:text-primary"
                      : "text-muted-foreground/40"
                )}
              >
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all",
                    i === step
                      ? "border-primary bg-primary text-primary-foreground"
                      : i < step
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground"
                  )}
                >
                  {i < step ? <Check className="size-4" /> : <Icon className="size-4" />}
                </div>
                <span className="hidden text-[10px] font-medium sm:block">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-0.5 w-4 sm:w-8",
                    i < step ? "bg-primary/50" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {step === 0 && (
              <StepContact
                data={data}
                updateField={updateField}
                authLoading={authLoading}
                authenticated={authenticated}
                locationLoading={locationLoading}
                location={location}
              />
            )}
            {step === 1 && (
              <StepBusiness data={data} updateField={updateField} />
            )}
            {step === 2 && (
              <StepProblems data={data} updateField={updateField} toggleArrayItem={toggleArrayItem} />
            )}
            {step === 3 && (
              <StepModules data={data} toggleArrayItem={toggleArrayItem} />
            )}
            {step === 4 && (
              <StepFeatures data={data} updateField={updateField} toggleArrayItem={toggleArrayItem} />
            )}
            {step === 5 && (
              <StepPricing data={data} updateField={updateField} />
            )}
            {step === 6 && (
              <StepMarketing data={data} updateField={updateField} />
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="h-12 rounded-xl px-6 text-sm font-medium shadow-sm transition-all hover:shadow-md"
        >
          <ChevronLeft className="mr-1 size-4" />
          Back
        </Button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/50" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {step < STEPS.length - 1 && (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="h-12 rounded-xl px-5 text-sm font-semibold shadow-sm transition-all hover:shadow-md bg-primary text-primary-foreground"
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant={step < STEPS.length - 1 ? "outline" : "default"}
            className={cn(
              "h-12 rounded-xl px-5 text-sm font-semibold shadow-sm transition-all hover:shadow-md",
              step === STEPS.length - 1 && "bg-primary text-primary-foreground"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1 size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                {step === STEPS.length - 1 ? 'Finish' : 'Submit'}
                {step === STEPS.length - 1 ? <Check className="ml-1 size-4" /> : null}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepContact({
  data,
  updateField,
  authLoading,
  authenticated,
  locationLoading,
  location,
}: {
  data: WishlistFormData;
  updateField: <K extends keyof WishlistFormData>(field: K, value: WishlistFormData[K]) => void;
  authLoading: boolean;
  authenticated: boolean;
  locationLoading: boolean;
  location: LocationData | null;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {authenticated
            ? "Your details were pre-filled from Google. Edit if needed."
            : "Sign in with Google to pre-fill your details, or fill manually."}
        </p>
      </div>

      {!authLoading && !authenticated && (
        <a
          href="/api/auth/google"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-all hover:bg-muted"
        >
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>
      )}

      {authLoading && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Checking authentication...
        </div>
      )}

      <InputField
        label="Full Name"
        value={data.fullName}
        onChange={(v) => updateField("fullName", v)}
        required
        placeholder="John Doe"
      />
      <InputField
        label="Work Email"
        value={data.workEmail}
        onChange={(v) => updateField("workEmail", v)}
        type="email"
        required
        placeholder="john@company.com"
      />
      <InputField
        label="Phone Number"
        value={data.phoneNumber}
        onChange={(v) => updateField("phoneNumber", v)}
        type="tel"
        placeholder="9876543210"
        maxLength={10}
        pattern="[0-9]{10}"
      />
      <InputField
        label="Company Name"
        value={data.companyName}
        onChange={(v) => updateField("companyName", v)}
        placeholder="Academy Name"
      />

      <div className="rounded-xl border border-border bg-background p-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="size-4 text-primary" />
          Detected Location
          {locationLoading && <Loader2 className="size-3 animate-spin text-muted-foreground" />}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {location?.ipCity && location?.ipRegion
            ? `${location.ipCity}, ${location.ipRegion}`
            : location?.ipCity || "Detecting..."}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="City"
          value={data.city}
          onChange={(v) => updateField("city", v)}
          placeholder="Chennai"
        />
        <InputField
          label="State"
          value={data.state}
          onChange={(v) => updateField("state", v)}
          placeholder="Tamil Nadu"
        />
      </div>
    </div>
  );
}

function StepBusiness({
  data,
  updateField,
}: {
  data: WishlistFormData;
  updateField: <K extends keyof WishlistFormData>(field: K, value: WishlistFormData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Business Details</h2>
        <p className="mt-1 text-sm text-muted-foreground">Tell us about your business</p>
      </div>

      <CustomSelect
        label="Business Type"
        value={data.businessType}
        onChange={(v) => updateField("businessType", v)}
        options={BUSINESS_TYPES}
      />
      <TypingInput
        label="Industry"
        value={data.industry}
        onChange={(v) => updateField("industry", v)}
        placeholders={INDUSTRY_PLACEHOLDERS}
      />
      <div className="grid grid-cols-3 gap-3">
        <InputField
          label="Years in Business"
          value={data.yearsInBusiness}
          onChange={(v) => updateField("yearsInBusiness", v)}
          type="number"
          placeholder="3"
        />
        <InputField
          label="Team Size"
          value={data.teamSize}
          onChange={(v) => updateField("teamSize", v)}
          type="number"
          placeholder="10"
        />
        <InputField
          label="Branches"
          value={data.numberOfBranches}
          onChange={(v) => updateField("numberOfBranches", v)}
          type="number"
          placeholder="2"
        />
      </div>
      <InputField
        label="Monthly Customers/Students"
        value={data.monthlyCustomers}
        onChange={(v) => updateField("monthlyCustomers", v)}
        type="number"
        placeholder="200"
      />
      <CustomSelect
        label="Current Software"
        value={data.currentSoftware}
        onChange={(v) => updateField("currentSoftware", v)}
        options={EXISTING_SOFTWARE}
      />
      <InputField
        label="Current Workflow"
        value={data.currentWorkflow}
        onChange={(v) => updateField("currentWorkflow", v)}
        placeholder="Excel, WhatsApp, Notebook..."
      />
    </div>
  );
}

function StepProblems({
  data,
  updateField,
  toggleArrayItem,
}: {
  data: WishlistFormData;
  updateField: <K extends keyof WishlistFormData>(field: K, value: WishlistFormData[K]) => void;
  toggleArrayItem: (field: "currentPainPoints" | "interestedModules" | "mostWantedFeatures", item: string, max: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Current Pain Points</h2>
        <p className="mt-1 text-sm text-muted-foreground">Select all challenges you face</p>
      </div>

      <CheckboxGrid
        options={CURRENT_PROBLEMS}
        selected={data.currentPainPoints}
        onToggle={(item) => toggleArrayItem("currentPainPoints", item, 12)}
      />

      <div>
        <label className="mb-1 block text-sm font-medium">Current Workflow Description</label>
        <textarea
          value={data.currentWorkflow}
          onChange={(e) => updateField("currentWorkflow", e.target.value)}
          rows={3}
          placeholder="Describe your current workflow..."
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

function StepModules({
  data,
  toggleArrayItem,
}: {
  data: WishlistFormData;
  toggleArrayItem: (field: "currentPainPoints" | "interestedModules" | "mostWantedFeatures", item: string, max: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Interested Modules</h2>
        <p className="mt-1 text-sm text-muted-foreground">Which modules matter most to you?</p>
      </div>

      <CheckboxGrid
        options={MODULE_INTEREST}
        selected={data.interestedModules}
        onToggle={(item) => toggleArrayItem("interestedModules", item, 9)}
      />
    </div>
  );
}

function StepFeatures({
  data,
  updateField,
  toggleArrayItem,
}: {
  data: WishlistFormData;
  updateField: <K extends keyof WishlistFormData>(field: K, value: WishlistFormData[K]) => void;
  toggleArrayItem: (field: "currentPainPoints" | "interestedModules" | "mostWantedFeatures", item: string, max: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Most Wanted Features</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select up to 5 features you need most
        </p>
      </div>

      <CheckboxGrid
        options={FEATURE_VOTING}
        selected={data.mostWantedFeatures}
        onToggle={(item) => toggleArrayItem("mostWantedFeatures", item, 5)}
      />

      <div className="text-right text-xs text-muted-foreground">
        {data.mostWantedFeatures.length}/5 selected
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Biggest Operational Challenge</label>
        <textarea
          value={data.biggestChallenge}
          onChange={(e) => updateField("biggestChallenge", e.target.value)}
          rows={2}
          placeholder="What hurts most about your current setup?"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <CustomSelect
        label="When are you planning to adopt new software?"
        value={data.adoptionTimeline}
        onChange={(v) => updateField("adoptionTimeline", v)}
        options={["Immediately", "Within 1 month", "Within 3 months", "Within 6 months", "Just exploring"]}
      />
    </div>
  );
}

function StepPricing({
  data,
  updateField,
}: {
  data: WishlistFormData;
  updateField: <K extends keyof WishlistFormData>(field: K, value: WishlistFormData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Pricing & Beta</h2>
        <p className="mt-1 text-sm text-muted-foreground">Help us shape pricing and early access</p>
      </div>

      <CustomSelect
        label="Expected Monthly Budget"
        value={data.expectedBudget}
        onChange={(v) => updateField("expectedBudget", v)}
        options={PRICING_OPTIONS}
      />

      <CustomSelect
        label="Approximate Monthly Revenue"
        value={data.approximateRevenueRange}
        onChange={(v) => updateField("approximateRevenueRange", v)}
        options={["Under ₹1 Lakh", "₹1-5 Lakhs", "₹5-20 Lakhs", "₹20 Lakhs+", "Prefer not to say"]}
      />

      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Staff/Trainers"
          value={data.numberOfStaff}
          onChange={(v) => updateField("numberOfStaff", v)}
          type="number"
          placeholder="5"
        />
        <InputField
          label="Active Students"
          value={data.numberOfActiveStudents}
          onChange={(v) => updateField("numberOfActiveStudents", v)}
          type="number"
          placeholder="100"
        />
      </div>

      <div className="space-y-2 pt-2">
        <p className="text-sm font-medium">Beta Program</p>
        <ToggleField
          label="I want early access (Beta)"
          checked={data.interestedInBeta}
          onChange={(v) => updateField("interestedInBeta", v)}
        />
        <ToggleField
          label="I can provide product feedback"
          checked={data.willingToGiveFeedback}
          onChange={(v) => updateField("willingToGiveFeedback", v)}
        />
        <ToggleField
          label="I'm interested in a lifetime founder plan"
          checked={data.interestedInLifetime}
          onChange={(v) => updateField("interestedInLifetime", v)}
        />
        <ToggleField
          label="Can we schedule a product demo?"
          checked={data.canScheduleDemo}
          onChange={(v) => updateField("canScheduleDemo", v)}
        />
      </div>
    </div>
  );
}

function StepMarketing({
  data,
  updateField,
}: {
  data: WishlistFormData;
  updateField: <K extends keyof WishlistFormData>(field: K, value: WishlistFormData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">How did you find us?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Help us understand our reach</p>
      </div>

      <CustomSelect
        label="How did you hear about us?"
        value={data.howDidYouHear}
        onChange={(v) => updateField("howDidYouHear", v)}
        options={GROWTH_CHANNELS}
      />

      <InputField
        label="Referral Code"
        value={data.referralCode}
        onChange={(v) => updateField("referralCode", v)}
        placeholder="Optional"
      />
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  maxLength,
  pattern,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  pattern?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          onChange(type === "tel" ? v.replace(/[^0-9]/g, "").slice(0, maxLength || 999) : v);
        }}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function CustomSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
          open && "border-primary ring-2 ring-primary/20"
        )}
      >
        <span className={cn(value ? "text-foreground" : "text-muted-foreground")}>
          {value || "Select..."}
        </span>
        <ChevronRight
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] mt-1 w-full overflow-visible rounded-xl border border-border bg-card shadow-lg"
          >
            <div className="max-h-48 overflow-y-auto scrollbar-hide p-1.5">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    value === opt
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <span className="min-w-0 break-words">{opt}</span>
                  {value === opt && <Check className="size-4 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TypingInput({
  label,
  value,
  onChange,
  placeholders,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholders: string[];
}) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const currentPlaceholder = placeholders[placeholderIndex];

    const tick = () => {
      if (!isDeleting) {
        setDisplayedText(currentPlaceholder.slice(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentPlaceholder.length) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
        timeoutRef.current = setTimeout(tick, 80);
      } else {
        setDisplayedText(currentPlaceholder.slice(0, displayedText.length - 1));
        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          return;
        }
        timeoutRef.current = setTimeout(tick, 40);
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? 40 : 80);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedText, isDeleting, placeholderIndex, value, placeholders]);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={value ? "" : displayedText}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border px-4 py-2.5 text-sm transition-all hover:bg-muted",
        checked && "border-primary bg-primary/5"
      )}
    >
      <span className={cn("transition-colors", checked && "text-primary font-medium")}>
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
          checked ? "bg-primary" : "bg-border"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
            checked ? "translate-x-[22px]" : "translate-x-[2px]"
          )}
        />
      </button>
    </label>
  );
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <motion.button
            key={option}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onToggle(option)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border border-border px-3 py-2.5 text-left text-sm transition-all hover:bg-muted",
              isSelected && "border-primary bg-primary/5 text-primary shadow-sm"
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all",
                isSelected ? "border-primary bg-primary" : "border-border"
              )}
            >
              {isSelected && <Check className="size-3 text-primary-foreground" />}
            </span>
            <span className="min-w-0 break-words leading-snug">{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
