import { NextRequest, NextResponse } from "next/server";
import { parseCookieValue } from "@/lib/google-auth";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const userStr = parseCookieValue(cookieHeader, "session_user");

  if (!userStr) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = JSON.parse(userStr);
    return NextResponse.json({
      user: {
        name: user.name || null,
        email: user.email || null,
        image: user.picture || null,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
