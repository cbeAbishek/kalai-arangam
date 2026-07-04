-- Create GrowWishlist table
CREATE TABLE "GrowWishlist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "workEmail" TEXT,
    "phoneNumber" TEXT,
    "companyName" TEXT,
    "city" TEXT,
    "state" TEXT,
    "businessType" TEXT,
    "industry" TEXT,
    "yearsInBusiness" INTEGER,
    "teamSize" INTEGER,
    "numberOfBranches" INTEGER,
    "monthlyCustomers" INTEGER,
    "currentSoftware" TEXT,
    "currentPainPoints" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "currentWorkflow" TEXT,
    "interestedModules" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mostWantedFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "expectedBudget" TEXT,
    "interestedInBeta" BOOLEAN NOT NULL DEFAULT false,
    "willingToGiveFeedback" BOOLEAN NOT NULL DEFAULT false,
    "interestedInLifetime" BOOLEAN NOT NULL DEFAULT false,
    "howDidYouHear" TEXT,
    "referralCode" TEXT,
    "approximateRevenueRange" TEXT,
    "numberOfStaff" INTEGER,
    "numberOfActiveStudents" INTEGER,
    "biggestChallenge" TEXT,
    "adoptionTimeline" TEXT,
    "canScheduleDemo" BOOLEAN NOT NULL DEFAULT false,
    "ipCity" TEXT,
    "ipRegion" TEXT,
    "ipCountry" TEXT,
    "ipLat" DOUBLE PRECISION,
    "ipLon" DOUBLE PRECISION,
    "ipTimezone" TEXT,
    "leadScore" INTEGER NOT NULL DEFAULT 0,
    "googleSubId" TEXT,

    CONSTRAINT "GrowWishlist_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE INDEX "GrowWishlist_workEmail_idx" ON "GrowWishlist"("workEmail");
CREATE INDEX "GrowWishlist_businessType_idx" ON "GrowWishlist"("businessType");
CREATE INDEX "GrowWishlist_leadScore_idx" ON "GrowWishlist"("leadScore");
