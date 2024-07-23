"use server";

import bcrypt from "bcrypt";

import db from "../../libs/server/db";
import getSession from "../../libs/client/session";
import { redirect } from "next/navigation";
import { joinFormSchema, JoinType } from "./schema";
import { JoinFormType } from "./page";
import { PaymentType } from ".prisma/client";

export const checkUserid = async (userid: string) => {
  const user = await db.user.findMany({
    where: {
      userid,
      OR: [{ status: 1 }, { status: -1 }],
    },
    select: {
      userid: true,
    },
  });

  return user.length === 0;
};
// export const checkPhone = async (phone: string) => {
//   const user = await db.user.findMany({
//     where: {
//       phone,
//       OR: [{ status: 1 }, { status: -1 }],
//     },
//     select: {
//       userid: true,
//     },
//   });
//   return user.length === 0;
// };

export const checkCoNum = async (num: string) => {
  const company = await db.company.findMany({
    where: {
      num,
      OR: [{ status: 1 }, { status: -1 }],
    },
    select: {
      id: true,
    },
  });

  return company.length === 0;
};

export const createAccount = async (data: JoinFormType) => {
  const result = await joinFormSchema.spa(data);
  console.log("createAccount result", result);
  if (!result.success) {
    console.log("errors", result.error.flatten());
    return result.error.flatten().fieldErrors;
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        userid: result.data.userid,
        password: hashedPassword,
        // name: result.data.username,
        // phone: result.data.phone,
        email: result.data.email,
      },
    });
    const company = await db.company.create({
      data: {
        name: result.data.co_name,
        num: result.data.co_num,
        // contact: result.data.co_contact,
        startTime: new Date(),
        endTime: new Date(),
        paymentType: data.paymentType,
        payDay: result.data.payDay ? Number(result.data.payDay) : null,
        userId: user.id,
      },
    });
    const deleteTmp = await db.tmpEmail.delete({
      where: {
        email: result.data.email,
      },
    });
    // 로그인
    const session = await getSession();
    session.id = user.id;
    session.company = company.id;
    session.paymentType = company.paymentType;
    await session.save();
    redirect("/main");
  }
};
