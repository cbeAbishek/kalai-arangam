import { NextResponse } from "next/server";
import { getGoogleAuthUrl, generateState } from "@/lib/google-auth";

export async function GET() {
  const state = generateState();

  const response = NextResponse.redirect(getGoogleAuthUrl(state));

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
