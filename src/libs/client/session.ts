import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
  company?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies() as any, {
    cookieName: "memberee",
    password: process.env.COOKIE_PASSWORD!,
  });
}
