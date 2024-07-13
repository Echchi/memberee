import { NextRequest, NextResponse } from "next/server";
import getSession from "./libs/client/session";

interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  "/": true,
  "/login": true,
  "/find": true,
  "/join": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exits = publicUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exits) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (exits) {
      return NextResponse.redirect(new URL("/main", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
