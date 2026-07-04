"use client";

import { useState, useEffect, useCallback } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
  ExternalLink,
  Filter,
  X,
} from "lucide-react";

interface AdminUser {
  name: string;
  email: string;
  image: string;
}

interface WishlistItem {
  id: string;
  createdAt: string;
  fullName: string;
  workEmail: string | null;
  phoneNumber: string | null;
  companyName: string | null;
  city: string | null;
  state: string | null;
  businessType: string | null;
  industry: string | null;
  yearsInBusiness: number | null;
  teamSize: number | null;
  numberOfBranches: number | null;
  monthlyCustomers: number | null;
  currentSoftware: string | null;
  currentPainPoints: string[];
  currentWorkflow: string | null;
  interestedModules: string[];
  mostWantedFeatures: string[];
  expectedBudget: string | null;
  interestedInBeta: boolean;
  willingToGiveFeedback: boolean;
  interestedInLifetime: boolean;
  howDidYouHear: string | null;
  referralCode: string | null;
  approximateRevenueRange: string | null;
  numberOfStaff: number | null;
  numberOfActiveStudents: number | null;
  biggestChallenge: string | null;
  adoptionTimeline: string | null;
  canScheduleDemo: boolean;
  ipCity: string | null;
  ipRegion: string | null;
  ipCountry: string | null;
  leadScore: number;
  role: string;
}

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

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [businessFilter, setBusinessFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then((session) => {
        if (!session.user) {
          setAuthLoading(false);
          return;
        }
        setUser(session.user);
        setAuthLoading(false);
      })
      .catch(() => setAuthLoading(false));
  }, []);

  const fetchItems = useCallback(async (p: number, q: string, bt: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: "20" });
      if (q) params.set("search", q);
      if (bt) params.set("businessType", bt);
      const res = await fetch(`/api/admin/wishlist?${params}`);
      if (res.status === 403 || res.status === 401) {
        window.location.href = "/";
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchItems(page, search, businessFilter);
  }, [user, page, fetchItems, businessFilter]);

  const handleSearch = () => {
    setPage(1);
    fetchItems(1, search, businessFilter);
  };

  const handleClearFilters = () => {
    setBusinessFilter("");
    setSearch("");
    setPage(1);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <main className="flex flex-col items-center justify-center pt-24 pb-16">
          <h1 className="font-heading text-2xl font-bold">Admin Access</h1>
          <p className="mt-2 text-muted-foreground">You need to sign in to access this page</p>
          <div className="mt-6 flex gap-3">
            <a href={`/api/auth/google?from=/admin`}>
              <Button className="gap-2">
                Sign in with Google
              </Button>
            </a>
            <a href="/">
              <Button variant="outline">Go to Home</Button>
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold">Wishlist Admin</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {total} submissions &middot; Signed in as {user.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search name, email, company..."
                  className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-primary sm:w-72"
                />
              </div>
              <Button variant="outline" onClick={handleSearch}>
                Search
              </Button>
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-1.5"
              >
                <Filter className="size-3.5" />
                Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-4 rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">Business Type:</span>
                <div className="flex flex-wrap gap-1.5">
                  {BUSINESS_TYPES.map((bt) => (
                    <button
                      key={bt}
                      onClick={() => {
                        setBusinessFilter(businessFilter === bt ? "" : bt);
                        setPage(1);
                      }}
                      className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                        businessFilter === bt
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {bt}
                    </button>
                  ))}
                </div>
                {(businessFilter || search) && (
                  <Button variant="ghost" size="sm" onClick={handleClearFilters} className="gap-1 text-xs">
                    <X className="size-3" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No submissions found</div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/30"
                >
                  <button
                    onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {item.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{item.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.companyName || "No company"} &middot; {item.businessType || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.leadScore >= 50 && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Score {item.leadScore}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                    {item.phoneNumber && (
                      <a
                        href={`tel:${item.phoneNumber}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-green-500 hover:bg-green-500/5 hover:text-green-600 dark:hover:text-green-400"
                      >
                        <Phone className="size-3" />
                        Call
                      </a>
                    )}
                    {item.workEmail && (
                      <a
                        href={`mailto:${item.workEmail}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-blue-500 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Mail className="size-3" />
                        Mail
                      </a>
                    )}
                    {item.phoneNumber && (
                      <a
                        href={`https://wa.me/91${item.phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-emerald-500 hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <ExternalLink className="size-3" />
                        WhatsApp
                      </a>
                    )}
                  </div>

                  {selectedItem?.id === item.id && (
                    <div className="mt-4 space-y-4 border-t border-border pt-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <DetailRow icon={<Mail className="size-4" />} label="Email" value={item.workEmail} />
                        <DetailRow icon={<Phone className="size-4" />} label="Phone" value={item.phoneNumber} />
                        <DetailRow icon={<Building2 className="size-4" />} label="Company" value={item.companyName} />
                        <DetailRow icon={<MapPin className="size-4" />} label="Location" value={item.city && item.state ? `${item.city}, ${item.state}` : item.ipCity || null} />
                        <DetailRow icon={<User className="size-4" />} label="Industry" value={item.industry} />
                        <DetailRow label="Software" value={item.currentSoftware} />
                        <DetailRow label="Years in Business" value={item.yearsInBusiness ? String(item.yearsInBusiness) : null} />
                        <DetailRow label="Team Size" value={item.teamSize ? String(item.teamSize) : null} />
                        <DetailRow label="Branches" value={item.numberOfBranches ? String(item.numberOfBranches) : null} />
                        <DetailRow label="Monthly Customers" value={item.monthlyCustomers ? String(item.monthlyCustomers) : null} />
                        <DetailRow label="Budget" value={item.expectedBudget} />
                        <DetailRow label="Revenue" value={item.approximateRevenueRange} />
                        <DetailRow label="Staff/Trainers" value={item.numberOfStaff ? String(item.numberOfStaff) : null} />
                        <DetailRow label="Active Students" value={item.numberOfActiveStudents ? String(item.numberOfActiveStudents) : null} />
                        <DetailRow label="Adoption Timeline" value={item.adoptionTimeline} />
                        <DetailRow label="How Found" value={item.howDidYouHear} />
                        <DetailRow label="Referral Code" value={item.referralCode} />
                      </div>

                      {item.currentPainPoints.length > 0 && (
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Pain Points</p>
                          <div className="flex flex-wrap gap-1">
                            {item.currentPainPoints.map((p) => (
                              <span key={p} className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">{p}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.interestedModules.length > 0 && (
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Modules</p>
                          <div className="flex flex-wrap gap-1">
                            {item.interestedModules.map((m) => (
                              <span key={m} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{m}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.mostWantedFeatures.length > 0 && (
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Features</p>
                          <div className="flex flex-wrap gap-1">
                            {item.mostWantedFeatures.map((f) => (
                              <span key={f} className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600 dark:text-green-400">{f}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {item.interestedInBeta && <Badge>Early Access</Badge>}
                        {item.willingToGiveFeedback && <Badge>Feedback</Badge>}
                        {item.interestedInLifetime && <Badge>Lifetime Plan</Badge>}
                        {item.canScheduleDemo && <Badge>Demo Request</Badge>}
                      </div>

                      {item.currentWorkflow && (
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Current Workflow</p>
                          <p className="text-sm text-muted-foreground">{item.currentWorkflow}</p>
                        </div>
                      )}

                      {item.biggestChallenge && (
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Biggest Challenge</p>
                          <p className="text-sm text-muted-foreground">{item.biggestChallenge}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2">
      {icon && <span className="mt-0.5 text-muted-foreground">{icon}</span>}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}
