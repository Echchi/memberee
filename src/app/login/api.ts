"use server";
import getSession from "@/libs/client/session";
import db from "@/libs/server/db";

export async function getUserWithData(
  name: string,
  phone: string,
  coNum: string,
) {
  console.log("getUserWithData", name, phone, coNum);
  const userId = await db.user.findFirst({
    where: {
      name: name,
      phone: phone,
      Company: {
        some: {
          num: coNum,
        },
      },
    },
    select: { userid: true, createdAt: true },
  });
  return userId;
}
