import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email, subject, and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    let ipCity: string | null = null;
    let ipRegion: string | null = null;
    let ipCountry: string | null = null;

    try {
      const forwarded = request.headers.get("x-forwarded-for");
      const ip = forwarded?.split(",")[0]?.trim() || "8.8.8.8";
      const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city`);
      const geoData = await geoRes.json();
      if (geoData.status === "success") {
        ipCity = geoData.city || null;
        ipRegion = geoData.regionName || null;
        ipCountry = geoData.country || null;
      }
    } catch {
      // location is optional
    }

    const contact = await prisma.growContactForm.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
        ipCity,
        ipRegion,
        ipCountry,
      },
    });

    return NextResponse.json({ success: true, id: contact.id });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
