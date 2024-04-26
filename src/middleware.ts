import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { authOptions } from "@/app/utils/auth";
import { auth } from "./app/firebase";
import { NextURL } from "next/dist/server/web/next-url";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const session = await request.cookies.get("next-auth.session-token")?.value;
  const authPath =
    path === "/forgot" || path === "/login" || path === "/signup";

  const protectedPath = path === "/profile";

  if (session) {
    if (authPath) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/forgot", "/login", "/signup", "/profile"],
};
