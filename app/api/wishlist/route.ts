import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLocationByIP } from "@/lib/location";
import { calculateLeadScore } from "@/lib/lead-score";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      workEmail,
      phoneNumber,
      companyName,
      city,
      state,
      businessType,
      industry,
      yearsInBusiness,
      teamSize,
      numberOfBranches,
      monthlyCustomers,
      currentSoftware,
      currentPainPoints,
      currentWorkflow,
      interestedModules,
      mostWantedFeatures,
      expectedBudget,
      interestedInBeta,
      willingToGiveFeedback,
      interestedInLifetime,
      howDidYouHear,
      referralCode,
      approximateRevenueRange,
      numberOfStaff,
      numberOfActiveStudents,
      biggestChallenge,
      adoptionTimeline,
      canScheduleDemo,
      location: clientLocation,
    } = body;

    if (!fullName) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    let location;
    if (clientLocation?.ipCity) {
      location = {
        ipCity: clientLocation.ipCity || null,
        ipRegion: clientLocation.ipRegion || null,
        ipCountry: clientLocation.ipCountry || null,
        ipLat: clientLocation.ipLat || null,
        ipLon: clientLocation.ipLon || null,
        ipTimezone: clientLocation.ipTimezone || null,
      };
    } else {
      const forwarded = request.headers.get("x-forwarded-for");
      const ip = forwarded?.split(",")[0]?.trim();
      location = await getLocationByIP(ip);
    }

    const leadData = {
      workEmail,
      phoneNumber,
      monthlyCustomers,
      numberOfBranches,
      currentSoftware,
      canScheduleDemo,
      interestedInBeta,
      expectedBudget,
    };

    const leadScore = calculateLeadScore(leadData);

    const wishlist = await prisma.growWishlist.create({
      data: {
        fullName,
        workEmail: workEmail || null,
        phoneNumber: phoneNumber || null,
        companyName: companyName || null,
        city: city || null,
        state: state || null,
        businessType: businessType || null,
        industry: industry || null,
        yearsInBusiness: yearsInBusiness || null,
        teamSize: teamSize || null,
        numberOfBranches: numberOfBranches || null,
        monthlyCustomers: monthlyCustomers || null,
        currentSoftware: currentSoftware || null,
        currentPainPoints: currentPainPoints || [],
        currentWorkflow: currentWorkflow || null,
        interestedModules: interestedModules || [],
        mostWantedFeatures: mostWantedFeatures || [],
        expectedBudget: expectedBudget || null,
        interestedInBeta: interestedInBeta || false,
        willingToGiveFeedback: willingToGiveFeedback || false,
        interestedInLifetime: interestedInLifetime || false,
        howDidYouHear: howDidYouHear || null,
        referralCode: referralCode || null,
        approximateRevenueRange: approximateRevenueRange || null,
        numberOfStaff: numberOfStaff || null,
        numberOfActiveStudents: numberOfActiveStudents || null,
        biggestChallenge: biggestChallenge || null,
        adoptionTimeline: adoptionTimeline || null,
        canScheduleDemo: canScheduleDemo || false,
        ...location,
        leadScore,
      },
    });

    return NextResponse.json({ success: true, id: wishlist.id, leadScore }, { status: 201 });
  } catch (error) {
    console.error("Wishlist submission error:", error);
    return NextResponse.json({ error: "Failed to submit wishlist" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const businessType = searchParams.get("businessType");
    const minScore = searchParams.get("minScore");

    const where: Record<string, unknown> = {};

    if (businessType) {
      where.businessType = businessType;
    }

    if (minScore) {
      where.leadScore = { gte: parseInt(minScore) };
    }

    const [items, total] = await Promise.all([
      prisma.growWishlist.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.growWishlist.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch wishlists" }, { status: 500 });
  }
}
