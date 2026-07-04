-- AlterTable
ALTER TABLE "GrowWishlist" ALTER COLUMN "currentPainPoints" DROP DEFAULT,
ALTER COLUMN "interestedModules" DROP DEFAULT,
ALTER COLUMN "mostWantedFeatures" DROP DEFAULT;

-- CreateTable
CREATE TABLE "GrowContactForm" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "ipCity" TEXT,
    "ipRegion" TEXT,
    "ipCountry" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',

    CONSTRAINT "GrowContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GrowContactForm_email_idx" ON "GrowContactForm"("email");

-- CreateIndex
CREATE INDEX "GrowContactForm_status_idx" ON "GrowContactForm"("status");
