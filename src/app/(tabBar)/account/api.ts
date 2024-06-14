"use server";
import getSession from "@/libs/client/session";
import db from "@/libs/server/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

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
  // await new Promise((resolve) => setTimeout(resolve, 1000000));
  return user;
}

export async function terminateUser(id: number) {
  const session = await getSession();
  const companyId = session.company;
  const transactionResult = await db.$transaction(async () => {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        status: 0,
      },
    });
    const company = await db.company.update({
      where: {
        id: companyId,
      },
      data: {
        status: 0,
      },
    });
  });

  session.destroy();
  redirect("/login");
}

export async function updatePassword(password: string) {
  const session = await getSession();
  const id = session.id;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return { success: true };
}

export async function checkPassword(password: string) {
  const session = await getSession();
  const id = session.id;

  const user = await db.user.findFirst({
    where: {
      id,
    },
  });
  const ok = await bcrypt.compare(password, user?.password ?? "");

  return ok;
}
