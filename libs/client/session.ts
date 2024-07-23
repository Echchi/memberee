import { PaymentType } from "@prisma/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
  company?: number;
  paymentType?: PaymentType;
}

export default function getSession() {
  const ttl = 3 * 60 * 60;
  return getIronSession<SessionContent>(cookies() as any, {
    cookieName: "memberee",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ttl - 60,
      path: "/",
    },
  });
}
