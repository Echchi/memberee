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

export async function User(id: number) {
  const session = await getSession();
  const companyId = session.company;
  const updateData = {
    status: status,
    ...(status < 0 && { suspendedDate: new Date() }),
    ...(status === 0 && { endDate: new Date() }),
  };
  const member = await db.member.update({
    where: {
      id,
      companyId,
    },
    data: updateData,
  });
  if (member.status === 0) {
    redirect("/member");
  } else {
    redirect(`${id}`);
  }
}
