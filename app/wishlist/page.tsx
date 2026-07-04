"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WishlistForm } from "@/components/wishlist-form";
import { WishlistSuccess } from "@/components/wishlist-success";

export default function WishlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [leadScore, setLeadScore] = useState(0);

  const handleSubmitSuccess = (score: number) => {
    setLeadScore(score);
    setSubmitted(true);
  };

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="pt-24 pb-16">
        {submitted ? (
          <WishlistSuccess leadScore={leadScore} />
        ) : (
          <WishlistForm onSubmitSuccess={handleSubmitSuccess} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
