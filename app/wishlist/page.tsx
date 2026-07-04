"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WishlistForm } from "@/components/wishlist-form";
import { WishlistSuccess } from "@/components/wishlist-success";

export default function WishlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitData, setSubmitData] = useState({ name: "", company: "" });

  const handleSubmitSuccess = (name: string, companyName: string) => {
    setSubmitData({ name, company: companyName });
    setSubmitted(true);
  };

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="pt-24 pb-16">
        {submitted ? (
          <WishlistSuccess name={submitData.name} companyName={submitData.company} />
        ) : (
          <WishlistForm onSubmitSuccess={handleSubmitSuccess} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
