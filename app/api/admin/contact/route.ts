import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCookieValue } from "@/lib/google-auth";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());

function isAdmin(email: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

function checkAuth(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const userStr = parseCookieValue(cookieHeader, "session_user");

  if (!userStr) return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };

  let user;
  try {
    user = JSON.parse(userStr);
  } catch {
    return { error: NextResponse.json({ error: "Invalid session" }, { status: 401 }) };
  }

  if (!isAdmin(user.email)) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 403 }) };
  }

  return { user };
}

export async function GET(request: NextRequest) {
  const auth = checkAuth(request);
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search");
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { subject: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) {
    where.status = status;
  }

  const [items, total] = await Promise.all([
    prisma.growContactForm.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.growContactForm.count({ where }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function PATCH(request: NextRequest) {
  const auth = checkAuth(request);
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const updated = await prisma.growContactForm.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true, item: updated });
}
