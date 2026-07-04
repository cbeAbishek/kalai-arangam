import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthUrl, generateState } from "@/lib/google-auth";

export async function GET(request: NextRequest) {
  const state = generateState();
  const from = request.nextUrl.searchParams.get("from") || "/";

  const response = NextResponse.redirect(getGoogleAuthUrl(state));

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  response.cookies.set("oauth_redirect", from, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
