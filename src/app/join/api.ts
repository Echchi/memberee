"use server";
import jwt from "jsonwebtoken";
import db from "@/libs/server/db";

export async function checkExpiresAt(token: string) {
  console.log("token", token);
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    throw new Error("error");
  }
  if (typeof decoded === "object" && decoded.email) {
    const email = decoded.email;
    const tmpEmail = await db.tmpEmail.findFirst({
      where: {
        email,
        token,
      },
      select: {
        email: true,
        expiresAt: true,
      },
    });

    if (!tmpEmail) {
      throw new Error("error");
    }

    const currentDate = new Date();
    if (currentDate > tmpEmail.expiresAt) {
      throw new Error("error");
    }
    return tmpEmail;
  } else {
    throw new Error("error");
  }
}
