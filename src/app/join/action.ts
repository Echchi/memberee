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

export const checkUserid = async (userid: string) => {
  console.log("진심 동작은 함?", userid);
  const user = await db.user.findFirst({
    where: {
      userid,
      status: -1 || 1,
    },
    select: {
      userid: true,
    },
  });
  return !user;
};
export const checkPhone = async (phone: string) => {
  const user = await db.user.findFirst({
    where: {
      phone,
      status: -1 || 1,
    },
    select: {
      userid: true,
    },
  });
  return !user;
};

export const checkCoNum = async (num: string) => {
  const company = await db.company.findFirst({
    where: {
      num,
      status: -1 | 1,
    },
    select: {
      id: true,
    },
  });
  // console.log(company);
  return !company;
};

// export const createAccount = async (prevState: any, formData: FormData) => {
//   const data = {
//     username: formData.get("username"),
//     userid: formData.get("userid"),
//     password: formData.get("password"),
//     confirm_password: formData.get("confirm_password"),
//     phone: formData.get("phone"),
//     email: formData.get("email"),
//     co_name: formData.get("co_name"),
//     payDay: formData.get("payDay"),
//     co_contact: formData.get("co_contact"),
//     co_num: formData.get("co_num"),
//   };
//
//   const result = await formSchema.spa(data);
//   if (!result.success) {
//     return result.error.flatten();
//   } else {
//     // console.log(result.data);
//     const hashedPassword = await bcrypt.hash(result.data.password, 12);
//     const user = await db.user.create({
//       data: {
//         userid: result.data.userid,
//         password: hashedPassword,
//         name: result.data.username,
//         phone: result.data.phone,
//         email: result.data.email,
//       },
//     });
//     const company = await db.company.create({
//       data: {
//         name: result.data.co_name,
//         num: result.data.co_num,
//         contact: result.data.co_contact,
//         startTime: new Date(),
//         endTime: new Date(),
//         payDay: +result.data.payDay,
//         userId: user.id,
//       },
//     });
//     // 로그인
//     const session = await getSession();
//     session.id = user.id;
//     session.company = company.id;
//     await session.save();
//     redirect("/main");
//   }
// };
export const createAccount = async (data: JoinType) => {
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
        payDay: +result.data.payDay,
        userId: user.id,
      },
    });
    // 로그인
    // const session = await getSession();
    // session.id = user.id;
    // session.company = company.id;
    // await session.save();
    // redirect("/main");
  }
};
