"use client";

import { Heart } from "lucide-react";

interface WishlistSuccessProps {
  name: string;
  companyName: string;
}

export function WishlistSuccess({ name, companyName }: WishlistSuccessProps) {
  return (
    <div className="mx-auto max-w-lg px-4 text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Heart className="size-8 text-primary" />
      </div>
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Thank you, {name}!
      </h1>
      {companyName && (
        <p className="mt-2 text-lg font-medium text-foreground">
          {companyName}
        </p>
      )}
      <p className="mt-4 text-lg text-muted-foreground">
        We&apos;ve received your wishlist. Our team will review your details and reach out to you soon with early access updates.
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Warm greetings from the 1grow team! We&apos;re building something special and you&apos;re now part of our founding community.
        </p>
      </div>
    </div>
  );
}
