"use server";
import getSession from "@/libs/client/session";
import db from "@/libs/server/db";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  const companyId = session.company;
  const user = await db.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      user: true,
    },
  });
  console.log("user", user);
  return user;
}

export async function terminateUser(id: number) {
  const session = await getSession();
  const companyId = session.company;

  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      status: 0,
    },
  });

  session.destroy();
}
