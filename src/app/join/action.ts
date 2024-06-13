"use server";

import { z } from "zod";
import validator from "validator";
import bcrypt from "bcrypt";
import {
  CO_NUM_REGEX,
  ID_REGEX,
  ID_REGEX_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/libs/constants";
import db from "@/libs/server/db";
import getSession from "@/libs/client/session";
import { redirect } from "next/navigation";
import { formSchema, JoinType } from "@/app/join/schema";
import { JoinFormType } from "@/app/join/page";

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
  console.log("checkUserid", user, user.length);
  return user.length === 0;
};
export const checkPhone = async (phone: string) => {
  const user = await db.user.findMany({
    where: {
      phone,
      OR: [{ status: 1 }, { status: -1 }],
    },
    select: {
      userid: true,
    },
  });
  return user.length === 0;
};

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
  // console.log(company);
  return company.length === 0;
};

export const createAccount = async (data: JoinFormType) => {
  console.log("createAccount 데이터는 잘 오네요", data);
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // console.log(result.data);
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        userid: result.data.userid,
        password: hashedPassword,
        name: result.data.username,
        phone: result.data.phone,
        email: result.data.email,
      },
    });
    const company = await db.company.create({
      data: {
        name: result.data.co_name,
        num: result.data.co_num,
        contact: result.data.co_contact,
        startTime: new Date(),
        endTime: new Date(),
        payDay: Number(result.data.payDay),
        userId: user.id,
      },
    });
    // 로그인
    const session = await getSession();
    session.id = user.id;
    session.company = company.id;
    await session.save();
    redirect("/main");
  }
};
