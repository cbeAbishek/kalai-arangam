import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCookieValue } from "@/lib/google-auth";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());

function isAdmin(email: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const userStr = parseCookieValue(cookieHeader, "session_user");

  if (!userStr) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  if (!isAdmin(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const businessType = searchParams.get("businessType");
  const minScore = searchParams.get("minScore");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};

  if (businessType) {
    where.businessType = businessType;
  }

  if (minScore) {
    where.leadScore = { gte: parseInt(minScore) };
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { workEmail: { contains: search, mode: "insensitive" } },
      { companyName: { contains: search, mode: "insensitive" } },
    ];
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
}

export async function PATCH(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const userStr = parseCookieValue(cookieHeader, "session_user");

  if (!userStr) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  if (!isAdmin(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { id, role } = body;

  if (!id || !role) {
    return NextResponse.json({ error: "id and role required" }, { status: 400 });
  }

  const updated = await prisma.growWishlist.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json({ success: true, item: updated });
}
