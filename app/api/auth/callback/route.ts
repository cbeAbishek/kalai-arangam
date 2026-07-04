import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getGoogleUser, parseCookieValue } from "@/lib/google-auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/wishlist?error=${error}`, request.url));
  }

  const cookieState = parseCookieValue(request.headers.get("cookie"), "oauth_state");

  if (!state || state !== cookieState) {
    return NextResponse.redirect(new URL("/wishlist?error=state_mismatch", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/wishlist?error=no_code", request.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const user = await getGoogleUser(tokens.id_token);

    const response = NextResponse.redirect(new URL("/wishlist", request.url));

    response.cookies.set("session_user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.delete("oauth_state");

    return response;
  } catch {
    return NextResponse.redirect(new URL("/wishlist?error=auth_failed", request.url));
  }
}
