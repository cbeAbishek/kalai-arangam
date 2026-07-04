"use client";

import { Heart } from "lucide-react";

interface WishlistSuccessProps {
  leadScore: number;
}

export function WishlistSuccess({ leadScore }: WishlistSuccessProps) {
  return (
    <div className="mx-auto max-w-lg px-4 text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Heart className="size-8 text-primary" />
      </div>
      <h1 className="font-heading text-3xl font-bold tracking-tight">You&apos;re on the list!</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Thank you for joining the 1grow wishlist. We&apos;ll reach out soon with early access updates.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-medium text-muted-foreground">Your Lead Score</h2>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-primary">{leadScore}</span>
          <span className="text-lg text-muted-foreground">/100</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${leadScore}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {leadScore >= 70
            ? "High priority! We'll reach out to you first."
            : leadScore >= 40
              ? "Great interest! Stay tuned for updates."
              : "Thanks for your interest! We'll keep you posted."}
        </p>
      </div>
    </div>
  );
}
