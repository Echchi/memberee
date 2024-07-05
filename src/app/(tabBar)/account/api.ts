"use server";
import getSession from "@/libs/client/session";
import db from "@/libs/server/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { ITmpEmail } from "@/app/login/join";

export async function getUser() {
  const session = await getSession();
  const companyId = session.company;
  const userId = session.id;

  const user = await db.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      user: {
        where: {
          id: userId,
        },
      },
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

export async function updatePassword(password: string, userid?: string) {
  const session = await getSession();
  const sessionId = session.id;
  const hashedPassword = await bcrypt.hash(password, 12);
  let userIdToUpdate;

  if (sessionId && !userid) {
    userIdToUpdate = sessionId;
  } else if (userid) {
    const user = await db.user.findFirst({
      where: { userid: userid },
    });
    if (user) {
      userIdToUpdate = user.id;
    } else {
      throw new Error("User not found");
    }
  }

  if (!userIdToUpdate) {
    throw new Error("No valid identifier provided for user update.");
  }

  const user = await db.user.update({
    where: {
      status: { in: [-1, 1] },
      id: userIdToUpdate,
    },
    data: {
      password: hashedPassword,
    },
  });

  return user ? { success: true } : { success: false };
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

export async function checkEmail(email: string) {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

export async function checkTmpEmail(email: string) {
  const tmpEmail = await db.tmpEmail.findFirst({
    where: {
      email,
    },
    select: {
      id,
      email,
      expiresAt,
    },
  });

  return tmpEmail;
}

export async function updateTmpEmail(params: ITmpEmail) {
  const { id, email, token, expiresAt } = params;
  const tmpEmail = await db.tmpEmail.update({
    where: {
      id,
    },
    data: {
      token,
      expiresAt,
    },
  });

  return tmpEmail;
}
export async function createTmpEmail(params: ITmpEmail) {
  const { email, token, expiresAt } = params;
  const tmpEmail = await db.tmpEmail.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return tmpEmail;
}
