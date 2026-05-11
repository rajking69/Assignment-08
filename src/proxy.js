import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";

/**
 * Server-side route guard. Anything matched below requires a valid session;
 * unauthenticated users are bounced to /Login with the original path preserved
 * in `?callbackURL=` so we can return them after they sign in.
 */
export async function proxy(request) {
  const auth = getAuth();

  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    try {
      session = await auth.api.getSession({ headers: request.headers });
    } catch {
      session = null;
    }
  }

  if (session) return NextResponse.next();

  const loginURL = new URL("/Login", request.url);
  loginURL.searchParams.set("callbackURL", request.nextUrl.pathname);
  return NextResponse.redirect(loginURL);
}

export const config = {
  matcher: ["/Profile", "/Profile/:path*"],
};
